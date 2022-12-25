// Возможный порядок действий для выполнения задачи:

// 1. Импорт всех требуемых модулей
// 3. Чтение содержимого папки **styles**
// 4. Проверка является ли объект файлом и имеет ли файл нужное расширение
// 4. Чтение файла стилей
// 5. Запись прочитанных данных в массив
// 6. Запись массива стилей в файл **bundle.css**

const fs = require('fs');
const path = require('path');

// прочесть содержимое файла











// Запись в него данных дата  

let data = "";
fs.writeFile(path.join(__dirname, 'project-dist', "bundle.css"), data, (err) => {
    if (err) {
        return
        // console.log(err);
    }

    // else {
    //   console.log("File written successfully\n");
    //   console.log("The written has the following contents:");
    //   console.log(fs.readFileSync("books.txt", "utf8"));
    // }
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
                    // console.log(bundle);

                    // fs.writeFile(path.join(__dirname, 'project-dist', "bundle.css"),  bundle, function(error){
                    //     if(error) throw error; // ошибка чтения файла, если есть
           
                    //     console.log('Данные успешно записаны записать файл');
                    // });

                    fs.appendFile(path.join(__dirname, 'project-dist', "bundle.css"), bundle, (err) => {
                        if (err) {
                          console.error(err)
                          return
                        }
                        //готово!
                      })



                    

                });

                // fs.readFile(path.join(__dirname, 'project-dist', "bundle.css"), 'utf8', function(error, fileContent){
                //     if(error) throw error; // ошибка чтения файла, если есть
                //     // console.log(fileContent); // содержимое файла                    
                //     let toWrite = fileContent;
                //     console.log(toWrite);
                    
                //     fs.readFile(path.join(__dirname, 'styles', file), 'utf8', function(error, fileContent){
                //         if(error) throw error; // ошибка чтения файла, если есть
                //         // console.log(fileContent); // содержимое файла
                //         let toCss;                    
                //         toCss = fileContent;    
                //     });
   
   
                //     toW = toWrite + toCss;
                //     // console.log(toW);
   
                //     fs.writeFile(path.join(__dirname, 'project-dist', "bundle.css"),  toW, function(error){
                //        if(error) throw error; // ошибка чтения файла, если есть
   
                //        console.log('Данные успешно записаны записать файл');
                //     });
                // });











                // fs.readFile(path.join(__dirname, 'styles', file), 'utf8', function(err, data){
                //     fs.writeFile(
                //         path.join(__dirname, 'project-dist', "bundle.css"),
                //         data,
                //         'utf8',
                //         (err) => {
                //           if (err) throw err;
                      
                //           console.log('Done');
                //         }
                //     );



                // });





             }
        })
    }
})

// Прочитываем файл
// fs.readFile(path.join(__dirname, 'styles', 'style-3.css'), 'utf8', function(err, data){
//     // Display the file content
//     console.log(data);
// });





//   fs.readFile(path.join(__dirname, 'project-dist', "bundle.css"), 'utf8', (err, data) => {
//     console.log(data);
//  })
