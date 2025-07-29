import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Pagination,
  InputAdornment,
  TextField
} from '@mui/material'
import { DebouncedInput } from '@/components/DebouncedInput'

interface TemplateColumn {
  name: string
  required: boolean
  description: string
  defaultValue?: string
}

// Simple DefaultValueSelect component
const DefaultValueSelect: React.FC<{
  column: TemplateColumn
  value: string
  onChange: (value: string) => void
  defaultValue: string
}> = ({ value, onChange, defaultValue }) => {
  return (
    <TextField
      size='small'
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={defaultValue}
      fullWidth
    />
  )
}

interface ParentColumnsTableProps {
  columns: TemplateColumn[]
  columnValues: Record<string, string>
  onChange: (columnName: string, value: string) => void
  search: string
  setSearch: (value: string) => void
  page: number
  setPage: (value: number) => void
  pageSize: number
}

const ParentColumnsTable: React.FC<ParentColumnsTableProps> = ({
  columns,
  columnValues,
  onChange,
  search,
  setSearch,
  page,
  setPage,
  pageSize
}) => {
  const filtered = columns.filter(col => col.name.toLowerCase().includes(search.toLowerCase()))
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize)
  return (
    <Box sx={{ flex: 1, minWidth: 300 }}>
      <Typography variant='subtitle2' sx={{ mb: 1 }}>
        Parent Columns
      </Typography>
      <DebouncedInput
        fullWidth
        size='small'
        placeholder='Search parent columns...'
        value={search}
        onChange={value => setSearch(value as string)}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <i className='tabler-search' />
            </InputAdornment>
          )
        }}
      />
      <TableContainer component={Paper} sx={{ maxHeight: 300, mt: 1 }}>
        <Table size='small' stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Column Name</TableCell>
              <TableCell>Default Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paged.map(col => (
              <TableRow key={col.name}>
                <TableCell>{col.name}</TableCell>
                <TableCell>
                  <DefaultValueSelect
                    column={col}
                    value={columnValues[col.name] || col.defaultValue || ''}
                    onChange={value => onChange(col.name, value)}
                    defaultValue={col.defaultValue || ''}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
        <Pagination
          count={Math.ceil(filtered.length / pageSize)}
          page={page}
          onChange={(_, value) => setPage(value)}
          size='small'
          color='primary'
        />
      </Box>
    </Box>
  )
}

export default ParentColumnsTable
