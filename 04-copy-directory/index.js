const path = require('path');
const fsPromises = require('fs/promises');

const destPath = path.join(__dirname, 'files-copy');
const src = path.join(__dirname, 'files');

const directory = fsPromises.mkdir(destPath, { recursive: true });
directory.then(() => {
  const files = fsPromises.readdir(src);
  files.then((result) => {
    console.log("Copy this files:")
    for (let element of result) {
      const filePath = path.join(src, element);
      const fileDestPath = path.join(destPath, element);
      fsPromises.copyFile(filePath, fileDestPath);
      console.log("--", element);
    }
  }).catch((err) => {
    console.log(err);
  });
})



