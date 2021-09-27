import { SerpApiResults } from './serpapi-result-model';

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const CsvHeaderConfig = [
  { id: 'q', title: 'Input' },
  { id: 'position', title: 'Position' },
  { id: 'title', title: 'Title' },
  { id: 'source', title: 'Source' },
  { id: 'price', title: 'Price' },
  { id: 'extracted_price', title: 'Extracted Price' },
  { id: 'thumbnail', title: 'Thumbnail' },
  { id: 'link', title: 'Link' },
];

export default function createOutputCsv(results: SerpApiResults) {
  const mappedData = results.shopping_results.map((r: { thumbnail: any }) => ({
    q: results.search_parameters.q,
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
}
