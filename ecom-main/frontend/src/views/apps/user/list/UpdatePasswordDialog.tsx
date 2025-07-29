// React Imports
import { useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Third-party Imports
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
  dataUpdate: User
}

const UpdatePasswordDialog = ({ open, handleClose, onSuccess, dataUpdate }: Props) => {
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    const response = await axiosInstance.put(`/api/authenticated/users/change-password`, {
      _id: dataUpdate._id,
      new_password: password
    }).then(res => {
      toast.success('Password updated successfully')
      handleClose()
      onSuccess()
    }).catch(err => {
      toast.error(err.response?.data?.message || 'Failed to update password')
    })
  }

  const handleReset = () => {
    handleClose()
    setPassword('')
    setConfirmPassword('')
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
        <Typography variant='h5'>Update Password: {dataUpdate?.name}</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6'>
          <CustomTextField
            label='New Password'
            fullWidth
            type='password'
            placeholder='Enter new password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <CustomTextField
            label='Confirm Password'
            fullWidth
            type='password'
            placeholder='Confirm new password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Update Password
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

export default UpdatePasswordDialog 