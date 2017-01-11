---
layout: post
title:  New organization scheme
date:   2016-08-14T18:29:47Z
author: piranna
avatar-url: https://avatars.githubusercontent.com/u/532414?v=3&s=128
comments: 6
github-url: https://github.com/NodeOS/NodeOS/issues/292
---
To make the NodeOS organization easier to manage I've removed the teams and now will continue with fine-grain access control. Now instead of having direct access to the repo, anybody that wants to contribute to NodeOS I can be able to add him to the NodeOS organization and assign him (or her) the corresponding issue to work with, so there's no duplicated efforts. Due to that, they'll need to create a pull-request that will be merged with the reference repo on the NodeOS organization, and also you can be able to create new repos without needing to ask me first (as happened with the [docs](https://github.com/NodeOS/docs) repo). I will be able to create new teams for specific repos like the website that work together and make sense to have access to all of them at once, but in general terms will not be anymore the "all or nothing" access control of before.

I will continue to use directly the NodeOS organization repos until 1.0 version, after that I'll protect the `master` branch of all of them and only it will be able to push and merge new commits the [NodeOS-bot](https://github.com/NodeOS-bot) account managed by the CI server.

