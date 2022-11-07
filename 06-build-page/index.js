const path = require('path');
const fsPromises = require('fs/promises');

build();

async function build() {
  let template = await fsPromises.readFile(path.join(__dirname, "template.html"), { encoding: 'utf8' });

  const components = await fsPromises.readdir(path.join(__dirname, 'components'), { encoding: 'utf8' });

  const projectPath = path.join(__dirname, 'project-dist');
  const componentsPath = path.join(__dirname, 'components');
  const assetsPath = path.join(__dirname, 'assets');

  await fsPromises.mkdir(projectPath, { recursive: true });

  for (let item of components) {
    const content = await fsPromises.readFile(path.join(componentsPath, item), { encoding: 'utf8' });
    const regExp = new RegExp(`{{${item.split('.')[0]}}}`, 'g');
    template = template.replaceAll(regExp, content);
  }
  await fsPromises.writeFile(path.join(projectPath, 'index.html'), template);

  mergeStyles();

  await fsPromises.mkdir(path.join(projectPath, 'assets'), { recursive: true });
  copyDir(assetsPath, path.join(projectPath, 'assets'));
}

async function mergeStyles() {
  const styleDirPath = path.join(__dirname, 'styles');
  const stylesPath = path.join(projectPath, 'style.css');
  const stylesModules = await fsPromises.readdir(styleDirPath, { encoding: 'utf8' });
  for (let item of stylesModules) {
    const style = await fsPromises.readFile(path.join(styleDirPath, item), { encoding: 'utf8' });
    await fsPromises.appendFile(stylesPath, style);
  }
}

async function copyDir(dirPath, projectPath) {
  const assets = await fsPromises.readdir(dirPath, { encoding: 'utf8', withFileTypes: true });
  for (let item of assets) {
    if (item.isDirectory()) {
      await fsPromises.mkdir(path.join(projectPath, item.name), { recursive: true });
      copyDir(path.join(dirPath, item.name), path.join(projectPath, item.name));
    }
    else await fsPromises.copyFile(path.join(dirPath, item.name), path.join(projectPath, item.name));
  }
}