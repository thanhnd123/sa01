import Grid from '@mui/material/Grid2'

import ListingBlock from '@/views/apps/listings/ListingBlock'

export default function listing() {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <ListingBlock />
      </Grid>
    </Grid>
  )
}