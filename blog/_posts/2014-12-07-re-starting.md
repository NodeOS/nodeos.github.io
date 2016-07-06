---
layout: post
title: Re-starting
author: Jesús Leganés Combarro "piranna"
---

It was a long time since the last entry here at NodeOS development blog, but in
first place, the presentations.

Hi, I'm Jesús Leganés Combarro "[piranna](https://github.com/piranna)", I'm
finishing my Computers Enginering degree at
[Rey JuanCarlos University](http://www.urjc.es/) at Spain and working as
researcher and technical assistant for Javascript and HTML5 technologies at
[Kurento initiative](http://www.kurento.org/), and I'm the current lead
developer of NodeOS after [Jacob Groundwater](https://github.com/groundwater)
gave me that honour some weeks ago :-) My relationship with NodeOS started by
surprise and just giving some comments on the project issues tracker, but since
I always wanted to develop my own OS (and
[I tried it before](https://github.com/piranna/Gaia) :-P) and also got some
extra spare time last September when I broke my leg due to a bike accident it
became somewhat obsesive :-P

Thanks to that, I ported NodeOS to [QEmu](http://wiki.qemu.org/Main_Page) and
defined better the diferences between layers making them independent and
bootable, and also I've added support for initramfs and overlayfs to increase
performance and make it easier to use. Another improvements it got these last
months has been to deprecate ```npkg``` and use packages only from oficial
[NPM registry](https://www.npmjs.org/) using
[forever](https://github.com/nodejitsu/forever) for services administration, and
multiuser support thanks to [logon](https://github.com/piranna/logon) and some
agresive UNIX filesystem permissions.

Now, what's now in the present? At short place, me and others we are working on
[cross compile support](https://github.com/NodeOS/NodeOS/issues/86) to make
building process self-contained so it can be easier and also make it possible
to develop on 64 bit platforms (this support was lost in the transition from
Docker to QEmu), and also integrate it with NPM lifecycle by using
[package.json files](https://github.com/NodeOS/NodeOS/issues/83) as descriptors.
NodeOS is also candidate for the spanish national
[Free Software Universitary Championship](http://www.concursosoftwarelibre.org/1415/?q=proyectos/53)
and it's leading towards to have an
[alpha release](https://github.com/NodeOS/NodeOS/issues/37). Oh, and at this
moment we have [1912 stars](https://github.com/NodeOS/NodeOS/stargazers) on
Github :-D

And what's in the future? Well, after the alpha release, there're people
investigating about adding a
[graphical interface based on EGL or Webkit](https://github.com/NodeOS/NodeOS/issues/79)
, but personally I'm more interested in being able to install
[compiled modules](https://github.com/NodeOS/NodeOS/issues/85) and
[network multiplexation](https://github.com/NodeOS/NodeOS/issues/35), that are
two corner stones needed to make users isolated between them so they could think
they are the owners of the machine itself (I'm also thinking about using
[Linux containers](https://linuxcontainers.org/) for this) and increase security
so NodeOS could get a production-level status as a server OS, and then things
will start to get interesting... :-D
