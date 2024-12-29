import { stat } from 'node:fs/promises';

const showUp = async () => {
  let stats;

  try { 
    stats = await stat('C:\\Users\\Usuario\\Downloads'); 
    return stats;
  } catch (err) {
    console.error(err);
  }
}

let res = await showUp();
console.log(res);

export { showUp};