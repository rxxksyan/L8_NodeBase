require('dotenv').config();

console.log('ИНФОРМАЦИЯ ИЗ .ENV ФАЙЛА');
console.log('Имя:', process.env.FIRST_NAME);
console.log('Фамилия:', process.env.LAST_NAME);
console.log('Номер группы:', process.env.GROUP_NUMBER);
console.log('Номер по списку:', process.env.STUDENT_ID);
console.log('Режим доступа:', process.env.MODE);
