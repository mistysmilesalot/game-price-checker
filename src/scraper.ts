import { SerpApiResult, TableData } from './serpapi-result-model';

const SerpApi = require('google-search-results-nodejs');

const params = {
  engine: 'google',
  google_domain: 'google.com',
  tbs: 'new:1,root_cat:534049',
  gl: 'us',
  hl: 'en',
  location: 'united states',
  tbm: 'shop',
  num: '10',
};

export default function scrapeData(query: string): TableData {
  const search = new SerpApi.GoogleSearch(
    '715ab46631bc7b0405bae21506ae2028d556f6c70561f0efc8d32087e73776db'
  );

  return search.json({ ...params, q: query }, (result: SerpApiResult) => {
    return {
      ...result.shopping_results[0],
      input: result.search_parameters.q,
      quantity: 1,
    };
  });
}
