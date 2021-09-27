import { ShoppingResult } from './serpapi-result-model';

var fs = require('fs');
const CsvReadableStream = require('csv-reader');

interface RowData extends ShoppingResult {
  input: string;
}

enum Columns {
  input,
  position,
  title,
  source,
  price,
  extractedPrice,
  thumbnail,
  link,
}

function extractThumbnailUrl(s: string) {
  var rx = /=IMAGE\("(.*)"\)/;
  var arr = rx.exec(s) || [s, s];
  return arr[1];
}

module.exports = async (): Promise<RowData[]> => {
  return new Promise((resolve, reject) => {
    let inputStream = fs.createReadStream('./src/data.csv', 'utf8');

    const data: RowData[] = [];

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
          position: parseInt(row[Columns.position]),
          title: row[Columns.title],
          source: row[Columns.source],
          price: row[Columns.price],
          extracted_price: parseInt(row[Columns.extractedPrice]),
          thumbnail: extractThumbnailUrl(row[Columns.thumbnail]),
          link: row[Columns.link],
        });
      })
      .on('end', () => resolve(data))
      .on('error', (error: string) => reject(error));
  });
};
