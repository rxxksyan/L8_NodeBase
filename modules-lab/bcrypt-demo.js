const bcrypt = require('bcrypt');

async function benchmarkBcrypt() {
    
    const passwords = [
        'simple123',
        'StrongP@ssw0rd!',
        'mySecretPassword',
        'qwerty12345',
        'Admin@2024',
        'test_password',
        'HelloWorld123',
        'JavaScriptRocks!',
        'nodejs_is_awesome',
        'bcrypt_performance',
        'salt_and_pepper',
        'very_long_password_that_needs_hashing_123',
        'short'
    ];

    const saltRounds = 12;
    const results = [];

    console.log(`Шифруем ${passwords.length} паролей с saltRounds = ${saltRounds}`);
    console.log('Измеряем время выполнения для каждого пароля\n');

    for (let i = 0; i < passwords.length; i++) {
        const password = passwords[i];
        const startTime = process.hrtime();
        
        try {
            const hash = await bcrypt.hash(password, saltRounds);
            const endTime = process.hrtime(startTime);
            const duration = (endTime[0] * 1000 + endTime[1] / 1000000).toFixed(2);
            
            results.push({
                index: i + 1,
                password: password.length > 10 ? password.substring(0, 10) + '...' : password,
                length: password.length,
                duration: parseFloat(duration),
                hash: hash.substring(0, 25) + '...'
            });

            console.log(`${String(i + 1).padStart(2)}/${passwords.length}: ${duration}ms - "${password}"`);
            
        } catch (error) {
            console.error(`Ошибка при шифровании пароля ${i + 1}:`, error.message);
        }
    }

    console.log('\nРЕЗУЛЬТАТЫ ШИФРОВАНИЯ:');
    console.log('='.repeat(100));
    console.log('№  | Пароль           | Длина | Время (ms) | Хеш (первые 25 символов)');
    console.log('-'.repeat(100));
    
    results.forEach((result) => {
        console.log(`${String(result.index).padEnd(2)} | ${result.password.padEnd(16)} | ${String(result.length).padEnd(5)} | ${String(result.duration).padEnd(10)} | ${result.hash}`);
    });

    const totalTime = results.reduce((sum, result) => sum + result.duration, 0);
    const averageTime = totalTime / results.length;
    const minTime = Math.min(...results.map(r => r.duration));
    const maxTime = Math.max(...results.map(r => r.duration));

    console.log('-'.repeat(100));
    console.log('\nСТАТИСТИКА ПРОИЗВОДИТЕЛЬНОСТИ:');
    console.log(`Общее время шифрования: ${totalTime.toFixed(2)}ms`);
    console.log(`Среднее время на пароль: ${averageTime.toFixed(2)}ms`);
    console.log(`Минимальное время: ${minTime.toFixed(2)}ms`);
    console.log(`Максимальное время: ${maxTime.toFixed(2)}ms`);
    console.log(`Количество паролей: ${results.length}`);

    console.log('\nАНАЛИЗ РЕЗУЛЬТАТОВ:');
    console.log('1. Длина пароля НЕ влияет на время шифрования - bcrypt хеширует фиксированное количество данных');
    console.log('2. Время зависит от параметра saltRounds (сложности вычислений)');
    console.log('3. Небольшие колебания времени связаны с:');
    console.log('   - Загрузкой процессора в момент выполнения');
    console.log('   - Кэшированием операций системой');
    console.log('   - Случайной природой генерации соли');
    console.log('4. Bcrypt специально медленный для защиты от brute-force атак');
    console.log('5. Все пароли шифруются за примерно одинаковое время независимо от сложности');

    console.log('\nДЕМОНСТРАЦИЯ ПРОВЕРКИ ПАРОЛЯ:');
    const testPassword = passwords[0];
    const testHash = await bcrypt.hash(testPassword, saltRounds);
    
    try {
        const startTime = process.hrtime();
        const isValid = await bcrypt.compare(testPassword, testHash);
        const endTime = process.hrtime(startTime);
        const verifyDuration = (endTime[0] * 1000 + endTime[1] / 1000000).toFixed(2);
        
        console.log(`Пароль: "${testPassword}"`);
        console.log(`Хеш: ${testHash.substring(0, 25)}...`);
        console.log(`Проверка: ${isValid ? 'СОВПАДАЕТ' : 'НЕ СОВПАДАЕТ'}`);
        console.log(`Время проверки: ${verifyDuration}ms`);
    } catch (error) {
        console.log('Ошибка при проверке пароля:', error.message);
    }
}

benchmarkBcrypt().catch(console.error);