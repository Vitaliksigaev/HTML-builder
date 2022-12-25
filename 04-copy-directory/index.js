const fs = require('fs');
const path = require('path');

// Создание папки  
fs.mkdir(path.join(__dirname, 'files-copy'), err => {
    if (err) {
        console.log('Папка уже была создана');

    // throw err;
        return
    }
    console.log('Папка была создана');
});

// fs.copyFile(path.join(__dirname, 'files', 'test-css.css'), path.join(__dirname, 'files-copy', 'test-css.css'), err => {
//     if(err) throw err; // не удалось скопировать файл
//     console.log('Файл успешно скопирован');
//  });


// let fs = require('fs');
// let { COPYFILE_EXCL } = fs.constants;
// fs.copyFile('files', 'files-copy', COPYFILE_EXCL, err => {
//    if(err) throw err; // не удалось скопировать файл. Он уже существует?
//    console.log('Файл успешно скопирован');
// });



// const fs = require('fs');
// const path = require('path');


fs.readdir(path.join(__dirname, 'files-copy'), (err, files) => {
    if (err)
        console.log(err);
    else {
        files.forEach(file => {
            fs.unlink(path.join(__dirname, 'files-copy', file), err => {
                if(err) throw err; 
                console.log('Файл успешно удален');
            });
        })
    }
})








fs.readdir(path.join(__dirname, 'files'), (err, files) => {
    if (err)
        console.log(err);
    else {
        files.forEach(file => {
            fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), err => {
                if(err) throw err; // не удалось скопировать файл Он уже существует?
                console.log('Файл успешно скопирован');
            });
        })
    }
})



// fs.access(path.join(__dirname, 'files-copy'), fs.F_OK, (err) => {
//     if (err) {
//         console.error(err);

//         fs.mkdir(path.join(__dirname, 'files-copy'), err => {
//         if (err) throw err;
//             console.log('Папка была создана');
//         });
//         return
//     }
  
//     //Файл существует 
//     fs.readdir(path.join(__dirname, 'files'), (err, files) => {
//         if (err)
//             console.log(err);
//         else {
//             files.forEach(file => {
//                 fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), err => {
//                     if(err) throw err; // не удалось скопировать файл
//                     console.log('Файл успешно скопирован');
//                  });
//             })
//         }
//     })
//   })