import { loadUsers } from './data-loader.js';
import { sortObjectsByStringProperty } from './sorting.js';
import { createUsersStructure } from './file-system.js';


async function main() {

    console.log('1. ЗАГРУЗКА ПОЛЬЗОВАТЕЛЕЙ ИЗ JSONPLACEHOLDER...');
    const usersResult = await loadUsers();

    if (usersResult.error) {
        console.error('Ошибка загрузки пользователей:', usersResult.error.message);
        return;
    }

    if (usersResult.isLoading) {
        console.log('Данные все еще загружаются...');
        return;
    }

    const users = usersResult.data;
    console.log(`Успешно загружено ${users.length} пользователей\n`);

    console.log('2. СОРТИРОВКА ПОЛЬЗОВАТЕЛЕЙ ПО ИМЕНАМ...');
    const sortedUsers = sortObjectsByStringProperty(users, 'name');
    
    console.log('Отсортированный список пользователей:');
    sortedUsers.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.name} (${user.email})`);
    });
    console.log('');

    console.log('3. СОЗДАНИЕ СТРУКТУРЫ ПАПОК И ФАЙЛОВ...');
    const structureCreated = await createUsersStructure(sortedUsers);
    
    if (structureCreated) {
        console.log('\nСВОДКА:');
        console.log(`   • Загружено пользователей: ${users.length}`);
        console.log(`   • Создана папка: users/`);
        console.log(`   • Созданы файлы: names.txt, emails.txt`);
        console.log(`   • Первый пользователь: ${sortedUsers[0].name}`);
        console.log(`   • Последний пользователь: ${sortedUsers[sortedUsers.length - 1].name}`);
    } else {
        console.log('Не удалось создать структуру папок');
    }

    console.log('\nПРОГРАММА ЗАВЕРШЕНА');
}

main().catch(error => {
    console.error('КРИТИЧЕСКАЯ ОШИБКА:', error.message);
    process.exit(1);
});