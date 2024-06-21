---
layout: post
title: "Task Management in Logseq: Part 4"
tags: ["task-management","logseq"]
---

If you have read
<%= link_to "the rest of the series so far", "_posts/2024-06-15-task-management-in-logseq-part-3.md" %>
, you may have noticed that I
am intent on only seeing information that is necessary. I want to avoid as
much noise as possible to keep from getting distracted or overwhelmed. That's
why I love the concept of easily marking tasks for later, showing a list of
just what I need to do next, and keeping the other lists collapsed by default.
Another strategy for this minimalist approach is scheduling tasks. By scheduling
a task in Logseq, you can give it a date in the future that you can filter on. In
my "Now" list, I hide any tasks that are scheduled for a day in the future, but show
all tasks that are scheduled for a today or earlier and I do the same for my "Later"
lists as well.

## Scheduling Tasks in Logseq

First things first, how do you schedule tasks in Logseq? At the end of the task,
type `/scheduled`. You'll notice that as you start to type it shows a dropdown
of options. Hitting enter on "Scheduled" opens a date picker. Notice that you
can pick a date, add a time, or even add repeating (we'll address that in the
next post). If you add a scheduled task in your Logseq, you may notice that you
see a "SCHEDULED AND DEADLINE" list at the bottom of today's journal. IMO,
that is unnecessary and I prefer to remove it. If you agree, you can remove
it by editing the config like we have done previously. You'll see a line
commented out that looks like:

```
;; :feature/disable-scheduled-and-deadline-query? false
```

Uncomment it by removing the leading `;;` and change it from `false` to `true`.


## Adding Scheduled Tasks to our NOW Query

What we want is to have all "NOW" tasks showing in the list unless they are
scheduled for the future. This can be achieved with a slight change to our
query.

```clojure
{
  :title  "NOW"
  :query  [
            :find (pull ?b [*])
            :in $ ?today
            :where
              [?b :block/marker ?m]
              [(contains? #{"NOW", "DOING"} ?m)]
              [(get-else $ ?b :block/scheduled ?today) ?scheduled]
              [(<= ?scheduled ?today)]
          ]
  :inputs [:today]
  :result-transform
    (fn [result] (result))
  :breadcrumb-show? false
}
```

First we need a way to get the current date. We do that by adding adding

```clojure
:inputs [:today]
```

However, we need to actually receive that and assign it to a variable we can
use in our query. We acheive that with the `:in` clause in our query:

```clojure
:in $ ?today
```

The first parameter to the `:in` clause is always `$`, which is a reference to the
database. All queries have a `:in $` inferred by default, but when you are providing
your own `:in` clause you need to remember the `$`.

Next we want to specify that we only want tasks scheduled after today. You can do
that with these two lines:

```clojure
[?b :block/scheduled ?scheduled]
[(<= ?scheduled ?today)]
```

This means assign the scheduled date of the block to the variable `?scheduled`
and filter to only blocks that were scheduled for before today. However, this
causes us to only see tasks that are scheduled because if the task isn't scheduled,
then it doesn't meet the filter. We fix this using a `get-else` function:

```clojure
[(get-else $ ?b :block/scheduled ?today) ?scheduled]
```

This also assigns the `?scheduled` variable, but this time using `get-else`
we are able to provide a default value, for which we provide `?today`. So if the
task is not scheduled it will appear to the query that it is scheduled for today.
This brings all our unscheduled tasks back into the list.

## Adding Scheduled Tasks to our LATER Queries

You can add the same four lines to the queries we created last time.

```clojure
{
  :title  "WORK"
  :query  [
            :find (pull ?b [*])
            :in $ ?today
            :where
              [?b :block/marker ?m]
              [(contains? #{"LATER", "TODO"} ?m)]
              [(get-else $ ?b :block/scheduled ?today) ?scheduled]
              [(<= ?scheduled ?today)]
              (page-ref ?b "work")
          ]
  :inputs [:today]
  :result-transform (fn [result] ( result))
  :breadcrumb-show? false
  :collapsed?       true
}
```

## Next Steps

Our final step is the next post where I show off repeating tasks to automatically
manage tasks that I need to do regularly.
