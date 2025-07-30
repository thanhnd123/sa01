export interface Team {
    _id: string
    name: string
    description?: string
    status: 'active' | 'inactive'
    created_at?: string
    updated_at?: string
}

export interface TeamResponse {
    data: Team[]
    total: number
    per_page: number
    current_page: number
    last_page: number
}

export interface TeamCreateData {
    name: string
    description?: string
    status: 'active' | 'inactive'
}

export interface TeamUpdateData extends TeamCreateData {
    _id: string
}

export interface TeamDeleteData {
    _id: string
}

export interface TeamApiResponse {
    success?: boolean
    message?: string
    result?: string | Team
    status?: 'success' | 'error'
} 