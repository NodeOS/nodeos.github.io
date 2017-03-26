---
layout: post
title:  A Cool Thought
date:   2016-04-12T06:21:48Z
author: lite20
avatar-url: https://avatars.githubusercontent.com/u/8516575?v=3&s=128
comments: 3
github-url: https://github.com/NodeOS/NodeOS/issues/228
---
I just wanted to bring up something cool I was thinking about today. NodeOS and Android share as many similarities as British vs American English.

Both systems are based off the Linux kernel. Android actually just uses kernel modules for all hardware interaction and uses the JNI to interact. In the same way, NodeOS uses v8's bridge to the native interface to access kernel operations.

There are also deep relationships between the two languages. Aside from the notable similar , code structure, and fact that they're both , both projects were worked on by the same developers. The same developers who created the Java Hotspot VM, worked on V8 too.

I find the similarities quite interesting. We do of course have differences. NodeOS is arguably more portable, capable of supporting more technology with less work (less layers between userspace and kernel modules). 

I could keep going but eh, it's all cool!

