---
layout: post
title:  "Why Choose Ember.js?"
date:   2015-05-01
categories: ember
---
#Why Choose Ember?

There is a lot to consider when choosing your tools. There are plenty of factors to consider, not the least of which is whether a specific tool will be able to withstand the technical demands of your project as it grows. One problem is that many teams spend a significant period of time before each new project researching and analyzing the tools available to try to ensure that they run into as few technical roadblocks as possible down the road. 

Though there is some merit to this critical investigation, I lean toward the opinion that you should always choose the tools that you enjoy using the most and that are going to give you, as a developer, the most opportunity. This article is my argument for Ember as the most joy-inducing client-side framework available. I will not be comparing directly to other frameworks or libraries. My assumption is that you can compare the points that you see importance in with the libraries that you are already interested it. You can generally get a sense of these things after a bit of time trying to learn the framework and being involved in the community.

### 1. Conventional

Ember.js favours convention over configuration and strives to provide a comprehensive suite of tools so that you can get up and running quickly. In contrast, when picking a handful of individual libraries you need to learn each one and wire them up yourself. These tools not only take time to learn, but teams often get hung up on which tools to pick and/or how to utilize the tools most effectively. 

Ember.js sidesteps these issues by giving you a suite of tools that are configured to work together and maintained in parallel. You can get up and running quickly and when improvements land and the libraries are updated together. There is no potential for changes in one library to disrupt the framework.

### 2. Transferable

Since Ember.js does a pretty good job at being a comprehensive solution, for many applications you can stick with most of the officially supported toolset. This makes hiring new team members a much smoother process. Rather than needing to learn all the individual tools you have chosen, if a new developer is familiar with Ember, they instantly know how your app is wired up. They will be able to read the code and quickly begin to make valuable contributions to the team. On the other hand, if you are using a hand-picked set of tools with custom wiring there can be a lot for a developer to learn even if they have experience in the core library that you are utilizing.

### 3. Extensible

One differentiating piece of the Ember.js toolset is [Ember CLI](http://www.ember-cli.com/). If you are familiar with Ruby on Rails you will feel right at home with this tool. It sits on top of Node and npm giving you generators that build boilerplate for you, scripts that start your server and run tests, and gives you a simple API for managing the ecosystem of add-ons available to you, much like Ruby gems. 

There are many developers creating fantastic tools to bring even more functionality to Ember.js. For example, ```ember-cli-deploy``` is a deployment tool that gives you the ability to do fast and flexible deployments of your client to a number of platforms. You can see [a discussion of the progress of this tool](http://confreaks.tv/videos/emberconf2015-the-art-of-ember-deployment) from EmberConf 2015.

In addition, in order to bring some sense to the vast array of Ember CLI add-ons already available, [Ember Observer](http://emberobserver.com/) was created to give a score, based on several factors, to each add-on so that you can make an informed decision between add-ons that perform similar tasks. 

### 4. Predictable

Ember adheres to semantic versioning and they do a fantastic job of making upgrading trivial. The do this in a few ways. First of all, the release schedule is consistent. A beta release for the next minor point release is cut every week and every 6 weeks a new stable release is cut. Each point release consists of new features, deprecations, and bug fixes, as you would expect. However, the most interesting part about the release system is that when a major version is released there is effectively no new code. Rather, all the deprecation warnings along with their associated features are stripped out of the framework. That's it. So, if you have been upgrading regularly and converting your code based on the deprecations you can upgrade to the new major release for free.

[More on the Ember Release Cycle](http://emberjs.com/blog/2013/09/06/new-ember-release-process.html)

### 5. Flexible

Many developers see Ember.js as a monolithic framework that is rigid and brittle, but it is more accurate to think of it as a curated set of tools that are preconfigured to work together. Also, these tools a loosely coupled using the adapter pattern, so you can choose a new tool for a specific job and swap it in using an adapter if your application requires it. Ember CLI add-ons provide a way to automate the switching out of certain components, but you can just as easily swap things out manually as well.

Godfrey Chan (@chancancode) gave [an excellent talk](http://confreaks.tv/videos/emberconf2015-hijacking-hackers-news-with-ember-js) at EmberConf 2015 demonstrating this technique. Give it a look if you want to see how remarkably flexible Ember.js is.

### 6. Stable

One aspect of Ember that has been a common complaint is that with so many pieces of the framework still yet to reach version 1.0 there is a lot of api change that can cause issues. During the EmberConf 2015 keynote, Yehuda Katz and Tom Dale announced that Ember 2.0, Ember Inspector 1.0, Ember Data 1.0, Ember CLI 1.0, Liquid Fire 1.0 and List View 1.0 will all be in beta June 12, presumably meaning that stable will be at the end of July. They are committed to all of these officially supported tools to be maintained responsibly and with stability as a core focus.

### 7. Performant

Performance has been another area that historically has been just good enough, but the Ember core team is focused on addressing the performance concerns of the broader community. Even though it is not a majority concern of the community, they have created the ability to run Ember apps on the server and serve compiled html giving you improved performance on first load, improved SEO, and the capability to use Ember apps in browsers without Javascript enabled. 

Another performance improvement is the new rendering engine, Glimmer. It uses a virtual DOM diff-ing approach to rendering and requires no additional work to implement in your app. Just upgrade. You can get a sense of how close Glimmer is to being complete and demo [here](https://is-ember-fast-yet.firebaseapp.com/)

### Conclusion

Ember certainly is not without its faults, but no library is. Still, the Ember team does an incredible job at helping Ember developers be productive and enjoy using the framework. If anything is important when choosing a framework, productivity and happiness is at the top of my list and I believe Ember is proving itself to be a framework with staying power.
