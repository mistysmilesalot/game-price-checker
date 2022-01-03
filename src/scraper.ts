import fs from 'fs'
import { SerpApiResult, TableDataRow } from './serpapi-result-model'
const SerpApi = require('google-search-results-nodejs')
const request = require('request')

const SERP_API_KEY =
  '715ab46631bc7b0405bae21506ae2028d556f6c70561f0efc8d32087e73776db'
const params = {
  engine: 'google',
  google_domain: 'google.com',
  tbs: 'new:1,root_cat:534049',
  gl: 'us',
  hl: 'en',
  location: 'united states',
  tbm: 'shop',
}

const SerpApiResultToTableDataRow = (result: SerpApiResult): TableDataRow => {
  fs.appendFileSync('results.txt', JSON.stringify(result) + '\r\n')
  if (!result.shopping_results || result.shopping_results.length < 1) {
    return {
      input: result.search_parameters.q,
      quantity: 1,
      title: 'No results found for this title. Something went horribly wrong!',
    } as TableDataRow
  }
  return {
    ...result.shopping_results[0],
    input: result.search_parameters.q,
    quantity: 1,
  }
}

const ScrapeDataFromApi = (query: string): Promise<TableDataRow> => {
  return new Promise((resolve) => {
    const result = new SerpApi.GoogleSearch(SERP_API_KEY)
    resolve(result.json({ ...params, q: query }, SerpApiResultToTableDataRow))
  })
}

const ScrapeDataFromFile = (file: string): Promise<TableDataRow> => {
  return new Promise((resolve) => {
    let result = fs.readFileSync('src/test.json').toString()
    resolve(SerpApiResultToTableDataRow(JSON.parse(result)))
  })
}

const ScrapeDataFromFileUrl = (url: string): Promise<TableDataRow> => {
  return new Promise((resolve) => {
    request(url, function (error: any, response: any, body: any) {
      if (!error && response.statusCode == 200) {
        var result = JSON.parse(body)
        resolve(SerpApiResultToTableDataRow(result))
      }
    })
  })
}

module.exports = {ScrapeDataFromApi, ScrapeDataFromFile, ScrapeDataFromFileUrl}
