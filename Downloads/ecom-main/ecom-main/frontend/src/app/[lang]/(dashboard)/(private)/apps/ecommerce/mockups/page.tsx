'use client'
// Next Imports
import { redirect } from 'next/navigation'

// Component Imports
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  TextField,
  InputAdornment,
  Chip,
  TablePagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Autocomplete
} from '@mui/material'
import { useState, useEffect, useCallback } from 'react'
import { DebouncedInput } from '@/components/DebouncedInput'
import axiosInstance from '@/libs/axios'
import AddItem from './AddItem'
import EditItem from './EditItem'
import Lightbox from '@/components/Lightbox'
import { toast } from 'react-toastify'
import ConfirmationDialog from '@/components/dialogs/confirmation-dialog'
import { getProductTypes } from '@/libs/helpers'

type Mockup = {
  _id: string
  name: string
  product_type: string
  product_type_name: string
  notes: string
  images: string[]
  events: string[]
  status?: string
}

type Event = {
  _id: string
  title: string
}

interface MockupsResponse {
  data: Mockup[]
  total: number
  page: number
  limit: number
  total_pages: number
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const MockupsPage = () => {
  const [itemOpen, setItemOpen] = useState(false)
  const [mockups, setMockups] = useState<MockupsResponse>({
    data: [],
    total: 0,
    page: 1,
    limit: 10,
    total_pages: 0
  })
  const [globalFilter, setGlobalFilter] = useState('')
  const [productTypeFilter, setProductTypeFilter] = useState('')
  const [eventFilter, setEventFilter] = useState<string[]>([])
  const [productTypes, setProductTypes] = useState<string[]>([])
  const [availableEvents, setAvailableEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [editItemOpen, setEditItemOpen] = useState(false)
  const [selectedMockup, setSelectedMockup] = useState<Mockup | undefined>()
  const [loading, setLoading] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<string | ''>('')
  const [lightboxAlt, setLightboxAlt] = useState<string | ''>('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [mockupToDelete, setMockupToDelete] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchText, setSearchText] = useState('')

  const handleSearchTitle = (value: string) => {
    setGlobalFilter(value)
  }

  const getEvents = async () => {
    try {
      const response = await axiosInstance.get(process.env.NEXT_PUBLIC_API_URL + '/api/authenticated/events/all')
      setAvailableEvents(response.data)
      setFilteredEvents(response.data)
    } catch (error: any) {
      console.error('Failed to fetch events:', error)
    }
  }

  const handleEventSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase()
    setSearchText(value)

    if (value) {
      const filtered = availableEvents.filter(event => event.title.toLowerCase().includes(value))
      setFilteredEvents(filtered)
    } else {
      setFilteredEvents(availableEvents)
    }
  }

  const getMockups = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(process.env.NEXT_PUBLIC_API_URL + '/api/authenticated/mockup/list', {
        params: {
          page,
          limit: rowsPerPage,
          search: globalFilter,
          product_type: productTypeFilter,
          events: eventFilter.join(',')
        }
      })
      setMockups(response.data)
    } catch (error: any) {
      console.error('Failed to fetch mockups:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadProductTypes = async () => {
    try {
      const types = await getProductTypes({}, (data: any) => {
        setProductTypes(data.result)
      })
    } catch (error: any) {
      console.error('Failed to fetch product types:', error)
    }
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(1)
  }

  const handleEditMockup = (mockup: Mockup) => {
    setSelectedMockup(mockup)
    setEditItemOpen(true)
  }

  const handleDeleteMockup = (id: string) => {
    setMockupToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    console.log(mockupToDelete)
    if (!mockupToDelete) return

    try {
      await axiosInstance.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/mockup/destroy/${mockupToDelete}`
      )
      toast.success('Mockup deleted successfully')
      getMockups()
    } catch (error: any) {
      console.error('Failed to delete mockup:', error)
      toast.error(error.response?.data?.error || 'Failed to delete mockup')
    } finally {
      setDeleteDialogOpen(false)
      setMockupToDelete(null)
    }
  }

  const handleCloseEdit = () => {
    setEditItemOpen(false)
    setSelectedMockup(undefined)
    getMockups()
  }

  useEffect(() => {
    loadProductTypes()
    getEvents()
    getMockups()
  }, [page, rowsPerPage, globalFilter, productTypeFilter, eventFilter])

  return (
    <>
      <Card>
        <CardContent>
          <div className='flex justify-between items-center mb-6'>
            <h3>Mockups</h3>
          </div>
          <div className='flex flex-wrap justify-between gap-4 mb-6'>
            <div>
              <Button
                variant='contained'
                color='primary'
                className='max-sm:is-full'
                startIcon={<i className='tabler-plus' />}
                onClick={() => setItemOpen(!itemOpen)}
              >
                Add
              </Button>
            </div>
            <div className='flex gap-4 items-center'>
              <FormControl className='w-48' size='small'>
                <InputLabel>Product Type</InputLabel>
                <Select
                  value={productTypeFilter}
                  label='Product Type'
                  onChange={e => setProductTypeFilter(e.target.value)}
                  size='small'
                >
                  <MenuItem value=''>
                    <em>All</em>
                  </MenuItem>
                  {Object.entries(productTypes).map(([id, name]) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className='w-48' size='small'>
                <InputLabel>Events</InputLabel>
                <Select
                  multiple
                  value={eventFilter}
                  label='Events'
                  onChange={e => setEventFilter(e.target.value as string[])}
                  size='small'
                  renderValue={selected => (
                    <div className='flex flex-wrap gap-1'>
                      {selected.map(value => {
                        const event = availableEvents.find(e => e._id === value)
                        return event ? <Chip key={value} label={event.title} size='small' /> : null
                      })}
                    </div>
                  )}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300
                      }
                    }
                  }}
                >
                  <div className='p-2'>
                    <TextField
                      size='small'
                      placeholder='Search events...'
                      value={searchText}
                      onChange={handleEventSearch}
                      fullWidth
                      className='mb-2'
                    />
                  </div>
                  {filteredEvents.map(event => (
                    <MenuItem key={event._id} value={event._id}>
                      <Checkbox checked={eventFilter.includes(event._id)} />
                      <ListItemText primary={event.title} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div className='w-48'>
                <DebouncedInput
                  value={globalFilter ?? ''}
                  onChange={value => handleSearchTitle(String(value))}
                  placeholder='Search Mockups...'
                  className='max-sm:is-full w-full'
                />
              </div>
              <Button
                variant='outlined'
                color='primary'
                className='max-sm:is-full'
                onClick={getMockups}
                title='Refresh'
              >
                <i className='tabler-refresh' />
              </Button>
            </div>
          </div>
          <div className='max-h-[600px] overflow-auto'>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Images</TableCell>
                  <TableCell>Product Type</TableCell>
                  <TableCell>Events</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className='text-center'>
                      <Typography>Loading...</Typography>
                    </TableCell>
                  </TableRow>
                ) : mockups.data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className='text-center'>
                      <Typography>No mockups found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  mockups.data.map((mockup: Mockup) => (
                    <TableRow key={'mockup-' + mockup._id}>
                      <TableCell>{mockup.name}</TableCell>
                      <TableCell>
                        {Array.isArray(mockup.images) && mockup.images.length > 0 ? (
                          mockup.images.map((image: string, index: number) => (
                            <img
                              key={'mockup-images' + index}
                              src={image}
                              alt={mockup.name}
                              className='w-16 h-16 object-cover rounded mr-1 cursor-pointer'
                              onClick={() => {
                                setLightboxImage(image)
                                setLightboxAlt(mockup.name)
                                setLightboxOpen(true)
                              }}
                            />
                          ))
                        ) : (
                          <Typography>No images</Typography>
                        )}
                      </TableCell>
                      <TableCell>{mockup.product_type_name}</TableCell>
                      <TableCell>
                        {Array.isArray(mockup.events) && mockup.events.length > 0 ? mockup.events.join(', ') : ''}
                      </TableCell>
                      <TableCell>
                        <Chip label={mockup.status} color={mockup.status === 'active' ? 'success' : 'error'} />
                      </TableCell>
                      <TableCell>
                        <div className='flex gap-2'>
                          <Button size='small' variant='contained' onClick={() => handleEditMockup(mockup)}>
                            Edit
                          </Button>
                          <Button
                            size='small'
                            variant='outlined'
                            color='error'
                            onClick={() => handleDeleteMockup(mockup._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <div className='mt-4 flex justify-end'>
            <TablePagination
              component='div'
              count={mockups.total}
              page={page - 1}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          </div>
        </CardContent>
      </Card>
      <AddItem
        open={itemOpen}
        handleClose={() => {
          setItemOpen(false)
          getMockups()
        }}
      />
      <EditItem
        open={editItemOpen}
        handleClose={() => {
          setEditItemOpen(false)
        }}
        mockupData={selectedMockup}
        onSuccess={getMockups}
      />
      <Lightbox
        imageUrl={lightboxImage}
        open={lightboxOpen}
        handleClose={() => setLightboxOpen(false)}
        imageAlt={lightboxAlt}
      />
      <ConfirmationDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        action_type='delete-order'
        onConfirm={() => handleDeleteConfirm()}
      />
    </>
  )
}

export default MockupsPage
