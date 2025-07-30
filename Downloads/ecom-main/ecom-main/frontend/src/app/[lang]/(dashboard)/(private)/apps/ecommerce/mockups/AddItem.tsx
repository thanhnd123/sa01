// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useForm, Controller } from 'react-hook-form'
import { getProductTypes } from '@/libs/helpers'
import { toast } from 'react-toastify'

// Component Imports
import FileUploaderMultiple from '@/components/FileUploaderMultiple'
import axiosInstance from '@/libs/axios'

type Mockup = {
  name: string
  product_type: string
  notes: string
  images: string[]
  events: string[]
}

type FormNonValidateType = {
  product_type: string
  name: string
  notes: string
  images: string[]
  events: string[]
}

const initialData: FormNonValidateType = {
  product_type: '',
  name: '',
  notes: '',
  images: [],
  events: []
}

type Props = {
  open: boolean
  handleClose: () => void
  mockupData?: Mockup[]
}

type FormValidateType = {
  product_type: string
  name: string
  notes: string
  images: string[]
  events: string[]
}

const AddItem = (props: Props) => {
  // Props
  const { open, handleClose } = props
  const [productTypes, setProductTypes] = useState([])

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateType>({
    defaultValues: {
      product_type: '',
      name: '',
      notes: '',
      images: [],
      events: []
    }
  })

  const onSubmit = (data: FormValidateType) => {
    if (!data.product_type || !data.name) {
      toast.error('Please fill in all fields')
      return
    }
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('product_type', data.product_type)
    formData.append('notes', data.notes)
    data.events.forEach((event, index) => {
      formData.append(`events[]`, event)
    })
    data.images.forEach((image, index) => {
      formData.append(`images[]`, image)
    })
    console.log(data)
    axiosInstance
      .post(process.env.NEXT_PUBLIC_API_URL + '/api/authenticated/mockup/store', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res: any) => {
        resetForm()
        handleClose()
        toast.success('Mockup created successfully')
      })
      .catch((err: any) => {
        console.log(err)
        toast.error(err.response?.data?.message || 'Failed to create mockup')
      })
  }

  const handleReset = () => {
    handleClose()
    resetForm()
  }

  useEffect(() => {
    const initial = async () => {
      await getProductTypes({}, (data: any) => {
        setProductTypes(data.result)
        console.log(data.result)
      })
    }
    initial()
  }, [])
  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400, md: 500, lg: 600 } } }}
    >
      <div className='flex items-center justify-between pli-6 plb-5'>
        <Typography variant='h5'>Add a Mockup</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl' />
        </IconButton>
      </div>
      <Divider />
      <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>
        <div className='p-6'>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
            <Controller
              name='product_type'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={Object.entries(productTypes).map(([_id, name]) => ({ label: name, id: _id }))}
                  renderInput={params => <TextField {...params} label='Product Type' required />}
                  onChange={(_, value) => field.onChange(value?.label || '')}
                  value={field.value ? { label: field.value, id: '' } : null}
                />
              )}
            />
            <Controller
              name='name'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} id='add-mockup-name' label='Mockup name' variant='outlined' required />
              )}
            />
            <Controller
              name='events'
              control={control}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  freeSolo
                  options={['Birthday', 'Mother Day', 'Father Day', 'Anniversary', 'New Year', 'Valentine Day']}
                  value={Array.isArray(field.value) ? field.value : field.value ? [field.value] : []}
                  onChange={(_, value) => field.onChange(value)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      id='add-mockup-event'
                      label='Event (can input multiple)'
                      variant='outlined'
                    />
                  )}
                />
              )}
            />
            <Controller
              name='notes'
              control={control}
              render={({ field }) => (
                <TextField {...field} id='add-mockup-notes' label='Notes' multiline rows={5} variant='outlined' />
              )}
            />
            <div className='border border-dashed border-gray-300 rounded-lg p-4'>
              <Controller
                name='images'
                control={control}
                render={({ field }) => <FileUploaderMultiple onFilesChange={field.onChange} />}
              />
            </div>
            <div className='flex justify-end gap-4'>
              <Button variant='contained' type='submit'>
                Add
              </Button>
              <Button variant='tonal' color='error' type='reset' onClick={handleReset}>
                Discard
              </Button>
            </div>
          </form>
        </div>
      </PerfectScrollbar>
    </Drawer>
  )
}

export default AddItem
