---
layout: post
title: "Adding a Post Generator to Bridgetown"
---

I'm using [Bridgetown](https://www.bridgetownrb.com/) to write my blog. I chose it because it seemed like a spiritual successor to [Jekyll](https://jekyllrb.com/), but has a more modern stack with the ability to do more than static site generation.

However, in my effort to blog more often I need it to be as easy as possible to write a new post and one of the things that I was astounded that Bridgetown didn't have is an easy way to generate a file for a new post so I can get crackin'. So I wrote a quick Rake task to fill in the gap.

```rb
namespace :generate do
  desc "Generate a new post"
  task :post, [:name] do |t, args|
    require 'date'

    name = ENV['NAME']

    # Ensure a name is provided
    if name.nil? || name.strip.empty?
      puts "Usage: rake generate:post NAME=\"My Post Title\""
      exit 1
    end

    # Get the current date in YYYY-MM-DD format
    date_str = Date.today.strftime('%Y-%m-%d')

    kebab_case_name = name.strip.downcase.gsub(/[^a-z0-9]+/, '-').gsub(/^-|-$/, '')

    # Combine the date and the provided name to form the filename
    filename = "src/_posts/#{date_str}-#{kebab_case_name}.md"

    # Create the file
    File.open(filename, 'w') do |file|
      # Write Frontmatter to the file
      file.puts "---"
      file.puts "layout: post"
      file.puts "title: \"#{name}\""
      file.puts "---"
    end

    puts "Created file: #{filename}"
  end
end
```

I dropped this code into the Rakefile. As you can see, it creates a new namespaced task that we can run like so:

```rb
rake generate:post NAME="The name of my post"
```

It kebab cases the name and gets the current date for create the file for me and it adds the frontmatter to the top of the file as well.

Not complicated, but a welcome addition to make writing that little bit simpler.
