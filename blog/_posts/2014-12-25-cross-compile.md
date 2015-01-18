---
layout: post
title: Cross-compile
author: Jesús Leganés Combarro "piranna"
---

Finally I've managed to create a cross-toolchain and use it to compile a
runnable NodeOS instance (i386-glibc -> i686-musl, I need to test x86_64 ->
i386), but get to this point was not easy.

First of all, I tried by simply adapting the current build scripts, but it
failed because GCC is not a host compiler but instead a target one, so I needed
to go down the cross-toolchain all the way. After several tries to do it myself,
I ended using [Linux From Scratch](http://www.linuxfromscratch.org/) with the
help of [Linux From Script](http://www.lfscript.org/). Problem is that's too
much focused on create a regular Linux on the same host machine, and the worst
thing, it require to exec some commands as root.
[Cross Linux From Scratch] (http://clfs.org/) is a better alternative, but it
involve a lot of steps to create the cross-toolchain, and worse than that, it
still requires to exec commands as root. On the other hand,
[its embebed version](http://clfs.org/view/clfs-embedded/) is simpler to build
thanks to the usage of [musl](http://www.musl-libc.org/) as C lib instead of
standard [glibc](http://www.gnu.org/software/libc/), so although it makes NodeOS
not so standard related to desktop and server OSes, it makes it also simpler and
more memory friendly.

I wanted to use a glibc based system, but this is the only one I've managed to
make it to work. This has some drawbacks that needs improvement (or not :-) ):

* it's a musl based system, so compiled modules that use non-standard extensions
  of GNU glibc will not compile. It's a fail of the developers, so this could
  help to improve their code to be C standard compliant (win-win for all :-) ).
* OpenSSL doesn't work well with musl (due to the use of that non-standard
  extensions...) and needs to be patched since
  [nobody](https://rt.openssl.org/Ticket/Display.html?id=2823&user=guest&pass=guest)
  [fix](https://rt.openssl.org/Ticket/Display.html?id=3526&user=guest&pass=guest)
  [it](https://rt.openssl.org/Ticket/Display.html?id=3123) :-( Luckily
  [it's an easy one](https://raw.githubusercontent.com/maximeh/buildroot/master/package/openssl/openssl-004-musl-termios.patch)...
* GCC is not aware of musl so
  [it needs to be patched](http://patches.clfs.org/embedded-dev/gcc-4.7.3-musl-1.patch)
  , too. This leads us to use a fixed GCC version, but since it's somewhat new
  (April 2014) and probably we'll move to [llvm](http://llvm.org/) when
  [Linux could be compiled with it](http://llvm.linuxfoundation.org/) so we can
  use one of the llvm
  [Javascript](http://badassjs.com/post/39573969361/llvm-js-llvm-itself-compiled-to-javascript-via)
  [flavours](http://leaningtech.com/cheerp/) on the userspace, then it's a fair
  trade by this moment.
* I was not be able to use a dynamically linked Node.js executable, so I'm using
  a [fully-statically linked](https://github.com/joyent/node/pull/8274) one.
  This should be fixed in the future for loading of compiled modules and
  specially to exec binaries, but if we don't allow binaries at all and since
  now ```require()``` of modules works because musl now include the required
  ```dl_``` functions (at least native ones does while it was not working
  before, I need to test external ones), this could help to enforce a
  pure-Javascript environment :-) On the other hand, this also has the advantage
  that the memory foot-print is smaller since now the only required files on the
  initramfs are the console device and the Node.js executable (impossible to
  make it simpler!!! :-D )

It's still unstable and needs some more work and testing (please test it! :-D ),
but when it's finished, NodeOS build system will be self-contained and will be
easier to port it to other platforms just by updating the cross-compiler :-)
Also I've been developing it as a NPM package, so when it's ready in the future
we could be able to move it to be an independent project (I would love to see
NodeOS self-hosted... :-D ).
