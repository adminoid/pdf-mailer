const path = require('path');
const sass = require('sass');
const fs = require('fs');

const scss_filename = path.join(__dirname, '/sass/style.sass');

sass.render({file: scss_filename}, function(err, result) {
    if (err) {
        console.error(err.message);
    }

    const CleanCSS = require('clean-css');
    const output = new CleanCSS().minify(result.css.toString());

    fs.writeFile(path.join(__dirname, '../dist/css/style.min.css'), output.styles, (err) => {
        if (err) return console.log(err);

        console.log('backend/sass -> backend/css');
    });

});

