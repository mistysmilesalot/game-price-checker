export interface SerpApiResult {
  search_metadata: SearchMetadata
  search_parameters: SearchParameters
  search_information: SearchInformation
  filters: Filter[]
  shopping_results: ShoppingResult[]
  pagination: Pagination
  serpapi_pagination: SerpapiPagination
}

export interface ShoppingResult {
  position: number
  title: string
  link: string
  product_link?: string
  product_id?: string
  serpapi_product_api?: string
  source: string
  price: string
  extracted_price: number
  rating?: number
  reviews?: number
  thumbnail: string
  tag?: string
}

export interface TableDataRow {
  input: string
  quantity: number
  title: string
  source: string
  price: string
  extracted_price: number
  thumbnail: string
  link: string
}

export type TableData = TableDataRow[]

interface SerpapiPagination {
  current: number
  next_link: string
  next: string
  other_pages: any
}

interface Pagination {
  current: number
  next: string
  other_pages: any
}

interface Filter {
  type: string
  options: any[]
}

interface SearchInformation {
  shopping_results_state: string
  query_displayed: string
}

interface SearchParameters {
  engine: string
  q: string
  location_requested: string
  location_used: string
  google_domain: string
  hl: string
  gl: string
  device: string
  tbm: string
  tbs: string
}

interface SearchMetadata {
  id: string
  status: string
  json_endpoint: string
  created_at: string
  processed_at: string
  google_url: string
  raw_html_file: string
  total_time_taken: number
}
