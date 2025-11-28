const os = require('os');
require('dotenv').config();

function getOSInfo() {
    console.log('ИНФОРМАЦИЯ О ОПЕРАЦИОННОЙ СИСТЕМЕ');
    console.log('Платформа:', os.platform());
    console.log('Архитектура:', os.arch());
    console.log('Версия ОС:', os.release());
    console.log('Имя хоста:', os.hostname());
    console.log('Тип ОС:', os.type());
    
    const freeMemoryGB = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
    const totalMemoryGB = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
    console.log('Свободная память:', freeMemoryGB, 'GB');
    console.log('Общая память:', totalMemoryGB, 'GB');
    
    console.log('Главная директория:', os.homedir());
    
    console.log('Время работы системы:', (os.uptime() / 3600).toFixed(2), 'часов');
    
    console.log('\nСЕТЕВЫЕ ИНТЕРФЕЙСЫ');
    const networkInterfaces = os.networkInterfaces();
    Object.keys(networkInterfaces).forEach(interfaceName => {
        console.log(`Интерфейс: ${interfaceName}`);
        networkInterfaces[interfaceName].forEach(interface => {
            if (interface.family === 'IPv4' && !interface.internal) {
                console.log(`  IPv4: ${interface.address}`);
            }
        });
    });
}

function checkFreeMemory() {
    const freeMemoryGB = os.freemem() / 1024 / 1024 / 1024;
    const minRequiredGB = 4;
    
    console.log('ПРОВЕРКА СВОБОДНОЙ ПАМЯТИ');
    console.log(`Свободно: ${freeMemoryGB.toFixed(2)} GB`);
    console.log(`Требуется: ${minRequiredGB} GB`);
    
    if (freeMemoryGB >= minRequiredGB) {
        console.log('Памяти достаточно (больше 4GB)');
        return true;
    } else {
        console.log('Памяти недостаточно (меньше 4GB)');
        return false;
    }
}

function checkAccessMode() {
    const mode = process.env.MODE;
    
    console.log('ПРОВЕРКА РЕЖИМА ДОСТУПА');
    console.log('Текущий режим:', mode);
    
    if (mode === 'admin') {
        console.log('Доступ разрешен (режим admin)');
        return true;
    } else if (mode === 'user') {
        console.log('Ограниченный доступ (режим user)');
        return false;
    } else {
        console.log('Неизвестный режим доступа');
        return false;
    }
}

function main() {
    console.log('ЗАПУСК ПРОГРАММЫ OS\n');
    
    if (checkAccessMode()) {
        console.log('\nЗапуск функций с полным доступом');
        getOSInfo();
        checkFreeMemory();
    } else {
        console.log('\nОграниченный режим');
        console.log('Доступ к полной информации ограничен');
        
        const freeMemoryGB = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
        console.log(`Свободная память: ${freeMemoryGB} GB`);
        console.log(`Платформа: ${os.platform()}`);
    }
    
    console.log('\nПРОГРАММА ЗАВЕРШЕНА');
}


main();