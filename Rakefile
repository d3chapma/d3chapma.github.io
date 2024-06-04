require "bridgetown"

Bridgetown.load_tasks

# Run rake without specifying any command to execute a deploy build by default.
task default: :deploy

#
# Standard set of tasks, which you can customize if you wish:
#
desc "Build the Bridgetown site for deployment"
task :deploy => [:clean, "frontend:build"] do
  Bridgetown::Commands::Build.start
end

desc "Build the site in a test environment"
task :test do
  ENV["BRIDGETOWN_ENV"] = "test"
  Bridgetown::Commands::Build.start
end

desc "Runs the clean command"
task :clean do
  Bridgetown::Commands::Clean.start
end

namespace :frontend do
  desc "Build the frontend with esbuild for deployment"
  task :build do
    sh "yarn run esbuild"
  end

  desc "Watch the frontend with esbuild during development"
  task :dev do
    sh "yarn run esbuild-dev"
  rescue Interrupt
  end
end

namespace :generate do
  desc "Generate a new post"
  task :post, [:name] do |t, args|
    require 'date'

    name = ENV['NAME']

    # Ensure a name is provided
    if name.nil? || name.strip.empty?
      puts "Usage: rake generate:post name=\"My Post Title\""
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
