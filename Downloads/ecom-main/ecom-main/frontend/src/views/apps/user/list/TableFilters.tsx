// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import MenuItem from '@mui/material/MenuItem'

// Type Imports
import type { User } from '@/types/apps/userTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const TableFilters = ({ setData, tableData }: { setData: (data: User[]) => void; tableData?: User[] }) => {
  // States
  const [role, setRole] = useState<User['role']>('')
  const [team, setTeam] = useState<User['team']>({ _id: '', name: '' })
  const [status, setStatus] = useState<User['status']>('')

  useEffect(() => {
    const filteredData = tableData?.filter(user => {
      if (role && user.role !== role) return false
      if (team && user.team !== team) return false
      if (status && user.status !== status) return false

      return true
    })

    setData(filteredData || [])
  }, [role, team, status, tableData, setData])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            select
            fullWidth
            id='select-role'
            value={role}
            onChange={e => setRole(e.target.value)}
            slotProps={{
              select: { displayEmpty: true }
            }}
          >
            <MenuItem value=''>Select Role</MenuItem>
            <MenuItem value='Management'>Management</MenuItem>
            <MenuItem value='Seller'>Seller</MenuItem>
            <MenuItem value='Fulfiller'>Fulfiller</MenuItem>
            <MenuItem value='Designer'>Designer</MenuItem>
            <MenuItem value='Other'>Other</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            select
            fullWidth
            id='select-plan'
            value={team}
            onChange={e => setTeam({ _id: e.target.value, name: '' })}
            slotProps={{
              select: { displayEmpty: true }
            }}
          >
            <MenuItem value=''>Select Team</MenuItem>
            <MenuItem value='Giran'>Giran</MenuItem>
            <MenuItem value='Vi Tu'>Vi Tu</MenuItem>
            <MenuItem value='Tung'>Tung</MenuItem>
            <MenuItem value='Hoang Dung'>Hoang Dung</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            select
            fullWidth
            id='select-status'
            value={status}
            onChange={e => setStatus(e.target.value)}
            slotProps={{
              select: { displayEmpty: true }
            }}
          >
            <MenuItem value=''>Select Status</MenuItem>
            <MenuItem value='pending'>Pending</MenuItem>
            <MenuItem value='active'>Active</MenuItem>
            <MenuItem value='inactive'>Inactive</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
