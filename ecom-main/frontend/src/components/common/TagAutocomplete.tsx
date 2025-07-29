import { useState, useCallback, useEffect } from 'react'
import { Autocomplete, Chip, CircularProgress } from '@mui/material'
import CustomTextField from '@/@core/components/mui/TextField'
import axiosInstance from '@/libs/axios'

interface TagAutocompleteProps {
    value: string[]
    onChange: (tags: string[]) => void
    placeholder?: string
    label?: string
    disabled?: boolean
    error?: boolean
    helperText?: string
}

const TagAutocomplete = ({
    value,
    onChange,
    placeholder = 'Add tag and press Enter',
    label = 'Tags',
    disabled = false,
    error = false,
    helperText
}: TagAutocompleteProps) => {
    const [tagSuggestions, setTagSuggestions] = useState<string[]>([])
    const [isLoadingTags, setIsLoadingTags] = useState(false)

    // Fetch tag suggestions
    const fetchTagSuggestions = useCallback(async (searchTerm: string) => {
        if (!searchTerm.trim()) {
            setTagSuggestions([])
            return
        }

        setIsLoadingTags(true)
        try {
            const response = await axiosInstance.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/tags/suggestions`,
                {
                    params: {
                        search: searchTerm,
                        limit: 10
                    }
                }
            )

            if (response.data.success) {
                setTagSuggestions(response.data.data || [])
            }
        } catch (error) {
            console.error('Error fetching tag suggestions:', error)
            setTagSuggestions([])
        } finally {
            setIsLoadingTags(false)
        }
    }, [])

    // Load initial suggestions
    useEffect(() => {
        fetchTagSuggestions('')
    }, [fetchTagSuggestions])

    // Ensure value is always an array
    const safeValue = Array.isArray(value) ? value : []

    return (
        <Autocomplete
            multiple
            freeSolo
            options={tagSuggestions}
            value={safeValue}
            onChange={(_, newValue) => onChange(newValue)}
            onInputChange={(event, newInputValue) => {
                fetchTagSuggestions(newInputValue)
            }}
            loading={isLoadingTags}
            disabled={disabled}
            renderTags={(value: string[], getTagProps) =>
                (Array.isArray(value) ? value : []).map((option: string, index: number) => (
                    <Chip variant='outlined' label={option} {...getTagProps({ index })} key={option} />
                ))
            }
            renderInput={(params) => (
                <CustomTextField
                    {...params}
                    label={label}
                    placeholder={placeholder}
                    error={error}
                    helperText={helperText}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {isLoadingTags ? <CircularProgress color='inherit' size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        )
                    }}
                />
            )}
            noOptionsText={isLoadingTags ? 'Loading suggestions...' : 'No suggestions found'}
        />
    )
}

export default TagAutocomplete 