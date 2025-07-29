import axiosInstance from '@/libs/axios'

/**
 * Fetch tag suggestions from backend
 */
export const fetchTagSuggestions = async (searchTerm: string, limit: number = 10): Promise<string[]> => {
    try {
        const response = await axiosInstance.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/tags/suggestions`,
            {
                params: {
                    search: searchTerm,
                    limit
                }
            }
        )

        if (response.data.success) {
            return response.data.data || []
        }
        return []
    } catch (error) {
        console.error('Error fetching tag suggestions:', error)
        return []
    }
}

/**
 * Increment tag usage count
 */
export const incrementTagUsage = async (tags: string[]): Promise<boolean> => {
    if (tags.length === 0) return true

    try {
        const response = await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/tags/increment-usage`,
            {
                tags: tags
            }
        )

        return response.data.success
    } catch (error) {
        console.error('Error incrementing tag usage:', error)
        return false
    }
}

/**
 * Create a new tag
 */
export const createTag = async (tagName: string): Promise<{ success: boolean; data?: any; message?: string }> => {
    try {
        const response = await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/tags`,
            {
                name: tagName
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
            message: error.response?.data?.message || 'Failed to create tag'
        }
    }
}

/**
 * Get all tags for current team
 */
export const getTags = async (params?: {
    limit?: number
    page?: number
    search?: string
}): Promise<{
    success: boolean
    data?: any[]
    total?: number
    page?: number
    limit?: number
    total_pages?: number
}> => {
    try {
        const response = await axiosInstance.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/tags`,
            { params }
        )

        return {
            success: response.data.success,
            data: response.data.data,
            total: response.data.total,
            page: response.data.page,
            limit: response.data.limit,
            total_pages: response.data.total_pages
        }
    } catch (error: any) {
        return {
            success: false
        }
    }
}

/**
 * Update a tag
 */
export const updateTag = async (tagId: string, newName: string): Promise<{ success: boolean; message?: string }> => {
    try {
        const response = await axiosInstance.put(
            `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/tags/${tagId}`,
            {
                name: newName
            }
        )

        return {
            success: response.data.success,
            message: response.data.message
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to update tag'
        }
    }
}

/**
 * Delete a tag
 */
export const deleteTag = async (tagId: string): Promise<{ success: boolean; message?: string }> => {
    try {
        const response = await axiosInstance.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/tags/${tagId}`
        )

        return {
            success: response.data.success,
            message: response.data.message
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to delete tag'
        }
    }
}

/**
 * Parse tags from string (comma-separated)
 */
export const parseTags = (tagsString: string): string[] => {
    if (!tagsString) return []
    return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
}

/**
 * Join tags into string (comma-separated)
 */
export const joinTags = (tags: string[]): string => {
    return tags.join(', ')
}

/**
 * Validate tag name
 */
export const validateTagName = (tagName: string): { isValid: boolean; message?: string } => {
    if (!tagName || tagName.trim().length === 0) {
        return { isValid: false, message: 'Tag name cannot be empty' }
    }

    if (tagName.length > 50) {
        return { isValid: false, message: 'Tag name cannot exceed 50 characters' }
    }

    // Check for special characters that might cause issues
    const invalidChars = /[<>:"\\|?*]/
    if (invalidChars.test(tagName)) {
        return { isValid: false, message: 'Tag name contains invalid characters' }
    }

    return { isValid: true }
} 