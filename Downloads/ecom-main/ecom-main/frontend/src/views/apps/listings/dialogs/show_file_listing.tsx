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
import type { Template, Shop, FileListings } from '../interfaces/template_interface'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import type { DialogProps } from '@mui/material/Dialog'
import classnames from 'classnames'

export const DialogShowFileListings = ({
    _open,
    _onClose,
    _fileListings
}: {
    _open: boolean
    _onClose: () => void
    _fileListings: FileListings[] | []
}) => {
    return (
        <Dialog
            open={_open}
            onClose={_onClose}
            aria-labelledby='show-file-listing-template-dialog-title'
            aria-describedby='show-file-listing-template-dialog-description'
            fullWidth={true}
            maxWidth={'lg'}
        >
            <DialogTitle id='show-file-listing-template-dialog-title'>Listing template</DialogTitle>
            <DialogContent>
                {_fileListings
                    ? _fileListings.length > 0
                        ? _fileListings.map((_v, _i) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} key={_i}>
                                <Card className='h-full'>
                                    <CardContent>
                                        <div className='flex flex-col gap-4'>
                                            <div className='grid grid-cols-3 gap-3 p-1 border-b-2 border-grey-300'>
                                                <Typography variant='h6' className='line-clamp-2 text-wrap' title='Seller Name'>
                                                    Filename:
                                                </Typography>
                                                <Typography
                                                    variant='body2'
                                                    className='text-pink-600 font-bold text-start'
                                                    title='filename'
                                                >
                                                    {_v.filename}
                                                </Typography>
                                                <Typography
                                                    variant='body2'
                                                    className='text-pink-600 font-bold text-start'
                                                    title='filename'
                                                >
                                                    <a href={process.env.NEXT_PUBLIC_API_URL + '/api/authenticated/listing/download-file/' + _v.filename} target="_blank">Download</a>
                                                </Typography>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                        : <Typography variant='h5'>Not file download is here!</Typography>
                    : <Typography variant='h5'>Not data file listing!</Typography>
                }
            </DialogContent>
            <DialogActions className={'dialog-actions-dense'}>
                <Button onClick={_onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}