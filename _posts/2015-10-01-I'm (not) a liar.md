---
layout: post
title:  I'm (not) a liar
date:   2015-10-01T22:08:40Z
author: piranna
avatar-url: https://avatars.githubusercontent.com/u/532414?v=3&s=128
comments: 6
github-url: https://github.com/NodeOS/NodeOS/issues/173
---
One of the biggest features of NodeOS is the fact that there's no root user and that all users get isolated ones from others without any possibility to access to the others files by several mechanism (mainly chroot and strict file permissions), but as a big feature it was also a big lie, because in fact all the users were running as root inside their own home folders. Well... not anymore :-)

In the last weeks [I've been implementing](https://github.com/NodeOS/ExclFS) a FUSE filesystem that could allow access to the devices on `/dev` one user at a time, allowing to everybody to access to all the hardware devices without the risk of damaging or steal data. That was the last thing needed to have really isolated users, so after some tune-ups on the mount of the filesystems, now all the users get their permissions correctly downgraded while maintaining the possibility to control the hardware:

![pantallazo-qemu-5](https://cloud.githubusercontent.com/assets/532414/10235008/d8f40e00-6898-11e5-84d2-cc86e9cd3ab2.png)

So after that, the core functionality of the [alpha stage](https://github.com/NodeOS/NodeOS/issues/37) is ready, remaining only to improve the support of applications inside NodeOS (specially npm and nsh) and generate images for Vagga/Docker, and maybe add support on [logon](https://github.com/piranna/logon) to create new users, so any help is welcome. Also I'm finishing my thesis, that I intent to release as CreativeCommans and that will be a good documentation of how NodeOS works internally.

