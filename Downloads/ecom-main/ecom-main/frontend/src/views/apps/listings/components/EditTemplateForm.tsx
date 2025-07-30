'use client'

import { useState, useEffect, useRef } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import { toast } from 'react-toastify'
import axiosInstance from '@/libs/axios'
import { useSession } from 'next-auth/react'
import Autocomplete from '@mui/material/Autocomplete'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

interface EditTemplateFormProps {
  editData: {
    _id: string
    name: string
    description: string
    status: string
    platform: string
    product_type: string
    columns: TemplateColumn[] | null
    file_name?: string
    file_path?: string
    listing_type?: string
  }
  onClose: () => void
  onSuccess: () => void
}

interface ProductType {
  _id: string
  name: string
}

interface TemplateColumn {
  name: string
  required: boolean
  description: string
  default_value?: string
}

export default function EditTemplateForm({ editData, onClose, onSuccess }: EditTemplateFormProps) {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [productTypes, setProductTypes] = useState<ProductType[]>([])
  const [selectedProductType, setSelectedProductType] = useState<ProductType | null>(null)
  const [columns, setColumns] = useState<TemplateColumn[]>(editData.columns || [])
  const [searchColumn, setSearchColumn] = useState('')
  const [filteredColumns, setFilteredColumns] = useState<TemplateColumn[]>(editData.columns || [])

  const formRef = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const platforms = [
    { value: 'amazon', label: 'Amazon' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'etsy', label: 'Etsy' },
    { value: 'ebay', label: 'eBay' }
  ]

  const listingTypes = [
    { value: 'single_product', label: 'Single Product' },
    { value: 'variant_product', label: 'Variant Product' },
    { value: 'grouped_product', label: 'Grouped Product' }
  ]

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ]

  const defaultValues = [
    'product_title',
    'description',
    'short_description',
    'main_image',
    'sku',
    'bullet_point_1',
    'bullet_point_2',
    'bullet_point_3',
    'bullet_point_4',
    'bullet_point_5',
    'image_1',
    'image_2',
    'image_3',
    'image_4',
    'image_5',
    'image_6',
    'image_7',
    'image_8',
    'image_9',
    'image_10'
  ]

  // Load product types
  useEffect(() => {
    const loadProductTypes = async () => {
      try {
        const response = await axiosInstance.get('/products/product-types')
        const result = response.data.result
        const types: ProductType[] = Object.entries(result).map(([id, name]) => ({
          _id: id,
          name: name as string
        }))
        setProductTypes(types)
        
        // Set selected product type if exists
        if (editData.product_type) {
          const found = types.find(type => type._id === editData.product_type)
          if (found) {
            setSelectedProductType(found)
          }
        }
      } catch (error) {
        console.error('Error loading product types:', error)
        toast.error('Failed to load product types')
      }
    }

    loadProductTypes()
  }, [editData.product_type])

  // Filter columns based on search
  useEffect(() => {
    const currentColumns = columns || []
    if (searchColumn) {
      const filtered = currentColumns.filter(column =>
        column.name.toLowerCase().includes(searchColumn.toLowerCase())
      )
      setFilteredColumns(filtered)
    } else {
      setFilteredColumns(currentColumns)
    }
  }, [searchColumn, columns])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel', // .xls
      'text/csv' // .csv
    ]

    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a valid file (XLSX, XLS, or CSV)')
      return
    }

    try {
      setIsUploading(true)
      setUploadProgress(0)

      const formData = new FormData()
      formData.append('template_file', file)

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 100)

      const response = await axiosInstance.post('/api/authenticated/config/listing-templates/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (response.data.success) {
        const uploadedColumns: TemplateColumn[] = response.data.data.columns
        setColumns(uploadedColumns)
        toast.success('File uploaded successfully')
      } else {
        toast.error(response.data.message || 'Failed to upload file')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      toast.error('Failed to upload file')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const form = formRef.current
      if (!form) return

      const formData = new FormData(form)
      
      // Add basic information
      formData.append('name', formData.get('name') as string)
      formData.append('description', formData.get('description') as string)
      formData.append('status', formData.get('status') as string)
      formData.append('platform', formData.get('platform') as string)
      formData.append('listing_type', formData.get('listing_type') as string)
      
      if (selectedProductType) {
        formData.append('product_type', selectedProductType._id)
      }

      // Add columns data
      formData.append('columns', JSON.stringify(columns || []))

      const response = await axiosInstance.put(`/api/authenticated/config/listing-templates/${editData._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.data.success) {
        toast.success('Template updated successfully')
        onSuccess()
      } else {
        toast.error(response.data.message || 'Failed to update template')
      }
    } catch (error) {
      console.error('Error updating template:', error)
      toast.error('Failed to update template')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDefaultValueChange = (columnIndex: number, value: string) => {
    const currentColumns = columns || []
    const updatedColumns = [...currentColumns]
    updatedColumns[columnIndex] = {
      ...updatedColumns[columnIndex],
      default_value: value
    }
    setColumns(updatedColumns)
  }

  return (
    <Card>
      <CardContent>
        <div className='flex justify-between items-center mb-4'>
          <Typography variant='h6'>Edit Template</Typography>
          <Button onClick={onClose} variant='outlined'>
            Cancel
          </Button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12} md={6}>
              <Typography variant='h6' sx={{ mb: 2 }}>
                Basic Information
              </Typography>
              
              <TextField
                name='name'
                label='Name'
                defaultValue={editData.name}
                fullWidth
                required
                sx={{ mb: 2 }}
              />

              <TextField
                name='description'
                label='Description'
                defaultValue={editData.description}
                fullWidth
                multiline
                rows={4}
                sx={{ mb: 2 }}
              />

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Platform</InputLabel>
                <Select name='platform' defaultValue={editData.platform} label='Platform'>
                  {platforms.map((platform) => (
                    <MenuItem key={platform.value} value={platform.value}>
                      {platform.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Listing Type</InputLabel>
                <Select name='listing_type' defaultValue={editData.listing_type || 'single_product'} label='Listing Type'>
                  {listingTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select name='status' defaultValue={editData.status} label='Status'>
                  {statusOptions.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Advanced Configuration */}
            <Grid item xs={12} md={6}>
              <Typography variant='h6' sx={{ mb: 2 }}>
                Advanced Configuration
              </Typography>

              <Autocomplete
                value={selectedProductType}
                onChange={(_, newValue) => setSelectedProductType(newValue)}
                options={productTypes}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Product Type"
                    placeholder="Select product type"
                  />
                )}
                sx={{ mb: 2 }}
              />

              <Box sx={{ mb: 2 }}>
                <Typography variant='subtitle2' sx={{ mb: 1 }}>
                  Upload Template File (Optional)
                </Typography>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <Button
                  variant='outlined'
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  startIcon={isUploading ? <CircularProgress size={16} /> : <i className='tabler-upload' />}
                >
                  {isUploading ? `Uploading... ${uploadProgress}%` : 'Upload Template File'}
                </Button>
                {editData.file_name && (
                  <Typography variant='caption' sx={{ ml: 1, color: 'text.secondary' }}>
                    Current: {editData.file_name}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>

          {/* Template Columns */}
          {(columns || []).length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant='h6' sx={{ mb: 2 }}>
                Template Columns ({(columns || []).length})
              </Typography>

              <TextField
                label="Search columns"
                value={searchColumn}
                onChange={(e) => setSearchColumn(e.target.value)}
                size="small"
                sx={{ mb: 2, width: 300 }}
              />

              <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Index</TableCell>
                      <TableCell>Column Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Default Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredColumns.map((column, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{column.name}</TableCell>
                        <TableCell>{column.description || '-'}</TableCell>
                        <TableCell>
                          <Select
                            value={column.default_value || ''}
                            onChange={(e) => handleDefaultValueChange(index, e.target.value)}
                            size="small"
                            fullWidth
                          >
                            <MenuItem value="">
                              <em>Select or enter custom value</em>
                            </MenuItem>
                            {defaultValues.map((value) => (
                              <MenuItem key={value} value={value}>
                                {value}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button onClick={onClose} variant='outlined'>
              Cancel
            </Button>
            <Button
              type='submit'
              variant='contained'
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={16} /> : null}
            >
              {isLoading ? 'Updating...' : 'Update Template'}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  )
} 