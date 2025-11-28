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

async function demonstrateAsyncFunctions() {
    console.log('ДЕМОНСТРАЦИЯ АСИНХРОННЫХ ФУНКЦИЙ\n');

    const testDir = './async-test';
    let testFilesCreated = false;

    try {
        console.log('1. СОЗДАНИЕ ПАПКИ');
        await fsModule.createDirectoryAsync(testDir);
        
        console.log('\n2. СОЗДАНИЕ ТЕСТОВЫХ ФАЙЛОВ');
        await fsModule.writeFileAsync(`${testDir}/async-test.txt`, 'АСИНХРОННЫЙ ТЕСТ: Hello WORLD 123 ABC 456 DEF 789');
        await fsModule.writeFileAsync(`${testDir}/data.json`, JSON.stringify({ async: true, items: ["a", "b", "c"] }, null, 2));
        await fsModule.writeFileAsync(`${testDir}/noisy.txt`, 'АСИНХРОННЫЙ ШУМ: 123 ABC 456 DEF 789!');
        
        testFilesCreated = true;
        console.log('Созданы тестовые файлы');

        console.log('\n3. ЧТЕНИЕ ИЗ ФАЙЛА');
        const content = await fsModule.readFileAsync(`${testDir}/async-test.txt`);
        console.log('Исходное содержимое:', content);

        console.log('\n4. ОЧИСТКА ФАЙЛА ОТ ШУМА');
        const cleanAnswer = await question('Для очистки файла от шума введите "clean": ');
        
        if (cleanAnswer.toLowerCase() === 'clean') {
            await fsModule.cleanFileAsync(`${testDir}/noisy.txt`);
            const cleanedContent = await fsModule.readFileAsync(`${testDir}/noisy.txt`);
            console.log('Файл очищен от шума');
            console.log('После очистки от шума:', cleanedContent);
        } else {
            console.log('Очистка от шума отменена');
            console.log('Содержимое файла:', await fsModule.readFileAsync(`${testDir}/noisy.txt`));
        }

        console.log('\n5. ОБНОВЛЕНИЕ ФАЙЛА');
        const updateAnswer = await question('Для обновления файла введите "update": ');
        
        if (updateAnswer.toLowerCase() === 'update') {
            await fsModule.updateFileAsync(`${testDir}/async-test.txt`, 'Асинхронно обновленное содержимое\nВторая строка\nТретья строка');
            console.log('Файл обновлен');
            const updatedContent = await fsModule.readFileAsync(`${testDir}/async-test.txt`);
            console.log('После обновления:', updatedContent);
        } else {
            console.log('Обновление отменено');
            console.log('Содержимое файла:', await fsModule.readFileAsync(`${testDir}/async-test.txt`));
        }

        console.log('\n6. КОПИРОВАНИЕ ФАЙЛА');
        const copyAnswer = await question('Для копирования файла введите "copy": ');
        
        if (copyAnswer.toLowerCase() === 'copy') {
            await fsModule.copyFileAsync(`${testDir}/async-test.txt`, `${testDir}/copy-async.txt`);
            console.log('Копия создана');
            const copyContent = await fsModule.readFileAsync(`${testDir}/copy-async.txt`);
            console.log('Содержимое копии:', copyContent);
        } else {
            console.log('Копирование отменено');
        }

        console.log('\n7. ОЧИСТКА ФАЙЛА');
        const clearAnswer = await question('Для очистки файла введите "clear": ');
        
        if (clearAnswer.toLowerCase() === 'clear') {
            const fileToClear = `${testDir}/copy-async.txt`;
            const fileExists = await fsModule.readFileAsync(fileToClear);
            if (fileExists) {
                await fsModule.clearFileAsync(fileToClear);
                console.log('Файл очищен');
                const clearedContent = await fsModule.readFileAsync(fileToClear);
                console.log('Проверка содержимого:', clearedContent || '(файл пустой)');
            } else {
                console.log('Файл для очистки не существует');
            }
        } else {
            console.log('Очистка отменена');
        }

        console.log('\n8. ПОИСК ВСЕХ ФАЙЛОВ В ПРОЕКТЕ');
        const searchAnswer = await question('Для поиска файлов введите "search": ');
        
        if (searchAnswer.toLowerCase() === 'search') {
            const files = await fsModule.getAllFilesAsync();
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
            await fsModule.removeDirectoryAsync(testDir);
            console.log('Тестовая папка удалена');
        } else {
            console.log('\nУдаление отменено. Тестовая папка сохранена:', testDir);
        }
    }

    rl.close();
    console.log('\nАСИНХРОННАЯ ДЕМОНСТРАЦИЯ ЗАВЕРШЕНА');
}

demonstrateAsyncFunctions().catch(console.error);