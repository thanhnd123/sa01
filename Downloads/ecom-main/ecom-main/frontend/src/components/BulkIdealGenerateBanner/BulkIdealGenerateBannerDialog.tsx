import React, { useState, useCallback, useEffect, useMemo } from 'react'
import {
  IconButton,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  CircularProgress,
  TextField,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Divider,
  Autocomplete,
  Grid,
  Stack
} from '@mui/material'
// import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify'
import { useDropzone } from 'react-dropzone'
import axiosInstance from '@/libs/axios'
import {
  StyledDialog,
  DialogHeader,
  DialogBody,
  ImagePreviewContainer,
  ImagePreview,
  ActionButtonsContainer
} from './BulkIdealGenerateBannerDialog.styles'
import { BulkIdealGenerateBannerDialogProps, Ideal } from './types'

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20MB

// Mockup type
interface Mockup {
  _id: string
  name: string
}

// Custom hook for handling dropzone functionality
const useIdealDropzone = (idealId: string, onDrop: (idealId: string, files: File[]) => void) => {
  return useDropzone({
    onDrop: files => onDrop(idealId, files),
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg'],
      'image/jpg': ['.jpg']
    },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE
  })
}

// Separate component for ideal <dropzone></dropzone>
const IdealDropzone: React.FC<{
  idealId: string
  idealTitle: string
  onDrop: (idealId: string, files: File[]) => void
  uploadedFile: File | null
  onRemove: (idealId: string) => void
}> = ({ idealId, idealTitle, onDrop, uploadedFile, onRemove }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (uploadedFile) {
      const url = URL.createObjectURL(uploadedFile)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setPreviewUrl(null)
    }
  }, [uploadedFile])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: acceptedFiles => {
  
      if (acceptedFiles.length > 0) {
        onDrop(idealId, acceptedFiles)
      }
    },
    accept: {
      'image/png': ['.png'],
      'image/x-png': ['.png'],
      'image/jpeg': ['.jpeg'],
      'image/jpg': ['.jpg']
    },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    multiple: false
  })

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onRemove(idealId)
  }

  return (
    <Box sx={{ mb: 2, border: '1px solid #eee', borderRadius: 1, p: 2 }}>
      <Typography variant='body2' fontWeight={600} sx={{ mb: 1 }}>
        {idealTitle}
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
          {uploadedFile
            ? uploadedFile.name
            : isDragActive
              ? 'Drop the PNG file here'
              : 'Drag and drop PNG file here, or click to select file'}
        </Typography>
      </Box>
      {previewUrl && (
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            flexDirection: 'column'
          }}
        >
          <img
            src={previewUrl}
            alt={`Preview ${idealTitle}`}
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
              {uploadedFile?.name}
            </Typography>
            <IconButton size='small' onClick={handleRemove}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>×</span>
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export const BulkIdealGenerateBannerDialog: React.FC<BulkIdealGenerateBannerDialogProps> = ({
  open,
  onClose,
  onSuccess
}) => {
  const [productTypes, setProductTypes] = useState<{ [id: string]: string }>({})
  const [isLoadingProductTypes, setIsLoadingProductTypes] = useState(false)
  const [searchProductType, setSearchProductType] = useState('')
  const [searchIdeal, setSearchIdeal] = useState('')
  const [selectedIdealIds, setSelectedIdealIds] = useState<string[]>([])
  const [ideals, setIdeals] = useState<Ideal[]>([])
  const [selectedIdeals, setSelectedIdeals] = useState<Ideal[]>([])
  const [isLoadingIdeals, setIsLoadingIdeals] = useState(false)
  const [mockups, setMockups] = useState<Mockup[]>([])
  const [isLoadingMockups, setIsLoadingMockups] = useState(false)
  const [selectedMockupId, setSelectedMockupId] = useState('')
  const [selectedProductType, setSelectedProductType] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  // Mỗi ideal 1 ảnh
  const [uploadedImages, setUploadedImages] = useState<{ [idealId: string]: File | null }>({})
  const [selectedProductTypes, setSelectedProductTypes] = useState<
    { id: string; events: string[]; bannerCount?: number }[]
  >([])
  const [localSearchResults, setLocalSearchResults] = useState<Ideal[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [mockupsByProductType, setMockupsByProductType] = useState<{ [productTypeId: string]: Mockup[] }>({})

  // Filter product types based on search
  const filteredProductTypes = useMemo(() => {
    if (!searchProductType) return productTypes

    return Object.entries(productTypes).reduce(
      (acc, [id, name]) => {
        if (name.toLowerCase().includes(searchProductType.toLowerCase())) {
          acc[id] = name
        }
        return acc
      },
      {} as { [id: string]: string }
    )
  }, [productTypes, searchProductType])

  // Convert product types to array for Autocomplete
  const productTypeOptions = useMemo(
    () =>
      Object.entries(productTypes).map(([id, name]) => ({
        id,
        name
      })),
    [productTypes]
  )

  // Convert mockups to array for Autocomplete
  const mockupOptions = useMemo(
    () =>
      mockups.map(mockup => ({
        id: mockup._id,
        name: mockup.name
      })),
    [mockups]
  )

  // Fetch product types, ideals, mockups mỗi khi dialog mở
  useEffect(() => {
    if (open) {
      setIsLoadingProductTypes(true)
      axiosInstance
        .get(`${process.env.NEXT_PUBLIC_API_URL}/products/product-types`)
        .then(res => {
          setProductTypes(res.data.result || {})
        })
        .catch(() => setProductTypes({}))
        .finally(() => setIsLoadingProductTypes(false))

      // Fetch 10 ideal mới nhất khi mở dialog
      setIsLoadingIdeals(true)
      axiosInstance
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/ideals/list?limit=10`)
        .then(res => {
          setIdeals(res.data.data || [])
        })
        .catch(() => {
          setIdeals([])
          setSelectedIdealIds([])
        })
        .finally(() => setIsLoadingIdeals(false))
    } else {
      setProductTypes({})
      setSelectedProductType('')
      setSearchProductType('')
      setSearchIdeal('')
      setSelectedIdealIds([])
      setIdeals([])
      setMockups([])
      setSelectedMockupId('')
    }
  }, [open])

  // Local search trước
  useEffect(() => {
    if (!searchIdeal.trim()) {
      setLocalSearchResults([])
      return
    }

    const searchTerm = searchIdeal.toLowerCase().trim()
    const results = ideals.filter(ideal => ideal.title.toLowerCase().includes(searchTerm))
    setLocalSearchResults(results)
  }, [searchIdeal, ideals])

  // Server search sau
  useEffect(() => {
    if (!open) return

    const handler = setTimeout(() => {
      if (!searchIdeal.trim()) {
        setIsSearching(true)
        axiosInstance
          .get(`${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/ideals/list?limit=10`)
          .then(res => {
            const newIdeals = res.data.data || []
            setIdeals(newIdeals)
          })
          .catch(() => setIdeals([]))
          .finally(() => setIsSearching(false))
        return
      }

      setIsSearching(true)
      axiosInstance
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/ideals/list?search=${encodeURIComponent(searchIdeal.trim())}`
        )
        .then(res => {
          const newIdeals = res.data.data || []
          setIdeals(newIdeals)
        })
        .catch(() => setIdeals([]))
        .finally(() => setIsSearching(false))
    }, 500)

    return () => clearTimeout(handler)
  }, [searchIdeal, open])

  // Kết quả hiển thị sẽ ưu tiên local search trước
  const displayIdeals = useMemo(() => {
    if (searchIdeal.trim() && localSearchResults.length > 0) {
      return localSearchResults
    }
    return ideals
  }, [searchIdeal, localSearchResults, ideals])

  // Filtered ideals chỉ còn là ideals (không filter local)
  const filteredIdeals = ideals

  const handleIdealToggle = useCallback(
    (id: string) => {
      setSelectedIdealIds(prev => {
        const newSelectedIds = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        return newSelectedIds
      })

      // Cập nhật selectedIdeals
      setSelectedIdeals(prev => {
        const ideal = ideals.find(i => i._id === id)
        if (!ideal) return prev

        if (prev.some(i => i._id === id)) {
          return prev.filter(i => i._id !== id)
        } else {
          return [...prev, ideal]
        }
      })
    },
    [ideals]
  )

  // Thêm hàm mới để xóa ideal
  const handleRemoveIdeal = useCallback((id: string) => {
    setSelectedIdealIds(prev => prev.filter(i => i !== id))
    setSelectedIdeals(prev => prev.filter(i => i._id !== id))
  }, [])

  // Upload cho từng ideal
  const handleDropForIdeal = useCallback((idealId: string, acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return
    const file = acceptedFiles[0]

    if (file.size > MAX_FILE_SIZE) {
      toast.error(`File ${file.name} is too large. Maximum size is 5MB.`)
      return
    }

    // Check both MIME type and file extension
    const isPNG = file.type === 'image/png' || file.type === 'image/x-png' || file.name.toLowerCase().endsWith('.png')
    const isJPEG = file.type === 'image/jpeg' || file.name.toLowerCase().endsWith('.jpeg')
    const isJPG = file.type === 'image/jpg' || file.name.toLowerCase().endsWith('.jpg')

    if (!isPNG && !isJPEG && !isJPG) {
      toast.error(`File ${file.name} is not a PNG, JPEG, or JPG file.`)
      return
    }

    setUploadedImages(prev => {
      const newImages = { ...prev }
      newImages[idealId] = file
      return newImages
    })
  }, [])

  const handleRemoveImage = useCallback((idealId: string) => {
    setUploadedImages(prev => {
      const newImages = { ...prev }
      delete newImages[idealId]
      return newImages
    })
  }, [])

  const handleClose = () => {
    // Reset tất cả state
    setProductTypes({})
    setSelectedProductType('')
    setSearchProductType('')
    setSearchIdeal('')
    setSelectedIdealIds([])
    setIdeals([])
    setSelectedIdeals([])
    setMockups([])
    setSelectedMockupId('')
    setSelectedProductTypes([])
    setLocalSearchResults([])
    setIsSearching(false)
    setUploadedImages({})
    onClose()
  }

  const handleSubmit = async () => {
    if (selectedProductTypes.length === 0) {
      toast.error('Vui lòng chọn ít nhất một product type')
      return
    }
    if (selectedIdealIds.length === 0) {
      toast.error('Vui lòng chọn ít nhất một ideal')
      return
    }

    // Kiểm tra xem tất cả product type đã chọn mockup chưa
    const hasUnselectedMockup = selectedProductTypes.some(type => !type.events || type.events.length === 0)
    if (hasUnselectedMockup) {
      toast.error('Vui lòng chọn sự kiện cho tất cả product type')
      return
    }

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('selectedIdealIds', JSON.stringify(selectedIdealIds))
      formData.append('selectedProductTypes', JSON.stringify(selectedProductTypes))

      const response = await axiosInstance
        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/design/actions/bulk-create`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .catch(err => {
          throw new Error(err.response.data.message)
        })

      if (response.data.success) {
        onSuccess?.()
        handleClose() // Reset dialog sau khi tạo thành công
      } else {
        throw new Error(response.data.message)
      }
    } catch (error) {
      console.error('Error creating design actions:', error)
      toast.error(error instanceof Error ? error.message : '')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddProductType = () => {
    setSelectedProductTypes(prev => [...prev, { id: '', events: [], bannerCount: 5 }])
  }

  const handleRemoveProductType = (index: number) => {
    setSelectedProductTypes(prev => prev.filter((_, i) => i !== index))
  }

  const handleProductTypeChange = (index: number, productTypeId: string) => {
    setSelectedProductTypes(prev => {
      const newTypes = [...prev]
      newTypes[index] = { ...newTypes[index], id: productTypeId, events: [], bannerCount: 5 }
      return newTypes
    })
    if (productTypeId) {
      setIsLoadingMockups(true)
      axiosInstance
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/mockup/product-type/${productTypeId}`)
        .then(res => {
          setMockupsByProductType(prev => ({
            ...prev,
            [productTypeId]: res.data.data || []
          }))
        })
        .catch(() => {
          setMockupsByProductType(prev => ({
            ...prev,
            [productTypeId]: []
          }))
          toast.error('Không thể lấy danh sách mockup')
        })
        .finally(() => setIsLoadingMockups(false))
    }
  }

  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth='lg' fullWidth>
      <DialogHeader>
        Generate Banners for Selected Ideals
        <Button onClick={handleClose} aria-label='close' size='small' sx={{ minWidth: 0, p: 1 }}>
          Close
        </Button>
      </DialogHeader>
      <DialogBody>
        <Grid container spacing={3}>
          {/* Column 1: Ideal Selection */}
          <Grid item xs={12} md={6}>
            <Typography variant='subtitle1' fontWeight={700} gutterBottom>
              Select Ideals
            </Typography>
            <TextField
              fullWidth
              size='small'
              placeholder='Search ideals by name...'
              value={searchIdeal}
              onChange={e => setSearchIdeal(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: isSearching ? <CircularProgress size={20} /> : null
              }}
            />
            <Box
              sx={{
                maxHeight: 400,
                overflowY: 'auto',
                border: '1px solid #eee',
                borderRadius: 1,
                mb: 3,
                position: 'relative'
              }}
            >
              {selectedIdeals.length > 0 && (
                <Box
                  sx={{
                    position: 'sticky',
                    top: 0,
                    backgroundColor: 'background.paper',
                    borderBottom: '1px solid #eee',
                    p: 1,
                    zIndex: 1
                  }}
                >
                  <Typography variant='body2' color='text.secondary'>
                    {selectedIdeals.length} ideal{selectedIdeals.length > 1 ? 's' : ''} selected
                  </Typography>
                </Box>
              )}
              <List dense>
                {isSearching ? (
                  <ListItem>
                    <ListItemText primary='Searching...' />
                  </ListItem>
                ) : displayIdeals.length === 0 ? (
                  <ListItem>
                    <ListItemText primary='No ideals found' />
                  </ListItem>
                ) : (
                  displayIdeals.map(ideal => (
                    <ListItem key={`bulk-generate-banner-ideal-${ideal._id}`}>
                      <ListItemButton
                        selected={selectedIdealIds.includes(ideal._id)}
                        onClick={() => ideal.png && handleIdealToggle(ideal._id)}
                        disabled={!ideal.png}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          opacity: ideal.png ? 1 : 0.6,
                          '&.Mui-disabled': {
                            opacity: 0.6
                          },
                          '&.Mui-selected': {
                            backgroundColor: 'primary.light',
                            '&:hover': {
                              backgroundColor: 'primary.light'
                            }
                          }
                        }}
                      >
                        {ideal.banner && (
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: 1,
                              overflow: 'hidden',
                              flexShrink: 0
                            }}
                          >
                            <img
                              src={ideal.banner}
                              alt={`Banner for ${ideal.title}`}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                              }}
                            />
                          </Box>
                        )}
                        <Box sx={{ flex: 1 }}>
                          <Typography variant='body1' component='div'>
                            {ideal.title}
                          </Typography>
                          <Box component='span' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography
                              component='span'
                              variant='body2'
                              color={ideal.png ? 'success.main' : 'text.secondary'}
                            >
                              {ideal.png ? 'PNG Ready' : 'No PNG Uploaded'}
                            </Typography>
                            {selectedIdealIds.includes(ideal._id) && (
                              <Typography
                                component='span'
                                variant='body2'
                                color='primary.main'
                                sx={{
                                  backgroundColor: 'primary.light',
                                  px: 1,
                                  py: 0.25,
                                  borderRadius: 1,
                                  fontSize: '0.75rem'
                                }}
                              >
                                Selected
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </ListItemButton>
                    </ListItem>
                  ))
                )}
              </List>
            </Box>
            {selectedIdeals.length > 0 && (
              <>
                <Typography variant='subtitle1' fontWeight={700} gutterBottom>
                  Selected Ideals
                </Typography>
                <Box
                  sx={{
                    border: '1px solid #eee',
                    borderRadius: 1,
                    mb: 3,
                    overflow: 'hidden'
                  }}
                >
                  <List dense>
                    {selectedIdeals.map(ideal => (
                      <ListItem
                        key={`selected-ideal-${ideal._id}`}
                        sx={{
                          borderBottom: '1px solid #eee',
                          '&:last-child': {
                            borderBottom: 'none'
                          }
                        }}
                      >
                        <ListItemButton
                          onClick={() => handleIdealToggle(ideal._id)}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            py: 1,
                            backgroundColor: 'primary.light',
                            '&:hover': {
                              backgroundColor: 'primary.light'
                            }
                          }}
                        >
                          {ideal.banner && (
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 1,
                                overflow: 'hidden',
                                flexShrink: 0
                              }}
                            >
                              <img
                                src={ideal.banner}
                                alt={`Banner for ${ideal.title}`}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover'
                                }}
                              />
                            </Box>
                          )}
                          <Box sx={{ flex: 1 }}>
                            <Typography variant='body1' component='div'>
                              {ideal.title}
                            </Typography>
                            <Box component='span' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography
                                component='span'
                                variant='body2'
                                color={ideal.png ? 'success.main' : 'text.secondary'}
                              >
                                {ideal.png ? 'PNG Ready' : 'No PNG Uploaded'}
                              </Typography>
                            </Box>
                          </Box>
                          <IconButton
                            size='small'
                            onClick={e => {
                              e.stopPropagation()
                              handleRemoveIdeal(ideal._id)
                            }}
                            sx={{
                              color: 'error.main',
                              '&:hover': {
                                backgroundColor: 'error.light',
                                color: 'error.contrastText'
                              }
                            }}
                          >
                            <span style={{ fontWeight: 700, fontSize: 14 }}>×</span>
                          </IconButton>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </>
            )}
          </Grid>

          {/* Column 2: Product Type Selection */}
          <Grid item xs={12} md={6}>
            <Typography variant='subtitle1' fontWeight={700} gutterBottom>
              Product Types & Events
            </Typography>
            {selectedProductTypes.map((type, index) => (
              <Box
                key={index}
                sx={{
                  mb: 2,
                  p: 3,
                  border: '1px solid #eee',
                  borderRadius: 2,
                  // background: '#fafbfc',
                  position: 'relative'
                }}
              >
                <Stack spacing={1}>
                  <Box display='flex' alignItems='center' justifyContent='space-between'>
                    <Autocomplete
                      options={productTypeOptions}
                      getOptionLabel={option => option.name}
                      value={productTypeOptions.find(pt => pt.id === type.id) || null}
                      onChange={(_, newValue) => handleProductTypeChange(index, newValue?.id || '')}
                      loading={isLoadingProductTypes}
                      disabled={isLoadingProductTypes}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label='Product Type'
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {isLoadingProductTypes ? <CircularProgress color='inherit' size={20} /> : null}
                                {params.InputProps.endAdornment}
                              </>
                            )
                          }}
                        />
                      )}
                      renderOption={(props, option) => {
                        const isDisabled = selectedProductTypes.some(t => t.id === option.id)
                        return (
                          <li
                            {...props}
                            key={`product-type-${option.id}`}
                            style={{
                              opacity: isDisabled ? 0.5 : 1,
                              pointerEvents: isDisabled ? 'none' : 'auto'
                            }}
                          >
                            {option.name}
                            {isDisabled && ' (Selected)'}
                          </li>
                        )
                      }}
                      getOptionDisabled={option => selectedProductTypes.some(t => t.id === option.id)}
                      noOptionsText={isLoadingProductTypes ? 'Loading...' : 'No product types found'}
                      sx={{ flex: 1, minWidth: 180 }}
                    />
                    <IconButton
                      size='small'
                      onClick={() => handleRemoveProductType(index)}
                      sx={{
                        color: 'error.main',
                        ml: 1,
                        '&:hover': {
                          backgroundColor: 'error.light',
                          color: 'error.contrastText'
                        }
                      }}
                    >
                      <span style={{ fontWeight: 700, fontSize: 14 }}>×</span>
                    </IconButton>
                  </Box>
                  {type.id && mockupsByProductType[type.id] && (
                    <Typography variant='caption' color='text.secondary' sx={{ ml: 0.5 }}>
                      Total mockup: {mockupsByProductType[type.id]?.length || 0}
                    </Typography>
                  )}
                  <Autocomplete
                    multiple
                    freeSolo
                    options={['Birthday', 'Mother Day', 'Father Day', 'Anniversary', 'New Year', 'Valentine Day']}
                    value={type.events || []}
                    onChange={(_, newValue) => {
                      setSelectedProductTypes(prev => {
                        const newTypes = [...prev]
                        newTypes[index] = { ...newTypes[index], events: newValue }
                        return newTypes
                      })
                    }}
                    renderInput={params => (
                      <TextField {...params} label='Events' placeholder='Chọn hoặc nhập sự kiện' />
                    )}
                    className='mt-2'
                    sx={{ minWidth: 180 }}
                  />
                  <TextField
                    type='number'
                    label='Banner Qty'
                    size='small'
                    inputProps={{ min: 1, max: 10, step: 1 }}
                    value={type.bannerCount ?? 5}
                    className='mt-3'
                    onChange={e => {
                      const value = Math.max(1, Number(e.target.value) || 1)
                      setSelectedProductTypes(prev => {
                        const newTypes = [...prev]
                        newTypes[index] = { ...newTypes[index], bannerCount: value }
                        return newTypes
                      })
                    }}
                    sx={{ maxWidth: 180 }}
                  />
                </Stack>
              </Box>
            ))}
            <Button
              variant='contained'
              color='primary'
              startIcon={<span style={{ fontWeight: 700, fontSize: 14 }}>+</span>}
              onClick={handleAddProductType}
              sx={{ mb: 3, width: '100%' }}
              fullWidth
            >
              Add Product Type
            </Button>
          </Grid>
        </Grid>

        <ActionButtonsContainer>
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant='contained'
            onClick={handleSubmit}
            disabled={isLoading || selectedProductTypes.length === 0 || selectedIdealIds.length === 0}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Create Actions'}
          </Button>
        </ActionButtonsContainer>
      </DialogBody>
    </StyledDialog>
  )
}
