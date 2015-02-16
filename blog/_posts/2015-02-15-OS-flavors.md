---
layout: post
title: OS flavors
author: Jesús Leganés Combarro "piranna"
---

This was going to be a work about my progress adding Unicode support on NodeOS,
but instead it will be just only about my work doing it because my progress has
been, well... *almost none*.

All of this began with the
[NodeJS Madrid keynote](http://node-os.com/blog/Keynote-at-NodeJS-Madrid/), when
I was thinking to do a demo using
[blessed-contrib](https://github.com/yaronn/blessed-contrib):

![](https://github.com/yaronn/blessed-contrib/raw/master/docs/images/term3.gif)

Cool, eh? ;-) More than enough to give efforts to
[improve the final user experience](https://github.com/NodeOS/NodeOS/issues/94),
and also [I've proposed some changes to improve it](https://github.com/yaronn/blessed-contrib/issues/25)
:-D

Problem was, that on the serial connection done with the virtual machine they
showed nothing at all, just a blank screen, and by executing directly on a
"native" QEmu window it showed letters instead of the graphic characters, so
[I asked on the blessed project](https://github.com/chjj/blessed/issues/98).
There its author [Christopher Jeffrey](https://github.com/chjj) helped me A LOT
(thank you!!! :-D ) explaining me that the problem was related to proper
[Alternate Caracter Sets](http://www.in-ulm.de/~mascheck/various/alternate_charset/)
support on the terminal due to
[a Linux bug open for 9 years](http://lkml.iu.edu/hypermail/linux/kernel/0602.2/0887.html)
(WTF?!?!), so they are not being used both by
[ncurses](http://en.wikipedia.org/wiki/Ncurses) and blessed in benefict of
Unicode characters... that need to be enabled on the terminal. Linux console has
UTF-8 support by default, so why it didn't worked also directly on my Ubuntu
machine console? Simply, blessed had a
[bug](https://github.com/chjj/blessed/issues/98#issuecomment-73436316)
that prevented to identify correctly the UTF-8 support on the terminal, and also
[Ubuntu had the terminfo descriptors splitted in two packages](https://github.com/chjj/blessed/issues/98#issuecomment-72367339),
just plainly craxy :-P

I got finally to have some pretty graphic lines in NodeOS native console, but
the graphic lines are drawn with some ugly big squares:

![](https://cloud.githubusercontent.com/assets/532414/6098404/bce9e26c-afdd-11e4-9f47-137d4ea0a186.png)

The nice line charts and the map are being drawn using
[braille pattern](http://en.wikipedia.org/wiki/Braille_Patterns) characters,
that are a subset of the Unicode glyphs that host all the possible braille dots
patterns, and can be used to generate some cool
["high resolution" graphics on a terminal](https://github.com/asciimoo/drawille).
Obviously, this glyphs are not very usual, and the
[default codeset](http://en.wikipedia.org/wiki/Code_page_437) used on Linux
terminal don't support them, so it's required to create your own font and
codepate. [I've done it](https://github.com/NodeOS/NodeOS/tree/master/node_modules/nodeos-rootfs/node_modules/nodeos-console-font)
using as basis [Unifont](http://unifoundry.com/unifont.html) giving a lot of
attention to graphic glyphs and using a lot of equivalent glyphs to show a wider
range, only that by using custom glyphs for the braille patterns because Unifont
ones has an empty circle for not enable dots, making it ususable for graphic
purposses. The result in my Ubuntu machine is really cool...

![](https://cloud.githubusercontent.com/assets/532414/6158705/668179ea-b24d-11e4-9a08-54ecf8e5118f.jpg)

(This is not the actual image but a previous one, I've changed the dots to be
bigger, and the result is really awesome :-) )

We have Unicode support on NodeOS and a cool Unicode font with graphic glyphs,
any more? The font need to be loaded to be used instead of the default one. Here
we have two options: loaded as a user font in runtime or as a default one
compiled in kernel. First I tried to load it as a user font using ```setfont```,
but the fact is that it gave a lot of problems to compile, specially since
NodeOS is based on [musl](http://www.musl-libc.org/) needing to patch it... just
to find that it refuse to load the font giving an "invalid file size" error that
there's no doc about. Great. Plan B (and by the way a better option): compile in
kernel. There's some info about how to change the
[default keymap](http://www.linuxfromscratch.org/lfs/view/6.1/chapter07/console.html),
but there's nothing at all about how to set a custom compiled in default font.
The only aproachs I've found are about plainly overwrite the current files in a
hackerish way (and the build is not free of
[more hackerism](https://github.com/foresight/legacy/blob/fl.2-devel-kernel/kernel/terminus_font_8x16.c)...),
but a question arises... all the
[default fonts](https://github.com/torvalds/linux/tree/master/lib/fonts) only
has the 256 glyphs of the codepage 437... Will they support a 512 glyphs font?
And the answer is NO, it has some explicit checks to don't support anything
other that 256 fonts as default ones. Since there's no hardware limit and seems
more a problem of [technical debt](http://en.wikipedia.org/wiki/Technical_debt)
I've ended filling a bug in the
[Linux kernel bugtracker](https://bugzilla.kernel.org/show_bug.cgi?id=93241).
What a shame... :-(

So, after two weeks of hard work and sleep too few, I get to the conclusion that
at this moment it's not possible, and all this useless work has lead me to think,
does worth it? Do we really want a system that can scale from embeded devices up
to cloud servers as regular Linux distro like Ubuntu? And this lead me to define
the concept of [OS flavors](https://github.com/NodeOS/NodeOS/issues/106), so
we'll have two flavors of NodeOS, **workstation** mostly focused to highly
capable client devices that could be used as a day-by-day computer, and
**mainframe** with a minimal kernel that only allow to use it remotelly, so it
best fit for embebed devices with no user IO and cloud servers in virtual
machines. This way the images will be lighter and performance will be greater
since it will not be needed to support hardware that otherwise would be unused,
and also give some marging to decide what path should NodeOS follow and at the
same time allow to anybody to decide how the want the system to be without
bloating it.

P.D.: I will be busy with my degree project during the next weeks, so probably I
will (or should :-P) not be able to give as much attention to NodeOS as I have
been doing the last months, but I will try to keep moving it forward at least
with minor tasks like upgrade the documentation (that definitely it needs some
love...)

P.D. 2: 2101 stargazers and counting, one hundred more in just one month... ;-)
