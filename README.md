# gulp-tiled-multiply

A gulp plugin for multiplying the width of [Tiled](http://www.mapeditor.org/) tilemaps. 
Useful for infinitely scrolling maps.

## Getting Started

1. Install it 

`npm install --save-dev gulp-tiled-multiply`

2. Use it in a gulp task

```javascript
var multiply = require('gulp-tiled-multiply');

gulp.task('tilemaps', function() {
  return gulp.src('./public/tilemaps/*.json')
    
    // pass an argument for how many times you want the map multiplied.
    // Defaults to 3
    .pipe(multiply(2))
    
    // Output to a different directory
    .pipe(gulp.dest('./public/tilemaps/tripled'))
});
```
