import axiosInstance from '@/libs/axios'

export interface Note {
    _id: string
    content: string
    ideal_id?: string
    design_id?: string
    user_id: string
    team_id: string
    note_type: 'comment' | 'task' | 'bug' | 'feature'
    image_url?: string
    created_at: number
    updated_at: number
    user?: {
        username: string
        email: string
        avatar?: string
    }
}

/**
 * Create a new note
 */
export const createNote = async (data: {
    content: string
    ideal_id?: string
    design_id?: string
    note_type: 'comment' | 'task' | 'bug' | 'feature'
    image?: File
}): Promise<{ success: boolean; data?: Note; message?: string }> => {
    try {
        const formData = new FormData()
        formData.append('content', data.content)
        formData.append('note_type', data.note_type)

        if (data.ideal_id) {
            formData.append('ideal_id', data.ideal_id)
        }
        if (data.design_id) {
            formData.append('design_id', data.design_id)
        }

        if (data.image) {
            formData.append('image', data.image)
        }

        const response = await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/notes`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )

        return {
            success: response.data.success,
            data: response.data.data,
            message: response.data.message
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to create note'
        }
    }
}

/**
 * Get notes for an ideal
 */
export const getNotesByIdeal = async (idealId: string): Promise<{
    success: boolean
    data?: Note[]
    total?: number
}> => {
    try {
        const response = await axiosInstance.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/notes/${idealId}`
        )

        return {
            success: response.data.success,
            data: response.data.data,
            total: response.data.total
        }
    } catch (error: any) {
        return {
            success: false
        }
    }
}

/**
 * Get notes for a design
 */
export const getNotesByDesign = async (designId: string): Promise<{
    success: boolean
    data?: Note[]
    total?: number
}> => {
    try {
        const response = await axiosInstance.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/notes/design/${designId}`
        )

        return {
            success: response.data.success,
            data: response.data.data,
            total: response.data.total
        }
    } catch (error: any) {
        return {
            success: false
        }
    }
}

/**
 * Update a note
 */
export const updateNote = async (noteId: string, data: {
    content: string
    note_type: 'comment' | 'task' | 'bug' | 'feature'
    image?: File
}): Promise<{ success: boolean; data?: Note; message?: string }> => {
    try {
        const formData = new FormData()
        formData.append('content', data.content)
        formData.append('note_type', data.note_type)

        if (data.image) {
            formData.append('image', data.image)
        }

        const response = await axiosInstance.put(
            `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/notes/${noteId}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )

        return {
            success: response.data.success,
            data: response.data.data,
            message: response.data.message
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to update note'
        }
    }
}

/**
 * Delete a note
 */
export const deleteNote = async (noteId: string): Promise<{ success: boolean; message?: string }> => {
    try {
        const response = await axiosInstance.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/notes/${noteId}`
        )

        return {
            success: response.data.success,
            message: response.data.message
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to delete note'
        }
    }
}

/**
 * Delete note image
 */
export const deleteNoteImage = async (noteId: string): Promise<{ success: boolean; message?: string }> => {
    try {
        const response = await axiosInstance.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/notes/${noteId}/image`
        )

        return {
            success: response.data.success,
            message: response.data.message
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to delete note image'
        }
    }
}

/**
 * Format timestamp to readable date
 */
export const formatNoteDate = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleString()
}

/**
 * Get note type color
 */
export const getNoteTypeColor = (type: string): 'primary' | 'error' | 'success' | 'default' => {
    switch (type) {
        case 'task': return 'primary'
        case 'bug': return 'error'
        case 'feature': return 'success'
        default: return 'default'
    }
}

/**
 * Get note type icon
 */
export const getNoteTypeIcon = (type: string): string => {
    switch (type) {
        case 'task': return '📋'
        case 'bug': return '🐛'
        case 'feature': return '✨'
        default: return '💬'
    }
}

/**
 * Validate image file
 */
export const validateImageFile = (file: File): { isValid: boolean; message?: string } => {
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
        return { isValid: false, message: 'Please upload a valid image file (PNG, JPG)' }
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
        return { isValid: false, message: 'Image size must be less than 5MB' }
    }

    return { isValid: true }
}

/**
 * Create image preview URL
 */
export const createImagePreview = (file: File): string => {
    return URL.createObjectURL(file)
}

/**
 * Cleanup image preview URL
 */
export const cleanupImagePreview = (url: string): void => {
    URL.revokeObjectURL(url)
} 