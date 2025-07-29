import React from 'react'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

interface SortValues {
  views: string
  'avg views': string
  sold: string
  favorites: string
}

interface IdealFiltersProps {
  sortValues: SortValues
  onSortChange: (key: string, value: string) => void
  onClearFilters: () => void
  showMyIdeals: boolean
  onMyIdealsChange: (checked: boolean) => void
}

const sortFields = [
  { value: '', label: 'All' },
  { value: 'views', label: 'Views' },
  { value: 'sold', label: 'Sold' },
  { value: 'avg views', label: 'Avg Views' }
]
const sortDirections = [
  { value: 'high_to_low', label: 'High to Low' },
  { value: 'low_to_high', label: 'Low to High' }
]

const IdealFilters = ({
  sortValues,
  onSortChange,
  onClearFilters,
  showMyIdeals,
  onMyIdealsChange
}: IdealFiltersProps) => {
  // Lấy field đang active
  const getActiveSortField = () => {
    if (sortValues.views) return 'views'
    if (sortValues['avg views']) return 'avg views'
    if (sortValues.sold) return 'sold'
    return ''
  }
  const getActiveDirection = () => {
    if (sortValues.views) return sortValues.views
    if (sortValues['avg views']) return sortValues['avg views']
    if (sortValues.sold) return sortValues.sold
    return 'high_to_low'
  }
  const hasActiveFilters = () => {
    const hasSortFilters = sortValues.views !== '' || sortValues['avg views'] !== '' || sortValues.sold !== ''
    const hasMyIdealsFilter = showMyIdeals === false // Chỉ khi My Ideals bị uncheck (không phải mặc định)

    return hasSortFilters || hasMyIdealsFilter
  }
  const activeField = getActiveSortField()
  const activeDirection = getActiveDirection()

  return (
    <Box className='flex gap-3 items-center'>
      <TextField
        select
        size='small'
        label='Sort by'
        variant='outlined'
        value={activeField}
        onChange={e => {
          const value = e.target.value
          if (value === '') {
            // All
            onSortChange('views', '')
            onSortChange('avg views', '')
            onSortChange('sold', '')
          } else {
            // Reset các field khác, chỉ set field chọn, giữ direction hiện tại
            onSortChange('views', value === 'views' ? activeDirection : '')
            onSortChange('avg views', value === 'avg views' ? activeDirection : '')
            onSortChange('sold', value === 'sold' ? activeDirection : '')
          }
        }}
        sx={{
          minWidth: 140,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.87)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1976d2',
            },
          },
        }}
      >
        {sortFields.map(opt => (
          <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
        ))}
      </TextField>
      <TextField
        select
        size='small'
        label='Direction'
        variant='outlined'
        value={activeDirection}
        onChange={e => {
          const direction = e.target.value
          // Chỉ update field đang chọn
          if (activeField) {
            onSortChange('views', activeField === 'views' ? direction : '')
            onSortChange('avg views', activeField === 'avg views' ? direction : '')
            onSortChange('sold', activeField === 'sold' ? direction : '')
          }
        }}
        sx={{
          minWidth: 140,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.87)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1976d2',
            },
          },
        }}
        disabled={!activeField}
      >
        {sortDirections.map(opt => (
          <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
        ))}
      </TextField>
      <FormControlLabel
        control={
          <Checkbox
            checked={showMyIdeals}
            onChange={(e) => onMyIdealsChange(e.target.checked)}
            size='small'
          />
        }
        label='My Ideals'
        sx={{
          '& .MuiFormControlLabel-label': {
            fontSize: '0.875rem',
            fontWeight: 500
          }
        }}
      />
      {hasActiveFilters() && (
        <Button
          size='small'
          variant='text'
          onClick={onClearFilters}
          className='text-xs text-gray-500 hover:text-gray-700'
          startIcon={<i className='tabler-x text-xs' />}
        >
          Clear
        </Button>
      )}
    </Box>
  )
}

export default IdealFilters 