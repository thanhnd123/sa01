export type CommentType = {
  author: string
  content: string
  created_at: string
}

export type MockupRenderType = {
  mockup_links: string[]
  product_type: string
}

export type MockupSelectType = {
  mockup_id: string
  mockup_name: string
  mockup_file: string
  product_type: string
}

export type TaskType = {
  id: string | number
  _id?: string
  _uniqueKey?: string
  title: string
  description?: string
  badgeText?: string[]
  attachments?: number
  comments?: CommentType[]
  assigned?: { src: string; name: string }[]
  image?: string[] | string
  dueDate?: Date
  banner?: string
  design_links?: string[]
  mockup_renders?: MockupRenderType[] | string[]
  mockup_selects?: MockupSelectType[]
  product_ideal_id?: string
  product_type?: string[]
  seller_id?: string
  seller?: string
  seller_note?: string
  status?: string | number
  priority?: string | number
  created_at?: string
  updated_at?: string
  designer_id?: string | number | null
  template_link?: string | string[]
}

export type ColumnType = {
  id: string | number
  _id?: string
  title: string
  taskIds: (string | number)[]
}

export type KanbanType = {
  columns: ColumnType[]
  tasks: TaskType[]
  currentTaskId?: string | number
}
