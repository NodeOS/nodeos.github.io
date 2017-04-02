---
layout: post
title:  Not a toy OS anymore
date:   2016-03-03T00:11:31Z
author: piranna
avatar-url: https://avatars.githubusercontent.com/u/532414?v=3&s=128
comments: 14
github-url: https://github.com/NodeOS/NodeOS/issues/216
---
With the [release of the release candidate](https://github.com/NodeOS/NodeOS/issues/181) it would seems that this repository has been somewhat quiet, but the fact is that there has been a lot of progress lately on other areas of NodeOS (and I'm not talking only about the new 700 stargazers or the repercussion on Twitter of the project and the publication of several [articles on Internet](https://www.toptal.com/nodejs/nodeos-the-javascript-based-operating-system)... ;-) ) like my bachelor thesis or the rewrite of [nsh](https://github.com/piranna/nsh) (still in progress, but when I get to rid the stdin problems it will be really awesome :-D ) and specially thanks to the work of @lite20, @Coretool and @formula1 here on the issues but also on projects like [noGUI](https://github.com/Coretool/noGUI) (keep rocking guys!!! ;-) ).

But last February 29th (what a charismatic date ;-) ) something "magic" happened, that by the way while I'm writting this [there are some spies](https://github.com/NodeOS/NodeOS/commit/050bb316986953726f661eb771fa3bb822890693#commitcomment-16460007) asking me for details ;-)

The suggestion of @Xe about [using an independent C-based init process](https://github.com/NodeOS/NodeOS/issues/187#issuecomment-164025249) didn't worked as expected but at least it helped to have an [init process](https://github.com/piranna/nodeos-init) that shutdown gracefully the system when no more processes are running.

But I was thinking: Node.js can run on regular Linux systems, so _something_ happens between starting the system `init` and executing Node.js that allow latest ones to run correctly that was not needed before. Maybe the kernel filesystems like `/proc` or more probably `/sys` (that I was not using before)? So trying to isolate it I made a copy of my Ubuntu `initrd.img` file and [included it](https://scaryreasoner.wordpress.com/2009/08/29/debugging-the-linux-boot-process/) Node.js and its needed libraries. Later booted my computer using it and disabling my hard disk to force to keep into the initram and there I was able to run Node.js. Cool! Time to clean the `init` script. Mount root partition, NFS, parsing Linux command line... at the end I get only three suspects: the mounting of `/sys`, `/proc` and `/dev` filesystems, _of course_.

But I was afraid. What if I was wrong? What if by removing them Node.js _still runs_ on the Ubuntu initram? Could be the problem be somewhere else? And ironically, that would have been the time I most enjoyed something doesn't work :-P After checking it found the culprit: `/dev`, the system devices filesystem. WTF? What could have changed on v8 that makes uses of the system devices that's missing and makes it consume the full CPU? Anyway I didn't wanted to fix the Ubuntu initram but instead to make NodeOS to boot with newer versions by mounting `/dev` before executing Node.js, so now that I have an independent `init` process that would be a good candidate to do it. [Just a couple of lines](https://github.com/piranna/nodeos-init/commit/e60693419caf5f8740d2b1b6767e8dccd85bbf59), and check that everything was working. Ok, let's go for the real deal. Use Node.js 0.12.10 (one of the closests to the 0.11.14 one used by NodeOS) as I was using on my tests with the Ubuntu initram? No, let's go crazy, run before walk, fail with a lot of noise and use the latest 4.3.1 stable. And after 30 minutes compiling... _magic_:

![img-20160229-wa0003](https://cloud.githubusercontent.com/assets/532414/13479054/a51aa6c0-e0d4-11e5-930b-aaa9e8d51470.jpg)
NodeOS barebones layer. Using Node.js 4.3.1. **For real**

I don't have words to explain that moment beyond the fact my cat run scaried and my parents though I got insane :-P One year and a half looking back for a bug... that would turn mad to anybody :-P

After the exctatic moment and some well gained nice tea drinking (not pun intended, I still don't sell hats :-P ), I needed to update all the NodeOS dependencies that use a compiled module due to the fact I was using outdated ones that were compatible with Node.js 0.11.14. Really a lot (8 of them just only on the [NodeOS organization](https://github.com/NodeOS)...). It was greatly useful the previous work done by @heavyk (since I've never used [nan](https://github.com/nodejs/nan) before), and after two days now we have NodeOS fully working with Node.js 4.3.1 and ready for the upcoming ones :-)

There are not prebuild images yet because the build process has got to be really huge and fat and the CI server is not capable to manage so much downloads and compiling steps. I'm thinking about moving to another more capable alternative, but there are also son discussions and [pull-requests](https://github.com/NodeOS/NodeOS/pull/214) to remove some functionality from the build process and move it to [another independent projects](https://github.com/NodeOS/nodeos-cross-toolchain) that could more easily be tested and generated and also get it faster to generate NodeOS itself by using prebuild binaries.

Anyway, the code is already available in master branch, and whatever direction the project carry on from now, keep this sentence in your mind: **NodeOS is not a toy OS anymore**, and it's very capable to be used on production environments for real use cases from now on. F*ck yeah B-)

