const fs = require('fs');
const path = require('path');
let http = require('http');




// создание папки  **project-dist**
fs.mkdir(path.join(__dirname, 'project-dist'), err => {
    if(err) {
        return
    }
    // console.log('Папка успешно создана');
 });
//Копированиния  файла  **template.html**

fs.copyFile(
    path.join(__dirname, 'template.html'),
    path.join(__dirname, 'project-dist', 'index.html'),
    err => {
    if(err) throw err; // не удалось скопировать файл
    // console.log('Файл успешно скопирован');
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
    // console.log('Папка успешно создана');
 });

// очистка папки от содержимого рекурсивным методом

let readForClean = path.join(__dirname, 'project-dist', 'assets'); // из какой папки нужно всё прочитать

function listObjectsClean(path){
   fs.readdir(path, (err, files) => {
      if(err) throw err;

      for (let file of files){
         fs.stat(path + '/' + file, (errStat, status) => {
            if(errStat)  {


                return
               // throw errStat;
            } 

            if(status.isDirectory()){
            //    console.log('Папка: ' + file);
               listObjectsClean(path + '/' + file); // продолжаем рекурсию
               fs.rmdir(path + '/' + file, err => {
                if(err) {
                    return
                }//throw err; // не удалось удалить папку
                // console.log('Папка успешно удалена');
             });

            }else{
            //    console.log('Файл: ' + file);

               // Удаление файлов если это файл
               fs.unlink((path + '/' + file), err => {
                if(err) throw err; // не удалось удалить файл
                // console.log('Файл успешно удалён');
             });

            }
         });
      }
   });
}

listObjectsClean(readForClean);




// актуальзиция данных в папке ассетс - рекурсивным методом

let readFrom = path.join(__dirname, 'assets'); 
// console.log(readFrom);
let writeTo = path.join(__dirname, 'project-dist', 'assets' )

function listObjects(path1, folder ){
    // console.log(path);
    fs.readdir(path1, (err, files) => {
       if(err) throw err;
 
       for (let file of files){


            // console.log(file);

            fs.stat((path1+ '/' +  file), (errStat, status) => {
            // console.log(file);
             if(errStat) throw errStat;
 
             if(status.isDirectory()){
                // console.log('Папка: ' + file);

                fs.mkdir(
                    (path.join(__dirname, 'project-dist', 'assets', file)), 
                    err => {
                    if(err){return} //throw err; // не удалось создать папку
                    // console.log('Папка успешно создана');

                 });

                 listObjects((readFrom + '/' + file) , file );



             } else {
                // console.log('Файл: ' + file);

                fs.copyFile(
                    path1 +'/'+ file, 
                    writeTo + '/'+ folder +'/'+ file ,
                    err => {
                    if(err) throw err; // не удалось скопировать файл
                    // console.log('Файл успешно скопирован');
                 });


             }
          });
        
       }
    });
 }

listObjects(readFrom);


//чтение файла темплейтс
fs.readFile(path.join(__dirname,'template.html'), 'utf8', function(error, fileContent){
    if(error) throw error; // ошибка чтения файла, если есть
    // return fileContent;
   //console.log(fileContent); // содержимое файла
 });




// нахождние имени тега


fs.readFile(path.join(__dirname, 'template.html' ), 'utf8', (error, fileContent) => {
    // response.setHeader('Content-Type : text/html');

     if (!error) { // страница существует
        fs.readFile( path.join(__dirname,'components','header.html'), 'utf8', (errorHeader, fileContentHeader) => {
           if(errorHeader) throw errorHeader;
           fileContent = fileContent.replace(/\{\{header\}\}/, fileContentHeader);
           fs.writeFile(path.join(__dirname, 'template.html' ), fileContent, function(error){
              if(error) throw error; // ошибка чтения файла, если есть
              console.log('Данные успешно записаны записать файл');
           });
        });
        fs.readFile( path.join(__dirname,'components','footer.html'), 'utf8', (errorHeader, fileContentHeader) => {
            if(errorHeader) throw errorHeader;
            fileContent = fileContent.replace(/\{\{footer\}\}/, fileContentHeader);
            fs.writeFile(path.join(__dirname, 'template.html' ), fileContent, function(error){
               if(error) throw error; // ошибка чтения файла, если есть
               console.log('Данные успешно записаны записать файл');
            });
         });
         fs.readFile( path.join(__dirname,'components','articles.html'), 'utf8', (errorHeader, fileContentHeader) => {
            if(errorHeader) throw errorHeader;
            fileContent = fileContent.replace(/\{\{articles\}\}/, fileContentHeader);
            fs.writeFile(path.join(__dirname, 'template.html' ), fileContent, function(error){
               if(error) throw error; // ошибка чтения файла, если есть
               console.log('Данные успешно записаны записать файл');
            });
         });
     } 
  });




