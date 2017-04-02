---
layout: post
title:  Let's build a beta
date:   2015-04-29T09:29:02Z
author: piranna
avatar-url: https://avatars.githubusercontent.com/u/532414?v=3&s=128
comments: 12
github-url: https://github.com/NodeOS/NodeOS/issues/146
---
Now that almost all the tasks for the [alpha](https://github.com/NodeOS/NodeOS/issues/37) are complete, I think it's time to start thinking and discussing where to work now:
- [x] **showstopper** Update version of Node.js (fix v8 issue)
- [ ] UIs
  - [ ] blessed correctly working by default
    - [ ] NodeOS font
  - [ ] HTML renderer (Chromium Embedded Framework)
- [ ] OS flavours
  - [ ] mainframe
  - [ ] workstation
- [ ] alternative kernels
  - [ ] FreeBSD
  - [ ] NetBSD
  - [ ] runtime.js
- [ ] alternative platforms
  - [ ] ARM (raspberry pi)
  - [ ] MIPS
  - [ ] PowerPC
- [x] splitted modules for each layer
- [ ] [tests for all packages](https://github.com/NodeOS/NodeOS/issues/75)
- [ ] [containers for each user](http://docs.docker.com/articles/security/)
- [x] network reverse proxy (only http/ws?)
- [ ] dhcp client written in Node.js (including ability to set ip/rotue/netmask)
- [ ] ~~npkg update~~ Intended to use [ndm](https://github.com/npm/ndm)
- [ ] EFI support

Any other idea? :-)

