
const fs = require('fs');
const path = require('path');


// Function to get current filenames
// in directory
fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
if (err)
	console.log(err);
else {
	console.log("\nCurrent directory filenames:");
	files.forEach(file => {

  fs.stat(path.join(__dirname, 'secret-folder', file), (err, stats) => {
    if (err) {
      console.error(err)
      return
    }
    if(stats.isFile()) {
      console.log(path.basename(file, path.extname(file)) + ' - ' + path.extname(file)  + ' - ' + stats.size );
    }
  })
  
	// console.log(file + ' '+ path.extname(file)  + ' ' + stat.size );
	})
}
})

