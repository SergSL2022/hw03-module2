const fs = require("fs").promises;
const path = require("path");
const colors = require("colors");
require('dotenv').config();

const publicDirectoryPath = `${__dirname}/public`;
const commonFileName = process.env.FILE_NAME;
const commonFileContent = process.env.FILE_CONTENT;


startService1();

async function startService1() {
  console.log("Service 1 Started".green);
  await readDirectory(publicDirectoryPath);
  await createFile(publicDirectoryPath, commonFileName, commonFileContent);
  await readDirectory(publicDirectoryPath);
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

async function createFile(directoryPath, fileName, fileContent) {
  const filePath = `${directoryPath}/${fileName}`;
  console.log(`Creating file ${colors.yellow(fileName)} ...`);

  try {
    await fs.writeFile(filePath, fileContent);
    console.log(`File "${filePath}" has been created.`);
  } catch (error) {
    console.error(`Error creating file: ${colors.red(error)}`);
  }
}
