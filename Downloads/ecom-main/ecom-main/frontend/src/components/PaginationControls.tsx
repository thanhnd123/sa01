'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'
import FormControl from '@mui/material/FormControl'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

interface PaginationControlsProps {
  itemsPerPage: number
  totalPages: number
  currentPage: number
  totalItems: number
  items: any[]
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void
  onLimitChange: (event: SelectChangeEvent<number>) => void
}

export default function PaginationControls({
  itemsPerPage,
  totalPages,
  currentPage,
  totalItems,
  items,
  onPageChange,
  onLimitChange
}: PaginationControlsProps) {
  return (
    <Box className='flex items-center justify-end gap-4'>
      <Box className='flex items-center gap-2'>
        <Typography variant='body2'>Show</Typography>
        <FormControl size='small' sx={{ minWidth: 80 }}>
          <Select value={itemsPerPage} onChange={onLimitChange} className='rounded'>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
        <Typography variant='body2'>entries</Typography>
      </Box>

      <Pagination 
        count={totalPages} 
        page={currentPage} 
        onChange={onPageChange} 
        color='primary' 
        size='medium'
        showFirstButton
        showLastButton
      />

      <Typography variant='body2' className='min-w-[200px] text-right'>
        {items.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} - {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
      </Typography>
    </Box>
  )
} 