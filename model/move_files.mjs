import { SOURCE_FOLDER } from '../const/const.mjs';
import { stat, readdir, rename } from 'node:fs/promises';
import { lookup } from "mime-types";
import { extname } from 'node:path';



const addresses = {
  zip: "C:/Users/Usuario/Downloads/prueba/zip",
  apk: "C:/Users/Usuario/Downloads/prueba/anki",
  exe: "C:/Users/Usuario/Downloads/prueba/exe",
  pdf: "C:/Users/Usuario/Downloads/prueba/pdf",
  img: "C:/Users/Usuario/Downloads/prueba/img",
};

const getFiles = async (path) => {
  //let stats;
  try {
    //stats = await stat(SOURCE_FOLDER);
    let files = await readdir(path);
    //console.log('files', files);
    return files;
  } catch (err) { console.error(err) }
}


const createFileObjects = async (path) => {
  let fileNames = await getFiles(path);
  let fileObjects = [];

  for (let i = 0; i < fileNames.length; i++) {
    let fileName = fileNames[i];
    let filePath = `${path}/${fileName}`;

    /* console.log({
      name: file,
      path,
      type: lookup(filePath),
      format: extname(filePath),

    }); */
    fileObjects.push({
      name: fileName,
      path: filePath,
      //type: lookup(filePath),
      format: extname(filePath).slice(1),
    });
  }

  return fileObjects;
}


const setDestination = ({ name, path, format }) => {
  return [path, `${addresses[format]}/${name}`];
}

const filesFilter = async (path) => {
  const fileObjects = await createFileObjects(path);
  const pathsList = [];

  for (let i = 0; i < fileObjects.length; i++) {
    let fileObject = fileObjects[i];

    if (addresses.hasOwnProperty(fileObject.format)) {
      //console.log('lo encontre bro, ', fileObject.name);
      pathsList.push(setDestination(fileObject));
    }
  }
  return pathsList;
}


//const setDestination = 



const moveFiles = async (path) => {

  try {
    const destinations = await filesFilter(path);
  
    for (let i = 0; i < destinations.length; i++) {
      let address = destinations[i];

      console.log("address", address);
      let [source, destination] = address;

      //console.log(source, destination);
      await rename(source, destination);
    }
  } catch (err) { console.error(err)}


  
}

await moveFiles(SOURCE_FOLDER);