#!/usr/bin/env node
const queries = require("../src/queries.ts");
const getExisingData = require("../src/getExistingData.ts")

const existingData = getExisingData()

console.log(existingData)