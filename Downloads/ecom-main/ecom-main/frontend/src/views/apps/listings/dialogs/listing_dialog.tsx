import React, { useEffect, useRef, useState } from 'react'
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
import type { Template, Shop } from '../interfaces/template_interface'

export const DialogListingTemplate = ({
    _open,
    _onClose,
    _templates,
    _shop,
    _productIds
}: {
    _open: boolean
    _onClose: () => void
    _templates: Template[] | null
    _shop: Shop[] | null
    _productIds: string[] | []
}) => {
    const { data: session } = useSession()
    const formListing = useRef(null)

    const handleProcessingListing = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = formListing.current
        if (!form) { return }
        const formData = new FormData(form)
        if (_productIds && Array.isArray(_productIds)) {
            _productIds.forEach((id) => {
                formData.append('product_ids[]', id)
            })
        }
        const post = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/listing/processing-template`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        const response = await post.data
        const result = response.result
        if (result._id) {
            toast.success('Create file listing success please waiting minute ...')
        } else {
            toast.error(result)
        }
    }

    return (
        <Dialog
            open={_open}
            onClose={_onClose}
            aria-labelledby='listing-template-dialog-title'
            aria-describedby='listing-template-dialog-description'
            fullWidth={true}
            maxWidth={'lg'}
        >
            <DialogTitle id='listing-template-dialog-title'>Listing template</DialogTitle>
            <form ref={formListing} onSubmit={handleProcessingListing}>
                <DialogContent>
                    <CustomTextField select fullWidth defaultValue='' label='Choose shop' id='shop-list' name='shop_id'>
                        <MenuItem value=''>
                            <em>-- Choose shop --</em>
                        </MenuItem>
                        {_shop ? _shop.map((_v, _i) => (<MenuItem key={_i} value={_v._id}>{_v.name}</MenuItem>)) : (<MenuItem value=''><em>Not template here!</em></MenuItem>)}
                    </CustomTextField>
                    <CustomTextField select fullWidth defaultValue='' label='Choose platform template' id='template-list' name='template_id' className='mt-3'>
                        <MenuItem value=''>
                            <em>-- Choose platform template --</em>
                        </MenuItem>
                        {_templates ? _templates.map((_v, _i) => (<MenuItem key={_i} value={_v._id}>{_v.platform + ' - ' + _v.title_teamplate + ' - ' + _v.product_type}</MenuItem>)) : (<MenuItem value=''><em>Not template here!</em></MenuItem>)}
                    </CustomTextField>
                </DialogContent>
                <DialogActions className='dialog-actions-dense'>
                    <Button onClick={_onClose}>Close</Button>
                    <Button type='submit'>Processing</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}