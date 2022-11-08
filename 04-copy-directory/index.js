const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');

copyDir();
async function copyDir() {

  const destPath = path.join(__dirname, 'files-copy');
  const src = path.join(__dirname, 'files');

  await fsPromises.rm(destPath, {force: true, recursive: true});
  await fsPromises.mkdir(destPath, { recursive: true });

  const files = fsPromises.readdir(src);
  files.then((result) => {
    console.log("Copy this files:")
    for (let element of result) {
      const filePath = path.join(src, element);
      const fileDestPath = path.join(destPath, element);
      fsPromises.copyFile(filePath, fileDestPath);
      console.log("--", element);
    }
  })
}

