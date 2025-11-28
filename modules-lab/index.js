require('dotenv').config();

console.log('Текущий режим:', process.env.MODE);
console.log('Имя:', process.env.FIRST_NAME);
console.log('Фамилия:', process.env.LAST_NAME);
console.log('Номер группы:', process.env.GROUP_NUMBER);
console.log('Номер по списку:', process.env.STUDENT_ID);
console.log('\nСПЕЦИФИЧНЫЕ ПЕРЕМЕННЫЕ:');
switch (process.env.MODE) {
    case 'development':
        console.log('DEBUG:', process.env.DEBUG);
        console.log('LOG_LEVEL:', process.env.LOG_LEVEL);
        console.log('Режим разработки: включены все отладочные функции');
        console.log('Nodemon отслеживает изменения файлов');
        break;
    case 'production':
        console.log('DEBUG:', process.env.DEBUG);
        console.log('LOG_LEVEL:', process.env.LOG_LEVEL);
        console.log('OPTIMIZE:', process.env.OPTIMIZE);
        console.log('Продакшен режим: оптимизировано для производительности');
        break;
    case 'domain':
        console.log('DOMAIN:', process.env.DOMAIN);
        console.log('SSL:', process.env.SSL);
        console.log('LOAD_BALANCER:', process.env.LOAD_BALANCER);
        console.log('Доменный режим: настроено для работы с доменом');
        break;
    default:
        console.log('Неизвестный режим работы');
}

console.log('\nИНФОРМАЦИЯ О СИСТЕМЕ');
console.log('Node.js версия:', process.version);
console.log('Платформа:', process.platform);
console.log('Архитектура:', process.arch);
console.log('Текущая директория:', process.cwd());

console.log('\nПриложение успешно запущено!');
console.log('Для изменения режима используйте команды:');
console.log('   npm run start    - режим разработки (.env.development)');
console.log('   npm run build    - продакшен режим (.env.production)');
console.log('   npm run deploy   - доменный режим (.env.domain)');
console.log('   npm run bcrypt   - тест производительности bcrypt');


