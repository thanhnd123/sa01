// React Imports
import { useState } from 'react'

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

// Types Imports
import type { User } from '@/types/apps/userTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

interface Props {
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}

const initialData: User = {
  avatar: '',
  avatarColor: undefined,
  _id: '',
  email: '',
  name: '',
  password: '',
  role: '',
  team: { _id: '', name: '' },
  team_id: '',
  token_admin: '',
  status: '',
  token_user: '',
  accessToken: '',
  username: ''
}

const AddUserDialog = ({ open, handleClose, onSuccess }: Props) => {
  const [formData, setFormData] = useState<User>(initialData)
  const [password, setPassword] = useState<string>('')

  const {
    control,
    reset: resetForm,
    formState: { errors }
  } = useForm<User>({
    defaultValues: {
      name: '',
      email: '',
      password: password,
      role: '',
      team: { _id: '', name: '' },
      team_id: '',
      status: '',
      username: ''
    }
  })

  const onSubmit = (data: User) => async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newUser: User = {
      avatar: `/images/avatars/${Math.floor(Math.random() * 8) + 1}.png`,
      name: data.name ?? '',
      email: data.email ?? '',
      role: data.role ?? '',
      team: data.team ?? { _id: '', name: '' },
      status: data.status ?? '',
      password: password,
      token_admin: '',
      token_user: '',
      team_id: data.team_id ?? '',
      accessToken: '',
      _id: '',
      username: data.username ?? ''
    }

    const response = await axiosInstance.post('/api/authenticated/users', newUser).then(response => {
      toast.success('User added successfully')
      resetForm({ name: '', email: '', password: '', role: '', team: { _id: '', name: '' }, status: '', username: '' })
      handleClose()
      setFormData(initialData)
      onSuccess()
    }).catch(error => {
      toast.error(error.response?.data?.message || 'Failed to add user')
    })
  }

  const handleReset = () => {
    handleClose()
    setFormData(initialData)
    setPassword('')
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
        <Typography variant='h5'>Add New User</Typography>
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
                value={formData.username ?? ''}
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
                value={formData.name ?? ''}
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
                value={formData.email ?? ''}
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
                value={formData.role ?? ''}
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
                value={formData.status ?? ''}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
              >
                <MenuItem value='pending'>Pending</MenuItem>
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
              </CustomTextField>
            )}
          />
          <CustomTextField
            label='Password'
            fullWidth
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Add
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

export default AddUserDialog 