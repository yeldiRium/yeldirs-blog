---
layout: post
title: Mandatory meta-post
description: A meta-post about the making of of this blog.
date: 2020-01-31 09:00:00
tags:
  - hexo
  - meta
category:
  - development
---

Like every selfmade casual developer blog, this one needs to start with a meta-post about the making-of of this blog. I feel that this has become somewhat of a ritual with developers who build a blog out of technical interest and refuse to use an off-the-shelf solution like wordpress and instead want to build the blog themselves.

Of course I did not build this blog all by myself - I'd probably have to start with C and generate some html or something along those lines to pride myself on having done everything myself. But I skipped some more steps and am not only using easier to work with languages but also the blog-framework [hexo](https://hexo.io/).

Hexo's main competency is that it is a blog-engine and static-site-generator. It provides a simple [cli](https://hexo.io/docs/commands) to set up an entire hexo instance as well as manage blog posts and pages. From zero to a deployable blog can go very fast with hexo - if you like one of the freely available [themes](https://hexo.io/themes/). But since I have some background in frontend development and I'm never really happy with using out-of-the-box solutions, i decided to build a theme for myself.

However, I started with an existing theme as a base and took a lot of inspiration from it: [pure](https://github.com/cofess/hexo-theme-pure) by [cofess](https://blog.cofess.com/). Big thanks to cofess for making that theme and making it publicly available. Since many parts of the theme are in chinese (although quite a bit of translation exists) and I also very much dislike bootstrap, I wanted to rewrite most of it and draw inspiration from it. The one part I just took 1:1 is a part cofess also took from someone else: The search. But I'll get to that later.

Hexo can do a lot more than just generate the html for a blog. It has a whole [plugin system](https://hexo.io/plugins/) and quite a few plugins to boast. Developers can also modify the page layouts to their heart's content and do so using several templating languages - most of them provided by external plugins. My layouts are all in [ejs](https://github.com/hexojs/hexo-renderer-ejs). There are also plugins that generate a [blog archive](https://github.com/hexojs/hexo-generator-archive), an [rss or atom feed](https://github.com/hexojs/hexo-generator-feed) or improve upon the built-in [syntax highlighting](https://github.com/ele828/hexo-prism-plugin) for code block in blog posts. All in all, hexo is a very extensible static site generator and can do a lot if you're willing to look through the existing plugins and themes or write a few yourself.

The search I mentioned before builds a hexo plugin that generates a json file from the site's content: [hexo-generator-json-content](https://github.com/alexbruno/hexo-generator-json-content). The search engine [insight.js](https://github.com/ppoffice/hexo-theme-icarus/blob/master/source/js/insight.js) from [ppoffice](https://github.com/ppoffice)' hexo theme [icarus](https://github.com/ppoffice/hexo-theme-icarus) uses this generated json content to provide a very simple in-browser search across all of the blog's content.

I see some room for improvement regarding hexo's documentation, but taking a look at the available source code can easily close gaps where details are missing.

More details on how to create a hexo theme will probably follow in a later post. As with all casual developer blogs - we'll see.
