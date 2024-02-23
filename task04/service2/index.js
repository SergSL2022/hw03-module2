const fs = require("fs").promises;
const path = require("path");
const colors = require("colors");
require("dotenv").config();

const publicDirectoryPath = `${__dirname}/public`;
const commonFileName = process.env.FILE_NAME;

startService2();

async function startService2() {
  console.log("Service 2 Started".bold.brightMagenta);
  await readDirectory(publicDirectoryPath);
  await readFile(publicDirectoryPath, commonFileName);
}

async function readDirectory(directoryPath) {
  console.log(`Reading directory ${colors.yellow(directoryPath)} ...`);
  try {
    const files = await fs.readdir(directoryPath);
    const result = await Promise.all(
      files.map(async (filename) => {
        const filePath = path.join(directoryPath, filename);
        const stats = await fs.stat(filePath);
        return {
          Name: filename,
          Size: stats.size,
          Date: stats.mtime,
        };
      })
    );
    console.table(result);
  } catch (error) {
    console.error(`Error reading directory: ${colors.red(error)}`);
  }
}

async function readFile(directoryPath, fileName) {
    const filePath = `${directoryPath}/${fileName}`;
    console.log(`Reading file ${colors.yellow(fileName)} ...`);
  
    try {
      const content = await fs.readFile(filePath);
      console.log(`File "${colors.yellow(fileName)}" content = ${colors.bold.brightMagenta(content.toString())}`);
    } catch (error) {
      console.error(`Error reading file: ${colors.red(error)}`);
    }
  }
