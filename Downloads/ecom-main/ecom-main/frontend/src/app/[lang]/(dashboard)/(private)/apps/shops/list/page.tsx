'use client'

import React, { useCallback, useEffect, useState, useRef, ChangeEvent } from 'react'

import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'
import type { TextFieldProps } from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import CustomTextField from '@core/components/mui/TextField'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import type { User } from '@/types/apps/userTypes'
import { toast } from 'react-toastify'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TablePagination from '@mui/material/TablePagination'
import { useUser } from '@/contexts/UserContext'
import axiosInstance from '@/libs/axios'
import IconButton from '@mui/material/IconButton'
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

const SelectElement = ({
  defaultValue,
  label,
  name,
  data,
  keyData,
  dataShop,
  setDataShop
}: {
  defaultValue: string
  label: string
  name: string
  data: keyObject
  keyData: keyof Shop | keyof emptyShopI | null
  dataShop: Shop | emptyShopI | null
  setDataShop: React.Dispatch<React.SetStateAction<Shop | emptyShopI | null>>
}) => {
  return (
    <div className='flex gap-6 mt-2'>
      <CustomTextField
        select
        fullWidth
        value={defaultValue}
        label={label}
        name={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (dataShop && keyData) {
            setDataShop(prev => {
              if (!prev) return null
              return { ...prev, [keyData]: e.target.value } as Shop | emptyShopI
            })
          }
        }}
      >
        {Object.keys(data).map((item, index) => (
          <MenuItem value={item} key={index}>
            {data[item]}
          </MenuItem>
        ))}
      </CustomTextField>
    </div>
  )
}

type Shop = {
  _id: string
  name: string
  seller_id: string
  team_id: string
  seller_name: string
  team_name: string
  created_at: string
  email: string
  platform: string
}

interface keyObject {
  [key: string]: string
}

interface paginateShop {
  data: Shop[]
  last_page: number
  page: number
  per_page: number
  total: number
}

interface emptyShopI {
  _id: string | null
  name: string
  email: string
  platform: string
  seller_name: string
  seller_id: string
  team_id: string
  user_id: string | null
  update: string | null
}

const dataTableShop = (
  _id: string,
  name: string,
  email: string,
  seller: string,
  team: string,
  created_at: string,
  seller_id: string,
  team_id: string,
  platform: string
) => {
  return {
    _id,
    name,
    email,
    seller,
    team,
    created_at,
    seller_id,
    team_id,
    platform
  }
}

const ECommerceShopsList = () => {
  const [filteredData, setFilteredData] = useState<paginateShop | null>(null)
  const [globalFilter, setGlobalFilter] = useState('')
  const [totalItems, setTotalItems] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const { user: userData } = useUser()
  const [open, setOpen] = useState<boolean>(false)
  const formSubmitShop = useRef<HTMLFormElement>(null)
  const formSubmitSearchShop = useRef<HTMLFormElement>(null)
  const [users, setUsers] = useState<keyObject>({})
  const [teams, setTeams] = useState<keyObject>({})
  const [selectedPlatform, setSelectedPlatform] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const platforms: keyObject = {
    tiktok: 'Tiktok',
    amazon: 'Amazon',
    etsy: 'Etsy',
    ebay: 'Ebay'
  }
  const statuses: keyObject = {
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending'
  }
  const dataTableRow = ['Name', 'Email', 'Platform', 'Seller', 'Team', 'Created At', 'Actions']
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)
  const [dataShop, setDataShop] = useState<Shop | emptyShopI | null>(null)
  const emptyShop: emptyShopI = {
    _id: null,
    name: '',
    email: '',
    platform: '',
    seller_id: '',
    seller_name: '',
    team_id: '',
    user_id: null,
    update: null
  }

  const handleSearchShop = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (userData) {
      handleLoadShops(25, 1, globalFilter, selectedPlatform, selectedStatus)
    }
  }

  const handleFilterChange = () => {
    if (userData) {
      handleLoadShops(25, 1, globalFilter, selectedPlatform, selectedStatus)
    }
  }

  const handleClickOpenShopDialog = (dataShop: Shop | null) => {
    setOpen(true)
    if (dataShop) {
      setDataShop(dataShop)
    } else {
      setDataShop(emptyShop)
    }
  }

  const handleCloseShopDialog = () => {
    setDataShop(emptyShop)
    setOpen(false)
  }

  const handleSubmitShopForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (userData) {
      const form = formSubmitShop.current
      if (form) {
        const formData = new FormData(form)
        const name = formData.get('name')
        const email = formData.get('email')
        const platform = formData.get('select-platform')
        const seller = formData.get('select-seller')
        const team = formData.get('select-team')
        const dataRequest = {
          name: name,
          email: email,
          platform: platform,
          seller_id: seller,
          team_id: team,
          user_id: userData?.id ?? null,
          update: dataShop?._id ?? null
        }
        axiosInstance.post('/api/authenticated/shops/store', dataRequest)
          .then(response => {
            toast.success(`Create new shop success!`)
            handleCloseShopDialog()
            handleReload()
          })
      } else {
        toast.error('Not found form data, please login again or alert for Team DEV!')
      }
    } else {
      toast.error('Not found user data, please login again or alert for Team DEV!')
    }
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    if (userData) {
      handleLoadShops(25, 1)
    } else {
      toast.error('Not found user data, please login again or alert for Team DEV!')
    }
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (userData) {
      if (event.target.value && Number(event.target.value) > 0) {
        handleLoadShops(Number(event.target.value), 1)
      }
    } else {
      toast.error('Not found user data, please login again or alert for Team DEV!')
    }
  }

  const handleLoadShops = async (
    perPage: number | null = null,
    pageCurrent: number | null = null,
    search: string | null = null,
    platform: string | null = null,
    status: string | null = null
  ) => {
    const limit = perPage ?? rowsPerPage
    const pageIndex = pageCurrent ?? page + 1
    let query = ''
    if (search) query += `&search=${search}`
    if (platform) query += `&platform=${platform}`
    if (status) query += `&status=${status}`

    await axiosInstance.get(
      process.env.NEXT_PUBLIC_API_URL +
      `/api/authenticated/shops/list?limit=${limit}&page=${pageIndex}${query}`
    )
      .then(response => {
        console.log(response.data.result)
        setFilteredData(response.data.result)
        setIsLoading(false)
      })
  }

  const handleReload = () => {
    if (userData) {
      setIsLoading(true)
      handleLoadShops(25, 1, null, null, null)
    }
  }

  useEffect(() => {
    const init = async () => {
      await handleLoadShops(25, 1)
    }
    init()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardContent>
            <div className='flex justify-between items-center mb-6'>
              <div className='flex gap-4'>
                <Button
                  variant='contained'
                  onClick={() => handleClickOpenShopDialog(null)}
                  size='small'
                >
                  <i className='tabler-plus text-base mr-2' />
                  Add shop
                </Button>
              </div>
              <form
                className='flex items-center gap-4'
                onSubmit={handleSearchShop}
                ref={formSubmitSearchShop}
              >
                <CustomTextField
                  select
                  value={selectedPlatform}
                  onChange={(e) => {
                    setSelectedPlatform(e.target.value)
                    handleFilterChange()
                  }}
                  placeholder="Platform"
                  className='w-40'
                  InputLabelProps={{ shrink: false }}
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: (value) => value ? platforms[value as string] : "Platform"
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  {Object.entries(platforms).map(([key, value]) => (
                    <MenuItem key={key} value={key}>{value}</MenuItem>
                  ))}
                </CustomTextField>
                <CustomTextField
                  select
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value)
                    handleFilterChange()
                  }}
                  placeholder="Status"
                  className='w-40'
                  InputLabelProps={{ shrink: false }}
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: (value) => value ? statuses[value as string] : "Status"
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  {Object.entries(statuses).map(([key, value]) => (
                    <MenuItem key={key} value={key}>{value}</MenuItem>
                  ))}
                </CustomTextField>
                <DebouncedInput
                  value={globalFilter ?? ''}
                  name='search-name-shop'
                  onChange={value => {
                    setGlobalFilter(value as string)
                    handleFilterChange()
                  }}
                  placeholder='Search shops...'
                  className='w-64'
                  InputLabelProps={{ shrink: false }}
                />
                <Button
                  variant='outlined'
                  onClick={handleReload}
                  size='small'
                >
                  <i className='tabler-refresh text-base' />
                </Button>
              </form>
            </div>

            <Dialog
              open={open}
              onClose={handleCloseShopDialog}
              aria-labelledby='form-dialog-title'
              closeAfterTransition={false}
            >
              <DialogTitle className='text-center p-2 pt-5' id='form-dialog-title'>
                {dataShop?._id ? 'Edit' : 'Add new'} shop
              </DialogTitle>
              <form action='' method={'post'} onSubmit={handleSubmitShopForm} ref={formSubmitShop}>
                <DialogContent>
                  <CustomTextField
                    onChange={useCallback(
                      (e: ChangeEvent<HTMLInputElement>) => {
                        if (dataShop) {
                          setDataShop(prev => {
                            if (prev === null) return null
                            return { ...prev, name: e.target.value } as Shop | emptyShopI
                          })
                        }
                      },
                      [dataShop]
                    )}
                    value={dataShop?.name ?? ''}
                    name='name'
                    autoFocus
                    fullWidth
                    type='text'
                    label='Name Shop'
                    required
                  />
                  <CustomTextField
                    onChange={useCallback(
                      (e: ChangeEvent<HTMLInputElement>) => {
                        if (dataShop) {
                          setDataShop(prev => {
                            if (prev === null) return null
                            return { ...prev, email: e.target.value } as Shop | emptyShopI
                          })
                        }
                      },
                      [dataShop]
                    )}
                    value={dataShop?.email ?? ''}
                    name='email'
                    fullWidth
                    type='email'
                    label='Email Shop'
                    className={'mt-2'}
                    required
                  />
                  <SelectElement
                    defaultValue={dataShop?.platform ?? ''}
                    label={'Select platform *'}
                    name={'select-platform'}
                    data={platforms}
                    dataShop={dataShop}
                    setDataShop={setDataShop}
                    keyData={'platform'}
                  />
                </DialogContent>
                <DialogActions className='dialog-actions-dense'>
                  <Button onClick={handleCloseShopDialog}>Close</Button>
                  <Button type={'submit'}>Create</Button>
                </DialogActions>
              </form>
            </Dialog>

            {!isLoading ? (
              filteredData && filteredData.data.length > 0 ? (
                <>
                  <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: '80vh' }}>
                      <Table stickyHeader aria-label='sticky table'>
                        <TableHead>
                          <TableRow>
                            {dataTableRow.map(index => (
                              <TableCell key={index} align='left'>
                                Shop {index}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredData.data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: Shop) => (
                              <TableRow
                                hover
                                role='checkbox'
                                tabIndex={-1}
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell component='th' scope='row'>
                                  {row.name}
                                </TableCell>
                                <TableCell align='left'>{row.email}</TableCell>
                                <TableCell align='left'>{row.platform}</TableCell>
                                <TableCell align='left'>{row.seller_name}</TableCell>
                                <TableCell align='left'>{row.team_name}</TableCell>
                                <TableCell align='left'>{row.created_at}</TableCell>
                                <TableCell align='center'>
                                  <IconButton
                                    size='small'
                                    color='primary'
                                    onClick={() => handleClickOpenShopDialog(row)}
                                  >
                                    <i className='tabler-edit' />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[25, 50, 100]}
                      component='div'
                      count={totalItems}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                </>
              ) : (
                <Typography className='text-center'>Data shops not found!</Typography>
              )
            ) : (
              <Typography className='text-center'>
                Loading shops ... <CircularProgress className='ml-3 mt-1' size={16} />
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ECommerceShopsList
