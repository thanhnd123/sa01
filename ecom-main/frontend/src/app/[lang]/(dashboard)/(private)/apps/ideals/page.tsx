import Grid from '@mui/material/Grid2'

import IdealBlock from '@/views/apps/ideals/IdealBlock'

export default function eCommerceProductsList() {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <IdealBlock />
      </Grid>
    </Grid>
  )
}
