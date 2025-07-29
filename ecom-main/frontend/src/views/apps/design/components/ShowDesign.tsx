'use client'

// React Imports
import { useState, useEffect, useMemo, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import { toast } from 'react-toastify'
import { DeleteDialog } from './DeleteDialog'
import axiosInstance from '@/libs/axios'
import { useUser, useAdmin, useAuth } from '@/contexts/UserContext'
import Lightbox from '@/components/Lightbox'
import LinearProgress from '@mui/material/LinearProgress'
import CircularProgress from '@mui/material/CircularProgress'
import Autocomplete from '@mui/material/Autocomplete'
import CreateListingDialog from './CreateListingDialog'
import NotesLog from '@components/common/NotesLog'
import { Design } from '../types'

// Types
interface ProductBannerDropzoneProps {
  productType: {
    id: string
    name: string
  }
  onDrop: (files: File[]) => void
  selectedFiles: File[]
  onImageClick: (imageUrl: string, alt: string) => void
}

interface PngDropzoneProps {
  onDrop: (file: File) => void
  selectedFile: File | null
  onImageClick: (imageUrl: string, alt: string) => void
}

interface ShowDesignProps {
  open: boolean
  onClose: () => void
  design: Design | null
  onDelete: (id: string) => void
  onUpdate: (id: string, data: { seller_note?: string }) => Promise<void>
  isAdmin?: boolean
  isManager?: boolean
  onDesignUpdate?: (design: Design) => void
  onTaskAdded?: () => void
  onNewDesignsReload?: () => void
  onGenerateBanner?: (design: Design) => void
  onSubmitSuccess?: () => void
  onMyDesignsReload?: () => void
}

const MAX_FILE_SIZE = 40 * 1024 * 1024 // 5MB per file
const MAX_TOTAL_SIZE = 200 * 1024 * 1024 // 200MB total
const CHUNK_SIZE = 15 * 1024 * 1024 // 15MB per chunk

const ProductBannerDropzone = ({ productType, onDrop, selectedFiles, onImageClick }: ProductBannerDropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    onDrop: acceptedFiles => {
      const oversizedFiles = acceptedFiles.filter(file => file.size > MAX_FILE_SIZE)
      if (oversizedFiles.length > 0) {
        toast.error(`Some files exceed the maximum size of ${MAX_FILE_SIZE / 1024 / 1024}MB`)
        return
      }
      onDrop(acceptedFiles)
    }
  })

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant='subtitle2' sx={{ mb: 1 }}>
        {/* {productType.name} */}
      </Typography>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: 'divider',
          borderRadius: 1,
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor: 'action.hover'
          }
        }}
      >
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <i className='tabler-upload text-2xl' />
          <Typography>
            {isDragActive ? 'Drop the banner files here' : 'Drag and drop banner files here, or click to select'}
          </Typography>
          {selectedFiles.length > 0 && (
            <Typography variant='body2' color='success.main'>
              Selected {selectedFiles.length} files
            </Typography>
          )}
        </Box>
      </Box>
      {selectedFiles.length > 0 && (
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {selectedFiles.map((file, index) => (
            <Box
              key={index}
              sx={{
                position: 'relative',
                width: 60,
                height: 60,
                borderRadius: 1,
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onClick={() => onImageClick(URL.createObjectURL(file), `Preview ${index + 1}`)}
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

const PngDropzone = ({ onDrop, selectedFile, onImageClick }: PngDropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/png': ['.png']
    },
    onDrop: acceptedFiles => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        if (file.size > MAX_FILE_SIZE) {
          toast.error(`File exceeds the maximum size of ${MAX_FILE_SIZE / 1024 / 1024}MB`)
          return
        }
        onDrop(file)
      }
    }
  })

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant='subtitle1' sx={{ mb: 1 }}>
        Upload PNG File
      </Typography>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: 'divider',
          borderRadius: 1,
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor: 'action.hover'
          }
        }}
      >
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <i className='tabler-upload text-2xl' />
          <Typography>
            {isDragActive ? 'Drop the PNG file here' : 'Drag and drop a PNG file here, or click to select'}
          </Typography>
          {selectedFile && (
            <Typography variant='body2' color='success.main'>
              Selected: {selectedFile.name}
            </Typography>
          )}
        </Box>
      </Box>
      {selectedFile && (
        <Box
          sx={{
            mt: 2,
            cursor: 'pointer',
            position: 'relative',
            width: 'fit-content'
          }}
          onClick={() => onImageClick(URL.createObjectURL(selectedFile), 'PNG Preview')}
        >
          <img
            src={URL.createObjectURL(selectedFile)}
            alt='PNG Preview'
            style={{
              maxWidth: '100%',
              maxHeight: '80px',
              objectFit: 'contain',
              borderRadius: '8px'
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(0,0,0,0.5)',
              color: 'white',
              borderRadius: '4px',
              p: 0.5,
              fontSize: '12px'
            }}
          >
            Click to preview
          </Box>
        </Box>
      )}
    </Box>
  )
}

const ShowDesign = ({
  open,
  onClose,
  design,
  onDelete,
  onUpdate,
  isAdmin,
  isManager,
  onDesignUpdate,
  onTaskAdded,
  onNewDesignsReload,
  onGenerateBanner,
  onSubmitSuccess,
  onMyDesignsReload
}: ShowDesignProps) => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false)
  const [note, setNote] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [designerNote, setDesignerNote] = useState('')
  const [otherResult, setOtherResult] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File[] }>({})
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<string>('')
  const [lightboxAlt, setLightboxAlt] = useState<string>('')
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const [totalProgress, setTotalProgress] = useState(0)
  const [currentDesign, setCurrentDesign] = useState<Design | null>(null)
  const [selectedProductBanner, setSelectedProductBanner] = useState<any>(null)
  const [previewUrls, setPreviewUrls] = useState<{ [key: string]: string }>({})
  const [createListingDialogOpen, setCreateListingDialogOpen] = useState(false)
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isAddingToMyTask, setIsAddingToMyTask] = useState(false);
  // Thêm state cho requiredTasks khi edit

  useEffect(() => {
    if (open && design?._id) {
      // KHÔNG reset selectedFile và selectedFiles ở đây nữa để tránh mất state khi upload
      // setSelectedFile(null)
      // setSelectedFiles({})

      // Fetch data mới
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(`/api/authenticated/design/${design._id}/show`)
          if (response.data.success) {
            const updatedDesign = response.data.data
            setCurrentDesign(updatedDesign)
            onDesignUpdate?.(updatedDesign)

            // Cập nhật các state từ data mới
            setNote(updatedDesign.seller_note)
            setDesignerNote(updatedDesign.designer_result?.note || '')
            setOtherResult(updatedDesign.designer_result?.other_result || '')

            // Load product banners nếu có
            if (updatedDesign.designer_result?.product_banners) {
              const newSelectedFiles: { [key: string]: File[] } = {}
              Object.entries(updatedDesign.designer_result.product_banners).forEach(([productTypeId, urls]) => {
                if (Array.isArray(urls)) {
                  Promise.all(
                    urls.map(url =>
                      fetch(url)
                        .then(res => res.blob())
                        .then(blob => new File([blob], `banner_${productTypeId}.png`, { type: 'image/png' }))
                    )
                  ).then(files => {
                    newSelectedFiles[productTypeId] = files
                    setSelectedFiles(prev => ({ ...prev, ...newSelectedFiles }))
                  })
                }
              })
            }
          }
        } catch (error) {
          console.error('Error fetching design data:', error)
        }
      }

      fetchData()
    }
  }, [open, design?._id])

  // Cleanup preview URLs when component unmounts or when selected files change
  useEffect(() => {
    return () => {
      // Cleanup all preview URLs
      Object.values(previewUrls).forEach(url => {
        URL.revokeObjectURL(url)
      })
    }
  }, [])

  // Update preview URLs when selected files change
  useEffect(() => {
    // Cleanup old preview URLs
    Object.values(previewUrls).forEach(url => {
      URL.revokeObjectURL(url)
    })

    // Create new preview URLs
    const newPreviewUrls: { [key: string]: string } = {}

    if (selectedFile) {
      newPreviewUrls['png'] = URL.createObjectURL(selectedFile)
    }

    Object.entries(selectedFiles).forEach(([productTypeId, files]) => {
      files.forEach((file, index) => {
        newPreviewUrls[`${productTypeId}_${index}`] = URL.createObjectURL(file)
      })
    })

    setPreviewUrls(newPreviewUrls)
  }, [selectedFile, selectedFiles])

  const handlePngDrop = useCallback((file: File) => {
    setSelectedFile(file)
  }, [])

  const handleProductBannerDrop = useCallback((productTypeId: string, acceptedFiles: File[]) => {
    setSelectedFiles(prev => ({
      ...prev,
      [productTypeId]: acceptedFiles
    }))
  }, [])

  const isOwner = useMemo(() => {
    if (!design || !user?.id) return false
    return design.order_by_user_id === user.id
  }, [design, user?.id])

  const isDesigner = useMemo(() => {
    if (!design || !user?.id) return false
    return design.designer_id === user.id
  }, [design, user?.id])

  const handleUpdate = async () => {
    if (!design) return
    try {
      setIsUpdating(true)
      await axiosInstance.put(`/api/authenticated/design/${design._id}/update`, { seller_note: note })
      setIsEditing(false)
      toast.success('Design updated successfully')
      // Reload lại dữ liệu
      const response = await axiosInstance.get(`/api/authenticated/design/${design._id}/show`)
      if (response.data.success) {
        setCurrentDesign(response.data.data)
        onDesignUpdate?.(response.data.data)
      }
    } catch (error) {
      toast.error('Failed to update design')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDeleteConfirmOpen = () => {
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirmClose = () => {
    setDeleteDialogOpen(false)
  }

  const handleDeleteDesign = async () => {
    if (!design) return

    setDeleteLoading(true)
    await axiosInstance
      .delete(`/api/authenticated/design/${design._id}`)
      .then(res => {
        toast.success('Design deleted successfully')
        onDelete(design._id)
        handleDeleteConfirmClose()
        onClose()
      })
      .catch(err => {
        toast.error('Failed to delete design. Please try again.')
      })
    setDeleteLoading(false)
  }

  const handleAddToMyTask = async () => {
    if (!design || !user?.id) return
    setIsAddingToMyTask(true);
    try {
      const response = await axiosInstance.put(`/api/authenticated/design/${design._id}/assign`, {
        designer_id: user.id,
        status: 'processing'
      })
      if (response.data.success) {
        toast.success('Task added to your list successfully')
        onTaskAdded?.()
        onNewDesignsReload?.()
        onMyDesignsReload?.()
        if (design._id) {
          const res = await axiosInstance.get(`/api/authenticated/design/${design._id}/show`)
          if (res.data.success) {
            setCurrentDesign(res.data.data)
            onDesignUpdate?.(res.data.data)
          }
        }
      } else {
        throw new Error(response.data.message || 'Failed to add task')
      }
    } catch (error) {
      toast.error('Failed to add task. Please try again.')
    }
    setIsAddingToMyTask(false);
  }

  const calculateTotalSize = useCallback(() => {
    let totalSize = 0

    if (selectedFile) {
      totalSize += selectedFile.size
    }

    Object.values(selectedFiles).forEach(files => {
      files.forEach(file => {
        totalSize += file.size
      })
    })

    return totalSize
  }, [selectedFile, selectedFiles])

  const calculateTotalProgress = useCallback(() => {
    const progresses = Object.values(uploadProgress)
    if (progresses.length === 0) return 0
    return progresses.reduce((sum, progress) => sum + progress, 0) / progresses.length
  }, [uploadProgress])

  useEffect(() => {
    setTotalProgress(calculateTotalProgress())
  }, [uploadProgress, calculateTotalProgress])

  // Debug currentDesign
  useEffect(() => {
    // console.log('=== CURRENTDESIGN CHANGED ===')
    // console.log('Current design:', currentDesign)
    // console.log('Current design ID:', currentDesign?._id)
  }, [currentDesign])

  const uploadChunk = async (file: File, chunkIndex: number, totalChunks: number, fileId: string) => {
    const start = chunkIndex * CHUNK_SIZE
    const end = Math.min(start + CHUNK_SIZE, file.size)
    const chunk = file.slice(start, end)

    const chunkFormData = new FormData()
    chunkFormData.append('chunk', chunk)
    chunkFormData.append('chunkIndex', chunkIndex.toString())
    chunkFormData.append('totalChunks', totalChunks.toString())
    chunkFormData.append('fileId', fileId)
    chunkFormData.append('fileName', file.name)
    chunkFormData.append('fileType', file.type)

    await axiosInstance.put(`/api/authenticated/design/${design?._id}/submit/chunk`, chunkFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!)
        setUploadProgress(prev => ({
          ...prev,
          [fileId]: (chunkIndex * 100 + percentCompleted) / totalChunks
        }))
      }
    })
  }

  const uploadFile = async (file: File, fileId: string) => {
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE)

    for (let i = 0; i < totalChunks; i++) {
      await uploadChunk(file, i, totalChunks, fileId)
    }
  }

  const handleDesignerSubmit = async () => {
    if (!design) return
    setIsUploading(true)
    setUploadProgress({})

    // Check total size
    const totalSize = calculateTotalSize()
    if (totalSize > MAX_TOTAL_SIZE) {
      toast.error(`Total file size exceeds the maximum limit of ${MAX_TOTAL_SIZE / 1024 / 1024}MB`)
      setIsUploading(false)
      return
    }

    // Upload PNG file if required
    if (design.required_tasks?.png && selectedFile) {
      await uploadFile(selectedFile, 'png_file')
    }

    // Upload product banners
    if (design.required_tasks?.productBanner?.enabled) {
      const hasAllBanners = design.required_tasks.productBanner.productTypes.every(
        (type: { id: string; name: string }) => selectedFiles[type.id] && selectedFiles[type.id].length > 0
      )

      if (!hasAllBanners) {
        toast.error('Please upload all required product banners')
        setIsUploading(false)
        return
      }

      // Upload banners mới
      for (const [productTypeId, files] of Object.entries(selectedFiles)) {
        for (let i = 0; i < files.length; i++) {
          const fileId = `product_banner_${productTypeId}_${i}`
          await uploadFile(files[i], fileId)
        }
      }
    }

    // Submit final data
    const finalFormData = new FormData()
    // finalFormData.append('note', designerNote)
    // if (design.required_tasks?.other?.enabled) {
    //   if (!otherResult) {
    //     toast.error('Please provide other requirements result')
    //     setIsUploading(false)
    //     return
    //   }
    //   finalFormData.append('other_result', otherResult)
    // }

    const response = await axiosInstance
      .put(`/api/authenticated/design/${design._id}/submit/finalize`, finalFormData)
      .then(res => {
        toast.success('Design result uploaded successfully')
        // onClose() // BỎ tự động đóng dialog khi submit thành công
        onSubmitSuccess?.()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleSubmitForReview = async () => {
    if (!design) return
    
    try {
      setIsUploading(true)
      
      // Upload files first if any are selected
      if (selectedFile || Object.keys(selectedFiles).length > 0) {
        setUploadProgress({})

        // Check total size
        const totalSize = calculateTotalSize()
        if (totalSize > MAX_TOTAL_SIZE) {
          toast.error(`Total file size exceeds the maximum limit of ${MAX_TOTAL_SIZE / 1024 / 1024}MB`)
          setIsUploading(false)
          return
        }

        // Upload PNG file if required and selected
        if (design.required_tasks?.png && selectedFile) {
          await uploadFile(selectedFile, 'png_file')
        }

        // Upload product banners if selected
        if (design.required_tasks?.productBanner?.enabled && Object.keys(selectedFiles).length > 0) {
          for (const [productTypeId, files] of Object.entries(selectedFiles)) {
            for (let i = 0; i < files.length; i++) {
              const fileId = `product_banner_${productTypeId}_${i}`
              await uploadFile(files[i], fileId)
            }
          }
        }
      }

      // Update status to submitted
      await axiosInstance.put(`/api/authenticated/design/${design._id}/update`, {
        status: 'submitted'
      })

      toast.success('Design submitted for review successfully')
      onSubmitSuccess?.()
      
      // Refresh design data
      if (design._id) {
        const res = await axiosInstance.get(`/api/authenticated/design/${design._id}/show`)
        if (res.data.success) {
          setCurrentDesign(res.data.data)
          onDesignUpdate?.(res.data.data)
        }
      }
      
    } catch (error) {
      console.error('Error submitting design for review:', error)
      toast.error('Failed to submit design for review')
    } finally {
      setIsUploading(false)
    }
  }

  // Quick submit for review without uploading files (for header button)
  const handleQuickSubmitForReview = async () => {
    if (!design) return
    
    try {
      setIsUploading(true)
      
      // Directly update status to submitted without file uploads
      await axiosInstance.put(`/api/authenticated/design/${design._id}/update`, {
        status: 'submitted'
      })

      toast.success('Design submitted for review successfully')
      onSubmitSuccess?.()
      
      // Refresh design data
      if (design._id) {
        const res = await axiosInstance.get(`/api/authenticated/design/${design._id}/show`)
        if (res.data.success) {
          setCurrentDesign(res.data.data)
          onDesignUpdate?.(res.data.data)
        }
      }
      
    } catch (error) {
      console.error('Error submitting design for review:', error)
      toast.error('Failed to submit design for review')
    } finally {
      setIsUploading(false)
    }
  }

  // Approve design (admin/manager only)
  const handleApproveDesign = async () => {
    if (!design) return
    
    try {
      setIsUploading(true)
      
      await axiosInstance.put(`/api/authenticated/design/${design._id}/update`, {
        status: 'processing'
      })

      toast.success('Design approved and moved back to processing')
      onSubmitSuccess?.()
      
      // Refresh design data
      if (design._id) {
        const res = await axiosInstance.get(`/api/authenticated/design/${design._id}/show`)
        if (res.data.success) {
          setCurrentDesign(res.data.data)
          onDesignUpdate?.(res.data.data)
        }
      }
      
    } catch (error) {
      console.error('Error approving design:', error)
      toast.error('Failed to approve design')
    } finally {
      setIsUploading(false)
    }
  }

  // Reject design (admin/manager only)
  const handleRejectDesign = async () => {
    if (!design) return
    
    try {
      setIsUploading(true)
      
      await axiosInstance.put(`/api/authenticated/design/${design._id}/update`, {
        status: 'rejected'
      })

      toast.success('Design rejected')
      onSubmitSuccess?.()
      
      // Refresh design data
      if (design._id) {
        const res = await axiosInstance.get(`/api/authenticated/design/${design._id}/show`)
        if (res.data.success) {
          setCurrentDesign(res.data.data)
          onDesignUpdate?.(res.data.data)
        }
      }
      
    } catch (error) {
      console.error('Error rejecting design:', error)
      toast.error('Failed to reject design')
    } finally {
      setIsUploading(false)
    }
  }

  // Simple submit function for header button (just change status)
  const handleQuickSubmit = async () => {
    if (!design) return
    
    try {
      setIsUploading(true)
      
      // Just update status to submitted without uploading files
      await axiosInstance.put(`/api/authenticated/design/${design._id}/update`, {
        status: 'submitted'
      })

      toast.success('Design status changed to Submitted')
      onSubmitSuccess?.()
      
      // Refresh design data
      if (design._id) {
        const res = await axiosInstance.get(`/api/authenticated/design/${design._id}/show`)
        if (res.data.success) {
          setCurrentDesign(res.data.data)
          onDesignUpdate?.(res.data.data)
        }
      }
      
    } catch (error) {
      console.error('Error changing design status:', error)
      toast.error('Failed to change design status')
    } finally {
      setIsUploading(false)
    }
  }

  const handleImageClick = (imageUrl: string, alt: string) => {
    setLightboxImage(imageUrl)
    setLightboxAlt(alt)
    setLightboxOpen(true)
  }

  if (!currentDesign) return null
  return (
    <>
      <Dialog
        fullWidth
        maxWidth='md'
        open={open}
        onClose={onClose}
        scroll='paper'
        closeAfterTransition={false}
        sx={{
          '& .MuiDialog-paper': {
            overflow: 'hidden',
            position: 'absolute',
            right: 0,
            margin: 0,
            height: '100%',
            maxHeight: '100%',
            width: '50%',
            maxWidth: '50%'
          }
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'text.secondary',
            zIndex: 1
          }}
        >
          <i className='tabler-x' />
        </IconButton>
        <DialogContent
          className='p-4'
          sx={{
            height: '100%',
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px'
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent'
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '4px'
            }
          }}
        >
          <Box sx={{ display: 'flex', gap: 3, height: '100%' }}>
            {/* Left Column - Task Information */}
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant='h5'>
                  Task Details
                </Typography>
                {!isEditing && (
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    {/* Status Chip - Show current status only when Submit button is not shown */}
                    {!((isDesigner || isAdmin || isManager || isOwner) && (currentDesign.status === 'new' || currentDesign.status === 'processing')) && (
                      <Chip
                        label={currentDesign.status.charAt(0).toUpperCase() + currentDesign.status.slice(1)}
                        color={
                          currentDesign.status === 'new' ? 'warning' :
                          currentDesign.status === 'processing' ? 'info' :
                          currentDesign.status === 'submitted' ? 'warning' :
                          currentDesign.status === 'completed' ? 'success' :
                          currentDesign.status === 'rejected' ? 'error' : 'default'
                        }
                        size='small'
                        sx={{ mr: 1 }}
                        icon={
                          currentDesign.status === 'submitted' ? <i className='tabler-clock' /> :
                          currentDesign.status === 'completed' ? <i className='tabler-check' /> :
                          currentDesign.status === 'rejected' ? <i className='tabler-x' /> :
                          undefined
                        }
                      />
                    )}
                    
                    {/* Submit for Review button - Show for designers working on this task */}
                    {(isDesigner && currentDesign.status === 'processing') && (
                      <Button
                        variant='contained'
                        size='small'
                        color='warning'
                        onClick={handleQuickSubmitForReview}
                        startIcon={<i className='tabler-send' />}
                        disabled={isUploading}
                      >
                        {isUploading ? 'Submitting...' : 'Submit for Review'}
                      </Button>
                    )}
                    
                    {/* Approve/Reject buttons - Show for admin/manager when status is submitted */}
                    {(isAdmin || isManager) && currentDesign.status === 'submitted' && (
                      <>
                        <Button
                          variant='contained'
                          size='small'
                          color='success'
                          onClick={handleApproveDesign}
                          startIcon={<i className='tabler-check' />}
                          disabled={isUploading}
                        >
                          Approve
                        </Button>
                        <Button
                          variant='outlined'
                          size='small'
                          color='error'
                          onClick={handleRejectDesign}
                          startIcon={<i className='tabler-x' />}
                          disabled={isUploading}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    
                    {/* Submit button - Show for designer/admin/manager/owner when status is new or processing */}
                    {(isDesigner || isAdmin || isManager || isOwner) && (currentDesign.status === 'new' || currentDesign.status === 'processing') && (
                      <Button
                        variant='contained'
                        size='small'
                        color='warning'
                        onClick={handleQuickSubmit}
                        startIcon={isUploading ? <CircularProgress size={16} color="inherit" /> : <i className='tabler-send' />}
                        disabled={isUploading}
                        sx={{
                          backgroundColor: '#ff9800',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: '#f57c00'
                          }
                        }}
                      >
                        {isUploading ? 'Submitting...' : 'Submitted'}
                      </Button>
                    )}
                    
                    {/* Edit Task button - Show for admin/owner */}
                    {(isAdmin || isOwner) && !isEditing && (
                      <Button
                        variant='outlined'
                        size='small'
                        color='primary'
                        onClick={() => setIsEditing(true)}
                        startIcon={<i className='tabler-edit' />}
                      >
                        Edit Task
                      </Button>
                    )}
                    
                    {/* Delete Task button - Show for admin only */}
                    {isAdmin && (
                      <Button
                        variant='outlined'
                        size='small'
                        color='error'
                        onClick={handleDeleteConfirmOpen}
                        startIcon={<i className='tabler-trash' />}
                      >
                        Delete Task
                      </Button>
                    )}
                  </Box>
                )}
              </Box>
              
              {/* Status Information */}
              {currentDesign.status === 'submitted' && (
                <Box sx={{ 
                  mb: 2, 
                  p: 2, 
                  bgcolor: 'primary.light', 
                  borderRadius: 1, 
                  border: '1px solid',
                  borderColor: 'primary.main'
                }}>
                  <Typography variant='body2' color='primary.dark' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <i className='tabler-info-circle' />
                    This design has been submitted for review and is waiting for admin/manager approval.
                  </Typography>
                </Box>
              )}
              
              {/* Banner Image */}
              {currentDesign.banner && (
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <img
                      src={currentDesign.banner}
                      alt={currentDesign.seller_note}
                      style={{
                        width: '100%',
                        maxWidth: '200px',
                        height: 'auto',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        setImageUrl(currentDesign.banner);
                        setOpenImageDialog(true);
                      }}
                    />
                  </Box>
                  {/* Hiển thị thêm các ảnh trong mảng images nếu có */}
                  {Array.isArray(currentDesign.images) && currentDesign.images.length > 0 && (
                    <Box sx={{
                      display: 'flex',
                      gap: 2,
                      mt: 1,
                      overflowX: 'auto',
                      maxWidth: '100%',
                      pb: 1
                    }}>
                      {currentDesign.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`Image ${idx + 1}`}
                          style={{
                            width: '100%',
                            maxWidth: '60px',
                            height: 'auto',
                            objectFit: 'cover',
                            borderRadius: 8,
                            cursor: 'pointer',
                            border: '1px solid #eee',
                            background: '#fafafa',
                            flex: '0 0 auto'
                          }}
                          onClick={() => {
                            setImageUrl(img);
                            setOpenImageDialog(true);
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              )}

              {/* Creator Info */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 28, height: 28, mr: 1 }}>
                  <i className='tabler-user' />
                </Avatar>
                <Typography variant='body2'>{currentDesign.created_by.name || currentDesign.created_by.username || 'Unknown Creator'}</Typography>
              </Box>
              {isEditing ? (
                <Box sx={{ mb: 2 }}>
                  <Typography variant='subtitle2' sx={{ mb: 1 }}>
                    Note
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    size="small"
                  />
                </Box>
              ) : (
                <>
                  <Typography variant='h6' sx={{ mb: 1 }}>
                    Note: {currentDesign.seller_note}
                  </Typography>

                  {currentDesign?.required_tasks && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant='subtitle2' sx={{ mb: 1 }}>
                        Required Tasks
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        {currentDesign.required_tasks.png && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <i className='tabler-clock-cog text-primary' style={{ fontSize: '14px' }} />
                            <Typography variant='body2'>PNG</Typography>
                          </Box>
                        )}
                        {currentDesign.required_tasks.productBanner.enabled && (
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <i className='tabler-clock-cog text-primary' style={{ fontSize: '14px' }} />
                              <Typography variant='body2'>Product Banner</Typography>
                            </Box>
                            {currentDesign.required_tasks.productBanner.productTypes.length > 0 && (
                              <Box sx={{ ml: 3, mt: 0.5 }}>
                                <Typography variant='caption' color='text.secondary'>
                                  Banners for:
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                                  {currentDesign.required_tasks.productBanner.productTypes.map(type => (
                                    <Chip key={type.id} label={type.name} size='small' variant='outlined' />
                                  ))}
                                </Box>
                              </Box>
                            )}
                          </Box>
                        )}
                        {currentDesign.required_tasks.other?.enabled && currentDesign.required_tasks.other?.note && (
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <i className='tabler-clock-cog text-primary' style={{ fontSize: '14px' }} />
                              <Typography variant='body2'>Other Requirements</Typography>
                            </Box>
                            <Typography variant='caption' color='text.secondary' sx={{ ml: 3, mt: 0.5 }}>
                              {currentDesign.required_tasks.other.note}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  )}
                </>
              )}
              {/* Action Buttons - Only show Save/Cancel when editing */}
              {isEditing && (
                <Box
                  sx={{
                    position: 'sticky',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    gap: 1,
                    justifyContent: 'flex-end',
                    mt: 'auto',
                    pt: 2,
                    backgroundColor: 'background.paper',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    p: 1
                  }}
                >
                  <Button
                    variant='outlined'
                    size='small'
                    color='error'
                    onClick={() => setIsEditing(false)}
                    disabled={isUpdating}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant='contained'
                    size='small'
                    color='primary'
                    onClick={handleUpdate}
                    disabled={isUpdating}
                    startIcon={isUpdating ? <CircularProgress size={16} color="inherit" /> : undefined}
                  >
                    {isUpdating ? 'Updating...' : 'Save'}
                  </Button>
                </Box>
              )}
              {/* Action section */}
              {user && currentDesign.status === 'new' && currentDesign.designer_id !== user.id && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleAddToMyTask}
                    startIcon={isAddingToMyTask ? <CircularProgress size={16} color="inherit" /> : <i className='tabler-plus' />}
                    size="small"
                    disabled={isAddingToMyTask}
                  >
                    {isAddingToMyTask ? 'Adding...' : 'Add to my task'}
                  </Button>
                </Box>
              )}

              {/* designer result */}
              {(user && (currentDesign.designer_id === user.id || isOwner || isAdmin || isManager)) && (
                <Box className='mt-3'>
                  {currentDesign.status !== 'new' && (
                    <Typography variant='h6' sx={{ mb: 1 }}>
                      Designer Results
                    </Typography>
                  )}
                  {/* Các action Designer Results giữ nguyên ở đây */}
                  <Box sx={{ mb: 2 }}>
                    {currentDesign?.required_tasks?.png && (
                      <Box>
                        <PngDropzone onDrop={handlePngDrop} selectedFile={selectedFile} onImageClick={handleImageClick} />
                        {currentDesign.designer_result?.png && !selectedFile && (
                          <Box
                            sx={{
                              mt: 1,
                              cursor: 'pointer',
                              position: 'relative',
                              width: 'fit-content'
                            }}
                            onClick={() => handleImageClick(currentDesign.designer_result?.png || '', 'Designer Result')}
                          >
                            <img
                              src={currentDesign.designer_result.png}
                              alt='Designer Result'
                              style={{
                                maxWidth: '100%',
                                maxHeight: '80px',
                                objectFit: 'contain',
                                borderRadius: '8px'
                              }}
                            />
                          </Box>
                        )}
                      </Box>
                    )}

                    {currentDesign?.required_tasks?.productBanner?.enabled && (
                      <Box sx={{ mb: 2 }}>
                        {currentDesign.required_tasks.productBanner.productTypes.map(productType => (
                          <Box key={productType.id}>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 1
                              }}
                            >
                              <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
                                {productType?.name || 'Product Banner'}
                              </Typography>
                              {isOwner && currentDesign.designer_result?.product_banners?.[productType.id] && (
                                <Button
                                  variant='contained'
                                  size='small'
                                  startIcon={<i className='tabler-plus' />}
                                  onClick={() => {
                                    setSelectedProductBanner({
                                      product_type_id: productType.id
                                    })
                                    setCreateListingDialogOpen(true)
                                  }}
                                >
                                  Create Listing
                                </Button>
                              )}
                            </Box>
                            <ProductBannerDropzone
                              productType={productType}
                              onDrop={files => handleProductBannerDrop(productType.id, files)}
                              selectedFiles={selectedFiles[productType.id] || []}
                              onImageClick={handleImageClick}
                            />
                            {currentDesign.designer_result?.product_banners?.[productType.id] &&
                              !selectedFiles[productType.id]?.length && (
                                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                  {Object.entries(currentDesign.designer_result.product_banners[productType.id]).map(
                                    ([key, url], index) => (
                                      <Box
                                        key={index}
                                        sx={{
                                          position: 'relative',
                                          width: 60,
                                          height: 60,
                                          borderRadius: 1,
                                          overflow: 'hidden',
                                          cursor: 'pointer'
                                        }}
                                        onClick={() => handleImageClick(url, `Product Banner ${index + 1}`)}
                                      >
                                        <img
                                          src={url}
                                          alt={`Product Banner ${index + 1}`}
                                          style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain'
                                          }}
                                        />
                                      </Box>
                                    )
                                  )}
                                </Box>
                              )}
                          </Box>
                        ))}
                      </Box>
                    )}

                    {currentDesign?.required_tasks?.other?.enabled && currentDesign?.required_tasks?.other?.note && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant='subtitle2' sx={{ mb: 1 }}>
                          Other Requirements
                        </Typography>
                        <Typography variant='caption' color='text.secondary' sx={{ mb: 1 }}>
                          {currentDesign.required_tasks.other.note}
                        </Typography>
                        <TextField
                          fullWidth
                          multiline
                          rows={2}
                          value={otherResult}
                          onChange={e => setOtherResult(e.target.value)}
                          placeholder='Enter your result links or notes here...'
                          size="small"
                        />
                      </Box>
                    )}

                    {isUploading && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant='caption' sx={{ mb: 0.5 }}>
                          Uploading files... {Math.round(totalProgress)}%
                        </Typography>
                        <LinearProgress variant='determinate' value={totalProgress} />
                      </Box>
                    )}

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {/* Show Submit for Review button only for processing status */}
                      {currentDesign.status === 'processing' && (
                        <Button
                          variant='outlined'
                          color='warning'
                          onClick={handleSubmitForReview}
                          disabled={
                            (currentDesign?.required_tasks?.png && !(selectedFile || currentDesign?.designer_result?.png)) ||
                            (currentDesign?.required_tasks?.productBanner?.enabled &&
                              currentDesign.required_tasks.productBanner.productTypes.some(
                                type => !selectedFiles[type.id] || selectedFiles[type.id].length === 0
                              )) ||
                            isUploading
                          }
                          startIcon={<i className='tabler-send' />}
                          size="small"
                        >
                          Submit for Review
                        </Button>
                      )}
                      
                      {/* Show Complete & Submit button for processing and submitted status */}
                      {(currentDesign.status === 'processing' || currentDesign.status === 'submitted') && (
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={handleDesignerSubmit}
                          disabled={
                            (currentDesign?.required_tasks?.png && !(selectedFile || currentDesign?.designer_result?.png)) ||
                            (currentDesign?.required_tasks?.productBanner?.enabled &&
                              currentDesign.required_tasks.productBanner.productTypes.some(
                                type => !selectedFiles[type.id] || selectedFiles[type.id].length === 0
                              )) ||
                            isUploading
                          }
                          startIcon={isUploading ? <CircularProgress size={16} color="inherit" /> : <i className='tabler-upload' />}
                          size="small"
                        >
                          {isUploading ? 'Uploading...' : 'Complete & Submit'}
                        </Button>
                      )}
                      
                      {/* Show status info for submitted designs */}
                      {currentDesign.status === 'submitted' && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip
                            label="Submitted for Review"
                            color="warning"
                            size="small"
                            icon={<i className='tabler-clock' />}
                          />
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              )}

              {currentDesign.designer_results?.map((result, resultIndex) => (
                <Box key={resultIndex} sx={{ mb: 3 }}>
                  <Typography variant='subtitle1' sx={{ mb: 1 }}>
                    Design Result {resultIndex + 1}
                  </Typography>
                  {result.product_banners?.map((banner, bannerIndex) => (
                    <Box
                      key={bannerIndex}
                      sx={{
                        mb: 1,
                        p: 1,
                        border: '1px solid',
                        borderColor:
                          selectedProductBanner?.product_type_id === banner.product_type_id ? 'primary.main' : 'divider',
                        borderRadius: 1,
                        cursor: 'pointer',
                        '&:hover': {
                          borderColor: 'primary.main',
                          backgroundColor: 'action.hover'
                        }
                      }}
                      onClick={() => setSelectedProductBanner(banner)}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant='caption'>Product Type: {banner.product_type_id}</Typography>
                        {selectedProductBanner?.product_type_id === banner.product_type_id && (
                          <Chip label='Selected' color='primary' size='small' />
                        )}
                      </Box>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {banner.images?.map((image, imageIndex) => (
                          <Box
                            key={imageIndex}
                            component='img'
                            src={image}
                            sx={{
                              width: 60,
                              height: 60,
                              objectFit: 'cover',
                              borderRadius: 1,
                              border: '1px solid',
                              borderColor: 'divider'
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>

            {/* Right Column - Notes & Comments */}
            {currentDesign.status !== 'new' && (
              <Box sx={{ flex: 1, borderLeft: '1px solid', borderColor: 'divider', pl: 3 }}>
                <Typography variant='h6' sx={{ mb: 2 }}>
                  {/* Notes & Comments */}
                </Typography>
                <NotesLog designId={currentDesign._id} />
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>

      <DeleteDialog
        open={deleteDialogOpen}
        onClose={handleDeleteConfirmClose}
        onConfirm={handleDeleteDesign}
        loading={deleteLoading}
      />

      <Lightbox
        open={lightboxOpen}
        handleClose={() => setLightboxOpen(false)}
        imageUrl={lightboxImage}
        imageAlt={lightboxAlt}
      />

      <CreateListingDialog
        open={createListingDialogOpen}
        onClose={() => setCreateListingDialogOpen(false)}
        selectedProductBanner={selectedProductBanner}
        currentDesign={currentDesign}
        onSuccess={onNewDesignsReload}
      />

      <Dialog open={openImageDialog} onClose={() => setOpenImageDialog(false)} maxWidth="md">
        <Box sx={{ position: 'relative', p: 2, bgcolor: '#222' }}>
          <IconButton
            onClick={() => setOpenImageDialog(false)}
            sx={{ position: 'absolute', top: 8, right: 8, color: '#fff', zIndex: 2 }}
          >
            <i className="tabler-x" />
          </IconButton>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Xem ảnh lớn"
              style={{
                maxWidth: '80vw',
                maxHeight: '80vh',
                display: 'block',
                margin: '0 auto',
                borderRadius: 8,
                background: '#222'
              }}
            />
          )}
        </Box>
      </Dialog>
    </>
  )
}

export default ShowDesign
