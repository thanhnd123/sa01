import React, { useRef, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import CustomTextField from '@core/components/mui/TextField'
import MenuItem from '@mui/material/MenuItem'
import { Typography } from '@mui/material'
import ListSubheader from '@mui/material/ListSubheader'
import { useSession } from 'next-auth/react'
import axiosInstance from '@/libs/axios'
import { toast } from 'react-toastify'

export const DialogAddTemplate = ({
    _open,
    _onClose
}: {
    _open: boolean
    _onClose: () => void
}) => {
    const { data: session } = useSession()
    const formAddTemplate = useRef(null)
    const [lineElementRender, setLineElementRender] = useState<React.ReactNode>(null)
    const handleChangePlatform = (e: React.ChangeEvent<HTMLInputElement>) => {
        const platformTemplateName = e.target.value
        if (platformTemplateName != '') {
            if (platformTemplateName == 'tiktok') {
                setLineElementRender(<Typography variant='h5'>TikTok platform is temporarily not supported!</Typography>)
            } else if (platformTemplateName == 'ebay') {
                setLineElementRender(<Typography variant='h5'>Ebay platform is temporarily not supported!</Typography>)
            } else {
                setLineElementRender(<div>
                    <div className='mt-3'>
                        <Typography variant='h5' className='mt-3'>Create variatn default for template Amazon</Typography>
                    </div>
                    <span>TemplateType=fptcustom || </span>
                    <span>Version=2025.0306 || </span>
                    <span>TemplateSignature=RFJJTktJTkdfQ1VQ</span>
                    <div className='flex gap-3 flex-wrap mt-3'>
                        <CustomTextField label='Product Type' placeholder='Product type' name='product_type' />
                        <CustomTextField label='Brand Name' placeholder='Brand name' name='brand_name' />
                        <CustomTextField label='Update Delete' placeholder='Update Delete' name='update_delete' value={'Update'} />
                        <CustomTextField label='Manufacturer' placeholder='Manufacturer' name='manufacturer' />
                        <CustomTextField label='Product ID Type' placeholder='Product ID Type' name='product_id_type' value={'GTIN'} />
                        <CustomTextField label='Item Type Keyword' placeholder='Item Type Keyword' name='item_type_keyword' />
                        <CustomTextField label='Your Price' placeholder='Your Price' name='standard_price' />
                        <CustomTextField label='Quantity' placeholder='Quantity' name='quantity' />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="">Care Instructions</label>
                        <div className='p-2 flex gap-6 flex-wrap'>
                            <CustomTextField label='Care Instructions 1' placeholder='Care Instructions 1' name='care_instructions1' value={'Microwave Safe'} />
                            <CustomTextField label='Care Instructions 2' placeholder='Care Instructions 2' name='care_instructions2' value={'Dishwasher Safe'} />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="">Discovery</label>
                        <div className='p-2 flex gap-3 flex-wrap mt-3'>
                            <CustomTextField label='Key Product Features 1' placeholder='Key Product Features 1' name='bullet_point1' />
                            <CustomTextField label='Key Product Features 2' placeholder='Key Product Features 2' name='bullet_point2' />
                            <CustomTextField label='Key Product Features 3' placeholder='Key Product Features 3' name='bullet_point3' />
                            <CustomTextField label='Key Product Features 4' placeholder='Key Product Features 4' name='bullet_point4' />
                            <CustomTextField label='Key Product Features 5' placeholder='Key Product Features 5' name='bullet_point5' />
                            <CustomTextField label='Generic Keyword' placeholder='Key1; Key2; ...' name='generic_keywords' />
                            <CustomTextField label='Included Components' placeholder='Included Components' name='included_components1' value={'Cups'} />
                            <CustomTextField label='Color' placeholder='Color' name='color_name' />
                            <CustomTextField label='Size' placeholder='Size' name='size_name' />
                            <CustomTextField label='Material Type' placeholder='Material Type' name='material_type' value={'Ceramic'} />
                            <CustomTextField label='Style Name' placeholder='Style Name' name='style_name' value={'Casual'} />
                            <CustomTextField label='Theme' placeholder='Theme' name='theme' value={'Anniversary'} />
                            <CustomTextField label='Additional Features' placeholder='Additional Features' name='special_features1' value={'Manual'} />
                            <CustomTextField label='Occasion Type' placeholder='Occasion Type' name='occasion_type' value={'Anniversary'} />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="">Dimensions</label>
                        <div className='p-2 flex gap-6 flex-wrap'>
                            <CustomTextField label='Unit of Measure (Per Unit Pricing)' placeholder='Unit of Measure (Per Unit Pricing)' name='unit_count_type' value={'Count'} />
                            <CustomTextField label='Unit Count (Per Unit Pricing)' placeholder='Unit Count (Per Unit Pricing)' name='unit_count' value={'1.0'} />
                            <CustomTextField label='Capacity Unit Of Measure' placeholder='Capacity Unit Of Measure' name='capacity_unit_of_measure' value={'Ounces'} />
                            <CustomTextField label='Capacity' placeholder='Capacity' name='capacity' value={'11.0'} />
                            <CustomTextField label='Item Width Widest Point' placeholder='Item Width Widest Point' name='height_width_side_to_side' value={'3.2'} />
                            <CustomTextField label='Item Width Unit' placeholder='Item Width Unit' name='height_width_side_to_side_unit_of_measure' value={'Inches'} />
                            <CustomTextField label='Item Height Base to Top' placeholder='Item Height Base to Top' name='height_floor_top' value={'3.7'} />
                            <CustomTextField label='Item Height Unit' placeholder='Item Height Unit' name='height_floor_top_unit_of_measure' value={'Inches'} />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="">Compliance</label>
                        <div className='p-2 flex gap-6 flex-wrap'>
                            <CustomTextField label='Cpsia Warning' placeholder='Cpsia Warning' name='cpsia_cautionary_statement' value={'NoChokingHazardBalloon'} />
                            <CustomTextField label='Country of Origin' placeholder='Country of Origin' name='country_of_origin' value={'United States'} />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="">Offer</label>
                        <div className='p-2 flex gap-6 flex-wrap'>
                            <CustomTextField label='Shipping Template' placeholder='Shipping Template' name='merchant_shipping_group_name' value={'Migrated Template'} />
                            <CustomTextField label='List Price' placeholder='List Price' name='list_price' />
                            <CustomTextField label='Item Condition' placeholder='Item Condition' name='condition_type' value={'New'} />
                            <CustomTextField label='Handling Time' placeholder='Handling Time' name='fulfillment_latency' value={3} />
                            <CustomTextField label='Product Tax Code' placeholder='Product Tax Code' name='product_tax_code' value={'A_GEN_NOTAX'} />
                            <CustomTextField label='Number of Items' placeholder='Number of Items' name='number_of_items' value={1} />
                        </div>
                    </div>
                </div>)
            }
        }
    }

    const handleSubmitTemplate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = formAddTemplate.current
        if (!form) { return; }
        const formData = new FormData(form)
        const post = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/listing/create-teamplate`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        const response = await post.data
        const result = response.result
        if (result._id) {
            toast.success(`Create template type ${result.product_type} title ${result.title_teamplate} success!`)
            _onClose
        } else {
            toast.error(`Create template failed: ${result}`)
        }
    }

    return (
        <Dialog
            open={_open}
            onClose={_onClose}
            aria-labelledby='new-template-dialog-title'
            aria-describedby='new-template-dialog-description'
            fullWidth={true}
            maxWidth={'lg'}
        >
            <DialogTitle id='new-template-dialog-title'>Create new template</DialogTitle>
            <form ref={formAddTemplate} method='post' onSubmit={handleSubmitTemplate}>
                <DialogContent>
                    <CustomTextField select fullWidth defaultValue='' label='Platform list' id='platform-list' name='platform' onChange={handleChangePlatform}>
                        <MenuItem value=''>
                            <em>-- Choose platform --</em>
                        </MenuItem>
                        <ListSubheader>Tiktok</ListSubheader>
                        <MenuItem value={'tiktok'}>Tiktok - default</MenuItem>
                        <ListSubheader>Amazon</ListSubheader>
                        <MenuItem value={'amazon-drinkingcup'}>Amazon - drinkingcup</MenuItem>
                        <ListSubheader>Ebay</ListSubheader>
                        <MenuItem value={'ebay'}>Ebay - default</MenuItem>
                    </CustomTextField>
                    <CustomTextField className='mt-3 mb-3' label='Title template' fullWidth={true} name='title_teamplate' placeholder='Title template' />
                    <CustomTextField className='hidden' label='Seller Id' fullWidth={true} name='seller_id' value={session?.user?.id ?? null} />
                    {lineElementRender
                        ? lineElementRender
                        : <Typography variant='h5' className='mt-3'>Please choice some one platform before create!</Typography>
                    }
                </DialogContent>
                <DialogActions className='dialog-actions-dense'>
                    <Button onClick={_onClose}>Close</Button>
                    <Button type='submit'>Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}