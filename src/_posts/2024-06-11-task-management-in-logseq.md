---
layout: post
title: "Task Management in Logseq: Part 1"
tags: ["task-management","logseq"]
---

I use [Logseq](https://logseq.com/) as a personal knowledge base.
I use it to note all manner of things. Anything that I could want to
recall in the future. Almost all notes go into a daily journal and I use
page links heavily for any subjects. All of that is typical for Logseq,
but what is less common is using Logseq for task management; tracking things
that need to get done and having a focused list of what are your
priorities are for the day. Here's how I accomplish that.

As I mentioned, almost everything I add to Logseq is via today's journal.
When I do 1-on-1s with my direct reports or come out of an important
meeting, I try to dump everything that I remember from that interaction into
Logseq. Then I try to think of any actions that I need to take as a
result. Perhaps there were things that were asked of me in the meeting.
I add it as a task in Logseq.

## Task in Logseq

Logseq has an interesting way of managing tasks. There is a great introduction
to how tasks work and the variations availabe
[in the documentation](https://docs.logseq.com/#/page/tasks).
I'll just outline how I use it here. In the settings, I have
the following: `:preferred-workflow :now`. That means that when I hit
`CMD+Enter` it will turn the current block I'm on to a
`LATER` task. Hit it again and it changes to `NOW`. Again,
`DONE`. One more time, back to not a task. There are some other markers you
can use like `CANCELLED`, `WAIT`, and `IN-PROGRESS`, but I don't
make use of those.

So any time I have a new task that comes up, I open up
Logseq (using a [Raycast](https://www.raycast.com/) configured hotkey, of
course) and drop a task into today's journal. But stopping here leaves us
with a problem. How do I see all my tasks? You can go to the dedicated pages
like `LATER` and `NOW` to see those tasks in the "Linked References"
section. Great right? No, not really.

What we want is to have these tasks on today's journal page and make sure
that tasks will never get lost in the depths of our knowledge graph. We
do this with [queries](https://docs.logseq.com/#/page/queries). In the
<%= link_to "following posts", "_posts/2024-06-12-task-management-in-logseq-part-2.md" %>
I will outline how I have set up Logseq to be the perfect
task management app for me using queries to show all the tasks in my graph
on today's journal page.
