import { TableData } from './serpapi-result-model';

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const CsvHeaderConfig = [
  { id: 'input', title: 'Input' },
  { id: 'quantity', title: 'Qty' },
  { id: 'title', title: 'Title' },
  { id: 'source', title: 'Source' },
  { id: 'price', title: 'Price' },
  { id: 'extracted_price', title: 'Extracted Price' },
  { id: 'thumbnail', title: 'Thumbnail' },
  { id: 'link', title: 'Link' },
];

module.exports = (data: TableData) => {
  const mappedData = data.map((r) => ({
    ...r,
    thumbnail: `=IMAGE("${r.thumbnail}")`,
  }));

  const csvWriter = createCsvWriter({
    path: 'out.csv',
    header: CsvHeaderConfig,
  });

  csvWriter
    .writeRecords(mappedData)
    .then(() => console.log('The CSV file was written successfully'));
};
