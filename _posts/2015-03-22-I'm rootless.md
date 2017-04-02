---
layout: post
title:  I'm rootless
date:   2015-03-22T19:48:40Z
author: piranna
avatar-url: https://avatars.githubusercontent.com/u/532414?v=3&s=128
comments: 0
github-url: https://github.com/NodeOS/NodeOS/issues/118
---
One of the advantages of being based on NPM is the so modular that NodeOS is. That's the reason why [you would have not seen too much movement lately](https://github.com/NodeOS/NodeOS/commits/master), but the fact is that in the project dependencies [there has been a huge improvement](https://github.com/piranna/nodeos-mount-filesystems): now thanks to a huge and agressive usage of the new Linux kernel multi-layer OverlayFS (we are needing to use a release candidate version of upcoming Linux 4.0 so [it could be available](http://www.phoronix.com/scan.php?page=news_item&px=Linux-3.20-OverlayFS-Changes)! :-D), NodeOS offer a per-user independent & isolated root filesystem, and in fact now there's no real root partition at all (that's great to simplify the process to create a live ISO or a Raspberry PI disk image!!! :-D), making this not only the first OS to have a similar approach (loosely inspired in [Plan9 `bind` union directories](http://en.wikipedia.org/wiki/Plan_9_from_Bell_Labs#Union_directories_and_namespaces)) but probably making it one of the most secure OSes, at least from a file access point of view :-)

``` Javascript
[    1.072752] EXT4-fs (sda): warning: mounting unchecked fs, running e2fsck is recommended
[    1.076131] EXT4-fs (sda): mounted filesystem without journal. Opts: errors=remount-ro
Hello! I'm a user init script :-)
Welcome to NodeOS!: username:  nodeos
Welcome to NodeOS!: password:  
/ # ls
[ 'bin', 'dev', 'etc', 'init', 'lib', 'proc', 'share', 'tmp', 'usr' ]
/ # ls /bin
[ 'blessed',
  'cat',
  'cp',
  'ip',
  'ln',
  'ls',
  'man',
  'mkdir',
  'mv',
  'node',
  'npm',
  'nsh',
  'pwd',
  'rm',
  'sh',
  'slap' ]
/ # node
> process.env
{ HOME: '/',
  TERM: 'linux',
  LANG: 'es_ES.UTF-8',
  vga: '0x318',
  PATH: '/bin' }
/ # cat init
#!/usr/bin/env node

console.log("Hello! I'm a user init script :-)")
/ # ./init
Hello! I'm a user init script :-)
/ # ls usr/bin/
[ 'env' ]
/ # cd usr/bin/
/usr/bin # ls
[ 'env' ]
/usr/bin # cd
/ # ls share/
[ 'man' ]
/ # ls share/man/
[ 'man1', 'man3', 'man5', 'man7' ]
/ # 
```

Pretty, isn't it? :-D

The way it works is fairly simple and it's inspired by [this IBM article about mount namespaces](http://www.ibm.com/developerworks/linux/library/l-mount-namespaces/index.html) (that definitely are the next step where to move to improve all this OverlayFS big hack... if needed :-P): `initramfs` not only mount the users filesystem, but also means as a basis for the "general root filesystem" used as basis later for all the users (since by design since Linux 2.6.0 it will be always loaded in memory, so we re-use it). This is done by removing the unneeded modules and executables used to start and mount the filesystem so earn some RAM, but also to remove some possible security holes on that modules, so we keep only with an initram only with the Node.js executable and its needed dynamic libraries, and since they will be used everywhere this makes also the system faster. The users partition need to be mounted somewhere, so I'm doing it on the `/tmp` folder on the initramfs, so this way I can later mount over it an in-ram `tmpfs` filesystem for each user, hidding the raw users partition from being accesible by anybody and also preventing to write temporal data on the real hard disks.

After that, we use this initram as a read-only "carbon copy" where to mount over each of the users home (also root) and later using [chroot](https://github.com/melor/node-posix#posixchrootpath) to give to each users an unique root filesystem isolated from the others. This is only needed to exec the per-user `/init` executable and when login in the system, so it's easy to have the access controlled, and all their subsequent process will be running inside their corresponding user `chroot` jail. There's a minor exception regarding to the `root` user: if it's available in the users filesystem (that's not mandatory at all), since [logon](https://github.com/piranna/logon) needs to access to the users home directory to read their login configuration, it is mounted first and later the users partition mount point is moved to a `home` folder inside its own filesystem, so it can access to them without modifying the carbon-copy initram root filesystem. After that, it is configured exactly the same way as any other regular user.

This also has the advantage to give to the users a simple filesystem hierarchy were to work, since their "home" is in fact the root of their own filesystem hierarchy, so they can easily install packages globally without requiring special permissions and will not need to configure anything since they will naturally be installed in their home directory by deafult.

There are some improvements that need to be done, obviously. First of all, the "demo" users filesystem that's automatically generated on the build process needs to give diferent `uid`s and `gid`s to each one of the users folders since this is used as basis for the security scheme (maybe a patch for [genext2fs](http://genext2fs.sourceforge.net/)?), but since it's only for demo purposses this is not so a problem (but definitely we need to add some some info about how to create and config a custom, real one...).

Other notable problem is regarding to the `/dev` and `/proc` filesystems, since they are shown on each user filesystem as empty folder. In the case of `/dev`, the best solution is [to implement a filesystem that only show the device entries that are accesible by the user and owned by him or not currently used](https://github.com/NodeOS/NodeOS/issues/95), so they could be exclusively accessed. This could be easily done by using [fusejs](http://c4milo.github.io/fusejs/), since the NodeOS Linux kernel is already being compiled with support both for [FUSE](http://fuse.sourceforge.net/) and [CUSE](http://lwn.net/Articles/308445/). Regarding to `/proc`, something similar could be done, but seems its configurable at mount how accesible it is, so by using shared mountpoints I could have it replicated on all the users root filesystem. On the other hand, I would like that [Node.js remove its dependency on it](https://github.com/joyent/node/issues/10426) so it could be removed at all from NodeOS, since it's obviously a posible entry point for security issues since you hace access to all the kernel internal structures... :-/

Next step, update the project documentation, some love for Docker (I have been focusing on QEmu since by default Docker needs `sudo`, so it makes more dificult to build the images) and generate (nightly) live ISOs :-) It will be funny to see NodeOS running on real hardware... :-D

P.D.: oh, and [we have now 2200 stargazers](https://github.com/NodeOS/NodeOS/stargazers) and counting!!! :-D

