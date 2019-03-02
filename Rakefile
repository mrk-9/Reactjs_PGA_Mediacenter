def logger(task)
  puts "Running rake task: #{task}"
end

task :sandbox_deploy do
  logger(:sandbox_deploy)
  exec "git push origin +HEAD:sandbox"
end

# Run development server
task :dev do
  logger(:dev)
  exec "bundle exec jekyll serve --incremental --livereload"
end

# Clean build folder
task :clean do
  logger(:clean)
  exec "rm -rf _site"
end


# Gulp responsive images
task :resize do
  logger(:resize)
  exec "npx gulp resize"
end

# Run dev task as default
task :default => [:dev]
