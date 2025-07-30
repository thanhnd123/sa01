// Third-party Imports


import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
// Util Importss'

import TemplateTable from '@/views/apps/ecommerce/template/TemplateTable'

const DesignPage = () => {
  return (
    <>
      <Grid container spacing={6}>

        <Grid size={{ xs: 12 }}>
          <TemplateTable />
        </Grid>
      </Grid>
    </>
  )
}

export default DesignPage
