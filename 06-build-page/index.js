const fs = require('fs');
const path = require('path');



// создание папки  **project-dist**
fs.mkdir(path.join(__dirname, 'project-dist'), err => {
    if(err) {
        return
    }
    console.log('Папка успешно создана');
 });
//Копированиния  файла  **template.html**

fs.copyFile(
    path.join(__dirname, 'template.html'),
    path.join(__dirname, 'project-dist', 'index.html'),
    err => {
    if(err) throw err; // не удалось скопировать файл
    console.log('Файл успешно скопирован');
 });


//создание файла  **style.css**  и объединяем

fs.writeFile(path.join(__dirname, 'project-dist', "style.css"), '', (err) => {
    if (err) {
        return
        // console.log(err);
    }

});

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
    if (err)
        console.log(err);
    else {
        files.forEach(file => {
            // добавим условие, если у файла есть разрешение css
             if(path.extname(file) == '.css') {
                // console.log(file);
                fs.readFile(path.join(__dirname, 'styles', file), 'utf8', function(error, fileContent){
                    if(error) throw error; // ошибка чтения файла, если есть
                    let bundle = fileContent;
                    fs.appendFile(path.join(__dirname, 'project-dist', "style.css"), bundle, (err) => {
                        if (err) {
                          console.error(err)
                          return
                        }
                      })
                });
             }
        })
    }
})

// создание копии папки **assets** 


fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), err => {
    if(err) {
        return
    }
    console.log('Папка  assets успешно создана');
 });

// Очистка папки
fs.readdir(path.join(__dirname, 'project-dist', 'assets'), (err, files) => {
    if (err)
        console.log(err);
    else {
        files.forEach(file => {
            fs.unlink(path.join(__dirname, 'project-dist', 'assets', file), err => {
                if(err) {return}
                //throw err; 
                console.log('Файл успешно удален');
            });
        })
    }
})

// актуальзиция данных в папке ассетс - рекурсивным методом

let readFrom = path.join(__dirname, 'assets'); 
// console.log(readFrom);
let writeTo = path.join(__dirname, 'project-dist', 'assets' )

function listObjects(path1, folder ){
    // console.log(path);
    fs.readdir(path1, (err, files) => {
       if(err) throw err;
 
       for (let file of files){


            console.log(file);

            fs.stat((path1+ '/' +  file), (errStat, status) => {
            console.log(file);
             if(errStat) throw errStat;
 
             if(status.isDirectory()){
                console.log('Папка: ' + file);

                fs.mkdir(
                    (path.join(__dirname, 'project-dist', 'assets', file)), 
                    err => {
                    if(err) throw err; // не удалось создать папку
                    // console.log('Папка успешно создана');

                 });

                 listObjects((readFrom + '/' + file) , file );



             }else{
                console.log('Файл: ' + file);

                fs.copyFile(
                    path1 +'/'+ file, 
                    writeTo + '/'+ folder +'/'+ file ,
                    err => {
                    if(err) throw err; // не удалось скопировать файл
                    console.log('Файл успешно скопирован');
                 });


             }
          });
        



        //   fs.stat((path + '/' + file), (errStat, status) => {
        //     console.log(file);
        //      if(errStat) throw errStat;
 
        //      if(status.isDirectory()){
        //         console.log('Папка: ' + file);
        //         // listObjects(path1 + '/' + file); // продолжаем рекурсию
        //      }else{
        //         console.log('Файл: ' + file);
        //      }
        //   });
       }
    });
 }

listObjects(readFrom);





//чтение файла темплейтс

// нахождние имени тега

// находжения файта по имени тега

// чтение файла по тегу

// замена имени на хтлм

// запись в один файл



