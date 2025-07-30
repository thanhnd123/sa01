'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'
import { useUser } from '@/contexts/UserContext'

// Service Imports
import { fetchProductTypes } from '@/services/designService'

// Component Imports
import { DesignList } from './components/DesignList'
import { SearchInput } from './components/SearchInput'
import { LoadingState } from './components/LoadingState'
import { ErrorState } from './components/ErrorState'
import ShowDesign from './components/ShowDesign'
import { FormControl, InputLabel, Select, MenuItem, Autocomplete, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Badge from '@mui/material/Badge'
import axiosInstance from '@/libs/axios'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { Chip, IconButton, Grid, Box, Typography, Avatar } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion';

// Types
import { Design } from './types'

interface ProductTypes {
  [key: string]: string
}

// Utility function
const formatDate = (timestamp: string | number) => {
  try {
    let date: Date;

    if (typeof timestamp === 'number') {
      // Nếu timestamp là số và nhỏ hơn 1e12, coi như là Unix timestamp (giây)
      if (timestamp < 1e12) {
        date = new Date(timestamp * 1000);
      } else {
        date = new Date(timestamp);
      }
    } else {
      date = new Date(timestamp);
    }

    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return String(timestamp);
  }
};

// API Functions
const fetchNewDesigns = async () => {
  try {
    const response = await fetch('/api/design?type=new')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching new designs:', error)
    throw error
  }
}

const DesignBoard = () => {
  // User context
  const { user } = useUser()

  // States
  const [allDesigns, setAllDesigns] = useState<Design[]>([])
  const [designs, setDesigns] = useState<Design[]>([])
  const [newDesigns, setNewDesigns] = useState<Design[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [globalFilter, setGlobalFilter] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)
  const [totalCount, setTotalCount] = useState(0) // Thêm state cho total count
  const [designDetailOpen, setDesignDetailOpen] = useState(false)
  const [selectedDesignDetail, setSelectedDesignDetail] = useState<Design | null>(null)
  const [productTypes, setProductTypes] = useState<ProductTypes>({})
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [users, setUsers] = useState<any[]>([])
  const [userFilter, setUserFilter] = useState<string>('');
  const [userInput, setUserInput] = useState('');
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({
    '': 0,
    processing: 0,
    submitted: 0,
    completed: 0,
    rejected: 0,
    deleted: 0
  });

  // Add statusOptions definition here
  const statusOptions = [
    { value: '', label: 'All', color: 'primary' },
    { value: 'processing', label: 'Processing', color: 'info' },
    { value: 'submitted', label: 'Submitted', color: 'warning' },
    { value: 'completed', label: 'Completed', color: 'success' },
    { value: 'rejected', label: 'Rejected', color: 'error' },
    { value: 'deleted', label: 'Trash', color: 'secondary' },
  ];

  // Move fetchMyDesigns and fetchMyDesignsData inside DesignBoard to access rowsPerPage, page
  const fetchMyDesigns = async (params?: { status?: string; user_id?: string; per_page?: number; page?: number }) => {
    try {
      const urlSearchParams = new URLSearchParams({
        type: 'my',
        status: params?.status || '',
        user_id: params?.user_id || '',
        per_page: params?.per_page ? String(params.per_page) : '',
        page: params?.page ? String(params.page) : '',
      })
      const response = await fetch(`/api/design?${urlSearchParams.toString()}`, {
        method: 'GET'
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching my designs:', error)
      throw error
    }
  }

  const fetchMyDesignsData = async (params?: { status?: string; user_id?: string; per_page?: number; page?: number }) => {
    try {
      const response = await fetchMyDesigns({
        status: params?.status,
        user_id: params?.user_id,
        per_page: params?.per_page ?? rowsPerPage,
        page: params?.page ?? page + 1,
      })
      if (response.success) {
        if (!params?.status && !params?.user_id) {
          setAllDesigns(response.data)
        }
        setDesigns(response.data)
        setTotalCount(response.total || 0) // Lưu total từ API response

        // Debug pagination info
        // console.log('=== PAGINATION DEBUG ===')
        // console.log('Current page:', page)
        // console.log('Requested page:', params?.page ?? page + 1)
        // console.log('Rows per page:', params?.per_page ?? rowsPerPage)
        // console.log('Total records:', response.total)
        // console.log('Records returned:', response.data.length)
        // console.log('Status filter:', params?.status || 'none')
        // console.log('User filter:', params?.user_id || 'none')
        // console.log('========================')
      }
    } catch (err) {
      console.error('Error fetching my designs:', err)
    }
  }

  // Fetch Data Functions
  const fetchProductTypesData = async () => {
    try {
      const productTypesData = await fetchProductTypes()
      if (productTypesData) {
        setProductTypes(productTypesData)
      }
    } catch (err) {
      console.error('Error loading product types:', err)
    }
  }

  const fetchUsersData = async () => {
    try {
      // Chỉ fetch users nếu user hiện tại là manager hoặc admin
      if (user?.role === 'manager' || user?.role === 'admin') {
        const response = await axiosInstance.get('/api/authenticated/users', {
          params: {
            limit: 100,
            page: 1
          }
        })
        if (response.data?.data) {
          // Thêm user hiện tại vào đầu danh sách
          const currentUserInList = {
            _id: user.id,
            name: user.name || user.email?.split('@')[0] || 'Current User',
            email: user.email || '',
            username: user.name || user.email || ''
          };
          setUsers([currentUserInList, ...response.data.data])
        } else {
          console.error('No data field in response:', response.data)
        }
      } else {
        console.log('User is not manager/admin, skipping users fetch')
      }
    } catch (err: any) {
      console.error('Error loading users:', err)
      console.error('Error details:', err.response?.data || err.message)
    }
  }

  const fetchNewDesignsData = async () => {
    try {
      const response = await fetchNewDesigns()
      if (response.success) {
        setNewDesigns(response.data)
      }
    } catch (err) {
      console.error('Error fetching new designs:', err)
    }
  }

  // Effects
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        await Promise.all([fetchNewDesignsData(), fetchMyDesignsData(), fetchProductTypesData(), fetchStatusCounts()])
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, []) // Fetch data cơ bản

  // Effect riêng cho fetch users khi user role thay đổi
  useEffect(() => {
    if (user?.role) {
      fetchUsersData()
    }
  }, [user?.role]) // Chỉ fetch users khi user role thay đổi

  // Handlers
  // Khi đổi page cũng fetch lại đúng filter và rowsPerPage
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
    fetchMyDesignsData({ status: statusFilter, user_id: userFilter, per_page: rowsPerPage, page: newPage + 1 })
  }

  // Sửa handleChangeRowsPerPage để fetch lại với limit mới
  const handleChangeRowsPerPage = (event: any) => {
    const newRowsPerPage = parseInt(event.target.value as string, 10)
    setRowsPerPage(newRowsPerPage)
    setPage(0)
    fetchMyDesignsData({ status: statusFilter, user_id: userFilter, per_page: newRowsPerPage, page: 1 })
  }

  // Handler cho việc thay đổi status filter
  const handleStatusFilterChange = (newStatus: string) => {
    setStatusFilter(newStatus)
    setPage(0)
    fetchMyDesignsData({ status: newStatus, user_id: userFilter, per_page: rowsPerPage, page: 1 })
    fetchStatusCounts()
  }

  // Handler cho việc thay đổi user filter
  const handleUserFilterChange = (newUserId: string) => {
    setUserFilter(newUserId)
    setPage(0)
    fetchMyDesignsData({ status: statusFilter, user_id: newUserId, per_page: rowsPerPage, page: 1 })
    fetchStatusCounts()
  }

  const handleOpenDesignDetail = (design: Design) => {
    setSelectedDesignDetail(design)
    setDesignDetailOpen(true)
  }

  const handleCloseDesignDetail = () => {
    setDesignDetailOpen(false)
    setSelectedDesignDetail(null)
  }

  const handleUpdateDesign = async (id: string, data: { seller_note?: string }) => {
    try {
      const response = await fetch(`/api/design/${id}/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Failed to update design')
      }

      // Update local state
      setNewDesigns(prevDesigns => prevDesigns.map(design => (design._id === id ? { ...design, ...data } : design)))
      fetchStatusCounts()
    } catch (error) {
      console.error('Error updating design:', error)
      throw error
    }
  }

  // Fetch status counts từ API riêng
  const fetchStatusCounts = async () => {
    try {
      const response = await axiosInstance.get('/api/authenticated/design/status-counts')
      if (response.data.success) {
        const counts = response.data.data
        setStatusCounts({
          '': counts.all,
          processing: counts.processing,
          submitted: counts.submitted,
          completed: counts.completed,
          rejected: counts.rejected,
          deleted: counts.deleted
        })
      }
    } catch (error) {
      console.error('Error fetching status counts:', error)
    }
  }

  // Loading & Error States
  if (loading) return <LoadingState />
  if (error) return <ErrorState error={error} />

  return (
    <>
      {/* New Designs Section */}
      {newDesigns.length > 0 ? (
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant='h6'>New Designs</Typography>
            <IconButton
              size='small'
              onClick={fetchNewDesignsData}
              sx={{
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <i className='tabler-refresh' />
            </IconButton>
          </Box>
          <Box sx={{
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
              height: 8,
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: 4,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: 4,
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.5)',
              },
            },
          }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', gap: 2, pb: 1 }}>
              <AnimatePresence>
                {newDesigns.map(design => (
                  <motion.div
                    key={design._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.25 }}
                    style={{ minWidth: 300, maxWidth: 340, flex: '0 0 auto' }}
                  >
                    <Card
                      sx={{
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        minHeight: '100px',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 4
                        }
                      }}
                      onClick={() => handleOpenDesignDetail(design)}
                    >
                      <Box sx={{ position: 'relative' }}>
                        {design.banner ? (
                          <img
                            src={design.banner}
                            alt={design.seller_note}
                            style={{
                              width: '100%',
                              height: '160px',
                              objectFit: 'cover'
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: '100%',
                              height: '160px',
                              bgcolor: 'grey.100',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <i className='tabler-image text-4xl text-gray-400' />
                          </Box>
                        )}
                        <Chip
                          label='New'
                          size='small'
                          color='warning'
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8
                          }}
                        />
                      </Box>
                      <Box sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                            <i className='tabler-user' />
                          </Avatar>
                          <Typography variant='body2' color='text.secondary'>
                            {design.created_by_user_name || 'Unknown Creator'}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <i className='tabler-calendar text-gray-500 mr-2' style={{ fontSize: '1rem' }} />
                          <Typography variant='body2' color='text.secondary'>
                            {formatDate(design.created_at)}
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            mb: 3,
            p: 3,
            bgcolor: 'background.paper',
            borderRadius: 1,
            minHeight: '100px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography variant='body1' color='text.secondary' align='center'>
              No new designs to process
            </Typography>
            <IconButton
              size='small'
              onClick={fetchNewDesignsData}
              sx={{
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <i className='tabler-refresh' />
            </IconButton>
          </Box>
        </Box>
      )}

      {/* My Designs Section */}
      <Card>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, px: 3, pt: 3 }}>
          <Box>
            <Typography variant='h5' sx={{ fontWeight: 600 }}>My Designs</Typography>
            <Typography variant='body2' color='text.secondary'>Browse and manage your design projects ({designs.length} items)</Typography>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <ButtonGroup variant="contained" size="small">
              {statusOptions.map(opt => {
                const allowedColors = ['primary', 'warning', 'info', 'success', 'error', 'secondary', 'inherit'] as const;
                const btnColor = allowedColors.includes(opt.color as any) ? opt.color : 'inherit';
                return (
                  <Button
                    key={opt.value}
                    variant="outlined"
                    color={btnColor as 'primary' | 'warning' | 'info' | 'success' | 'error' | 'secondary' | 'inherit'}
                    onClick={() => handleStatusFilterChange(opt.value)}
                    sx={{ minWidth: 110, fontWeight: statusFilter === opt.value ? 700 : 400, opacity: statusFilter === opt.value ? 1 : 0.7 }}
                  >
                    {opt.label}
                    {opt.value !== 'deleted' && ` (${statusCounts[opt.value]})`}
                  </Button>
                )
              })}
            </ButtonGroup>
          </Box>
          <Box sx={{ minWidth: 220, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            {/* User Filter - Chỉ hiện cho manager và admin */}
            {(user?.role === 'manager' || user?.role === 'admin') && (
              <Autocomplete
                size="small"
                sx={{ minWidth: 200 }}
                options={[{ _id: '', name: 'All Users', email: '' }, ...users]}
                getOptionLabel={(option) => option.name || option.username || option.email || 'Unknown'}
                value={userInput === '' ? null : users.find(u => u._id === userFilter) || null}
                inputValue={userInput}
                onInputChange={(event, newInputValue, reason) => {
                  setUserInput(newInputValue);
                  if (newInputValue === '') {
                    handleUserFilterChange('');
                  }
                }}
                onChange={(event, newValue) => {
                  if (newValue) {
                    handleUserFilterChange(newValue._id);
                    setUserInput(newValue.name || newValue.username || '');
                  } else {
                    handleUserFilterChange('');
                    setUserInput('');
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Filter by User"
                    placeholder="Search users..."
                  />
                )}
                renderOption={(props, option) => {
                  const { key, ...otherProps } = props;
                  return (
                    <Box component="li" key={key} {...otherProps}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 20, height: 20, fontSize: '0.75rem' }}>
                          {option.name ? option.name.charAt(0).toUpperCase() : (option.username ? option.username.charAt(0).toUpperCase() : option.email.charAt(0).toUpperCase())}
                        </Avatar>
                        <Typography variant="body2">
                          {option.name || option.username || option.email}
                          {option._id === user.id && ' (You)'}
                        </Typography>
                      </Box>
                    </Box>
                  );
                }}
                isOptionEqualToValue={(option, value) => option._id === value._id}
              />
            )}
            <SearchInput value={globalFilter} onChange={setGlobalFilter} />
          </Box>
        </Box>
        <Box sx={{ mb: 2 }} />
        <DesignList
          designs={designs}
          onDelete={function (id: string) {
            setNewDesigns(prevDesigns => prevDesigns.filter(design => design._id !== id))
            setDesigns(prevDesigns => prevDesigns.filter(design => design._id !== id))
          }}
          onGenerateBanner={design => handleOpenDesignDetail(design)}
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={totalCount}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onSubmitSuccess={() => {
            fetchMyDesignsData({ status: statusFilter, user_id: userFilter, per_page: rowsPerPage, page: page + 1 })
          }}
          currentUser={user ? {
            _id: user.id,
            role: user.role || 'user',
            statusFilter: statusFilter
          } : undefined}
          onReloadNewDesigns={fetchNewDesignsData}
        />

        {/* Debug info - có thể ẩn sau khi test xong */}
        {/* <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1, fontSize: '0.8rem' }}>
          <Typography variant="caption" color="text.secondary">
            Debug Info: Page {page + 1} | Records: {designs.length}/{totalCount} |
            Status: {statusFilter || 'all'} | User: {userFilter || 'all'}
          </Typography>
        </Box> */}
      </Card>

      {/* Design Detail Modal */}
      <ShowDesign
        open={designDetailOpen}
        onClose={handleCloseDesignDetail}
        design={selectedDesignDetail}
        onDelete={(id: string) => {
          setNewDesigns(prevDesigns => prevDesigns.filter(design => design._id !== id))
          setDesigns(prevDesigns => prevDesigns.filter(design => design._id !== id))
        }}
        onUpdate={handleUpdateDesign}
        isAdmin={user?.role === 'admin'}
        onNewDesignsReload={fetchNewDesignsData}
        onMyDesignsReload={fetchMyDesignsData}
      />
    </>
  )
}

export default DesignBoard
