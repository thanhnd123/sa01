'use client'

// React Imports
import React, { useEffect, useState } from 'react'

// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import type { TextFieldProps } from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import { toast } from 'react-toastify'
import axiosInstance from '@/libs/axios'

// Type Imports
import type { ThemeColor } from '@core/types'
import type { User } from '@/types/apps/userTypes'

// Component Imports
import AddUserDialog from './AddUserDialog'
import EditUserDialog from './EditUserDialog'
import UpdatePasswordDialog from './UpdatePasswordDialog'
import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { getInitials } from '@/utils/getInitials'

type UserRoleType = {
  [key: string]: { icon: string; color: string }
}

type UserStatusType = {
  [key: string]: ThemeColor
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, onChange, debounce])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Vars
const userRoleObj: UserRoleType = {
  Manager: { icon: 'tabler-crown', color: 'error' },
  Member: { icon: 'tabler-user', color: 'primary' }
}

const userStatusObj: UserStatusType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// API Functions
const getUserData = async (limit: number = 25, page: number = 1, search: string = '') => {
  try {
    const response = await axiosInstance.get('/api/authenticated/users', {
      params: {
        limit,
        page,
        search
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw error
  }
}

const deleteUser = async (userData: User) => {
  try {
    const response = await axiosInstance.post('/api/authenticated/users/delete', userData)
    return response.data
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}

const UserListTable = () => {
  // States
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [editUserOpen, setEditUserOpen] = useState(false)
  const [updatePasswordOpen, setUpdatePasswordOpen] = useState(false)
  const [data, setData] = useState<User[]>([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(25)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(Math.ceil(totalItems / (perPage || 25)))
  const [dataUpdate, setDataUpdate] = useState<User>()
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsRefreshing(true)
        const response = await getUserData(perPage, currentPage)
        setData(response.data)
        setTotalItems(response.total)
        setTotalPages(Math.ceil(response.total / perPage))
      } catch (error) {
        console.error('Error fetching initial data:', error)
        toast.error('Failed to fetch users')
      } finally {
        setIsRefreshing(false)
      }
    }

    fetchInitialData()
  }, []) // Empty dependency array means this runs once on mount

  // Hooks
  const params = useParams()
  const locale = params?.lang as string

  const handleDeleteUser = async (userData: User) => {
    const apiRequest = await deleteUser(userData)
    toast.info(apiRequest.result)
    const newData = await getUserData(perPage, 1)
    setData(newData.data)
    setTotalItems(newData.total)
    setTotalPages(Math.ceil(newData.total / Number(perPage)))
  }

  const getAvatar = (params: Pick<User, 'avatar' | 'name'>) => {
    const { avatar, name } = params

    if (avatar) {
      return <CustomAvatar src={avatar} size={34} />
    } else {
      return <CustomAvatar size={34}>{getInitials(name as string)}</CustomAvatar>
    }
  }

  const handleChangePage = async (_: unknown, newPage: number) => {
    const newData = await getUserData(perPage, newPage + 1)
    setData(newData.data)
    setTotalItems(newData.total)
    setCurrentPage(newPage + 1)
  }

  const handleChangeRowsPerPage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueLimit: number = parseInt(event.target.value)
    const newData = await getUserData(valueLimit, 1)

    setData(newData.data)
    setTotalItems(newData.total)
    setPerPage(Number(valueLimit))
    setCurrentPage(1)
    setTotalPages(Math.ceil(newData.total / Number(valueLimit)))
  }

  const handleSearchUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newData = await getUserData(perPage, 1, search)

    setData(newData.data)
    setTotalItems(newData.total)
  }

  const handleReload = async () => {
    const newData = await getUserData(perPage, currentPage)
    setData(newData.data)
    setTotalItems(newData.total)
    setTotalPages(Math.ceil(newData.total / Number(perPage)))
  }

  return (
    <>
      <Card>
        <CardHeader
          title={
            <div className='flex items-center gap-2'>
              <Typography variant='h5'>User</Typography>
              {isRefreshing && (
                <div className='flex items-center gap-1'>
                  <i className='tabler-loader-2 animate-spin text-primary' />
                  <Typography variant='body2' color='textSecondary'>
                    Refreshing...
                  </Typography>
                </div>
              )}
            </div>
          }
          className='pbe-4'
          action={
            <Button variant='outlined' className='p-1' onClick={handleReload} disabled={isRefreshing}>
              <i className={`tabler-refresh ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          }
        />
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddUserOpen(!addUserOpen)}
              className='max-sm:is-full'
            >
              Add New User
            </Button>
          </div>
          <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
            <form onSubmit={handleSearchUser} className='flex items-center gap-2'>
              <DebouncedInput
                value={search}
                onChange={value => setSearch(String(value))}
                placeholder='Search User'
                className='max-sm:is-full'
                sx={{ height: '40px' }}
              />
              <Button type='submit' variant='outlined' className='p-1' sx={{ minWidth: '56px', height: '40px' }}>
                <i className='tabler-search' />
              </Button>
            </form>
          </div>
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Team</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align='center'>
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                data.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <div className='flex items-center gap-4'>
                        {getAvatar({ avatar: user.avatar ?? '/images/avatars/3.png', name: user.name })}
                        <div className='flex flex-col'>
                          <Typography color='text.primary' className='font-medium'>
                            {user.name}
                          </Typography>
                          <Typography variant='body2'>{user.email}</Typography>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Typography color='text.primary'>{user.team?.name ?? '-'}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color='text.primary'>{user.role ?? '-'}</Typography>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-3'>
                        <Chip
                          variant='tonal'
                          label={user.status}
                          size='small'
                          color={userStatusObj[user.status ?? 'active']}
                          className='capitalize'
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center'>
                        <IconButton
                          onClick={() => {
                            setEditUserOpen(true)
                            setDataUpdate(user)
                          }}
                        >
                          <i className='tabler-edit text-textSecondary' />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setUpdatePasswordOpen(true)
                            setDataUpdate(user)
                          }}
                        >
                          <i className='tabler-lock text-textSecondary' />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            handleDeleteUser(user)
                          }}
                        >
                          <i className='tabler-trash text-textSecondary' />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component='div'
          count={totalItems}
          page={currentPage - 1}
          onPageChange={handleChangePage}
          rowsPerPage={perPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[25, 50, 100]}
        />
      </Card>

      <AddUserDialog
        open={addUserOpen}
        handleClose={() => setAddUserOpen(false)}
        onSuccess={async () => {
          const newData = await getUserData(perPage, currentPage)
          setData(newData.data)
          setTotalItems(newData.total)
          setTotalPages(Math.ceil(newData.total / perPage))
        }}
      />

      <EditUserDialog
        open={editUserOpen}
        handleClose={() => setEditUserOpen(false)}
        onSuccess={async () => {
          try {
            setIsRefreshing(true)
    
            const newData = await getUserData(perPage, currentPage)
            setData(newData.data)
            setTotalItems(newData.total)
            setTotalPages(Math.ceil(newData.total / perPage))
            
            toast.success('User list updated successfully')
          } catch (error) {
            console.error('Error refreshing user list:', error)
            toast.error('Failed to refresh user list')
          } finally {
            setIsRefreshing(false)
          }
        }}
        dataUpdate={dataUpdate!}
      />

      {dataUpdate && (
        <UpdatePasswordDialog
          open={updatePasswordOpen}
          handleClose={() => setUpdatePasswordOpen(false)}
          onSuccess={async () => {
            const newData = await getUserData(perPage, currentPage)
            setData(newData.data)
            setTotalItems(newData.total)
            setTotalPages(Math.ceil(newData.total / perPage))
          }}
          dataUpdate={dataUpdate}
        />
      )}
    </>
  )
}

export default UserListTable
