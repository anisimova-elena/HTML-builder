const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');

const dirPath = path.join(__dirname, 'secret-folder');

const files = fsPromises.readdir(dirPath, { withFileTypes: true });
files.then(
  function (result) {
    let stat;
    for (const file of result) {
      if (file.isFile()) {
        fs.stat(path.join(dirPath, file.name), (err, stats) => {
          if (err) {
            console.log(err);
          }
          else {
            stat = file.name.split('.')[0] + ' - ' + file.name.split('.')[1] + ' - ' + stats.size;
            console.log(stat);
          }
        })
      }
    }
  },
  function (error) { console.error(error); }
);


