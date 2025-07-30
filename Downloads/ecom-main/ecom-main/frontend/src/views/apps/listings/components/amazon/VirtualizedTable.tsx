import React, { useCallback } from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Button,
  Typography,
  Pagination
} from '@mui/material'
import { toast } from 'react-toastify'

interface TemplateColumn {
  name: string
  required: boolean
  description: string
  defaultValue?: string
  type: 'parent' | 'child'
}

interface VirtualizedTableProps {
  columns: TemplateColumn[]
  columnValues: Record<string, string>
  onColumnValueChange: (columnName: string, value: string) => void
  onOpenDialog: (columnName: string, isBulk?: boolean) => void
  initialColumnValues: Record<string, string>
}

const VirtualizedTable: React.FC<VirtualizedTableProps> = ({
  columns,
  columnValues,
  onColumnValueChange,
  onOpenDialog,
  initialColumnValues
}) => {
  const [bulkEditValue, setBulkEditValue] = React.useState('')
  const [page, setPage] = React.useState(1)
  const rowsPerPage = 20

  const paginatedColumns = React.useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage
    return columns.slice(startIndex, startIndex + rowsPerPage)
  }, [columns, page])

  const handleBulkEdit = useCallback(() => {
    if (!bulkEditValue) return

    const newValues = { ...columnValues }
    paginatedColumns.forEach(col => {
      newValues[col.name] = bulkEditValue
    })
    onColumnValueChange('', bulkEditValue)
    setBulkEditValue('')
    toast.success(`Đã cập nhật ${paginatedColumns.length} cột trong trang hiện tại`)
  }, [bulkEditValue, paginatedColumns, columnValues, onColumnValueChange])

  const handleReset = useCallback(() => {
    const newValues = { ...columnValues }
    columns.forEach(col => {
      newValues[col.name] = initialColumnValues[col.name] || ''
    })
    onColumnValueChange('', '')
    toast.success('Đã reset tất cả các cột về giá trị ban đầu')
  }, [columns, columnValues, initialColumnValues, onColumnValueChange])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  return (
    <Box sx={{ height: 400 }}>
      <Box sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          size='small'
          placeholder='Bulk edit value...'
          value={bulkEditValue}
          onChange={e => setBulkEditValue(e.target.value)}
          sx={{ flex: 1 }}
        />
        <Button variant='outlined' onClick={handleBulkEdit} disabled={!bulkEditValue}>
          Cập nhật trang hiện tại
        </Button>
        <Button variant='outlined' color='error' onClick={handleReset}>
          Reset All
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ height: 'calc(100% - 64px)' }}>
        <Table size='small' stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  width: { xs: '50px', sm: '60px', md: '80px' },
                  minWidth: { xs: '50px', sm: '60px', md: '80px' },
                  maxWidth: { xs: '50px', sm: '60px', md: '80px' },
                  backgroundColor: 'background.paper'
                }}
              >
                Index
              </TableCell>
              <TableCell
                sx={{
                  width: { xs: '120px', sm: '150px', md: '200px' },
                  minWidth: { xs: '120px', sm: '150px', md: '200px' },
                  maxWidth: { xs: '120px', sm: '150px', md: '200px' },
                  backgroundColor: 'background.paper'
                }}
              >
                Column Name
              </TableCell>
              <TableCell
                sx={{
                  width: '60%',
                  minWidth: '60%',
                  maxWidth: '60%',
                  backgroundColor: 'background.paper'
                }}
              >
                Default Value
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedColumns.map((column, index) => (
              <TableRow key={column.name}>
                <TableCell
                  sx={{
                    width: { xs: '50px', sm: '60px', md: '80px' },
                    minWidth: { xs: '50px', sm: '60px', md: '80px' },
                    maxWidth: { xs: '50px', sm: '60px', md: '80px' }
                  }}
                >
                  {(page - 1) * rowsPerPage + index + 1}
                </TableCell>
                <TableCell
                  sx={{
                    width: { xs: '120px', sm: '150px', md: '200px' },
                    minWidth: { xs: '120px', sm: '150px', md: '200px' },
                    maxWidth: { xs: '120px', sm: '150px', md: '200px' },
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {column.name}
                </TableCell>
                <TableCell
                  sx={{
                    width: '60%',
                    minWidth: '60%',
                    maxWidth: '60%'
                  }}
                >
                  <TextField
                    fullWidth
                    size='small'
                    value={columnValues[column.name] || ''}
                    onChange={e => onColumnValueChange(column.name, e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <Button
                            size='small'
                            onClick={() => onOpenDialog(column.name)}
                            sx={{ minWidth: 'auto', p: 0.5 }}
                          >
                            <i className='tabler-edit' />
                          </Button>
                        </InputAdornment>
                      )
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={Math.ceil(columns.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color='primary'
        />
      </Box>
    </Box>
  )
}

export default VirtualizedTable
