import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Autocomplete from '@mui/material/Autocomplete'
import { toast } from 'react-toastify'
import axiosInstance from '@/libs/axios'

interface CreateListingDialogProps {
  open: boolean
  onClose: () => void
  selectedProductBanner: any
  currentDesign: any
  onSuccess?: () => void
}

const CreateListingDialog = ({ 
  open, 
  onClose, 
  selectedProductBanner,
  currentDesign,
  onSuccess 
}: CreateListingDialogProps) => {
  const [selectedShops, setSelectedShops] = useState<Array<{ _id: string; name: string }>>([])
  const [shops, setShops] = useState<Array<{ _id: string; name: string }>>([])
  const [loadingShops, setLoadingShops] = useState(false)
  const [createListingLoading, setCreateListingLoading] = useState(false)

  // Fetch danh sách shops
  const fetchShops = async () => {
    try {
      setLoadingShops(true)
      const response = await axiosInstance.get('/api/authenticated/shops/my')
      if (response.data.success) {
        setShops(response.data.data)
      }
    } catch (error) {
      toast.error('Failed to load shops')
    } finally {
      setLoadingShops(false)
    }
  }

  // Fetch shops khi dialog mở
  useEffect(() => {
    if (open) {
      fetchShops()
    }
  }, [open])

  // Reset state khi đóng dialog
  const handleClose = () => {
    setSelectedShops([])
    onClose()
  }

  // Xử lý khi tạo listing
  const handleSubmitCreateListing = async () => {
    if (!selectedProductBanner || !currentDesign) {
      toast.error('Please select a product banner first');
      return;
    }

    if (selectedShops.length === 0) {
      toast.error('Please select at least one shop');
      return;
    }

    try {
      setCreateListingLoading(true);
      const data = {
        shop_ids: selectedShops.map(shop => shop._id),
        source: 'designs',
        design_id: currentDesign._id,
        product_type_id: selectedProductBanner.product_type_id
      };

      const response = await axiosInstance.post('/api/authenticated/listing/create', data);

      if (response.data.success) {
        toast.success(`Successfully created ${response.data.data.listing_ids.length} listings`);
        onSuccess?.();
        handleClose();
      } else {
        toast.error(response.data.message || 'Failed to create listing');
      }
    } catch (error) {
      console.error('Error creating listing:', error);
      toast.error('Failed to create listing');
    } finally {
      setCreateListingLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='sm'
      fullWidth
    >
      <DialogContent>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Select Shops for Listing
        </Typography>
        
        {loadingShops ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Autocomplete
            multiple
            options={shops}
            getOptionLabel={(option) => option.name}
            value={selectedShops}
            onChange={(event, newValue) => {
              setSelectedShops(newValue)
            }}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search shops"
                placeholder="Type to search..."
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <i className='tabler-store' style={{ marginRight: 8, color: 'rgba(0, 0, 0, 0.54)' }} />
                      {params.InputProps.startAdornment}
                    </>
                  )
                }}
              />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props} key={option._id}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <i className='tabler-store' />
                  <Typography>{option.name}</Typography>
                </Box>
              </Box>
            )}
            loading={loadingShops}
            loadingText="Loading shops..."
            noOptionsText="No shops found"
            sx={{ width: '100%' }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          variant='contained' 
          onClick={handleSubmitCreateListing}
          disabled={selectedShops.length === 0 || loadingShops || createListingLoading}
          startIcon={createListingLoading ? <CircularProgress size={20} color="inherit" /> : <i className='tabler-plus' />}
        >
          {createListingLoading ? 'Creating...' : 'Create Listing'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateListingDialog 