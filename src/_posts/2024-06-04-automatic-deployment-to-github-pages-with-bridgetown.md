---
layout: post
title: "Automatic Deployment to Github Pages with Bridgetown"
---

One great aspect of [Bridgetown](https://www.bridgetownrb.com/) is
how easy it is to set up automated deployment to Github Pages. Here is
a quick walkthrough.

Bridgetown comes with a script to get you started:

```sh
bin/bridgetown configure gh-pages
```

That command does two things:

1. Adds `x86_64-linux` as a platform to your Gemfile.lock, which will
all the build to work properly in Github Actions.
2. Copies a new workflow to `.github/workflows/gh-pages.yml`

After running that command you should be good to commit and push the
change. Then configure the pages for the repo so that the source is
"Github Actions":

![Set Source to Github Actions](/images/github-pages-settings.png)

Now, every time you push a change to the repo, it should deploy automatically!
