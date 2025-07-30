import Grid from '@mui/material/Grid2'

import TemplateBlock from '@/views/apps/listings/TemplateBlock'

export default function listing() {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <TemplateBlock />
      </Grid>
    </Grid>
  )
}