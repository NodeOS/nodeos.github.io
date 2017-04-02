---
layout: post
title:  Filesystem Layout
date:   2014-02-21T03:43:54Z
author: groundwater
avatar-url: https://avatars.githubusercontent.com/u/538488?v=3&s=128
comments: 31
github-url: https://github.com/NodeOS/NodeOS/issues/19
---
I should explain the filesystem layout of node-os a little bit, because it's a slight depart form what you'll find on Ubuntu, Redhat, Arch, etc.

I think requiring root privileges in order to install a package is lame. I've ditched the concept of _global_ or _system_ packages altogether, the only global executable is `node` located at `/bin/node`. The directories `/etc`, `/lib`, and `/usr` contain a few files necessary for node to run. I would love to reduce the number of extra files laying about, but one step at a time.

Any time you run `npgk install`, the new module will be downloaded into `$HOME/lib/node_modules`, and executables will be linked into `$HOME/bin`. Every user experiences a unique system, and every user has access to `npkg`. You do not need root privileges to install packages.

For example, if there are two users on the system `bob` and `kim`, and bob runs `npkg install ncurl`, the filesystem will look roughly like:

```
/home/
  bob/
    bin/ncurl --> ../lib/node_modules/ncurl/ncurl.js
    lib/node_modules/ncurl
  kim/
    bin/
    lib/node_modules/
```
### root and init

When the kernel is ready, it will start init as PID 1. In node-os, init is located in `/root/bin/init`. Init is a module like any other executable. It is available on npm, and can be updated with `npkg install`. Modules in `/root` come pre-installed with node-os. They are the necessary modules to boot the system into a usable state.

An example set of default modules might be:
- [init](https://github.com/nodeos/nodeos-init)
- [npkg](https://github.com/nodeos/nodeos-npkg)
- [wssh](https://github.com/groundwater/node-wssh)
- [nsh](https://github.com/groundwater/node-bin-nsh)

