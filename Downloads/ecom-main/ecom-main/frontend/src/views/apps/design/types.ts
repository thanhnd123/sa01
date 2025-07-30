export interface Design {
    _id: string
    banner: string
    comments: any[]
    created_at: string
    design_links: string[]
    designer_id: string | null
    images: string[]
    product_ideal_id: {
        title: string
    }
    product_type: string[]
    seller_id: string
    seller_note: string
    status: string
    title: string
    updated_at: string
    template_link?: string
    created_by_user_name: string
    created_by: {
        _id: string
        name?: string
        username: string
    }
    order_by_user_id: string
    required_tasks?: {
        png: boolean
        productBanner: {
            enabled: boolean
            productTypes: Array<{
                id: string
                name: string
            }>
        }
        other: {
            enabled: boolean
            note: string
        }
    }
    designer_result?: {
        png: string
        note: string
        other_result?: string
        product_banners?: { [key: string]: string[] }
    }
    designer_name: string
    designer_results?: Array<{
        product_banners?: {
            product_type_id: string
            images: string[]
        }[]
    }>
} 