import { Box, CircularProgress, Typography } from '@mui/material'

export const LoadingState = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <CircularProgress />
      <Typography variant="body1" sx={{ ml: 2 }}>
        Đang tải thiết kế...
      </Typography>
    </Box>
  )
} 