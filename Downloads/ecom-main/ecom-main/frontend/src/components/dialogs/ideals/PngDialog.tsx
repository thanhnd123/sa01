import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

import DialogCloseButton from '@components/dialogs/DialogCloseButton'
import { useSession } from 'next-auth/react'
import apiClient from '@/services/apiClient'
import { ApiResponse } from '@/services/designService'
import { ProductTypes } from './index'
import axiosInstance from '@/libs/axios'

// Constants
const MAX_FILE_SIZE = 30 * 1024 * 1024 // 20MB
const ACCEPTED_FILE_TYPES = {
    'image/png': ['.png'],
    'image/x-png': ['.png'],
    'image/jpeg': ['.jpeg'],
    'image/jpg': ['.jpg']
}

// Types
interface PngDialogProps {
    open: boolean
    handleCloseModal: () => void
    productIdeal: {
        _id: string
        title: string
        banner?: string
        market?: string
        product_type?: string[]
        png?: string
    }
    userId: string
}

interface FilePreview {
    file: File | null
    preview: string | null
    name?: string
}

const fetchIdeal = async (_id: string) => {
    try {
        const response = await axiosInstance.get(`/api/authenticated/ideals/show?id=${_id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching ideal:', error);
        toast.error('Failed to fetch ideal details');
        return null;
    }
}

// Component
const PngDialog = ({
    open,
    handleCloseModal,
    productIdeal,
    userId
}: PngDialogProps) => {
    // States
    const [isLoading, setIsLoading] = useState(false)
    const [filePreview, setFilePreview] = useState<FilePreview | null>(null)
    const [idealDetail, setIdealDetail] = useState<any>(null)
    // Effects
    useEffect(() => {
        const init = async () => {
            if (productIdeal?._id) {
                const data = await fetchIdeal(productIdeal._id)
                console.log(data)
                if (data) {
                    setIdealDetail(data)
                    if (data.png) {
                        setFilePreview({
                            file: null,
                            preview: data.png,
                        })
                    }
                    else{
                        setFilePreview({
                            file: null,
                            preview: null,
                        })
                    }
                }
            }
        }
        if (open) {
            init()
            console.log(filePreview)
        }
    }, [open])

    // Cleanup effect
    useEffect(() => {
        return () => {
            if (filePreview?.preview) {
                URL.revokeObjectURL(filePreview.preview)
            }
        }
    }, [filePreview])

    // Handlers
    const handleFileDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return

        const file = acceptedFiles[0]

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            toast.error(`File ${file.name} is too large. Maximum size is 20MB.`)
            return
        }

        // Validate file type
        const isValidType = Object.keys(ACCEPTED_FILE_TYPES).some(type => 
            file.type === type || file.name.toLowerCase().endsWith(type.split('/')[1])
        )

        if (!isValidType) {
            toast.error(`File ${file.name} is not a valid image file.`)
            return
        }

        // Create preview URL
        const preview = URL.createObjectURL(file)
        setFilePreview({ file, preview, name: file.name })
        // toast.success('Image uploaded successfully')
    }

    const handleRemoveFile = () => {
        if (filePreview?.preview) {
            URL.revokeObjectURL(filePreview.preview)
        }
        setFilePreview(null)
    }

    const handleSave = async () => {
        if (!filePreview) {
            toast.error('Please upload an image first')
            return
        }
        try {
            const formData = new FormData()
            
            // Nếu có file mới upload
            if (filePreview.file) {
                formData.append('png', filePreview.file)
            } 
            // Nếu chỉ có URL (không có file mới)
            else if (filePreview.preview) {
                toast.success('Successfully uploaded image!')
                return;
            }

            // Thêm các thông tin cần thiết
            formData.append('ideal_id', productIdeal._id)
            formData.append('created_by', userId)
            formData.append('type', 'png') // Thêm type để phân biệt với các loại file khác

            // Gọi API để lưu file
            const response = await axiosInstance.post('/api/authenticated/ideals/update-png',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )

            if (response.data?.success) {
                toast.success('PNG saved successfully!')
                handleCloseModal()
            } else {
                throw new Error(response.data?.message || 'Failed to save PNG')
            }
        } catch (error) {
            console.error('Error saving PNG:', error)
            toast.error(error instanceof Error ? error.message : 'Failed to save PNG')
        }
    }

    // Dropzone config
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleFileDrop,
        accept: ACCEPTED_FILE_TYPES,
        maxFiles: 1,
        maxSize: MAX_FILE_SIZE,
        multiple: false
    })

    return (
        <Dialog
            open={open}
            onClose={handleCloseModal}
            aria-labelledby='png-dialog-title'
            maxWidth='md'
            PaperProps={{
                sx: {
                    overflow: 'visible'
                }
            }}
        >
            <DialogTitle id='png-dialog-title'>
                <Typography variant='h5' component='span'>
                    {idealDetail?.title || 'Upload PNG'}
                </Typography>
                <DialogCloseButton onClick={handleCloseModal} disableRipple>
                    <i className='tabler-x' />
                </DialogCloseButton>
            </DialogTitle>

            {idealDetail?.banner && (
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                    <img 
                        src={idealDetail.banner}
                        alt={idealDetail?.title || 'Product banner'}
                        style={{
                            maxHeight: 200,
                            objectFit: 'contain',
                            borderRadius: 4
                        }}
                    />
                </Box>
            )}

            <DialogContent>
                <Box sx={{ mb: 2, border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}>
                    <Typography variant='subtitle1' fontWeight={600} sx={{ mb: 1 }}>
                        Upload Image
                    </Typography>

                    <Box
                        {...getRootProps()}
                        sx={{
                            border: '2px dashed',
                            borderColor: isDragActive ? 'primary.main' : 'divider',
                            borderRadius: 1,
                            p: 2,
                            textAlign: 'center',
                            cursor: 'pointer',
                            minHeight: 100,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: isDragActive ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                borderColor: 'primary.main'
                            }
                        }}
                    >
                        <input {...getInputProps()} />
                        <Typography>
                            Drag and drop an image here, or click to select file
                        </Typography>
                    </Box>

                    {filePreview?.preview && (
                        <Box
                            sx={{
                                mt: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1,
                                flexDirection: 'column'
                            }}
                        >
                            <img
                                src={filePreview.preview}
                                alt="Preview"
                                style={{
                                    width: 120,
                                    height: 120,
                                    objectFit: 'contain',
                                    borderRadius: 4,
                                    border: '1px solid #ccc',
                                    backgroundColor: '#f5f5f5',
                                    padding: '4px'
                                }}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant='body2' color='text.secondary'>
                                    {filePreview.name || filePreview.file?.name}
                                </Typography>
                                <IconButton size='small' onClick={handleRemoveFile}>
                                    <span style={{ fontWeight: 700, fontSize: 14 }}>×</span>
                                </IconButton>
                            </Box>
                        </Box>
                    )}
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => {
                    handleCloseModal()
                    setFilePreview(null)
                }} variant='tonal' color='secondary'>
                    Cancel
                </Button>
                <Button 
                    onClick={handleSave}
                    variant='contained'
                    color='primary'
                    startIcon={isLoading ? <CircularProgress size={20} /> : <i className='tabler-photo' />}
                >
                    Save Image
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PngDialog