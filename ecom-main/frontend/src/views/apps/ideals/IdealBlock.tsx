'use client'

import React, { useCallback, useEffect, useState, useRef } from 'react'

import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

// import Cookies from 'js-cookie'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Pagination from '@mui/material/Pagination'
import type { TextFieldProps } from '@mui/material/TextField'
import Select from '@mui/material/Select'
import type { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import CardHeader from '@mui/material/CardHeader'

import { toast } from 'react-toastify'

import CustomTextField from '@core/components/mui/TextField'
import TextField from '@mui/material/TextField'

import SyncIdealToDesignDialog from '@/components/dialogs/ideals/PushToDesigner'
import PngDialog from '@/components/dialogs/ideals/PngDialog'
import AddIdealDialog from '@/components/dialogs/ideals/AddIdealDialog'
import EditIdealDialog from '@/components/dialogs/ideals/EditIdealDialog'
import IdealDetailsDialog from '@/components/dialogs/ideals/IdealDetailsDialog'
import { BulkIdealGenerateBannerDialog } from '@/components/BulkIdealGenerateBanner'

import axiosInstance from '@/libs/axios'

import IdealCard from './components/IdealCard'
import IdealFilters from './components/IdealFilters'

type ProductTypeMap = {
  [key: string]: string
}

interface ProductIdeal {
  title: string
  market: string
  banner: string
  store: string
  sold_24h: number
  views_24h: number
  total_sold: number
  estimated_revenue: number
  daily_views: number
  rate_favorite: number
  total_farvorites: number
  original_creation: string
  last_modified: string
  hey_etsy_tags: string
  png: string
  _id: string
  id: string
}

interface dataUser {
  _id: string
  email: string
  name: string
  password: string
  role: string
  role_id: string
  status: string
  team: string
  team_id: string
  token_admin: string
  token_user: string
}

interface QueryParam {
  index: string
  value: string
}

interface SortParam {
  index: string
  value: string
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
    setValue(newValue)
    onChange(newValue)
  }

  return <CustomTextField {...props} value={value} onChange={handleChange} />
}

export default function IdealBlock() {
  const [dataProductType, setDataProductType] = useState<any[]>([])
  const [filteredData, setFilteredData] = useState<ProductIdeal[]>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(25)
  const [totalItems, setTotalItems] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [valueFavorites, setValueFavorites] = useState('all')
  const [valueMyIdeal, setValueMyIdeal] = useState('all')
  const [showMyIdeals, setShowMyIdeals] = useState(true) // Mặc định checked
  const [apiUrl, setApiUrl] = useState(process.env.NEXT_PUBLIC_API_URL + '/api/authenticated/ideals/list')
  const { data: session } = useSession()

  const user = session?.user

  const [sortValues, setSortValues] = useState({
    views: '',
    'avg views': '',
    sold: '',
    favorites: ''
  })

  const sortMap: Record<string, string> = {
    views: 'total_views',
    'avg views': 'daily_views',
    sold: 'total_sold',
    favorites: 'total_farvorites'
  }

  const [open, setOpen] = useState(false)
  const [openBannerDialog, setOpenBannerDialog] = useState(false)
  const [openAddIdealDialog, setOpenAddIdealDialog] = useState(false)
  const [openEditIdealDialog, setOpenEditIdealDialog] = useState(false)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [openBulkBanner, setOpenBulkBanner] = useState(false)

  const searchTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleClickOpenModal = useCallback((item: any) => {
    setSelectedItem(item)
    setOpen(true)
  }, [])

  const handleClickOpenBannerModal = useCallback((item: any) => {
    setSelectedItem(item)
    setOpenBannerDialog(true)
  }, [])

  const handleShowDetails = useCallback((item: any) => {
    setSelectedItem(item)
    setOpenDetailsDialog(true)
  }, [])

  const handleEditIdeal = useCallback((item: any) => {
    setSelectedItem(item)
    setOpenEditIdealDialog(true)
  }, [])

  const handleCloseModal = useCallback(() => setOpen(false), [])
  const handleCloseBannerModal = useCallback(() => setOpenBannerDialog(false), [])
  const handleCloseAddIdealModal = useCallback(() => setOpenAddIdealDialog(false), [])
  const handleCloseEditIdealModal = useCallback(() => setOpenEditIdealDialog(false), [])
  const handleCloseDetailsModal = useCallback(() => setOpenDetailsDialog(false), [])
  const fetchProducts = useCallback(
    (page = 1, limit = itemsPerPage | 25, query: QueryParam | false = false, sort: SortParam | false = false) => {
      const params = new URLSearchParams({
        limit: limit.toString(),
        page: page.toString()
      })

      if (query) {
        params.append(query.index, query.value)
      }

      if (sort) {
        params.append('sort', sort.index)
        params.append('sort-by', sort.value)
      }

      // Thêm filter My Ideals
      if (showMyIdeals) {
        params.append('my_ideals', 'true')
      }

      const api = `${apiUrl}?${params.toString()}`

      axiosInstance
        .get(api)
        .then(res => res.data)
        .then(dataResponse => {
          console.log('API Response:', dataResponse) // Debug log
          setFilteredData(dataResponse.data || [])
          // Không set lại itemsPerPage từ API response để tránh override user selection
          setCurrentPage(dataResponse.page || 1)
          setTotalPages(dataResponse.total_pages || 1)
          setTotalItems(dataResponse.total || 0)
          setIsLoading(false)
        })
        .catch(error => {
          console.error('Error fetching products:', error)
          setIsLoading(false)
        })
    },
    [apiUrl, itemsPerPage, showMyIdeals]
  )
  const handleSelectChange = useCallback(
    (key: any, value: any) => {
      // Handle sort by logic
      if (key === 'views' || key === 'avg views' || key === 'sold' || key === 'favorites') {
        // Update sortValues state first
        setSortValues(prev => {
          const newSortValues = { ...prev }
          // Clear all other sort values
          Object.keys(newSortValues).forEach(k => {
            newSortValues[k as keyof typeof newSortValues] = ''
          })
          // Set the selected field value
          if (value) {
            newSortValues[key as keyof typeof newSortValues] = value
          }
          return newSortValues
        })
      } else if (key === 'select-favorites') {
        // Handle favorites filter
        setValueFavorites(value)
        fetchProducts(1, itemsPerPage, { index: 'favorites', value: value })
      } else if (key === 'select-my-ideal') {
        // Handle my ideals filter
        setValueMyIdeal(value)
        fetchProducts(1, itemsPerPage, { index: 'my_ideals', value: value })
      } else {
        // Handle other filter logic
        fetchProducts(1, itemsPerPage, { index: key, value: value })
      }
    },
    [fetchProducts, itemsPerPage]
  )

  const handleClearFilters = useCallback(() => {
    setSortValues({
      views: '',
      'avg views': '',
      sold: '',
      favorites: ''
    })
    setValueFavorites('all')
    setValueMyIdeal('all')
    setShowMyIdeals(true) // Reset về checked
    fetchProducts(1, itemsPerPage)
  }, [fetchProducts, itemsPerPage])

  const handleMyIdealsChange = useCallback((checked: boolean) => {
    setShowMyIdeals(checked)
    // Gọi lại API với filter mới
    let sort: SortParam | false = false
    Object.entries(sortValues).forEach(([key, direction]) => {
      if (direction) {
        const sortIndex = sortMap[key]
        if (sortIndex) {
          sort = { index: sortIndex, value: direction }
        }
      }
    })
    fetchProducts(1, itemsPerPage, false, sort)
  }, [fetchProducts, itemsPerPage, sortValues, sortMap])

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      // if (window.idealBlockInterval) {
      //   clearInterval(window.idealBlockInterval)
      // }
    }
  }, [])


  const getProductTypes = useCallback(async () => {
    const apiProductTypes = process.env.NEXT_PUBLIC_API_URL + '/products/product-types'

    const response = await fetch(apiProductTypes, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const dataResponse = await response.json()

    setDataProductType(dataResponse.result)
  }, [])

  useEffect(() => {
    const init = async () => {
      await getProductTypes()
      await fetchProducts()
    }

    init()
  }, [getProductTypes, fetchProducts])

  // Effect to handle sort changes
  useEffect(() => {
    // Skip on initial mount
    if (filteredData.length === 0) return

    const activeSort = Object.entries(sortValues).find(([key, value]) => value !== '')
    if (activeSort) {
      const [key, value] = activeSort
      const sortMap: Record<string, string> = {
        views: 'total_views',
        'avg views': 'daily_views',
        sold: 'total_sold',
        favorites: 'total_farvorites'
      }
      const sortIndex = sortMap[key]
      if (sortIndex && value) {
        fetchProducts(1, itemsPerPage, false, { index: sortIndex, value: value })
      }
    }
  }, [sortValues, fetchProducts, itemsPerPage, filteredData.length])

  // Hooks
  const params = useParams()

  const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    fetchProducts(value, itemsPerPage)
  }, [fetchProducts, itemsPerPage])

  const handleLimitChange = useCallback((event: SelectChangeEvent<number>) => {
    const newLimit = event.target.value as number
    console.log('Changing limit to:', newLimit) // Debug log

    setItemsPerPage(newLimit)
    let sort: SortParam | false = false
    let query: QueryParam | false = false

    Object.entries(sortValues).forEach(([key, direction]) => {
      if (direction) {
        const sortIndex = sortMap[key]

        if (sortIndex) {
          sort = { index: sortIndex, value: direction }
        }
      }
    })

    if (globalFilter != '') {
      query = { index: 'search', value: globalFilter }
    }

    fetchProducts(1, newLimit, query, sort)
  }, [fetchProducts, sortValues, sortMap, globalFilter])

  const PaginationControls = () => (
    <Box className='flex flex-wrap items-center justify-between gap-4 m-0'>
      <Box className='flex items-center gap-2'>
        <Typography variant='body2'>Show</Typography>
        <FormControl size='small' sx={{ minWidth: 80 }}>
          <Select 
            value={itemsPerPage || 25} 
            onChange={handleLimitChange} 
            className='rounded'
            displayEmpty={false}
          >
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
        <Typography variant='body2'>entries</Typography>
      </Box>

      <Box className='flex items-center gap-2'>
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color='primary' size='medium' />
      </Box>

      <Typography variant='body2'>
        Showing {totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
        {totalItems > 0 ? Math.min(currentPage * itemsPerPage, totalItems) : 0} of {totalItems || 0} entries
      </Typography>
    </Box>
  )

  const handleSearchTitle = useCallback((event: React.FormEvent) => {
    event.preventDefault()
    let sort: SortParam | false = false

    Object.entries(sortValues).forEach(([key, direction]) => {
      if (direction) {
        const sortIndex = sortMap[key]
        if (sortIndex) {
          sort = { index: sortIndex, value: direction }
        }
      }
    })
    fetchProducts(1, itemsPerPage, { index: 'search', value: globalFilter }, sort)
  }, [fetchProducts, itemsPerPage, sortValues, sortMap, globalFilter])

  const handleSearchChange = useCallback((value: string | number) => {
    const searchValue = value.toString()
    setGlobalFilter(searchValue)

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current)
    }
    searchTimeout.current = setTimeout(() => {
      let sort: SortParam | false = false
      Object.entries(sortValues).forEach(([key, direction]) => {
        if (direction) {
          const sortIndex = sortMap[key]
          if (sortIndex) {
            sort = { index: sortIndex, value: direction }
          }
        }
      })
      fetchProducts(1, itemsPerPage, { index: 'search', value: searchValue }, sort)
    }, 400)
  }, [fetchProducts, itemsPerPage, sortValues, sortMap])

  const handleRemoveFavorite = useCallback((item: any) => {
    axiosInstance
      .get(
        process.env.NEXT_PUBLIC_API_URL +
        `/api/authenticated/ideals/product-ideals-ref-users/remove-favorite?_id=${item._id}`
      )
      .then(response => response.data)
      .then(response => {
        if (response.response == 'done') {
          toast.success(`Remove ideal ${item.title} from your favorites success!`)
          setApiUrl(process.env.NEXT_PUBLIC_API_URL + `/api/authenticated/ideals/list`)
        }
      })
  }, [])

  const fetchSyncToDesignRef = useCallback((productIdeal: any, valueSelectModal: string[], sellerNote: string, userId: string) => {
    axiosInstance
      .post(process.env.NEXT_PUBLIC_API_URL + `/api/authenticated/ideals/product-ideals-ref-users/sync-to-design`, {
        product_ideal_id: productIdeal._id,
        product_type: valueSelectModal,
        seller_note: sellerNote,
        type_request: 'sync_to_design',
        banner: productIdeal.banner,
        seller_id: userId ?? null,
        title: productIdeal.title
      })
      .then(res => res.data)
      .then(dataResponse => {
        if (dataResponse.response == 'Sync to design success!') {
          toast.success('Sync to design success!')
        } else {
          toast.error(dataResponse.response)
        }
      })
      .catch(error => {
        console.error('Error syncing ideal to design:', error)
      })
  }, [])

  const handleAddFavorite = useCallback((item: any) => {
    fetchSyncToDesignRef(item, [], '', user?.id ?? '')
  }, [fetchSyncToDesignRef, user?.id])

  return (
    <>
      <Card>
        <CardHeader
          title='Ideals'
          className='pbe-4'
          action={
            <Button
              variant='outlined'
              className='p-1'
              onClick={() => {
                fetchProducts(1, itemsPerPage)
              }}
            >
              <i className='tabler-refresh' />
            </Button>
          }
        />
        <CardContent>
          <div className='flex flex-wrap items-center justify-between gap-3 mb-4'>
            <div className='flex gap-2'>
              <Button variant='contained' color='primary' onClick={() => setOpenAddIdealDialog(true)}>
                Add Ideal
              </Button>
              <Button variant='outlined' color='primary' onClick={() => setOpenBulkBanner(true)}>
                Bulk Generate Banner
              </Button>
            </div>
            <div className='flex items-center gap-3'>
              <TextField
                value={globalFilter ?? ''}
                onChange={(e) => handleSearchChange(e.target.value)}
                label='Search ideals'
                size='small'
                className='max-w-xs'
                variant='outlined'
                InputProps={{
                  startAdornment: <i className='tabler-search text-gray-400 mr-2' />
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(0, 0, 0, 0.23)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(0, 0, 0, 0.87)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                }}
              />
              <IdealFilters
                sortValues={sortValues}
                onSortChange={handleSelectChange}
                onClearFilters={handleClearFilters}
                showMyIdeals={showMyIdeals}
                onMyIdealsChange={handleMyIdealsChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredData && filteredData.length > 0 ? (
        <Card className='mt-3'>
          <CardContent className='p-3 m-0'>
            <PaginationControls />
          </CardContent>
        </Card>
      ) : (
        ''
      )}

      <div className='mt-3'>
        {isLoading ? (
          <Typography className='text-center'>Loading products...</Typography>
        ) : filteredData ? (
          filteredData.length > 0 ? (
            <>
              <Grid container spacing={3}>
                {filteredData.map((item, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 3, lg: 2, xl: 2 }} key={index}>
                    <IdealCard
                      item={item}
                      valueFavorites={valueFavorites}
                      onPushToDesigner={handleClickOpenModal}
                      onPngClick={handleClickOpenBannerModal}
                      onRemoveFavorite={handleRemoveFavorite}
                      onAddFavorite={handleAddFavorite}
                      onShowDetails={handleShowDetails}
                      onEdit={handleEditIdeal}
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <div className='flex justify-center'>
              <div>Not found any product ...</div>
            </div>
          )
        ) : (
          <div className='flex justify-center'>
            <div>Not found any product ...</div>
          </div>
        )}
      </div>

      {filteredData && filteredData.length > 0 ? (
        <Card className='mt-3'>
          <CardContent className='p-3 m-0'>
            <PaginationControls />
          </CardContent>
        </Card>
      ) : (
        ''
      )}

      <AddIdealDialog
        open={openAddIdealDialog}
        onClose={handleCloseAddIdealModal}
        onSuccess={() => {
          fetchProducts(1, itemsPerPage)
        }}
      />

      <BulkIdealGenerateBannerDialog
        open={openBulkBanner}
        onClose={() => setOpenBulkBanner(false)}
        onSuccess={() => {
          toast.success('Bulk banner generation started!')
        }}
      />

      <SyncIdealToDesignDialog
        open={open}
        handleCloseModal={handleCloseModal}
        productIdeal={selectedItem}
        productTypes={dataProductType}
        userId={user?.id ?? ''}
      />
      <PngDialog
        open={openBannerDialog}
        handleCloseModal={handleCloseBannerModal}
        productIdeal={selectedItem}
        userId={user?.id ?? ''}
      />
      <IdealDetailsDialog
        open={openDetailsDialog}
        onClose={handleCloseDetailsModal}
        ideal={selectedItem}
      />
      <EditIdealDialog
        open={openEditIdealDialog}
        onClose={handleCloseEditIdealModal}
        ideal={selectedItem}
        onSuccess={() => {
          fetchProducts(1, itemsPerPage)
        }}
      />
    </>
  )
}
