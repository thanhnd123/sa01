'use client'

import { useCallback, useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'
import type { TextFieldProps } from '@mui/material/TextField'
import Select from '@mui/material/Select'
import type { SelectChangeEvent } from '@mui/material/Select/SelectInput'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { toast } from 'react-toastify'
import CustomTextField from '@core/components/mui/TextField'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { useUser } from '@/contexts/UserContext'
import Checkbox from '@mui/material/Checkbox'
import Menu from '@mui/material/Menu'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import axiosInstance from '@/libs/axios'
import InputLabel from '@mui/material/InputLabel'
import Chip from '@mui/material/Chip'
import AddTemplateForm from './components/AddTemplateForm'
import EditTemplateForm from './components/EditTemplateForm'

interface Template {
  _id: string
  name: string
  description: string
  status: string
  platform: string
  product_type: string
  columns: TemplateColumn[] | null
  created_at: string
  updated_at: string
  file_name?: string
  file_path?: string
  product_type_name?: string
  listing_type?: string
}

interface PaginationControlsProps {
  itemsPerPage: number
  totalPages: number
  currentPage: number
  totalItems: number
  templates: Template[]
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void
  onLimitChange: (event: SelectChangeEvent<number>) => void
}

interface TemplateColumn {
  name: string
  required: boolean
  description: string
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(newValue)
    setValue(newValue)
  }

  return <CustomTextField {...props} value={value} onChange={handleChange} />
}

const PaginationControls = ({
  itemsPerPage,
  totalPages,
  currentPage,
  totalItems,
  templates,
  onPageChange,
  onLimitChange
}: PaginationControlsProps) => (
  <Box className='flex items-center justify-end gap-4'>
    <Box className='flex items-center gap-2'>
      <Typography variant='body2'>Show</Typography>
      <FormControl size='small' sx={{ minWidth: 80 }}>
        <Select value={itemsPerPage} onChange={onLimitChange} className='rounded'>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
      <Typography variant='body2'>entries</Typography>
    </Box>

    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={onPageChange}
      color='primary'
      size='medium'
      showFirstButton
      showLastButton
    />

    <Typography variant='body2' className='min-w-[200px] text-right'>
      {templates.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} -{' '}
      {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
    </Typography>
  </Box>
)

export default function TemplateBlock() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [totalItems, setTotalItems] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(false)
  const [openTemplateDetail, setOpenTemplateDetail] = useState<boolean>(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const { user } = useUser()
  const [isAdding, setIsAdding] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [templateToDelete, setTemplateToDelete] = useState<Template | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const platforms = [
    { value: 'amazon', label: 'Amazon' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'etsy', label: 'Etsy' },
    { value: 'ebay', label: 'eBay' }
  ]

  const amazonColumns: TemplateColumn[] = [
    { name: 'feed_product_type', required: true, description: 'Product type identifier' },
    { name: 'item_sku', required: true, description: 'Unique product identifier' },
    { name: 'brand_name', required: true, description: 'Brand name' },
    { name: 'item_name', required: true, description: 'Product title' },
    { name: 'product_description', required: true, description: 'Product description' },
    { name: 'standard_price', required: true, description: 'Product price' },
    { name: 'quantity', required: true, description: 'Available quantity' },
    { name: 'main_image_url', required: true, description: 'Main product image' },
    { name: 'bullet_point1', required: false, description: 'Key feature 1' },
    { name: 'bullet_point2', required: false, description: 'Key feature 2' },
    { name: 'bullet_point3', required: false, description: 'Key feature 3' },
    { name: 'bullet_point4', required: false, description: 'Key feature 4' },
    { name: 'bullet_point5', required: false, description: 'Key feature 5' },
    { name: 'generic_keywords', required: false, description: 'Search keywords' },
    { name: 'color_name', required: false, description: 'Product color' },
    { name: 'size_name', required: false, description: 'Product size' },
    { name: 'material_type', required: false, description: 'Product material' },
    { name: 'item_display_weight', required: false, description: 'Product weight' },
    { name: 'item_display_weight_unit_of_measure', required: false, description: 'Weight unit' },
    { name: 'package_height', required: false, description: 'Package height' },
    { name: 'package_width', required: false, description: 'Package width' },
    { name: 'package_length', required: false, description: 'Package length' },
    { name: 'package_weight', required: false, description: 'Package weight' }
  ]

  const fetchTemplates = useCallback(
    async (page = 1, limit = itemsPerPage, query: { index: string; value: string } | false = false) => {
      if (!user?.id) return

      try {
        setIsLoading(true)
        const params = new URLSearchParams({
          limit: limit.toString(),
          page: page.toString()
        })

        if (query) {
          params.append(query.index, query.value)
        }

        const response = await axiosInstance.get(`/api/authenticated/config/listing-templates?${params.toString()}`)
        const { data } = response.data

        setTemplates(data.templates)
        setItemsPerPage(data.pagination.limit)
        setCurrentPage(data.pagination.page)
        setTotalPages(data.pagination.total_pages)
        setTotalItems(data.pagination.total)
      } catch (error) {
        console.error('Error fetching templates:', error)
        toast.error('Failed to fetch templates')
      } finally {
        setIsLoading(false)
      }
    },
    [itemsPerPage, user]
  )

  useEffect(() => {
    if (user?.id) {
      fetchTemplates(1, itemsPerPage)
    }
  }, [user, fetchTemplates])

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    fetchTemplates(value, itemsPerPage)
  }

  const handleLimitChange = (event: SelectChangeEvent<number>) => {
    const newLimit = event.target.value as number
    setItemsPerPage(newLimit)
    fetchTemplates(1, newLimit)
  }

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    fetchTemplates(1, itemsPerPage, { index: 'search', value: globalFilter })
  }

  const handleOpenDetail = (template: Template) => {
    setSelectedTemplate(template)
    setOpenTemplateDetail(true)
  }

  const handleDelete = async () => {
    if (!templateToDelete) return

    try {
      setIsDeleting(true)
      await axiosInstance.delete(`/api/authenticated/config/listing-templates/${templateToDelete._id}`)
      toast.success('Template deleted successfully')
      fetchTemplates(currentPage, itemsPerPage)
      setOpenDeleteDialog(false)
    } catch (error) {
      console.error('Error deleting template:', error)
      toast.error('Failed to delete template')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleEdit = (template: Template) => {
    setSelectedTemplate(template)
    setIsAdding(true)
  }

  const handleDeleteClick = (e: React.MouseEvent, template: Template) => {
    e.stopPropagation()
    setTemplateToDelete(template)
    setOpenDeleteDialog(true)
  }

  return (
    <Card>
      <CardContent>
        <div className='flex justify-between items-center mb-4'>
          <Typography variant='h5' className='font-bold'>
            Template List
          </Typography>
          <div className='flex gap-2'>
            <Button variant='contained' onClick={() => fetchTemplates(currentPage, itemsPerPage)}>
              <i className='tabler-refresh' />
            </Button>
          </div>
        </div>

        <div className='flex justify-between items-center gap-4 mb-4'>
          <div className='flex gap-3'>
            {!isAdding ? (
              <Button variant='contained' onClick={() => setIsAdding(true)} startIcon={<i className='tabler-plus' />}>
                Add
              </Button>
            ) : (
              ''
            )}
          </div>

          <form className='max-w-md' onSubmit={handleSearch}>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(value as string)}
              placeholder='Search templates...'
              className='w-full'
            />
          </form>
        </div>

        {isAdding && !selectedTemplate && (
          <AddTemplateForm
            onClose={() => {
              setIsAdding(false)
              setSelectedTemplate(null)
            }}
            onSuccess={() => {
              fetchTemplates(currentPage, itemsPerPage)
              setIsAdding(false)
              setSelectedTemplate(null)
            }}
          />
        )}
        {isAdding && selectedTemplate && (
          <EditTemplateForm
            editData={selectedTemplate}
            onClose={() => {
              setIsAdding(false)
              setSelectedTemplate(null)
            }}
            onSuccess={() => {
              fetchTemplates(currentPage, itemsPerPage)
              setIsAdding(false)
              setSelectedTemplate(null)
            }}
          />
        )}

        <div className='mt-3'>
          {isLoading ? (
            <Typography className='text-center'>Loading templates...</Typography>
          ) : templates.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Platform</TableCell>
                    <TableCell>Product Type</TableCell>
                    <TableCell>Listing Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell align='right'>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {templates.map(template => (
                    <TableRow
                      key={template._id}
                      hover
                      onClick={() => handleOpenDetail(template)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell>{template.name}</TableCell>
                      <TableCell>{template.description}</TableCell>
                      <TableCell>
                        <Chip
                          label={
                            template.platform
                              ? template.platform.charAt(0).toUpperCase() + template.platform.slice(1)
                              : 'N/A'
                          }
                          size='small'
                          color='primary'
                          variant='outlined'
                        />
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant='body2'
                          sx={{
                            color: 'text.secondary',
                            fontWeight: 500
                          }}
                        >
                          {template.product_type_name || 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            template.listing_type
                              ? template.listing_type.charAt(0).toUpperCase() + template.listing_type.slice(1)
                              : 'N/A'
                          }
                          size='small'
                          color='secondary'
                          variant='outlined'
                        />
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant='body2'
                          className={`font-bold ${template.status === 'active'
                            ? 'text-green-600'
                            : template.status === 'pending'
                              ? 'text-yellow-600'
                              : 'text-red-600'
                            }`}
                        >
                          {template.status || 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell>{new Date(template.created_at).toLocaleDateString()}</TableCell>
                      <TableCell align='right'>
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                          <IconButton
                            size='small'
                            onClick={e => {
                              e.stopPropagation()
                              handleEdit(template)
                            }}
                          >
                            <i className='tabler-edit' />
                          </IconButton>
                          <IconButton size='small' color='error' onClick={e => handleDeleteClick(e, template)}>
                            <i className='tabler-trash' />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div className='flex justify-center'>
              <Typography>No templates found</Typography>
            </div>
          )}
        </div>

        {templates.length > 0 && (
          <Box className='mt-4'>
            <PaginationControls
              itemsPerPage={itemsPerPage}
              totalPages={totalPages}
              currentPage={currentPage}
              totalItems={totalItems}
              templates={templates}
              onPageChange={handlePageChange}
              onLimitChange={handleLimitChange}
            />
          </Box>
        )}
      </CardContent>

      <Dialog open={openTemplateDetail} onClose={() => setOpenTemplateDetail(false)} maxWidth='lg' fullWidth>
        <DialogTitle>Template Detail</DialogTitle>
        <DialogContent>
          {selectedTemplate && (
            <>
              <DialogContentText>{selectedTemplate.name}</DialogContentText>
              <div className='mt-4'>
                <Typography variant='h6'>Description: {selectedTemplate.description}</Typography>
                <Typography variant='h6'>Platform: {selectedTemplate.platform}</Typography>
                <Typography variant='h6'>Status: {selectedTemplate.status}</Typography>
                <Typography variant='body2'>
                  Created: {new Date(selectedTemplate.created_at).toLocaleString()}
                </Typography>
                <Typography variant='body2'>
                  Updated: {new Date(selectedTemplate.updated_at).toLocaleString()}
                </Typography>
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTemplateDetail(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Template</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete template &ldquo;{templateToDelete?.name}&rdquo;? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color='error'
            disabled={isDeleting}
            startIcon={isDeleting ? <CircularProgress size={20} /> : null}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}
