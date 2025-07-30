// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import axiosInstance from '@/libs/axios'
import { useUser, useAdmin, useAuth } from '@/contexts/UserContext'

// Types Imports
import type { User } from '@/types/apps/userTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

interface Team {
  _id: string
  name: string
  description?: string
}

interface Props {
  open: boolean
  handleClose: () => void
  onSuccess: () => void
  dataUpdate: User
}

const initialData: User = {
  avatar: '',
  avatarColor: undefined,
  _id: '',
  email: '',
  name: '',
  password: '',
  role: '',
  team_id: '',
  token_admin: '',
  status: '',
  token_user: '',
  accessToken: '',
  username: ''
}

const EditUserDialog = ({ open, handleClose, onSuccess, dataUpdate }: Props) => {
  const [formData, setFormData] = useState<User>(dataUpdate || initialData)
  const [teams, setTeams] = useState<Team[]>([])
  const [loadingTeams, setLoadingTeams] = useState(false)
  const { user, loading, isAuthenticated, updateUser, logout } = useUser()
  const isAdmin = useAdmin()

  const {
    control,
    reset: resetForm,
    formState: { errors }
  } = useForm<User>({
    defaultValues: {
      name: dataUpdate?.name || '',
      email: dataUpdate?.email || '',
      role: dataUpdate?.role || '',
      team_id: dataUpdate?.team_id || '',
      status: dataUpdate?.status || '',
      username: dataUpdate?.username || ''
    }
  })

  // Fetch teams for admin
  const fetchTeams = async () => {
    if (!isAdmin) return

    setLoadingTeams(true)
    try {
      const response = await axiosInstance.get('/api/authenticated/teams')
      if (response.data && response.data.data) {
        setTeams(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching teams:', error)
      toast.error('Failed to load teams')
    } finally {
      setLoadingTeams(false)
    }
  }

  useEffect(() => {
    if (open && isAdmin) {
      fetchTeams()
    }
  }, [open, isAdmin])

  useEffect(() => {
    if (dataUpdate) {
      setFormData(dataUpdate)
      resetForm({
        name: dataUpdate.name || '',
        email: dataUpdate.email || '',
        role: dataUpdate.role || '',
        team_id: dataUpdate.team_id || '',
        status: dataUpdate.status || '',
        username: dataUpdate.username || ''
      })
    }
  }, [dataUpdate, resetForm])

  const onSubmit = (data: User) => async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newUser: User = {
      ...dataUpdate,
      name: data.name || '',
      email: data.email || '',
      role: data.role || '',
      status: data.status || '',
      team_id: data.team_id || '',
      username: data.username || ''
    }

    try {
      const response = await axiosInstance.put(`/api/authenticated/users/${dataUpdate._id}`, newUser)
      toast.success('User updated successfully')
      handleClose()
      onSuccess()
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update user')
    }
  }

  const handleReset = () => {
    handleClose()
    setFormData(dataUpdate || initialData)
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>Edit User: {formData?.name || ''}</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={onSubmit(formData)} className='flex flex-col gap-6 p-6'>
          <Controller
            name='username'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                fullWidth
                label='Username'
                placeholder='johndoe'
                value={formData?.username || ''}
                onChange={e => setFormData({ ...formData, username: e.target.value })}
              />
            )}
          />
          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                fullWidth
                label='Full Name'
                placeholder='John Doe'
                value={formData?.name || ''}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                fullWidth
                type='email'
                label='Email'
                placeholder='johndoe@gmail.com'
                value={formData?.email || ''}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            )}
          />
          <Controller
            name='role'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                id='select-role'
                value={formData?.role || ''}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                label='Select Role'
              >
                <MenuItem value=''>Select Role</MenuItem>
                <MenuItem value='manager'>Manager</MenuItem>
                <MenuItem value='member'>Member</MenuItem>
                <MenuItem value='designer'>Designer</MenuItem>
                <MenuItem value='content'>Content</MenuItem>
                <MenuItem value='content_trainer'>Content Trainer</MenuItem>
                <MenuItem value='listing'>Listing</MenuItem>
              </CustomTextField>
            )}
          />
          <Controller
            name='status'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                id='select-status'
                label='Select Status'
                value={formData?.status || ''}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
              >
                <MenuItem value='pending'>Pending</MenuItem>
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
              </CustomTextField>
            )}
          />
          {isAdmin && (
            <Controller
              name='team_id'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  select
                  fullWidth
                  id='select-team'
                  label='Select Team'
                  value={formData?.team_id || ''}
                  onChange={e => setFormData({ ...formData, team_id: e.target.value })}
                  disabled={loadingTeams}
                  helperText={loadingTeams ? 'Loading teams...' : ''}
                >
                  <MenuItem value=''>Select Team</MenuItem>
                  {teams.map(team => (
                    <MenuItem key={team._id} value={team._id}>
                      {team.name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              )}
            />
          )}
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Save
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={handleReset}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default EditUserDialog
