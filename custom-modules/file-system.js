import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export async function writeFile(filePath, data) {
    try {
        await fs.writeFile(filePath, data);
        console.log(`Файл ${filePath} успешно записан`);
        return true;
    } catch (error) {
        console.error(`Ошибка записи в файл ${filePath}:`, error.message);
        return false;
    }
}


export async function readFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        console.log(`Файл ${filePath} успешно прочитан`);
        return data;
    } catch (error) {
        console.error(`Ошибка чтения файла ${filePath}:`, error.message);
        return null;
    }
}


export async function updateFile(filePath, newData) {
    try {
        await fs.writeFile(filePath, newData);
        console.log(`Файл ${filePath} успешно обновлен`);
        return true;
    } catch (error) {
        console.error(`Ошибка обновления файла ${filePath}:`, error.message);
        return false;
    }
}


export async function clearFile(filePath) {
    try {
        await fs.writeFile(filePath, '');
        console.log(`Файл ${filePath} успешно очищен`);
        return true;
    } catch (error) {
        console.error(`Ошибка очистки файла ${filePath}:`, error.message);
        return false;
    }
}


export async function cleanFile(filePath) {
    try {
        let content = await fs.readFile(filePath, 'utf8');

        content = content.replace(/\d/g, '');
        content = content.toLowerCase();
        content = content.replace(/\s+/g, ' ').trim();
        
        await fs.writeFile(filePath, content);
        console.log(`Файл ${filePath} успешно очищен от шума`);
        return true;
    } catch (error) {
        console.error(`Ошибка очистки шума в файле ${filePath}:`, error.message);
        return false;
    }
}

export async function copyFile(sourcePath, targetPath) {
    try {
        const data = await fs.readFile(sourcePath, 'utf8');
        await fs.writeFile(targetPath, data);
        console.log(`Файл скопирован из ${sourcePath} в ${targetPath}`);
        return true;
    } catch (error) {
        console.error(`Ошибка копирования файла:`, error.message);
        return false;
    }
}

export async function createDirectory(dirPath) {
    try {
        await fs.mkdir(dirPath, { recursive: true });
        console.log(`Папка ${dirPath} создана`);
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

export async function removeDirectory(dirPath) {
    try {
        await fs.rm(dirPath, { recursive: true, force: true });
        console.log(`Папка ${dirPath} удалена`);
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


export async function getAllFiles(startPath = '.') {
    const ignoreDirs = ['node_modules', '.git', '.vscode', '__pycache__'];
    const ignoreFiles = ['.env', '.gitignore', 'package-lock.json'];
    
    async function scanDirectory(currentPath) {
        let files = [];
        
        try {
            const items = await fs.readdir(currentPath);
            
            for (const item of items) {
                const fullPath = path.join(currentPath, item);
                
                try {
                    const stat = await fs.stat(fullPath);
                    
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
    console.log(`Найдено ${files.length} файлов в проекте:`);
    files.forEach(file => console.log(`   ${file}`));
    return files;
}

export async function cleanProject(startPath = '.') {
    const ignoreDirs = ['node_modules', '.git'];
    const ignoreFiles = ['.env', '.gitignore', 'package.json', 'package-lock.json'];
    
    async function cleanDirectory(currentPath) {
        try {
            const items = await fs.readdir(currentPath);
            
            for (const item of items) {
                const fullPath = path.join(currentPath, item);
                
                try {
                    const stat = await fs.stat(fullPath);
                    
                    if (stat.isDirectory()) {
                        if (!ignoreDirs.includes(item)) {
                            await cleanDirectory(fullPath);
                            const remaining = await fs.readdir(fullPath);
                            if (remaining.length === 0) {
                                await fs.rmdir(fullPath);
                                console.log(`Удалена папка: ${fullPath}`);
                            }
                        }
                    } else {
                        if (!ignoreFiles.includes(item)) {
                            await fs.unlink(fullPath);
                            console.log(`Удален файл: ${fullPath}`);
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
    
    await cleanDirectory(startPath);
    console.log('Очистка проекта завершена');
}

export async function createUsersStructure(usersData) {
    const usersDir = './users';
    
    try {
        await createDirectory(usersDir);
        const names = usersData.map(user => user.name).join('\n');
        const emails = usersData.map(user => user.email).join('\n');
        await writeFile(path.join(usersDir, 'names.txt'), names);
        await writeFile(path.join(usersDir, 'emails.txt'), emails);
        
        console.log('Структура папок users создана успешно');
        console.log(`Записано ${usersData.length} имен в names.txt`);
        console.log(`Записано ${usersData.length} email в emails.txt`);
        
        return true;
    } catch (error) {
        console.error('Ошибка создания структуры users:', error.message);
        return false;
    }
}

export default {
    writeFile,
    readFile,
    updateFile,
    clearFile,
    cleanFile,
    copyFile,
    createDirectory,
    removeDirectory,
    getAllFiles,
    cleanProject,
    createUsersStructure
};