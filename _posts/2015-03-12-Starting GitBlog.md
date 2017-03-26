---
layout: post
title:  Starting GitBlog
date:   2015-03-12T22:42:23Z
author: piranna
avatar-url: https://avatars.githubusercontent.com/u/532414?v=3&s=128
comments: 3
github-url: https://github.com/NodeOS/NodeOS/issues/115
---
In the last days there has been few work here at NodeOS, but that's because [we has been worked on a side open source project](https://github.com/NodeOS/NodeOS/issues/105): thanks to the awesome work of @formula1, now GitBlog is a reality :-D [GitBlog](https://github.com/NodeOS/GitBlog) is a blogging system that use GitHub issues as engine, so it integrate directly with our current work flow based on them :-) We'll store the content of the [legacy blog](http://node-os.com/blog/) for historical purposses and reference. In the next days maybe there would be some updates, but at this moment is production ready, and in fact this will be the first post there :-D

But GitBlog hasn't been the only thing we have been working on... the most important one has been a re-design of the overlay layers inspired by [this IBM article](http://www.ibm.com/developerworks/linux/library/l-mount-namespaces/index.html) that have bring us trhee important things:
- root home folder moved to the users filesystem
- users has their own local filesystem hierarchy...
- ...and root filesystem now it's read-only :-D

This has the great advantage that will be easier to generate ISO disk images and to port to other platforms, since the root filesystem is minimal. So minimal, that now it only host the `resolv.conf` and terminfo files, so in a future iteration we'll remove them at all. No root filesystem, only the initramfs to boot the system and everything stored in the users home! :-D A too drastical design? Yes, but we are not willing to create a POSIX system here, but instead only the required parts to create an environment were Node.js apps could feel like at home :-) This give us more flexibility to optimize CPU & memory resources (specially disk space) and increase security by having less components in the system. It needs still some work to clean-up the final users filesystem and about automatically assign a filesystem namespace to new process (at this moment they are all mount on boot...), but seems promising :-)

In other things, some people think that a graphical interface is important for an OS. I don't think so, and in fact it complicate the overall system so we decided to [split NodeOS and have several flavours](https://github.com/NodeOS/NodeOS/issues/106), but it's true that would be cool to be able to use NodeOS to play some games... :-P and that's why [there has been some progress towards FbDev support](https://github.com/NodeOS/NodeOS/issues/39#issuecomment-76904769). We have it by default thanks to Linux kernel default configuration, so why not use it? We were thinking about writting a wrapper library and use it as basis to implement the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) on top of it, but the fact is that [node-canvas](https://github.com/Automattic/node-canvas) (the most popular Canvas API library for Node.js) has surpassed us and now [it start to support FbDev natively](https://github.com/Automattic/node-canvas/issues/533) thanks to our comments :-D It's cool when your work can help to move forward other projects... :-)

And last but no least... now we have a [Facebook page](https://www.facebook.com/NodeOperatingSystem) :-P It's not active yet but we'll try to fill it soon :-)

