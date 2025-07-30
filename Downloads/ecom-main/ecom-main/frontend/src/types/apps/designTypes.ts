export type CommentType = {
  content: string;
  by: string;
  timestamp: string;
}

export type TaskType = {
  id: string
  title: string
  product_ideal_id: string
  product_types: string[]
  seller_id: string
  dropbox: string[]
  designer_id: string | string[]
  images: string[]
  banner: string
  status: 1 | 2 | 3 | 4
  seller_note: string
  comments: CommentType[]
}

export type ColumnType = {
  id: number
  title: string
  taskIds: string[]
  status: 1 | 2 | 3 | 4
}

export type KanbanType = {
  columns: ColumnType[]
  tasks: TaskType[]
  currentTaskId?: string
}
