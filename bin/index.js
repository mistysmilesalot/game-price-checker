#!/usr/bin/env node
// const queries = require('../src/queries.ts');
const getExistingData = require('../src/getExistingData.ts');
const createOutputCsv = require('../src/createOutputCsv.ts');

async function main() {
  const data = (await getExistingData()) || [];
  const queries = ['Zigity'];

  queries.forEach((q) => {
    const found = data.findIndex(
      (d) => d.input.toLowerCase() === q.toLowerCase()
    );
    if (found >= 0) data[found].quantity += 1;
    else {
      console.log(q);
    }
  });

  createOutputCsv(data);
}

main();
