#!/usr/bin/env node
const queries = require('../src/queries.ts')
const getExistingData = require('../src/getExistingData.ts')
const createOutputCsv = require('../src/createOutputCsv.ts')
const scrapeData = require('../src/scraper')

async function main() {
  const data = (await getExistingData()) || []
  const queriesTodo = []
  queries.forEach((q) => {
    const found = data.findIndex(
      (d) => d.input.toLowerCase() === q.toLowerCase()
    )
    if (found >= 0) {
      data[found].quantity += 1
      console.log('Duplicate: ' + q)
    } else {
      queriesTodo.push(q)
    }
  })

  const actions = queriesTodo.map(scrapeData)
  Promise.all(actions).then((scrapedData) => {
    createOutputCsv(data.concat(scrapedData))
  })
}

main()
