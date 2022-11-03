const fs = require('fs');
const path = require('path');
const process = require('process');

const { stdin } = process;
const output = fs.createWriteStream(path.join(__dirname, 'output.txt'));

console.log('Hello, Student1!');
stdin.on('data', (data) => {
  const dataStringfy = data.toString().trim();
  if (dataStringfy === 'exit') {
    process.exit();
  }
  else output.write(' ' + dataStringfy);
});

process.on('exit', () => {
  console.log('Goodbye, Student1');
});

process.on('SIGINT', () => { process.exit(); });

process.on('error', error => console.log('Error', error.message));