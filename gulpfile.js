var	gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var path = require('path')
var fs = require('fs')

var IMAGE_DIR = 'uploads'
var IMAGES_DIRECTORY = [`${IMAGE_DIR}/**/*.jpg`, `${IMAGE_DIR}/**/*.jpeg`, `${IMAGE_DIR}/**/*.png`]
var BUILT_IMAGES_DIRECTORY = ['_site/**/*.jpg', '_site/**/*.jpeg', '_site/**/*.png']
// var IMAGE_RESIZE_WIDTHS = [320, 768, 922, 1024]
var IMAGE_RESIZE_WIDTHS = [1200]

/**
 * Resize all JPG images to the provided resolution sizes
 * @param {Array<String>} IMAGES_DIRECTORY
 * @param {Array<Number>} IMAGE_RESIZE_WIDTHS
 * Example:
 * 	(header_image.jpg) =>
 * 		([header_image-320.jpg, header_image-768.jpg, header_image-922.jpg, header_image-1024.jpg])
 */

gulp.task('resize-images', () => {
  return gulp
    .src(IMAGES_DIRECTORY)
    .pipe($.responsive({
      '*.jpg': IMAGE_RESIZE_WIDTHS
        // .map(i => ({ width: i, rename: { suffix: `-${i}` } })),
        .map(i => ({ width: i })),
        '*.png': IMAGE_RESIZE_WIDTHS
        // .map(i => ({ width: i, rename: { suffix: `-${i}` } }))
          .map(i => ({ width: i }))
        // Compress, strip metadata, and rename original image
        // .concat({ rename: { suffix: '-original' } })
    }, {
      /** Global configuration for all images **/
      // The output quality for JPEG, WebP and TIFF output formats
      quality: 90,
      // Use progressive (interlace) scan for JPEG and PNG output
      progressive: true,
      // Strip all metadata
      withMetadata: false,
      // Avoid throwing error and process exit for smaller image dimensions
      errorOnEnlargement: false
    }))
    .pipe(gulp.dest(file => file.base))
})
