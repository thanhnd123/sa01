// Định nghĩa lại type Ideal tại đây
export type Ideal = {
    _id: string;
    title: string;
    banner: string;
    png?: string;
    // ... các field khác nếu có
};

export interface BulkIdealGenerateBannerDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export interface GenerateBannerActionPayload {
    type: 'generate_banner';
    ideals: string[];
    images: File[];
    product_type: string;
    mockup_id?: string;
}

export interface ProductType {
    id: string;
    name: string;
} 