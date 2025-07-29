import { useState } from 'react'
import { toast } from 'react-toastify'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CustomTextField from '@/@core/components/mui/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'
import Fade from '@mui/material/Fade'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Divider from '@mui/material/Divider'

import DialogCloseButton from '@components/dialogs/DialogCloseButton'
import { useSession } from 'next-auth/react'

import * as kanbanService from '@/services/kanbanService'

interface SyncIdealToDesignDialogProps {
    open: boolean,
    handleCloseModal: () => void,
    productIdeal: any,
    productTypes: {},
    userId: string
}

const PushToDesigner = ({
    open,
    handleCloseModal,
    productIdeal,
    productTypes,
}: SyncIdealToDesignDialogProps) => {
    const [sellerNote, setSellerNote] = useState<string>('')
    const { data: session } = useSession()
    const [tasks, setTasks] = useState({
        png: true,
        productBanner: false,
        other: false
    })
    const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [inputValue, setInputValue] = useState('')

    const handleClose = () => {
        setSellerNote('')
        setSelectedProductTypes([])
        handleCloseModal()
    }

    const handleTaskChange = (task: keyof typeof tasks) => {
        setTasks(prev => ({
            ...prev,
            [task]: !prev[task]
        }))
        if (task === 'productBanner' && !tasks.productBanner) {
            setSelectedProductTypes([])
        }
    }

    const handleProductTypeChange = (event: any, newValue: string[]) => {
        setSelectedProductTypes(newValue)
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Backspace' && !inputValue && selectedProductTypes.length > 0) {
            setSelectedProductTypes(prev => prev.slice(0, -1))
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
        setSearchQuery(event.target.value)
    }

    const handleSubmitModal = () => {
        if (!productIdeal) {
            toast.error('Product ideal data is missing!')
            return
        }

        const requiredTasks = {
            png: tasks.png,
            productBanner: tasks.productBanner ? {
                enabled: true,
                productTypes: selectedProductTypes.map(type => ({
                    id: type,
                    name: productTypes[type as keyof typeof productTypes] as string
                }))
            } : {
                enabled: false,
                productTypes: []
            },
            other: tasks.other ? {
                enabled: true,
                note: sellerNote
            } : {
                enabled: false,
                note: ''
            }
        }

        const dataRequest = {
            product_ideal: productIdeal,
            seller_note: sellerNote,
            required_tasks: requiredTasks
        };

        kanbanService.createTask(dataRequest)
            .then(() => {
                toast.success('Add to design success!')
                handleCloseModal()
            })
            .catch((e) => {
                console.log(e.response.data)
                if(e.response.data.message !== undefined) {
                    toast.error(e.response.data.message)
                } else {
                    toast.error('Add to design error!')
                }
            });
    }

    const handleDeleteChip = (chipToDelete: string) => {
        setSelectedProductTypes((chips) => chips.filter((chip) => chip !== chipToDelete))
    }

    const filteredProductTypes = Object.entries(productTypes).filter(([key, value]) => {
        const searchLower = searchQuery.toLowerCase()
        return key.toLowerCase().includes(searchLower) ||
            (value as string).toLowerCase().includes(searchLower)
    })

    return (
        <>
            {productIdeal && (
                <Dialog
                    onClose={handleClose}
                    aria-labelledby='customized-dialog-title'
                    open={open}
                    closeAfterTransition={false}
                    PaperProps={{ sx: { overflow: 'visible' } }}
                    maxWidth={'lg'}
                    fullWidth
                >
                    <DialogTitle id='customized-dialog-title'>
                        <Typography variant='h5' component='span'>
                            {productIdeal?.title || ''}
                        </Typography>
                        <DialogCloseButton onClick={handleClose} disableRipple>
                            <i className='tabler-x' />
                        </DialogCloseButton>
                    </DialogTitle>
                    {productIdeal?.banner && (
                        <div className="flex justify-center p-4 border-b">
                            <img
                                src={productIdeal.banner}
                                alt={productIdeal?.title || 'Product banner'}
                                className="max-h-[200px] object-contain rounded"
                            />
                        </div>
                    )}
                    <DialogContent>
                        {/* Tasks Section */}
                        <Box sx={{ mb: 4 }}>
                            <Typography variant='h6' sx={{ mb: 2 }}>
                                Required Tasks
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={tasks.png}
                                            onChange={() => handleTaskChange('png')}
                                        />
                                    }
                                    label="PNG"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={tasks.productBanner}
                                            onChange={() => handleTaskChange('productBanner')}
                                        />
                                    }
                                    label="Product Banner"
                                />
                                <Collapse in={tasks.productBanner} timeout={300}>
                                    <Box sx={{ ml: 4, mt: 1 }}>
                                        <Fade in={tasks.productBanner} timeout={500}>
                                            <Alert severity="info" sx={{ mb: 2 }}>
                                                Designer will create banners for each selected product type. Please select the product types that need banners.
                                            </Alert>
                                        </Fade>
                                        <Fade in={tasks.productBanner} timeout={700}>
                                            <FormControl fullWidth>
                                                <Autocomplete
                                                    multiple
                                                    id="product-types"
                                                    options={Object.entries(productTypes).map(([key]) => key)}
                                                    value={selectedProductTypes}
                                                    onChange={handleProductTypeChange}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Product Types"
                                                            placeholder="Search or select product types"
                                                        />
                                                    )}
                                                    renderTags={(value, getTagProps) =>
                                                        value.map((option, index) => {
                                                            const productTypeName = productTypes[option as keyof typeof productTypes] as string
                                                            const { key, ...otherProps } = getTagProps({ index })
                                                            return (
                                                                <Chip
                                                                    key={option}
                                                                    label={productTypeName}
                                                                    {...otherProps}
                                                                    deleteIcon={<i className='tabler-x' />}
                                                                />
                                                            )
                                                        })
                                                    }
                                                    renderOption={(props, option) => {
                                                        const productTypeName = productTypes[option as keyof typeof productTypes] as string
                                                        return (
                                                            <li {...props} key={productTypeName}>
                                                                {productTypeName}
                                                            </li>
                                                        )
                                                    }}
                                                    filterOptions={(options, { inputValue }) => {
                                                        const searchLower = inputValue.toLowerCase()
                                                        return options.filter(option => {
                                                            const productTypeName = productTypes[option as keyof typeof productTypes] as string
                                                            return option.toLowerCase().includes(searchLower) ||
                                                                productTypeName.toLowerCase().includes(searchLower)
                                                        })
                                                    }}
                                                />
                                            </FormControl>
                                        </Fade>
                                    </Box>
                                </Collapse>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={tasks.other}
                                            onChange={() => handleTaskChange('other')}
                                        />
                                    }
                                    label="Other tasks (specify in notes)"
                                />
                            </Box>
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        {/* Simple Notes Section */}
                        <Box>
                            <Typography variant='h6' sx={{ mb: 2 }}>
                                Notes
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                placeholder="Add any additional notes or requirements for the designer..."
                                value={sellerNote}
                                onChange={(e) => setSellerNote(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant='tonal' color='secondary'>
                            Close
                        </Button>
                        <Button
                            onClick={handleSubmitModal}
                            variant='contained'
                            disabled={!Object.values(tasks).some(Boolean) || (tasks.productBanner && selectedProductTypes.length === 0)}
                        >
                            Push to Designer
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    )
}

export default PushToDesigner