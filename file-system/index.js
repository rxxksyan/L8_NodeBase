const fs = require('fs');
const path = require('path');


function writeFileSync(filePath, data) {
    try {
        fs.writeFileSync(filePath, data);
        console.log(`Файл ${filePath} успешно записан`);
        return true;
    } catch (error) {
        console.error(`Ошибка записи в файл ${filePath}:`, error.message);
        return false;
    }
}


function readFileSync(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        console.log(`Файл ${filePath} успешно прочитан`);
        return data;
    } catch (error) {
        console.error(`Ошибка чтения файла ${filePath}:`, error.message);
        return null;
    }
}


function updateFileSync(filePath, newData) {
    try {
        fs.writeFileSync(filePath, newData);
        console.log(`Файл ${filePath} успешно обновлен`);
        return true;
    } catch (error) {
        console.error(`Ошибка обновления файла ${filePath}:`, error.message);
        return false;
    }
}


function clearFileSync(filePath) {
    try {
        fs.writeFileSync(filePath, '');
        console.log(`Файл ${filePath} успешно очищен`);
        return true;
    } catch (error) {
        console.error(`Ошибка очистки файла ${filePath}:`, error.message);
        return false;
    }
}


function cleanFileSync(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(/\d/g, '');
        content = content.toLowerCase();
        content = content.replace(/\s+/g, ' ').trim();
        
        fs.writeFileSync(filePath, content);
        console.log(`Файл ${filePath} успешно очищен от шума`);
        return true;
    } catch (error) {
        console.error(`Ошибка очистки шума в файле ${filePath}:`, error.message);
        return false;
    }
}

function copyFileSync(sourcePath, targetPath) {
    try {
        const data = fs.readFileSync(sourcePath, 'utf8');
        fs.writeFileSync(targetPath, data);
        console.log(`Файл скопирован из ${sourcePath} в ${targetPath}`);
        return true;
    } catch (error) {
        console.error(`Ошибка копирования файла:`, error.message);
        return false;
    }
}

function createDirectorySync(dirPath) {
    try {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`Папка ${dirPath} создана`);
        } else {
            console.log(`Папка ${dirPath} уже существует`);
        }
        return true;
    } catch (error) {
        console.error(`Ошибка создания папки ${dirPath}:`, error.message);
        return false;
    }
}

function removeDirectorySync(dirPath) {
    try {
        if (fs.existsSync(dirPath)) {
            fs.rmSync(dirPath, { recursive: true });
            console.log(`Папка ${dirPath} удалена`);
        } else {
            console.log(`Папка ${dirPath} не существует`);
        }
        return true;
    } catch (error) {
        console.error(`Ошибка удаления папки ${dirPath}:`, error.message);
        return false;
    }
}

function getAllFilesSync(startPath = '.') {
    const ignoreDirs = ['node_modules', '.git', '.vscode', '__pycache__'];
    const ignoreFiles = ['.env', '.gitignore', 'package-lock.json'];
    
    function scanDirectory(currentPath) {
        let files = [];
        
        try {
            const items = fs.readdirSync(currentPath);
            
            for (const item of items) {
                const fullPath = path.join(currentPath, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    if (!ignoreDirs.includes(item)) {
                        files = files.concat(scanDirectory(fullPath));
                    }
                } else {
                    if (!ignoreFiles.includes(item) && 
                        ['.txt', '.json', '.rtf', '.js'].some(ext => item.endsWith(ext))) {
                        files.push(fullPath);
                    }
                }
            }
        } catch (error) {
            console.error(`Ошибка сканирования папки ${currentPath}:`, error.message);
        }
        
        return files;
    }
    
    const files = scanDirectory(startPath);
    console.log(`${files.length} файлов в проекте:`);
    files.forEach(file => console.log(`   ${file}`));
    return files;
}


function cleanProjectSync(startPath = '.') {
    const ignoreDirs = ['node_modules', '.git'];
    const ignoreFiles = ['.env', '.gitignore', 'package.json', 'package-lock.json'];
    
    function cleanDirectory(currentPath) {
        try {
            const items = fs.readdirSync(currentPath);
            
            for (const item of items) {
                const fullPath = path.join(currentPath, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    if (!ignoreDirs.includes(item)) {
                        cleanDirectory(fullPath);
                        if (fs.readdirSync(fullPath).length === 0) {
                            fs.rmdirSync(fullPath);
                            console.log(`Удалена папка: ${fullPath}`);
                        }
                    }
                } else {
                    if (!ignoreFiles.includes(item)) {
                        fs.unlinkSync(fullPath);
                        console.log(`Удален файл: ${fullPath}`);
                    }
                }
            }
        } catch (error) {
            console.error(`Ошибка очистки папки ${currentPath}:`, error.message);
        }
    }
    
    cleanDirectory(startPath);
    console.log('Очистка проекта завершена');
}




async function writeFileAsync(filePath, data) {
    try {
        await fs.promises.writeFile(filePath, data);
        console.log(`Файл ${filePath} успешно записан (асинхронно)`);
        return true;
    } catch (error) {
        console.error(`Ошибка записи в файл ${filePath}:`, error.message);
        return false;
    }
}

async function readFileAsync(filePath) {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        console.log(`Файл ${filePath} успешно прочитан (асинхронно)`);
        return data;
    } catch (error) {
        console.error(`Ошибка чтения файла ${filePath}:`, error.message);
        return null;
    }
}

async function updateFileAsync(filePath, newData) {
    try {
        await fs.promises.writeFile(filePath, newData);
        console.log(`Файл ${filePath} успешно обновлен (асинхронно)`);
        return true;
    } catch (error) {
        console.error(`Ошибка обновления файла ${filePath}:`, error.message);
        return false;
    }
}

async function clearFileAsync(filePath) {
    try {
        await fs.promises.writeFile(filePath, '');
        console.log(`Файл ${filePath} успешно очищен (асинхронно)`);
        return true;
    } catch (error) {
        console.error(`Ошибка очистки файла ${filePath}:`, error.message);
        return false;
    }
}


async function cleanFileAsync(filePath) {
    try {
        let content = await fs.promises.readFile(filePath, 'utf8');
        content = content.replace(/\d/g, '');
        content = content.toLowerCase();
        content = content.replace(/\s+/g, ' ').trim();
        
        await fs.promises.writeFile(filePath, content);
        console.log(`Файл ${filePath} успешно очищен от шума (асинхронно)`);
        return true;
    } catch (error) {
        console.error(`Ошибка очистки шума в файле ${filePath}:`, error.message);
        return false;
    }
}


async function copyFileAsync(sourcePath, targetPath) {
    try {
        const data = await fs.promises.readFile(sourcePath, 'utf8');
        await fs.promises.writeFile(targetPath, data);
        console.log(`Файл скопирован из ${sourcePath} в ${targetPath} (асинхронно)`);
        return true;
    } catch (error) {
        console.error(`Ошибка копирования файла:`, error.message);
        return false;
    }
}

async function createDirectoryAsync(dirPath) {
    try {
        await fs.promises.mkdir(dirPath, { recursive: true });
        console.log(`Папка ${dirPath} создана (асинхронно)`);
        return true;
    } catch (error) {
        if (error.code === 'EEXIST') {
            console.log(`Папка ${dirPath} уже существует`);
        } else {
            console.error(`Ошибка создания папки ${dirPath}:`, error.message);
        }
        return false;
    }
}

async function removeDirectoryAsync(dirPath) {
    try {
        await fs.promises.rm(dirPath, { recursive: true, force: true });
        console.log(`Папка ${dirPath} удалена (асинхронно)`);
        return true;
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`Папка ${dirPath} не существует`);
        } else {
            console.error(`Ошибка удаления папки ${dirPath}:`, error.message);
        }
        return false;
    }
}

async function getAllFilesAsync(startPath = '.') {
    const ignoreDirs = ['node_modules', '.git', '.vscode', '__pycache__'];
    const ignoreFiles = ['.env', '.gitignore', 'package-lock.json'];
    
    async function scanDirectory(currentPath) {
        let files = [];
        
        try {
            const items = await fs.promises.readdir(currentPath);
            
            for (const item of items) {
                const fullPath = path.join(currentPath, item);
                
                try {
                    const stat = await fs.promises.stat(fullPath);
                    
                    if (stat.isDirectory()) {
                        if (!ignoreDirs.includes(item)) {
                            const subFiles = await scanDirectory(fullPath);
                            files = files.concat(subFiles);
                        }
                    } else {
                        if (!ignoreFiles.includes(item) && 
                            ['.txt', '.json', '.rtf', '.js'].some(ext => item.endsWith(ext))) {
                            files.push(fullPath);
                        }
                    }
                } catch (error) {
                    console.error(`Ошибка доступа к ${fullPath}:`, error.message);
                }
            }
        } catch (error) {
            console.error(`Ошибка сканирования папки ${currentPath}:`, error.message);
        }
        
        return files;
    }
    
    const files = await scanDirectory(startPath);
    console.log(`Найдено ${files.length} файлов в проекте (асинхронно):`);
    files.forEach(file => console.log(`   ${file}`));
    return files;
}


async function cleanProjectAsync(startPath = '.') {
    const ignoreDirs = ['node_modules', '.git'];
    const ignoreFiles = ['.env', '.gitignore', 'package.json', 'package-lock.json'];
    
    async function cleanDirectory(currentPath) {
        try {
            const items = await fs.promises.readdir(currentPath);
            
            for (const item of items) {
                const fullPath = path.join(currentPath, item);
                
                try {
                    const stat = await fs.promises.stat(fullPath);
                    
                    if (stat.isDirectory()) {
                        if (!ignoreDirs.includes(item)) {
                            await cleanDirectory(fullPath);
                            const remaining = await fs.promises.readdir(fullPath);
                            if (remaining.length === 0) {
                                await fs.promises.rmdir(fullPath);
                                console.log(`Удалена папка: ${fullPath} (асинхронно)`);
                            }
                        }
                    } else {
                        if (!ignoreFiles.includes(item)) {
                            await fs.promises.unlink(fullPath);
                            console.log(`Удален файл: ${fullPath} (асинхронно)`);
                        }
                    }
                } catch (error) {
                    console.error(`Ошибка доступа к ${fullPath}:`, error.message);
                }
            }
        } catch (error) {
            console.error(`Ошибка очистки папки ${currentPath}:`, error.message);
        }
    }
    
    console.log('Начинаю очистку проекта (асинхронно)...');
    await cleanDirectory(startPath);
    console.log('Очистка проекта завершена (асинхронно)');
}




module.exports = {
    writeFileSync,
    readFileSync,
    updateFileSync,
    clearFileSync,
    cleanFileSync,
    copyFileSync,
    createDirectorySync,
    removeDirectorySync,
    getAllFilesSync,
    cleanProjectSync,
    
    writeFileAsync,
    readFileAsync,
    updateFileAsync,
    clearFileAsync,
    cleanFileAsync,
    copyFileAsync,
    createDirectoryAsync,
    removeDirectoryAsync,
    getAllFilesAsync,
    cleanProjectAsync
};