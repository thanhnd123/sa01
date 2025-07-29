'use client'
// Next Imports
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

// Component Imports
import { Card, CardContent } from '@mui/material'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Button,
  IconButton,
  Box,
  Collapse,
  LinearProgress,
  Pagination,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  Checkbox
} from '@mui/material'
import Typography from '@mui/material/Typography'
import { useState, useEffect } from 'react'
import { DebouncedInput } from '@/components/DebouncedInput'
import axiosInstance from '@/libs/axios'
import Lightbox from '@/components/Lightbox'
import { toast } from 'react-toastify'
import ConfirmationDialog from '@/components/dialogs/confirmation-dialog'
import React from 'react'
import CustomTextField from '@/@core/components/mui/TextField'
import { actionAsyncStorage } from 'next/dist/server/app-render/action-async-storage.external'

type DesignAction = {
  _id: string
  type: string
  title: string
  title_en: string
  product_type: string
  name: string
  ideal_banner: string
  png: string
  worker: string
  status: string
  created_at: string
  created_by: string
  banners: string[]
  main_image: string
  mockups: any[]
  events: string[]
}
type DesignActionResponse = {
  data: DesignAction[]
  total: number
  page: number
  limit: number
  total_pages: number
}

const DesignActionBoard = () => {
  const [itemOpen, setItemOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<DesignAction | null>(null)
  const [designActions, setDesignActions] = useState<DesignActionResponse>({
    data: [],
    total: 0,
    page: 1,
    limit: 10,
    total_pages: 0
  })
  const [globalFilter, setGlobalFilter] = useState('')
  const [editItemOpen, setEditItemOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<string | string[] | ''>('')
  const [lightboxAlt, setLightboxAlt] = useState<string | string[] | ''>('')
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<{ actionId: string; productType: string } | null>(null)
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [statusMenuAnchor, setStatusMenuAnchor] = useState<null | HTMLElement>(null)
  const [createListingDialogOpen, setCreateListingDialogOpen] = useState(false)
  const [selectedShops, setSelectedShops] = useState<string[]>([])
  const { data: session } = useSession()
  const [shopList, setShopList] = useState<any[]>([])
  const [shopLoading, setShopLoading] = useState(false)
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const statusOptions = ['completed', 'pending', 'processing', 'failed']

  const handleSearchTitle = (value: string) => {
    setGlobalFilter(value)
    setCurrentPage(1)
  }

  const toggleRowExpansion = (id: string) => {
    // Vô hiệu hóa chức năng toggle vì chúng ta muốn luôn mở rộng
    return
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    setStatusMenuAnchor(null)
  }

  const getDesignActions = async (page = 1) => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (globalFilter) params.append('search', globalFilter)
      if (statusFilter) params.append('status', statusFilter)
      params.append('page', page.toString())
      params.append('limit', '10')

      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/design/actions?${params.toString()}`
      const response = await axiosInstance.get(url)
      console.log(response.data)
      setDesignActions(response.data)
    } catch (error: any) {
      console.error('Failed to fetch design actions:', error)
      toast.error('Failed to load design actions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDesignActions(currentPage)
  }, [currentPage, globalFilter, statusFilter])

  useEffect(() => {
    // Tự động mở tất cả các hàng khi dữ liệu được tải
    const initialExpandedState: Record<string, boolean> = {}
    designActions.data.forEach((action: DesignAction) => {
      initialExpandedState[action._id] = true
    })
    setExpandedRows(initialExpandedState)
  }, [designActions.data])

  const openLightbox = (image: string | string[], alt: string | string[], index: number) => {
    setLightboxImage(image)
    setLightboxAlt(alt)
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'success'
      case 'pending':
        return 'warning'
      case 'processing':
        return 'info'
      case 'failed':
        return 'error'
      default:
        return 'default'
    }
  }

  // Format date helper function
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const handleDelete = async () => {
    if (!itemToDelete) return

    try {
      await axiosInstance.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/design/actions/delete`, {
        data: {
          _id: itemToDelete.actionId
        }
      })
      toast.success('Product deleted successfully')
      getDesignActions(currentPage)
    } catch (error) {
      console.error('Failed to delete product:', error)
      toast.error('Failed to delete product')
    } finally {
      setDeleteDialogOpen(false)
      setItemToDelete(null)
    }
  }

  // Lấy danh sách shop khi mở dialog
  useEffect(() => {
    if (createListingDialogOpen) {
      const fetchShops = async () => {
        setShopLoading(true)
        try {
          const response = await axiosInstance.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/shops/list?limit=100&page=1`
          )
          setShopList(response.data.result?.data || [])
        } catch (error) {
          toast.error('Không thể tải danh sách shop')
        } finally {
          setShopLoading(false)
        }
      }
      fetchShops()
    }
  }, [createListingDialogOpen])

  // Lấy tất cả key dòng chỉ cho phép check (status completed)
  const allCheckableRowKeys = designActions.data.map(e => e._id)
  // Check trạng thái check all
  const isAllChecked =
    allCheckableRowKeys.length > 0 &&
    selectedRows.length === allCheckableRowKeys.length &&
    allCheckableRowKeys.every(key => selectedRows.includes(key))
  const isIndeterminate =
    selectedRows.length > 0 && selectedRows.some(key => allCheckableRowKeys.includes(key)) && !isAllChecked

  // Xử lý check all
  const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedRows(allCheckableRowKeys)
    } else {
      setSelectedRows(selectedRows.filter(key => !allCheckableRowKeys.includes(key)))
    }
  }

  // Xử lý check từng dòng
  const handleCheckRow = (rowKey: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedRows(prev => [...prev, rowKey])
    } else {
      setSelectedRows(prev => prev.filter(key => key !== rowKey))
    }
  }

  return (
    <>
      <Card>
        <CardContent>
          {/* Header */}
          <div className='flex justify-between items-center mb-6'>
            <Typography variant='h5' component='h1' className='font-semibold'>
              Design Action Board
            </Typography>
            <IconButton onClick={() => getDesignActions(currentPage)} size='small'>
              <i className='tabler-refresh' />
            </IconButton>
          </div>

          {/* Search and Filter area */}
          <div className='flex flex-wrap items-center justify-between gap-4 mb-1'>
            <div className='mb-1'>
              <Button
                variant='contained'
                color='primary'
                size='small'
                startIcon={<i className='tabler-plus' />}
                onClick={() => setCreateListingDialogOpen(true)}
              >
                Create Listing
              </Button>
            </div>
            <div className='flex flex-wrap items-center justify-end gap-4 mb-1'>
              <div>
                <Button
                  variant='outlined'
                  size='small'
                  onClick={e => setStatusMenuAnchor(e.currentTarget)}
                  startIcon={<i className='tabler-filter' />}
                  endIcon={<i className='tabler-chevron-down' />}
                >
                  {statusFilter ? statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1) : 'All Status'}
                </Button>
                <Menu
                  anchorEl={statusMenuAnchor}
                  open={Boolean(statusMenuAnchor)}
                  onClose={() => setStatusMenuAnchor(null)}
                >
                  <MenuItem onClick={() => handleStatusFilter('')}>All Status</MenuItem>
                  {statusOptions.map(status => (
                    <MenuItem key={status} onClick={() => handleStatusFilter(status)}>
                      <Chip
                        label={status.charAt(0).toUpperCase() + status.slice(1)}
                        size='small'
                        color={getStatusColor(status) as any}
                        className='mr-2'
                      />
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
              <div className='w-full sm:w-80'>
                <CustomTextField
                  fullWidth
                  value={globalFilter}
                  onChange={e => handleSearchTitle(e.target.value)}
                  placeholder='Search by name, product type...'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='tabler-search' />
                      </InputAdornment>
                    )
                  }}
                />
              </div>
            </div>
          </div>

          {/* Loading indicator */}
          {loading && (
            <Box sx={{ width: '100%', mb: 2 }}>
              <LinearProgress />
            </Box>
          )}

          {/* No results message */}
          {!loading && designActions.total === 0 && (
            <div className='w-full p-8 text-center'>
              <i className='tabler-file-off text-4xl mb-2 text-gray-400' />
              <Typography variant='body1' className='mb-2'>
                No design actions found
              </Typography>
              {globalFilter && (
                <Button variant='text' onClick={() => setGlobalFilter('')}>
                  Clear search
                </Button>
              )}
            </div>
          )}

          {/* Data table */}
          {!loading && designActions.total > 0 && (
            <div className='overflow-x-auto'>
              <Table className='table-bordered'>
                <TableHead>
                  <TableRow>
                    <TableCell padding='checkbox'>
                      <Checkbox indeterminate={isIndeterminate} checked={isAllChecked} onChange={handleCheckAll} />
                    </TableCell>
                    <TableCell>Ideal Name</TableCell>
                    <TableCell>Main Image</TableCell>
                    <TableCell>Banners</TableCell>
                    <TableCell>Worker</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {designActions.data.map((action: DesignAction) => (
                    <TableRow key={action._id}>
                      <TableCell padding='checkbox'>
                        <Checkbox checked={selectedRows.includes(action._id)} onChange={handleCheckRow(action._id)} />
                      </TableCell>
                      <TableCell>
                        <div className='flex items-start gap-3'>
                          {action.ideal_banner && (
                            <img
                              src={action.ideal_banner}
                              className='w-12 h-12 object-cover rounded border border-gray-200'
                              alt='Ideal Banner'
                              onClick={() => openLightbox(action.ideal_banner, action.title || 'Ideal Banner', 0)}
                            />
                          )}
                          <div className='flex flex-col gap-1'>
                            <Typography variant='body2' className='font-medium'>
                              {action.name || 'Unnamed Design'}
                            </Typography>
                            <div className='flex items-center gap-2'>
                              <Chip label={action.product_type || ''} size='small' color='info' variant='filled' />

                              {action.events !== undefined &&
                                action.events.map((event: string) => (
                                  <Chip
                                    key={event}
                                    label={event}
                                    size='small'
                                    color='secondary'
                                    variant='filled'
                                    className='m-0'
                                  />
                                ))}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {action.main_image ? (
                          <div className='flex gap-1'>
                            <img
                              src={action.main_image}
                              alt={action.name}
                              className='w-10 h-10 object-cover rounded cursor-pointer'
                              onClick={() => openLightbox(action.main_image, action.name, 0)}
                            />
                          </div>
                        ) : (
                          <Chip label='pending' size='small' color='warning' variant='outlined' />
                        )}
                      </TableCell>
                      <TableCell>
                        {action.banners && action.banners.length > 0 ? (
                          <div className='flex gap-1'>
                            {action.banners.map((img: string, idx: number) => (
                              <img
                                key={idx}
                                src={img}
                                alt={action.title}
                                className='w-10 h-10 object-cover rounded cursor-pointer'
                                onClick={() => openLightbox(action.banners, action.name, idx)}
                              />
                            ))}
                          </div>
                        ) : (
                          <Chip label='pending' size='small' color='warning' variant='outlined' />
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>{action.worker || '-'}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>{formatDate(action.created_at)}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={action.status || ''}
                          size='small'
                          color={getStatusColor(action.status) as any}
                          variant='outlined'
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            size='small'
                            color='primary'
                            onClick={() => {
                              setEditItemOpen(true)
                              setSelectedItem(action)
                            }}
                          >
                            <i className='tabler-edit' />
                          </IconButton>
                          <IconButton
                            size='small'
                            color='error'
                            onClick={() => {
                              setItemToDelete({ actionId: action._id, productType: action.product_type })
                              setDeleteDialogOpen(true)
                            }}
                          >
                            <i className='tabler-trash' />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination */}
          {!loading && designActions.total_pages > 1 && (
            <div className='flex justify-center mt-6'>
              <Pagination
                count={designActions.total_pages}
                page={currentPage}
                onChange={handlePageChange}
                color='primary'
                shape='rounded'
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lightbox for image preview */}
      <Lightbox
        imageUrl={lightboxImage}
        open={lightboxOpen}
        handleClose={() => setLightboxOpen(false)}
        imageAlt={lightboxAlt}
      />

      {/* Edit Dialog */}
      <Dialog open={editItemOpen} onClose={() => setEditItemOpen(false)} maxWidth='md' fullWidth>
        <DialogTitle>Edit Design Action</DialogTitle>
        <DialogContent>
          {selectedItem && (
            <Box sx={{ mt: 2 }}>
              <CustomTextField
                fullWidth
                label='Name'
                value={selectedItem.name || ''}
                onChange={e => setSelectedItem({ ...selectedItem, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <CustomTextField
                fullWidth
                label='Worker'
                value={selectedItem.worker || ''}
                onChange={e => setSelectedItem({ ...selectedItem, worker: e.target.value })}
                sx={{ mb: 2 }}
              />
              <CustomTextField
                fullWidth
                label='Status'
                value={selectedItem.status || ''}
                onChange={e => setSelectedItem({ ...selectedItem, status: e.target.value })}
                sx={{ mb: 2 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditItemOpen(false)}>Cancel</Button>
          <Button
            variant='contained'
            onClick={async () => {
              try {
                if (selectedItem) {
                  await axiosInstance.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/design/actions/update`,
                    selectedItem
                  )
                  toast.success('Design action updated successfully')
                  setEditItemOpen(false)
                  getDesignActions(currentPage)
                }
              } catch (error) {
                console.error('Failed to update design action:', error)
                toast.error('Failed to update design action')
              }
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        action_type='delete-order'
        onConfirm={handleDelete}
      />

      {/* Create Listing Dialog */}
      <Dialog open={createListingDialogOpen} onClose={() => setCreateListingDialogOpen(false)} maxWidth='sm' fullWidth>
        <DialogTitle>Create Listing</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <CustomTextField
              select
              fullWidth
              label='Chọn Shop'
              value={selectedShops}
              onChange={e =>
                setSelectedShops(
                  typeof e.target.value === 'string' ? e.target.value.split(',') : (e.target.value as string[])
                )
              }
              SelectProps={{
                multiple: true,
                native: false,
                renderValue: selected =>
                  (selected as string[])
                    .map(id => {
                      const shop = shopList.find(s => s._id === id)
                      return shop ? shop.name : id
                    })
                    .join(', ')
              }}
              sx={{ mb: 2 }}
              disabled={shopLoading}
            >
              {shopLoading ? (
                <MenuItem disabled>Đang tải shop...</MenuItem>
              ) : shopList.length === 0 ? (
                <MenuItem disabled>Không có shop</MenuItem>
              ) : (
                shopList.map(shop => (
                  <MenuItem value={shop._id} key={shop._id}>
                    {shop.name}
                  </MenuItem>
                ))
              )}
            </CustomTextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setCreateListingDialogOpen(false)
              setSelectedShops([])
            }}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            onClick={async () => {
              if (selectedRows.length === 0) {
                toast.error('Please select at least one product!')
                return
              }
              if (selectedShops.length === 0) {
                toast.error('Please select at least one shop!')
                return
              }
              try {
                // Map selectedRows thành mảng object { ideal_id, product_type, mockup_name }

                await axiosInstance.post(
                  `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/listing/create-listing-from-action`,
                  {
                    shops: selectedShops,
                    actions: selectedRows
                  }
                )
                toast.success('Create listing success!')
                setCreateListingDialogOpen(false)
                setSelectedShops([])
                setSelectedRows([])
              } catch (error) {
                console.error('Failed to create listing:', error)
                toast.error('Create listing failed!')
              }
            }}
            disabled={selectedShops.length === 0 || shopLoading}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DesignActionBoard
