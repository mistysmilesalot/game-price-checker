import { TableData } from './serpapi-result-model'
import { createObjectCsvWriter } from 'csv-writer'

const CsvHeaderConfig = [
  { id: 'input', title: 'Input' },
  { id: 'quantity', title: 'Qty' },
  { id: 'title', title: 'Title' },
  { id: 'source', title: 'Source' },
  { id: 'price', title: 'Price' },
  { id: 'extracted_price', title: 'Extracted Price' },
  { id: 'thumbnail', title: 'Thumbnail' },
  { id: 'link', title: 'Link' },
]

module.exports = (data: TableData) => {
  const mappedData = data
    .filter((r) => !!r && !!r.title)
    .map((r) => ({ ...r, thumbnail: `=IMAGE("${r?.thumbnail}")` }))

  const csvWriter = createObjectCsvWriter({
    path: 'out.csv',
    header: CsvHeaderConfig,
  })

  csvWriter
    .writeRecords(mappedData)
    .then(() => console.log('The CSV file was written successfully'))
}
