#!/usr/bin/env node
const queries = require('../src/queries.ts');
const getExisingData = require('../src/getExistingData.ts');

async function main() {
  const existingData = await getExisingData();

  console.log(existingData)
}

main();
