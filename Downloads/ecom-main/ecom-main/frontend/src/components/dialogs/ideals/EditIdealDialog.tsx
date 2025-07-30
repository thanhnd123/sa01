import { useState, useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDropzone } from 'react-dropzone'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CustomTextField from '@/@core/components/mui/TextField'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid2'
import Alert from '@mui/material/Alert'

import DialogCloseButton from '@components/dialogs/DialogCloseButton'
import TagAutocomplete from '@components/common/TagAutocomplete'
import { useSession } from 'next-auth/react'
import { incrementTagUsage } from '@/utils/tagUtils'

import axiosInstance from '@/libs/axios'

interface EditIdealDialogProps {
    open: boolean
    onClose: () => void
    onSuccess: () => void
    ideal: {
        _id: string
        title: string
        description?: string
        banner: string
        png?: string
        images?: string[]
        tags?: string[]
        hey_etsy_tags?: string
    } | null
}

const MAX_BANNER_SIZE = 5 * 1024 * 1024 // 5MB
const MAX_PNG_SIZE = 20 * 1024 * 1024 // 20MB
const MAX_IMAGE_SIZE = 10 * 1024 * 1024 // 10MB per image
const MAX_IMAGES = 10 // Maximum 10 images

const ACCEPTED_IMAGE_TYPES = {
    'image/png': ['.png'],
    'image/x-png': ['.png'],
    'image/jpeg': ['.jpeg'],
    'image/jpg': ['.jpg']
}

const EditIdealDialog = ({ open, onClose, onSuccess, ideal }: EditIdealDialogProps) => {
    const { data: session } = useSession()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        banner: null as File | null,
        png: null as File | null,
        images: [] as File[],
        tags: [] as string[]
    })
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [bannerPreview, setBannerPreview] = useState<string | null>(null)
    const [pngPreview, setPngPreview] = useState<string | null>(null)
    const [imagePreviews, setImagePreviews] = useState<string[]>([])
    const [existingImages, setExistingImages] = useState<string[]>([])

    // Reset form when dialog opens or ideal changes
    useEffect(() => {
        if (open && ideal) {
            // Ensure tags is always an array
            let tags: string[] = []
            if (Array.isArray(ideal.tags)) {
                tags = ideal.tags
            } else if (ideal.hey_etsy_tags) {
                tags = ideal.hey_etsy_tags.split(',').filter(tag => tag.trim())
            }

            setFormData({
                title: ideal.title || '',
                description: ideal.description || '',
                banner: null,
                png: null,
                images: [],
                tags: tags
            })
            setErrors({})
            setIsLoading(false)
            setBannerPreview(null)
            setPngPreview(null)
            setImagePreviews([])
            setExistingImages(ideal.images || [])
        }
    }, [open, ideal])

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (bannerPreview) {
                URL.revokeObjectURL(bannerPreview)
            }
            if (pngPreview) {
                URL.revokeObjectURL(pngPreview)
            }
            imagePreviews.forEach(url => {
                URL.revokeObjectURL(url)
            })
        }
    }, [])

    const handleClose = () => {
        setFormData({
            title: '',
            description: '',
            banner: null,
            png: null,
            images: [],
            tags: []
        })
        setErrors({})
        setIsLoading(false)
        onClose()
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required'
        }
        if (formData.banner) {
            if (!['image/png', 'image/jpeg'].includes(formData.banner.type)) {
                newErrors.banner = 'Banner must be PNG or JPG'
            } else if (formData.banner.size > MAX_BANNER_SIZE) {
                newErrors.banner = 'Banner max size is 5MB'
            }
        }
        if (formData.png) {
            if (!['image/png', 'image/jpeg'].includes(formData.png.type)) {
                newErrors.png = 'PNG must be PNG or JPG'
            } else if (formData.png.size > MAX_PNG_SIZE) {
                newErrors.png = 'PNG max size is 20MB'
            }
        }
        if (formData.images.length > MAX_IMAGES) {
            newErrors.images = `Maximum ${MAX_IMAGES} images allowed`
        }
        formData.images.forEach((image, index) => {
            if (!['image/png', 'image/jpeg'].includes(image.type)) {
                newErrors.images = 'All images must be PNG or JPG'
            } else if (image.size > MAX_IMAGE_SIZE) {
                newErrors.images = `Image ${index + 1} max size is 10MB`
            }
        })
        if (Object.keys(newErrors).length > 0) {
            toast.error(JSON.stringify(newErrors))
            return false
        }
        return true
    }

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }))
        }
    }

    // Banner Dropzone
    const onBannerDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return
        const file = acceptedFiles[0]
        if (!['image/png', 'image/jpeg'].includes(file.type)) {
            setErrors(prev => ({ ...prev, banner: 'Banner must be PNG or JPG' }))
            return
        }
        if (file.size > MAX_BANNER_SIZE) {
            setErrors(prev => ({ ...prev, banner: 'Banner max size is 5MB' }))
            return
        }

        // Cleanup previous preview
        if (bannerPreview) {
            URL.revokeObjectURL(bannerPreview)
        }

        setBannerPreview(URL.createObjectURL(file))
        handleInputChange('banner', file)
    }, [bannerPreview])
    const { getRootProps: getBannerRootProps, getInputProps: getBannerInputProps, isDragActive: isBannerDragActive } = useDropzone({
        onDrop: onBannerDrop,
        accept: ACCEPTED_IMAGE_TYPES,
        maxFiles: 1,
        maxSize: MAX_BANNER_SIZE,
        multiple: false
    })

    // PNG Dropzone
    const onPngDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return
        const file = acceptedFiles[0]
        if (!['image/png', 'image/jpeg'].includes(file.type)) {
            setErrors(prev => ({ ...prev, png: 'PNG must be PNG or JPG' }))
            return
        }
        if (file.size > MAX_PNG_SIZE) {
            setErrors(prev => ({ ...prev, png: 'PNG max size is 20MB' }))
            return
        }

        // Cleanup previous preview
        if (pngPreview) {
            URL.revokeObjectURL(pngPreview)
        }

        setPngPreview(URL.createObjectURL(file))
        handleInputChange('png', file)
    }, [pngPreview])
    const { getRootProps: getPngRootProps, getInputProps: getPngInputProps, isDragActive: isPngDragActive } = useDropzone({
        onDrop: onPngDrop,
        accept: ACCEPTED_IMAGE_TYPES,
        maxFiles: 1,
        maxSize: MAX_PNG_SIZE,
        multiple: false
    })

    // Images Dropzone
    const onImagesDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return

        // Validate files
        const invalidFiles = acceptedFiles.filter(file =>
            !['image/png', 'image/jpeg'].includes(file.type) || file.size > MAX_IMAGE_SIZE
        )

        if (invalidFiles.length > 0) {
            setErrors(prev => ({ ...prev, images: 'All images must be PNG or JPG and max 10MB each' }))
            return
        }

        const newImages = [...formData.images, ...acceptedFiles]
        if (newImages.length > MAX_IMAGES) {
            setErrors(prev => ({ ...prev, images: `Maximum ${MAX_IMAGES} images allowed` }))
            return
        }

        // Cleanup old previews
        imagePreviews.forEach(url => {
            URL.revokeObjectURL(url)
        })

        // Create new previews
        const newPreviews = newImages.map(file => URL.createObjectURL(file))
        setImagePreviews(newPreviews)
        handleInputChange('images', newImages)
    }, [formData.images, imagePreviews])

    const { getRootProps: getImagesRootProps, getInputProps: getImagesInputProps, isDragActive: isImagesDragActive } = useDropzone({
        onDrop: onImagesDrop,
        accept: ACCEPTED_IMAGE_TYPES,
        maxSize: MAX_IMAGE_SIZE,
        multiple: true
    })

    const removeImage = (index: number) => {
        const newImages = formData.images.filter((_, i) => i !== index)
        const newPreviews = imagePreviews.filter((_, i) => i !== index)

        // Cleanup removed preview
        URL.revokeObjectURL(imagePreviews[index])

        setImagePreviews(newPreviews)
        handleInputChange('images', newImages)
    }

    const removeExistingImage = (index: number) => {
        const newExistingImages = existingImages.filter((_, i) => i !== index)
        setExistingImages(newExistingImages)
    }

    const handleSubmit = async () => {
        if (!validateForm() || !ideal) {
            return
        }
        setIsLoading(true)

        // Tạo FormData để gửi file
        const formDataToSend = new FormData()
        formDataToSend.append('title', formData.title)
        formDataToSend.append('description', formData.description)

        // Thêm tags từng cái một
        formData.tags.forEach((tag, index) => {
            formDataToSend.append(`tags[${index}]`, tag)
        })

        // Hoặc gửi tags dưới dạng JSON string nếu backend cần
        if (formData.tags.length > 0) {
            formDataToSend.append('tags_json', JSON.stringify(formData.tags))
            // Hoặc gửi dưới dạng comma-separated string
            formDataToSend.append('tags', formData.tags.join(','))
        }

        // Thêm file banner nếu có
        if (formData.banner) {
            formDataToSend.append('banner', formData.banner)
        }

        // Thêm file png nếu có
        if (formData.png) {
            formDataToSend.append('png', formData.png)
        }

        // Thêm images nếu có
        formData.images.forEach((image, index) => {
            formDataToSend.append(`images[${index}]`, image)
        })

        // Thêm existing images
        existingImages.forEach((imageUrl, index) => {
            formDataToSend.append(`existing_images[${index}]`, imageUrl)
        })

        const response = await axiosInstance.put(
            `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/ideals/${ideal._id}/update`,
            formDataToSend,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        ).then(response => {
            if (response.data.response === 'success') {
                // Increment tag usage after successful update
                if (formData.tags.length > 0) {
                    incrementTagUsage(formData.tags)
                }
                toast.success('Ideal updated successfully!')
                onSuccess()
                handleClose()
            } else {
                toast.error(response.data.message || 'Failed to update ideal')
            }
            setIsLoading(false)
        }).catch(error => {
            console.error('Error updating ideal:', error)
            toast.error(error.response?.data?.message || 'Failed to update ideal')
            setIsLoading(false)
        })
    }

    if (!ideal) return null

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby='edit-ideal-dialog-title'
            open={open}
            closeAfterTransition={false}
            PaperProps={{ sx: { overflow: 'visible' } }}
            maxWidth={'xl'}
            fullWidth
        >
            <DialogTitle id='edit-ideal-dialog-title'>
                <Typography variant='h5' component='span'>
                    Edit Ideal
                </Typography>
                <DialogCloseButton onClick={handleClose} disableRipple>
                    <i className='tabler-x' />
                </DialogCloseButton>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 2 }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant='h6' sx={{ mb: 2 }}>
                                Basic Information
                            </Typography>
                            <CustomTextField
                                fullWidth
                                label='Title'
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                error={!!errors.title}
                                helperText={errors.title}
                                sx={{ mb: 2 }}
                            />
                            {/* Banner upload - drag & drop */}
                            <Box sx={{ mb: 2 }}>
                                <Typography variant='subtitle2'>Banner (PNG, JPG, max 5MB)</Typography>
                                <Box
                                    {...getBannerRootProps()}
                                    sx={theme => ({
                                        border: '2px dashed',
                                        borderColor: isBannerDragActive ? theme.palette.primary.main : theme.palette.divider,
                                        borderRadius: 2,
                                        p: 2,
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        minHeight: 140,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: isBannerDragActive ? theme.palette.action.hover : theme.palette.background.paper,
                                        '&:hover': { backgroundColor: theme.palette.action.selected },
                                    })}
                                >
                                    <input {...getBannerInputProps()} />
                                    <Typography variant='body2' color='text.secondary'>
                                        Kéo & thả hoặc click để chọn file Banner
                                    </Typography>
                                    {bannerPreview && (
                                        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
                                            <img
                                                src={bannerPreview}
                                                alt='Banner preview'
                                                style={{ maxWidth: 120, maxHeight: 120, borderRadius: 4, border: '1px solid #ccc', background: '#f5f5f5', padding: 4 }}
                                                onError={(e) => {
                                                    console.log('Banner preview error, removing preview')
                                                    setBannerPreview(null)
                                                }}
                                            />
                                        </Box>
                                    )}
                                    {!bannerPreview && ideal.banner && (
                                        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
                                            <img
                                                src={ideal.banner}
                                                alt='Current banner'
                                                style={{ maxWidth: 120, maxHeight: 120, borderRadius: 4, border: '1px solid #ccc', background: '#f5f5f5', padding: 4 }}
                                            />
                                        </Box>
                                    )}
                                    {formData.banner && <Typography variant='caption'>{formData.banner.name}</Typography>}
                                    {errors.banner && <Typography color='error' variant='caption'>{errors.banner}</Typography>}
                                </Box>
                            </Box>
                            {/* Images upload - drag & drop */}
                            <Box sx={{ mb: 2 }}>
                                <Typography variant='subtitle2'>Additional Images (PNG, JPG, max 10MB each, max {MAX_IMAGES} images)</Typography>
                                <Box
                                    {...getImagesRootProps()}
                                    sx={theme => ({
                                        border: '2px dashed',
                                        borderColor: isImagesDragActive ? theme.palette.primary.main : theme.palette.divider,
                                        borderRadius: 2,
                                        p: 2,
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        minHeight: 140,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: isImagesDragActive ? theme.palette.action.hover : theme.palette.background.paper,
                                        '&:hover': { backgroundColor: theme.palette.action.selected },
                                    })}
                                >
                                    <input {...getImagesInputProps()} />
                                    <Typography variant='body2' color='text.secondary'>
                                        Kéo & thả hoặc click để chọn nhiều ảnh
                                    </Typography>
                                    {formData.images.length > 0 && (
                                        <Typography variant='caption' color='success.main'>
                                            Đã chọn {formData.images.length} ảnh
                                        </Typography>
                                    )}
                                    {errors.images && <Typography color='error' variant='caption'>{errors.images}</Typography>}
                                </Box>
                                {/* Existing images */}
                                {existingImages.length > 0 && (
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant='caption' sx={{ mb: 1, display: 'block' }}>
                                            Existing Images:
                                        </Typography>
                                        <Box sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 1,
                                            maxHeight: 200,
                                            overflowY: 'auto'
                                        }}>
                                            {existingImages.map((imageUrl, index) => (
                                                <Box key={index} sx={{ position: 'relative' }}>
                                                    <img
                                                        src={imageUrl}
                                                        alt={`Existing Image ${index + 1}`}
                                                        style={{
                                                            width: 80,
                                                            height: 80,
                                                            objectFit: 'cover',
                                                            borderRadius: 4,
                                                            border: '1px solid #ccc',
                                                            background: '#f5f5f5'
                                                        }}
                                                    />
                                                    <Button
                                                        size='small'
                                                        variant='contained'
                                                        color='error'
                                                        sx={{
                                                            position: 'absolute',
                                                            top: -8,
                                                            right: -8,
                                                            minWidth: 'auto',
                                                            width: 20,
                                                            height: 20,
                                                            borderRadius: '50%',
                                                            p: 0
                                                        }}
                                                        onClick={() => removeExistingImage(index)}
                                                    >
                                                        ×
                                                    </Button>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                )}
                                {/* Image previews */}
                                {imagePreviews.length > 0 && (
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant='caption' sx={{ mb: 1, display: 'block' }}>
                                            New Images ({imagePreviews.length}/{MAX_IMAGES}):
                                        </Typography>
                                        <Box sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 1,
                                            maxHeight: 200,
                                            overflowY: 'auto'
                                        }}>
                                            {imagePreviews.map((preview, index) => (
                                                <Box key={index} sx={{ position: 'relative' }}>
                                                    <img
                                                        src={preview}
                                                        alt={`Image ${index + 1}`}
                                                        style={{
                                                            width: 80,
                                                            height: 80,
                                                            objectFit: 'cover',
                                                            borderRadius: 4,
                                                            border: '1px solid #ccc',
                                                            background: '#f5f5f5'
                                                        }}
                                                    />
                                                    <Button
                                                        size='small'
                                                        variant='contained'
                                                        color='error'
                                                        sx={{
                                                            position: 'absolute',
                                                            top: -8,
                                                            right: -8,
                                                            minWidth: 'auto',
                                                            width: 20,
                                                            height: 20,
                                                            borderRadius: '50%',
                                                            p: 0
                                                        }}
                                                        onClick={() => removeImage(index)}
                                                    >
                                                        ×
                                                    </Button>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                            {/* PNG upload - drag & drop */}
                            <Box sx={{ mb: 2 }}>
                                <Typography variant='subtitle2'>PNG (PNG, JPG, max 20MB)</Typography>
                                <Box
                                    {...getPngRootProps()}
                                    sx={theme => ({
                                        border: '2px dashed',
                                        borderColor: isPngDragActive ? theme.palette.primary.main : theme.palette.divider,
                                        borderRadius: 2,
                                        p: 2,
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        minHeight: 140,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: isPngDragActive ? theme.palette.action.hover : theme.palette.background.paper,
                                        '&:hover': { backgroundColor: theme.palette.action.selected },
                                    })}
                                >
                                    <input {...getPngInputProps()} />
                                    <Typography variant='body2' color='text.secondary'>
                                        Kéo & thả hoặc click để chọn file PNG
                                    </Typography>
                                    {pngPreview && (
                                        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
                                            <img
                                                src={pngPreview}
                                                alt='PNG preview'
                                                style={{ maxWidth: 120, maxHeight: 120, borderRadius: 4, border: '1px solid #ccc', background: '#f5f5f5', padding: 4 }}
                                                onError={(e) => {
                                                    console.log('PNG preview error, removing preview')
                                                    setPngPreview(null)
                                                }}
                                            />
                                        </Box>
                                    )}
                                    {!pngPreview && ideal.png && (
                                        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
                                            <img
                                                src={ideal.png}
                                                alt='Current PNG'
                                                style={{ maxWidth: 120, maxHeight: 120, borderRadius: 4, border: '1px solid #ccc', background: '#f5f5f5', padding: 4 }}
                                            />
                                        </Box>
                                    )}
                                    {formData.png && <Typography variant='caption'>{formData.png.name}</Typography>}
                                    {errors.png && <Typography color='error' variant='caption'>{errors.png}</Typography>}
                                </Box>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TagAutocomplete
                                value={formData.tags}
                                onChange={(tags) => handleInputChange('tags', tags)}
                                placeholder='Add tag and press Enter'
                                label='Tags'
                            />
                            <CustomTextField
                                fullWidth
                                label='Description'
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                error={!!errors.description}
                                helperText={errors.description}
                                multiline
                                rows={4}
                                sx={{ mt: 2 }}
                            />
                        </Grid>
                    </Grid>
                    <Alert severity='info' sx={{ mt: 2 }}>
                        <Typography variant='body2'>
                            Update the ideal information. All fields are optional except title.
                        </Typography>
                    </Alert>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                <Button onClick={handleClose} variant='outlined'>
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant='contained'
                    disabled={isLoading}
                >
                    {isLoading ? 'Updating...' : 'Update Ideal'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditIdealDialog 