import fs from 'fs'
import CsvReadableStream from 'csv-reader'
import { TableData, TableDataRow } from './serpapi-result-model'

enum Columns {
  input,
  quantity,
  title,
  source,
  price,
  extractedPrice,
  thumbnail,
  link,
}

function extractThumbnailUrl(s: string) {
  var rx = /=IMAGE\("(.*)"\)/
  var arr = rx.exec(s) || [s, s]
  return arr[1]
}

module.exports = async (): Promise<TableData> => {
  return new Promise((resolve, reject) => {
    let inputStream = fs.createReadStream('./src/data.csv', 'utf8')

    const data: TableDataRow[] = []

    inputStream
      .pipe(
        new CsvReadableStream({
          parseNumbers: true,
          parseBooleans: true,
          trim: true,
          skipHeader: true,
        })
      )
      .on('data', function (row: string[]) {
        data.push({
          input: row[Columns.input],
          quantity: parseInt(row[Columns.quantity]) || 1,
          title: row[Columns.title],
          source: row[Columns.source],
          price: row[Columns.price],
          extracted_price: parseFloat(row[Columns.extractedPrice]),
          thumbnail: extractThumbnailUrl(row[Columns.thumbnail]),
          link: row[Columns.link],
        })
      })
      .on('end', () => resolve(data))
      .on('error', (error: string) => reject(error.toString()))
  })
}
