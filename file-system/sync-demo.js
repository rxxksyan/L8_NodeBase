const fsModule = require('./index');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}

async function demonstrateSyncFunctions() {
    console.log('ДЕМОНСТРАЦИЯ СИНХРОННЫХ ФУНКЦИЙ\n');

    const testDir = './sync-test';
    let testFilesCreated = false;

    try {
        console.log('1. СОЗДАНИЕ ПАПКИ');
        fsModule.createDirectorySync(testDir);
        
        console.log('\n2. СОЗДАНИЕ ТЕСТОВЫХ ФАЙЛОВ');
        fsModule.writeFileSync(`${testDir}/sync-test.txt`, 'СИНХРОННЫЙ ТЕСТ: Hello WORLD 123 ABC 456 DEF 789');
        fsModule.writeFileSync(`${testDir}/data.json`, JSON.stringify({ name: "test", numbers: [1, 2, 3] }, null, 2));
        fsModule.writeFileSync(`${testDir}/noisy.txt`, 'ШУМНОЙ ФАЙЛ: 123 ABC 456 DEF 789!');
        
        testFilesCreated = true;
        console.log('Созданы тестовые файлы');

        console.log('\n3. ЧТЕНИЕ ИЗ ФАЙЛА');
        const content = fsModule.readFileSync(`${testDir}/sync-test.txt`);
        console.log('Исходное содержимое:', content);

        console.log('\n4. ОЧИСТКА ФАЙЛА ОТ ШУМА');
        const cleanAnswer = await question('Для очистки файла от шума введите "clean": ');
        
        if (cleanAnswer.toLowerCase() === 'clean') {
            fsModule.cleanFileSync(`${testDir}/noisy.txt`);
            const cleanedContent = fsModule.readFileSync(`${testDir}/noisy.txt`);
            console.log('Файл очищен от шума');
            console.log('После очистки от шума:', cleanedContent);
        } else {
            console.log('Очистка от шума отменена');
            console.log('Содержимое файла:', fsModule.readFileSync(`${testDir}/noisy.txt`));
        }

        console.log('\n5. ОБНОВЛЕНИЕ ФАЙЛА');
        const updateAnswer = await question('Для обновления файла введите "update": ');
        
        if (updateAnswer.toLowerCase() === 'update') {
            fsModule.updateFileSync(`${testDir}/sync-test.txt`, 'Обновленное содержимое файла\nВторая строка\nТретья строка');
            console.log('Файл обновлен');
            console.log('После обновления:', fsModule.readFileSync(`${testDir}/sync-test.txt`));
        } else {
            console.log('Обновление отменено');
            console.log('Содержимое файла:', fsModule.readFileSync(`${testDir}/sync-test.txt`));
        }

        console.log('\n6. КОПИРОВАНИЕ ФАЙЛА');
        const copyAnswer = await question('Для копирования файла введите "copy": ');
        
        if (copyAnswer.toLowerCase() === 'copy') {
            fsModule.copyFileSync(`${testDir}/sync-test.txt`, `${testDir}/copy-sync.txt`);
            console.log('Копия создана');
            console.log('Содержимое копии:', fsModule.readFileSync(`${testDir}/copy-sync.txt`));
        } else {
            console.log('Копирование отменено');
        }

        console.log('\n7. ОЧИСТКА ФАЙЛА');
        const clearAnswer = await question('Для очистки файла введите "clear": ');
        
        if (clearAnswer.toLowerCase() === 'clear') {
            const fileToClear = `${testDir}/copy-sync.txt`;
            if (fsModule.readFileSync(fileToClear)) {
                fsModule.clearFileSync(fileToClear);
                console.log('Файл очищен');
                console.log('Проверка содержимого:', fsModule.readFileSync(fileToClear) || '(файл пустой)');
            } else {
                console.log('Файл для очистки не существует');
            }
        } else {
            console.log('Очистка отменена');
        }

        console.log('\n8. ПОИСК ВСЕХ ФАЙЛОВ В ПРОЕКТЕ');
        const searchAnswer = await question('Для поиска файлов введите "search": ');
        
        if (searchAnswer.toLowerCase() === 'search') {
            const files = fsModule.getAllFilesSync();
            console.log(`Найдено файлов: ${files.length}`);
        } else {
            console.log('Поиск файлов отменен');
        }

    } catch (error) {
        console.error('Ошибка во время демонстрации:', error.message);
    }

    console.log('\nУДАЛЕНИЕ ТЕСТОВЫХ ДАННЫХ');
    if (testFilesCreated) {
        const answer = await question('Для удаления тестовой папки введите "delete": ');
        
        if (answer.toLowerCase() === 'delete') {
            console.log('\nУДАЛЕНИЕ ТЕСТОВОЙ ПАПКИ...');
            fsModule.removeDirectorySync(testDir);
            console.log('Тестовая папка удалена');
        } else {
            console.log('\nУдаление отменено. Тестовая папка сохранена:', testDir);
        }
    }

    rl.close();
    console.log('\nСИНХРОННАЯ ДЕМОНСТРАЦИЯ ЗАВЕРШЕНА');
}

demonstrateSyncFunctions().catch(console.error);