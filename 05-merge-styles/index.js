const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');


const styleDirPath = path.join(__dirname, 'styles');

const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
fs.writeFile(bundlePath, '', function (err) {
  if (err) throw err;
});

const files = fsPromises.readdir(styleDirPath);
files.then((result) => {
  for (const elem of result) {
    if (elem.split('.')[1] === 'css') {
      const stream = fs.createReadStream(path.join(styleDirPath, elem), 'utf-8');

      let data = '';

      stream.on('data', chunk => data += chunk);
      stream.on('end', () => {
        fs.appendFile(bundlePath, data, () => { });
      });
      stream.on('error', error => console.log('Error', error.message));
    }
  }
}).catch((err) => {
  console.log(err);
});