# media_center_pga_org

Jekyll project for media-center.pga.org

### Setup on a Mac
```
gem install bundler
bundle install
```

### Development

```
bundle exec rake dev
```

### Rake Tasks

* Available Tasks
  - Run development server: `bundle exec rake dev`
  - Clean build directory: `bundle exec rake clean`
  - Resize images in the uploads directory to fix width dimension: `bundle exec rake resize`
