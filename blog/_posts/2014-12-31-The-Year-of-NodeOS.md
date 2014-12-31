---
layout: post
title: The Year of NodeOS
author: Jesús Leganés Combarro "piranna"
---

The last days has been really though while trying to make the cross-compiler to
work, but thanks to the collaboration of @netlovers, @formula1 and
[the guys of musl](http://www.openwall.com/lists/musl/2014/12/31/2), now we can
have
[this awesome snippet](https://github.com/NodeOS/NodeOS/pull/89#issuecomment-68467239):

```Javascript
No EXEC command found, starting REPL session
century> [    3.027483] Switched to clocksource tsc
1 + 1
2
century> Date()
'Wed Dec 31 2014 20:25:20 GMT+0000 (GMT)'
century> new Error('Happy 2015!!! :-D')
[Error: Happy 2015!!! :-D]
century> 
```

NodeOS cross-compiled from GCC-glibc i386 to GCC-musl i686, and using
[musl](http://www.musl-libc.org/) as dynamic linker and system-wide libc.

**Epic**

*What this means?* would you say. This means that NodeOS now don't need to have
anything installed on the host system to build itself, since it will download
and compile all the required tools and libreries automatically, being the only
needed thing to have installed Node.js. The build scripts are still based on
bash, but when this get fixed, there will be only a few things so NodeOS could
be self-hosted. Also, this is an important step not only to be able to compile
NodeOS for ARM platforms (like Raspberry Pi), but also to be able to compile
from 64 bits platforms to 32 bits ones.

This has not been easy, though. It has got a lot of try-and-error iterations
with different approachs, and also by-passing some bugs (one of them on GCC
itself!) and there are some pending issues to clean-up the build scripts and the
dependencies (some of the compiled modules doesn't work with Node.js v0.11.x,
that's being used to override some issues of Node.js with musl), but definitely
it has been a huge improvement that will help to make NodeOS a more production
ready platform. Who knows, maybe 2015 will be *The Year of NodeOS*... :-P

Happy New Year to everybody!!! :-D
