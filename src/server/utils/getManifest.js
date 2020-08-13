/* eslint-disable consistent-return */
import fs from 'fs';

function getManifest() {
  try {
    return (JSON.parse(fs.readFileSync(`${__dirname}/public/manifest.json`)));
  } catch (error) {
    console.log(error);
  }
}

export default getManifest;
