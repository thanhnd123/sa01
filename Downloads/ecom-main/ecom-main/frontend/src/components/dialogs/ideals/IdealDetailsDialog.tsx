import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import DialogCloseButton from '@components/dialogs/DialogCloseButton'

interface IdealDetailsDialogProps {
    open: boolean
    onClose: () => void
    ideal: {
        title: string
        market: string
        banner: string
        store: string
        sold_24h: number
        views_24h: number
        total_sold: number
        estimated_revenue: number
        daily_views: number
        rate_favorite: number
        total_farvorites: number
        original_creation: string
        last_modified: string
        hey_etsy_tags: string
        png: string
        _id: string
        id: string
        description?: string
        images?: string[] // Added images to the interface
    } | null
}

const IdealDetailsDialog: React.FC<IdealDetailsDialogProps> = ({ open, onClose, ideal }) => {
    // State cho dialog xem ảnh
    const [openImageDialog, setOpenImageDialog] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    if (!ideal) return null

    // Xử lý tags: có thể là string hoặc array
    let tags: string[] = []
    if (Array.isArray(ideal.hey_etsy_tags)) {
        tags = ideal.hey_etsy_tags.filter(tag => typeof tag === 'string' && tag.trim())
    } else if (typeof ideal.hey_etsy_tags === 'string') {
        tags = ideal.hey_etsy_tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    }

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleString('vi-VN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return dateString;
        }
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            closeAfterTransition={false}
            PaperProps={{ sx: { overflow: 'visible', minWidth: 900 } }}
        >
            <DialogTitle>
                <Typography variant='h5' component='span'>
                    Ideal Details
                </Typography>
                <DialogCloseButton onClick={onClose} disableRipple>
                    <i className='tabler-x' />
                </DialogCloseButton>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 2 }}>
                    <Grid container spacing={3}>
                        {/* Left Column - Image and Basic Info */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant='h6' sx={{ mb: 2 }}>
                                Product Information
                            </Typography>

                            {/* Product Image */}
                            <Box sx={{ mb: 2 }}>
                                <img
                                    src={ideal.banner}
                                    alt={ideal.title}
                                    style={{
                                        width: '100%',
                                        maxHeight: 300,
                                        objectFit: 'cover',
                                        borderRadius: 8,
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => {
                                        setImageUrl(ideal.banner);
                                        setOpenImageDialog(true);
                                    }}
                                />
                                {/* Hiển thị thêm các ảnh trong mảng images nếu có */}
                                {Array.isArray(ideal.images) && ideal.images.length > 0 && (
                                    <Box sx={{
                                        display: 'flex',
                                        gap: 1,
                                        mt: 1,
                                        overflowX: 'auto',
                                        maxWidth: '100%',
                                        pb: 1
                                    }}>
                                        {ideal.images.map((img: string, idx: number) => (
                                            <img
                                                key={idx}
                                                src={img}
                                                alt={`Image ${idx + 1}`}
                                                style={{
                                                    width: 64,
                                                    height: 64,
                                                    objectFit: 'cover',
                                                    borderRadius: 8,
                                                    cursor: 'pointer',
                                                    border: '1px solid #eee',
                                                    background: '#fafafa'
                                                }}
                                                onClick={() => {
                                                    setImageUrl(img);
                                                    setOpenImageDialog(true);
                                                }}
                                            />
                                        ))}
                                    </Box>
                                )}
                            </Box>

                            {/* Title */}
                            <Typography variant='h6' sx={{ mb: 1, fontWeight: 600 }}>
                                {ideal.title}
                            </Typography>

                            {/* Store Info */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <Chip
                                    label={`${ideal.market || ''}-${ideal.store || ''}`}
                                    size='small'
                                    color='primary'
                                    variant='filled'
                                />
                                <Typography variant='caption' color='text.secondary'>
                                    Created: {formatDate(ideal.original_creation)}
                                </Typography>
                            </Box>

                            {/* Description if available */}
                            {ideal.description && (
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant='subtitle2' sx={{ mb: 1, fontWeight: 600 }}>
                                        Description
                                    </Typography>
                                    <Typography variant='body2' color='text.secondary'>
                                        {ideal.description}
                                    </Typography>
                                </Box>
                            )}
                        </Grid>

                        {/* Right Column - Statistics and Tags */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant='h6' sx={{ mb: 2 }}>
                                Performance Metrics
                            </Typography>

                            {/* Key Metrics Grid */}
                            <Grid container spacing={2} sx={{ mb: 3 }}>
                                <Grid size={6}>
                                    <Card>
                                        <CardContent sx={{ p: 2, textAlign: 'center' }}>
                                            <Typography variant='h6' color='success.main' sx={{ fontWeight: 600 }}>
                                                {ideal.sold_24h || 0}
                                            </Typography>
                                            <Typography variant='caption' color='text.secondary'>
                                                Sold 24H
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid size={6}>
                                    <Card>
                                        <CardContent sx={{ p: 2, textAlign: 'center' }}>
                                            <Typography variant='h6' color='info.main' sx={{ fontWeight: 600 }}>
                                                {ideal.views_24h || 0}
                                            </Typography>
                                            <Typography variant='caption' color='text.secondary'>
                                                Views 24H
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid size={6}>
                                    <Card>
                                        <CardContent sx={{ p: 2, textAlign: 'center' }}>
                                            <Typography variant='h6' color='warning.main' sx={{ fontWeight: 600 }}>
                                                {ideal.total_sold || 0}
                                            </Typography>
                                            <Typography variant='caption' color='text.secondary'>
                                                Total Sold
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid size={6}>
                                    <Card>
                                        <CardContent sx={{ p: 2, textAlign: 'center' }}>
                                            <Typography variant='h6' color='secondary.main' sx={{ fontWeight: 600 }}>
                                                ${ideal.estimated_revenue || 0}
                                            </Typography>
                                            <Typography variant='caption' color='text.secondary'>
                                                Revenue
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>

                            {/* Additional Stats */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant='subtitle2' sx={{ mb: 1, fontWeight: 600, color: '#fff' }}>
                                    Additional Statistics
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: 1.5,
                                        backgroundColor: 'rgba(255,255,255,0.06)',
                                        borderRadius: 1,
                                        border: '1px solid #333',
                                    }}>
                                        <Typography variant='body2' sx={{ color: '#fff' }}>
                                            Favorites:
                                        </Typography>
                                        <Typography variant='body2' sx={{ fontWeight: 600, color: 'deepskyblue' }}>
                                            {ideal.total_farvorites || 0} ({ideal.rate_favorite || 0}%)
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: 1.5,
                                        backgroundColor: 'rgba(255,255,255,0.06)',
                                        borderRadius: 1,
                                        border: '1px solid #333',
                                    }}>
                                        <Typography variant='body2' sx={{ color: '#fff' }}>
                                            Daily Views:
                                        </Typography>
                                        <Typography variant='body2' sx={{ fontWeight: 600, color: 'hotpink' }}>
                                            {ideal.daily_views || 0}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            {/* Tags */}
                            <Box>
                                <Typography variant='subtitle2' sx={{ mb: 1, fontWeight: 600 }}>
                                    Keywords ({tags.length})
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {tags.map((tag, index) => (
                                        <Chip
                                            key={index}
                                            label={tag}
                                            size='small'
                                            sx={{
                                                backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fa',
                                                color: '#000000',
                                                border: '1px solid #000000',
                                                fontWeight: 'bold'
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Box>

                            {/* PNG Status */}
                            {ideal.png && (
                                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Tooltip title='PNG Ready' placement='top'>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <i className='tabler-file-type-png' style={{ color: '#ff9800' }} />
                                            <Typography variant='caption' color='warning.main'>
                                                PNG Available
                                            </Typography>
                                        </Box>
                                    </Tooltip>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                <Button onClick={onClose} variant='outlined'>
                    Close
                </Button>
            </DialogActions>
            {/* Dialog xem ảnh lớn */}
            <Dialog open={openImageDialog} onClose={() => setOpenImageDialog(false)} maxWidth="md">
                <Box sx={{ position: 'relative', p: 2, bgcolor: '#222' }}>
                    <IconButton
                        onClick={() => setOpenImageDialog(false)}
                        sx={{ position: 'absolute', top: 8, right: 8, color: '#fff', zIndex: 2 }}
                    >
                        <i className="tabler-x" />
                    </IconButton>
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt="Xem ảnh lớn"
                            style={{
                                maxWidth: '80vw',
                                maxHeight: '80vh',
                                display: 'block',
                                margin: '0 auto',
                                borderRadius: 8,
                                background: '#222'
                            }}
                        />
                    )}
                </Box>
            </Dialog>
        </Dialog>
    )
}

export default IdealDetailsDialog 