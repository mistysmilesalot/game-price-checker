var fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

var results = JSON.parse(fs.readFileSync('src/test.json', 'utf8'));

const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    {id: 'q', title: 'Input'},
    {id: 'position', title: 'Position'},
    {id: 'title', title: 'Title'},
    {id: 'source', title: 'Source'},
    {id: 'price', title: 'Price'},
    {id: 'extracted_price', title: 'Extracted Price'},
    {id: 'thumbnail', title: 'Thumbnail'},
    {id: 'link', title: 'Link'},
  ],
});

const data = results.shopping_results.map(r => (
  {
    q: results.search_parameters.q,
    ...r,
    thumbnail: `=IMAGE("${r.thumbnail}")`,
  }
))


csvWriter
  .writeRecords(data)
  .then(()=> console.log('The CSV file was written successfully'));


/*
const SerpApi = require('google-search-results-nodejs')
const search = new SerpApi.GoogleSearch("Your Private Key")
search.json({
 q: "Coffee", 
 location: "Austin, TX"
}, (result) => {
  console.log(result)
})
*/

/*
Google search engine api: AIzaSyC0cBJcRC3btVft7sqtCTnQJBFh-P8Fyg0
*/