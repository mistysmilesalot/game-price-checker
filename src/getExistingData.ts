var fs = require('fs');
const CsvReadableStream = require('csv-reader');

module.exports = () => {
  let inputStream = fs.createReadStream('./src/data.csv', 'utf8');

  inputStream
    .pipe(
      new CsvReadableStream({
        parseNumbers: true,
        parseBooleans: true,
        trim: true,
      })
    )
    .on('data', function (row) {
      console.log('A row arrived: ', row);
    })
    .on('end', function () {
      console.log('No more rows!');
    });
  return 'Ta-da!!!';
}
