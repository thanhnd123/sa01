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

// Types Imports
import type { User, UsersType } from '@/types/apps/userTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import { addUserData, updateUserData } from '@/app/server/actions'

interface Props {
  open: boolean
  handleClose: () => void
  userData?: UsersType[]
  setData: (data: UsersType[]) => void
  dataUpdate?: User
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

const AddUserDrawer = ({ open, handleClose, setData, dataUpdate }: Props) => {
  const [formData, setFormData] = useState<User>(() => {
    if (dataUpdate) {
      return { ...dataUpdate }
    }
    return initialData
  })
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    if (dataUpdate) {
      setFormData({ ...dataUpdate })
    } else {
      setFormData(initialData)
    }
  }, [dataUpdate])

  const {
    control,
    reset: resetForm,
    formState: { errors }
  } = useForm<User>({
    defaultValues: {
      name: dataUpdate?.name ?? '',
      email: dataUpdate?.email ?? '',
      password: password,
      role: dataUpdate?.role ?? '',
      team: dataUpdate?.team ?? { _id: '', name: '' },
      team_id: dataUpdate?.team_id ?? '',
      status: dataUpdate?.status ?? '',
      username: dataUpdate?.username ?? ''
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
      token_user: data.token_user ?? '',
      team_id: data.team_id ?? '',
      accessToken: '',
      _id: data._id ?? '',
      username: data.username ?? ''
    }

    let sendApi: User | string

    if (newUser._id != '') {
      sendApi = await updateUserData(newUser)
    } else {
      sendApi = await addUserData(newUser)
    }

    if (typeof sendApi === 'string') {
      toast.error(sendApi)
      return
    }

    if (sendApi._id) {
      if (dataUpdate && newUser._id != '') {
        if (dataUpdate.token_user === sendApi.token_user) {
          toast.success('User updated successfully')
        } else {
          toast.error(`User updated failed: ${sendApi}`)
        }
      } else {
        toast.success('User added successfully')
        resetForm({ name: '', email: '', password: '', role: '', team: { _id: '', name: '' }, status: '', username: '' })
      }
      handleClose()
      setFormData(initialData)
    } else {
      toast.error(`User added failed: ${sendApi}`)
    }
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
        <Typography variant='h5'>{formData._id ? `Edit User: ${formData.name}` : 'Add New User'}</Typography>
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
                <MenuItem value='681871792d7980daac3c4ea8'>Manager</MenuItem>
                <MenuItem value='681871792d7980daac3c4ea9'>Seller</MenuItem>
                <MenuItem value='681871792d7980daac3c4eaa'>Fulfiller</MenuItem>
                <MenuItem value='681871792d7980daac3c4eab'>Designer</MenuItem>
              </CustomTextField>
            )}
          />
          <Controller
            name='team'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                id='select-team'
                label='Select Team'
                value={formData.team_id ?? ''}
                onChange={e => setFormData({ ...formData, team_id: e.target.value })}
                slotProps={{
                  htmlInput: { placeholder: 'Select Team' }
                }}
              >
                <MenuItem value=''>Select Team</MenuItem>
                <MenuItem value='6819bb4996155f6955dc8e1b'>Giran</MenuItem>
                <MenuItem value='6819bb4996155f6955dc8e1c'>Vi Tu</MenuItem>
                <MenuItem value='6819bb4996155f6955dc8e1d'>Tung</MenuItem>
                <MenuItem value='6819bb4996155f6955dc8e1e'>Hoang Dung</MenuItem>
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
              {formData._id ? 'Save' : 'Add'}
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

export default AddUserDrawer
