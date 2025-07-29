export interface Template {
  _id: string
  platform: string
  title_teamplate: string
  product_type: string
}

export interface Shop {
  _id: string
  name: string
  seller_id: string
  team_id: string
  seller: string
  team: string
  created_at: string
  email: string
  platform: string
}

export interface FileListings {
  "template_id": string
  "shop_id": string
  "seller_id": string
  "filename": string
}