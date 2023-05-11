const fs = require('fs');
const path = require('path');

fs.writeFile(
    path.join(__dirname, 'text.txt'),
    'Hello world',
    (err) => {
        if (err) throw err;
        // console.log('Файл был создан');
    }
);

const { stdin, stdout, exit } = process;

stdout.write('Введите информацию\n');

stdin.on('data', data => {
    const name = data.toString();

    fs.appendFile(
        path.join(__dirname, 'text.txt'),
        name,
        err => {
            if (err) throw err;
            console.log('Файл был изменен');
        }
    );
    if (data.toString().trim() === 'exit') {
        stdout.write('До свидания!');
        exit();
      }
    // process.exit();
    process.on('SIGINT', () => {
        stdout.write('До свидания!');
        exit();
      })
});

