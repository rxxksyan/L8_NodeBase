import { sortStringsIgnoreSpaces, sortStringWords } from './sorting.js';
import { loadData, loadUsers } from './data-loader.js';
import { writeFile, createDirectory, readFile } from './file-system.js';


async function testModules() {
    console.log('ТЕСТИРОВАНИЕ КАСТОМНЫХ МОДУЛЕЙ\n');

    console.log('1.ТЕСТ МОДУЛЯ СОРТИРОВКИ:');
    const testStrings = ['hello world', 'hello', '  test  ', 'apple', 'banana'];
    const sorted = sortStringsIgnoreSpaces(testStrings);
    console.log('   Исходный массив:', testStrings);
    console.log('   Отсортированный:', sorted);
    
    const testSentence = 'world hello apple banana';
    const sortedWords = sortStringWords(testSentence);
    console.log('   Исходная строка:', testSentence);
    console.log('   Отсортированные слова:', sortedWords);
    console.log('');

    console.log('2. ТЕСТ МОДУЛЯ ЗАГРУЗКИ ДАННЫХ:');
    try {
        const testResult = await loadData('https://jsonplaceholder.typicode.com/users/1');
        console.log('   Статус загрузки:', testResult.isLoading ? 'загружается...' : 'завершена');
        console.log('   Данные:', testResult.data ? 'получены' : 'отсутствуют');
        console.log('   Ошибка:', testResult.error ? testResult.error.message : 'нет');
    } catch (error) {
        console.log('   Ошибка теста загрузки:', error.message);
    }
    console.log('');

    console.log('3. ТЕСТ МОДУЛЯ ФАЙЛОВОЙ СИСТЕМЫ:');
    try {
        await createDirectory('./test-module');
        await writeFile('./test-module/test.txt', 'Тест работы модуля файловой системы');
        const content = await readFile('./test-module/test.txt');
        console.log('   Создана папка: test-module/');
        console.log('   Создан файл: test.txt');
        console.log('   Содержимое файла:', content);
    } catch (error) {
        console.log('   Ошибка теста файловой системы:', error.message);
    }

    console.log('\nТЕСТИРОВАНИЕ ЗАВЕРШЕНО');
}

testModules().catch(console.error);