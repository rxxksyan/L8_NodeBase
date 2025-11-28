require('dotenv').config();

function demonstrateMode() {
    
    const currentMode = process.env.MODE || 'unknown';
    
    console.log(`ТЕКУЩИЙ РЕЖИМ: ${currentMode.toUpperCase()}`);
    console.log(`Пользователь: ${process.env.FIRST_NAME} ${process.env.LAST_NAME}`);
    console.log(`Группа: ${process.env.GROUP_NUMBER}, №${process.env.STUDENT_ID}`);
    
    console.log('\nОСОБЕННОСТИ РЕЖИМА:');
    switch (currentMode) {
        case 'development':
            console.log('Hot reload включен');
            console.log('Подробные логи отладки');
            console.log('Переменные: DEBUG=true, LOG_LEVEL=verbose');
            break;
        case 'production':
            console.log('Оптимизированная производительность');
            console.log('Минимальные логи для безопасности');
            console.log('Переменные: DEBUG=false, OPTIMIZE=true');
            break;
        case 'domain':
            console.log('Настройки домена и SSL');
            console.log('Балансировка нагрузки');
            console.log('Переменные: DOMAIN=myapp.com, SSL=true');
            break;
        default:
            console.log('Режим не распознан');
    }
    

}

demonstrateMode();