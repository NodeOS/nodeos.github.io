---
layout: docs
---


# Troubleshooting

If you have problems to compile your NodeOS version or get errors during the
compile process then please look below.

## NodeOS boots into the REPL

This error occurs when NodeOS cant mount the filesystem. This will propably
happen when you compile your NodeOS with Arch Linux.

**Solution: Use a newer version of NodeOS, if its still failing to mount
please open a issue**

## Incorrect NPM Version

This error mostly occurs when you use NPM 3 with Node.js 5.x because NPM 3 uses
a flat dependency structure

```bash
cp: the call of stat for 'node_modules/nodeos-barebones/out/latest' is not possible: file or directory not found
cp: the call of stat for 'node_modules/nodeos-initramfs/out/latest' is not possible: file or directory not found
cp: the call of stat for 'node_modules/nodeos-usersfs/out/latest' is not possible: file or directory not found
```

**Solution: Please use the newest version of NodeOS to resolve this problem**

Reference: Issue [#223](../issues/223)

## Dissapearing nodeos-barebones

This error occurs like the error above on the NPM version

```bash
$ find . -name adjustEnvVars.sh
./node_modules/nodeos-barebones/node_modules/nodeos-cross-toolchain/scripts/adjustEnvVars.sh

$ npm install

> NodeOS@0.0.0 install /home/tbrooks/Projects/nodeos
> scripts/build

scripts/build: line 7: /home/myprofile/Projects/node_modules/nodeos-barebones/node_modules/nodeos-cross-toolchain/scripts/adjustEnvVars.sh: No such file or directory

npm ERR! Linux 4.4.1-2-ARCH
npm ERR! argv "/usr/bin/node" "/usr/bin/npm" "install"
npm ERR! node v5.6.0
npm ERR! npm  v3.7.1
npm ERR! code ELIFECYCLE
npm ERR! NodeOS@0.0.0 install: `scripts/build`
npm ERR! Exit status 1
npm ERR! etc...
```

**Solution: Please use the newest version of NodeOS to resolve this problem**

Reference: Issue [#218](../issues/218)

## NSH crashes on empty pipe

If you're using a old NodeOS docker image and enter `|` then you can get something like this

For the old Docker images:

```bash
/root/lib/node_modules/bin-nsh/node_modules/lib-cmdparse/index.js:15
    if (env && item[0] != '-' && item.indexOf('=') > 0) {
                                      ^
TypeError: Object <Object> has no method "indexOf"
    at /root/lib/node_modules/bin-nsh/node_modules/lib-cmdparse/index.js:15:39
    at Array.forEach (native)
    at parse (/root/lib/node_modules/bin-nsh/node_modules/lib-cmdparse/index.js:13:9)
    at run (/root/lib/node_modules/bin-nsh/nsh.js:123:16)
    at readline (/root/lib/node_modules/bin-nsh/nsh.js:93:7)
    at /root/lib/node_modules/bin-nsh/nsh.js:176:5
    at Interface._onLine (readline.js:200:5)
    at Interface._line (readline.js:531:8)
    at Interface._ttyWrite (readline.js:760:14)
    at ReadStream.onkeypress (readline.js:99:10)
```

For the new versions:

```bash
/ # |
readline.js:925
            throw err;
            ^

TypeError: item.indexOf is not a function
    at Stacktrace..
```

**Solution: For now there is no solution for this problem**

Reference: Issue [#217](../issues/217)

## Error compiling NodeOS / QEMU

In older version qemu were a normal dependency, for the new versions of NodeOS, is qemu now a npm dependency

```bash
{
  [ Error: Command failed: ./configure --prefix=/home/triplebackslash/Documents/nodeos/node_modules/nodeos-barebones/usr --target-list=arm-softmmu,i386-softmmu,x86_64-softmmu,arm-linux-user,i386-linux-user,x86_64-linux-user --disable-docs --disable-vnc --enable-sdl ]
  killed: false,
  code: 1,
  signal: null,
  cmd: "./configure --prefix=/home/triplebackslash/Documents/nodeos/node_modules/nodeos-barebones/usr --target-list=arm-softmmu,i386-softmmu,x86_64-softmmu,arm-linux-user,i386-linux-user,x86_64-linux-user --disable-docs --disable-vnc --enable-sdl"
}
```

**Solution: Please use the newest version of NodeOS to resolve this problem**

Reference: Issue [#212](../issues/212)

## genext2fs: command not found

```bash
scripts/install: line 93: genext2fs: command not found
```

**Solution: You need to install genext2fs**

## Docker: module /bin/exclfs cant be found

```bash
$ npm run docker

> NodeOS@1.0.0-RC3 docker /home/luii/Dokumente/git/NodeOS
> scripts/docker

mount procfs: Resource busy
module.js:471
    throw err;
    ^

Error: Cannot find module '/bin/exclfs'
    at Function.Module._resolveFilename (module.js:469:15)
    at Function.Module._load (module.js:417:25)
    at Module.require (module.js:497:17)
    at require (internal/module.js:20:19)
    at Object.<anonymous> (/lib/node_modules/usrbinenv/server.js:97:12)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)
```

**Solution: For now there is no solution for this problem**

Reference: Issue [#326](../issues/326)

##
