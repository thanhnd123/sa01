import React, { useRef, useState, useMemo, lazy, Suspense, useEffect, useCallback } from 'react'
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  Pagination,
  Autocomplete
} from '@mui/material'
import { toast } from 'react-toastify'
import * as XLSX from 'xlsx'
import { DebouncedInput } from '@/components/DebouncedInput'
import DefaultValueDialog from '../DefaultValueDialog'
import { useVirtualizer } from '@tanstack/react-virtual'
import type { VirtualItem } from '@tanstack/react-virtual'

interface VirtualizedTableProps {
  columns: TemplateColumn[]
  columnValues: Record<string, string>
  onColumnValueChange: (columnName: string, value: string) => void
  onOpenDialog: (columnName: string, isBulk?: boolean) => void
  initialColumnValues: Record<string, string>
  onBulkEdit: (value: string) => void
  bulkEditValue: string
  setBulkEditValue: (value: string) => void
  onReset: () => void
}

const VirtualizedTable = ({
  columns,
  columnValues,
  onColumnValueChange,
  onOpenDialog,
  initialColumnValues,
  onBulkEdit,
  bulkEditValue,
  setBulkEditValue,
  onReset
}: VirtualizedTableProps) => {
  const parentRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(1)
  const rowsPerPage = 20

  const handleBulkEdit = () => {
    if (bulkEditValue) {
      onBulkEdit(bulkEditValue)
    }
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const paginatedColumns = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage
    return columns.slice(startIndex, startIndex + rowsPerPage)
  }, [columns, page])

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer sx={{ maxWidth: '100%', overflowX: 'auto', maxHeight: 500 }}>
        {' '}
        {/* 53px * 20 rows */}
        <Table size='small' stickyHeader sx={{ tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  width: { xs: '50px', sm: '60px', md: '80px' },
                  minWidth: { xs: '50px', sm: '60px', md: '80px' },
                  maxWidth: { xs: '50px', sm: '60px', md: '80px' },
                  backgroundColor: 'background.paper',
                  position: 'sticky',
                  top: 0,
                  left: 0,
                  zIndex: 2
                }}
              >
                Index
              </TableCell>
              <TableCell
                sx={{
                  width: { xs: '120px', sm: '150px', md: '200px' },
                  minWidth: { xs: '120px', sm: '150px', md: '200px' },
                  maxWidth: { xs: '120px', sm: '150px', md: '200px' },
                  backgroundColor: 'background.paper',
                  position: 'sticky',
                  top: 0,
                  left: { xs: '50px', sm: '60px', md: '80px' },
                  zIndex: 2
                }}
              >
                Column Name
              </TableCell>
              <TableCell
                sx={{
                  width: '60%',
                  minWidth: '60%',
                  maxWidth: '60%',
                  backgroundColor: 'background.paper',
                  position: 'sticky',
                  top: 0,
                  left: { xs: '170px', sm: '210px', md: '280px' },
                  zIndex: 2
                }}
              >
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <TextField
                    size='small'
                    placeholder='Bulk edit value...'
                    value={bulkEditValue}
                    onChange={e => setBulkEditValue(e.target.value)}
                    sx={{ flex: 1 }}
                  />
                  <Button variant='contained' size='small' onClick={handleBulkEdit} disabled={!bulkEditValue}>
                    Edit
                  </Button>
                  <Button variant='outlined' color='error' size='small' onClick={onReset} disabled={!bulkEditValue}>
                    Reset
                  </Button>
                </Box>
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
                    maxWidth: { xs: '50px', sm: '60px', md: '80px' },
                    position: 'sticky',
                    left: 0,
                    backgroundColor: 'background.paper',
                    zIndex: 1
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
                    whiteSpace: 'nowrap',
                    position: 'sticky',
                    left: { xs: '50px', sm: '60px', md: '80px' },
                    backgroundColor: 'background.paper',
                    zIndex: 1
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
                  <DefaultValueSelect
                    column={column}
                    value={columnValues[column.name] || ''}
                    onChange={value => onColumnValueChange(column.name, value)}
                    defaultValue={initialColumnValues[column.name] || ''}
                    onOpenDialog={onOpenDialog}
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

interface TemplateColumn {
  name: string
  required: boolean
  description: string
  defaultValue?: string
  type: 'parent' | 'child'
}

interface GroupedListingSectionProps {
  onColumnsChange: (columns: TemplateColumn[]) => void
  onColumnValuesChange: (values: Record<string, string>) => void
  columnValues: Record<string, string>
  initialColumns?: TemplateColumn[]
  templateId?: string
}

const ITEMS_PER_PAGE = 20

const defaultOptions = [
  { value: 'product_title', label: 'Product Title' },
  { value: 'description', label: 'Description' },
  { value: 'short_description', label: 'Short Description' },
  { value: 'main_image', label: 'Main Image' },
  { value: 'sku', label: 'SKU' },
  { value: 'bullet_point_1', label: 'Bullet Point 1' },
  { value: 'bullet_point_2', label: 'Bullet Point 2' },
  { value: 'bullet_point_3', label: 'Bullet Point 3' },
  { value: 'bullet_point_4', label: 'Bullet Point 4' },
  { value: 'bullet_point_5', label: 'Bullet Point 5' },
  ...Array.from({ length: 10 }, (_, i) => ({
    value: `image_${i + 1}`,
    label: `Image ${i + 1}`
  }))
]

interface DefaultValueSelectProps {
  column: TemplateColumn
  value: string
  onChange: (value: string) => void
  defaultValue: string
  onOpenDialog: (columnName: string, isBulk?: boolean) => void
}

const DefaultValueSelect = React.memo(
  ({ column, value, onChange, defaultValue, onOpenDialog }: DefaultValueSelectProps) => {
    const [localValue, setLocalValue] = useState(value)
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
      setLocalValue(value)
      const option = defaultOptions.find(opt => opt.value === value)
      setInputValue(option ? `{${option.value}}` : String(value))
    }, [value])

    const handleInputChange = useCallback(
      (event: React.SyntheticEvent, newValue: string) => {
        setInputValue(newValue)
        const option = defaultOptions.find(opt => opt.value === newValue)
        const finalValue = option ? option.value : newValue
        setLocalValue(finalValue)
        onChange(finalValue)
      },
      [onChange]
    )

    const handleChange = useCallback(
      (newValue: string | null) => {
        const finalValue = newValue || ''
        setLocalValue(finalValue)
        const option = defaultOptions.find(opt => opt.value === finalValue)
        setInputValue(option ? `{${option.value}}` : String(finalValue))
        onChange(finalValue)
      },
      [onChange]
    )

    const handleCellClick = useCallback(() => {
      onOpenDialog(column.name)
    }, [column.name, onOpenDialog])

    return (
      <Autocomplete
        freeSolo
        options={defaultOptions.map(option => ({
          value: option.value,
          label: `{${option.value}}`
        }))}
        value={localValue}
        inputValue={inputValue}
        onChange={(_, newValue) => {
          if (typeof newValue === 'string') {
            handleChange(newValue)
          } else if (newValue) {
            handleChange(newValue.value)
          } else {
            handleChange('')
          }
        }}
        onInputChange={handleInputChange}
        renderInput={params => (
          <TextField {...params} size='small' fullWidth placeholder='Enter or select value' onClick={handleCellClick} />
        )}
        renderOption={(props, option) => {
          const { key, ...otherProps } = props
          return (
            <li key={option.value} {...otherProps}>
              {option.label}
            </li>
          )
        }}
        getOptionLabel={option => {
          if (typeof option === 'string') {
            const opt = defaultOptions.find(o => o.value === option)
            return opt ? `{${opt.value}}` : String(option)
          }
          return String(option.label)
        }}
        disableClearable
        blurOnSelect
        selectOnFocus
        clearOnBlur={false}
      />
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.defaultValue === nextProps.defaultValue &&
      prevProps.column.name === nextProps.column.name
    )
  }
)

DefaultValueSelect.displayName = 'DefaultValueSelect'

const GroupedListingSection: React.FC<GroupedListingSectionProps> = ({
  onColumnsChange,
  onColumnValuesChange,
  columnValues,
  initialColumns,
  templateId
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [columns, setColumns] = useState<TemplateColumn[]>(initialColumns || [])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [initialColumnValues, setInitialColumnValues] = useState<Record<string, string>>({})
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedColumn, setSelectedColumn] = useState<string>('')
  const [dialogValue, setDialogValue] = useState<string>('')
  const [bulkEditValue, setBulkEditValue] = useState('')
  const [page, setPage] = useState(1)

  const prevInitialColumnsRef = useRef(initialColumns)

  useEffect(() => {
    if (initialColumns && initialColumns !== prevInitialColumnsRef.current) {
      setColumns(initialColumns)
      prevInitialColumnsRef.current = initialColumns
    }
  }, [initialColumns])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (fileInputRef.current) fileInputRef.current.value = ''
    setIsLoading(true)
    const reader = new FileReader()
    reader.onload = e => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })
        handleGroupedProductUpload(workbook)
      } catch (error) {
        toast.error('Failed to read template file')
        setIsLoading(false)
      }
    }
    reader.readAsArrayBuffer(file)
  }

  const handleGroupedProductUpload = (workbook: XLSX.WorkBook) => {
    try {
      const templateSheet = workbook.Sheets['Template']
      if (!templateSheet) {
        toast.error('Template sheet not found. Please make sure the file has a sheet named "Template"')
        setIsLoading(false)
        return
      }
      const jsonData = XLSX.utils.sheet_to_json(templateSheet, {
        header: 1,
        defval: '',
        blankrows: false,
        raw: false
      })
      if (jsonData.length > 3) {
        const headers = jsonData[2] as string[]
        const defaultValues = jsonData[3] as string[]

        // Tạo columns cho grouped product
        const groupedCols = headers.map((colName, idx) => {
          let defaultValue = String(defaultValues[idx] || '').trim()

          // Áp dụng các rule đặc biệt cho columns
          if (colName === 'item_sku') {
            defaultValue = '{sku}'
          } else if (colName === 'item_name') {
            defaultValue = '{product_title}'
          } else if (colName === 'product_description') {
            defaultValue = '{description}'
          } else if (colName === 'main_image_url') {
            defaultValue = '{main_image}'
          } else if (colName.match(/^other_image_url\d+$/)) {
            const match = colName.match(/other_image_url(\d+)/)
            if (match) {
              const index = parseInt(match[1])
              if (index <= 10) {
                defaultValue = `{image_${index}}`
              } else {
                defaultValue = String(defaultValues[idx] || '').trim()
              }
            }
          } else if (colName.match(/^bullet_point\d+$/)) {
            const match = colName.match(/bullet_point(\d+)/)
            if (match) {
              const index = parseInt(match[1])
              if (index >= 1 && index <= 5) {
                defaultValue = `{bullet_point_${index}}`
              }
            }
          }

          return {
            name: colName,
            required: true,
            description: colName,
            defaultValue,
            type: 'parent' as const
          }
        })

        setColumns(groupedCols)
        onColumnsChange(groupedCols)

        // Set default values for all columns
        const initialColumnValues = groupedCols.reduce(
          (acc, col) => {
            acc[col.name] = col.defaultValue || ''
            return acc
          },
          {} as Record<string, string>
        )
        setInitialColumnValues(initialColumnValues)
        onColumnValuesChange(initialColumnValues)
        toast.success('Đã nhận template thành công')
      } else {
        toast.error('Invalid template file format. File must have at least 4 rows.')
      }
    } catch (error) {
      toast.error('Failed to process grouped product template')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredColumns = useMemo(() => {
    if (!searchTerm.trim()) return columns

    const searchTerms = searchTerm
      .toLowerCase()
      .split(' ')
      .filter(term => term.length > 0)

    return columns.filter(column => {
      const columnName = column.name.toLowerCase()
      const columnDesc = column.description.toLowerCase()

      return searchTerms.every(term => columnName.includes(term) || columnDesc.includes(term))
    })
  }, [columns, searchTerm])

  const handleColumnValueChange = useCallback(
    (columnName: string, value: string) => {
      const newValues = { ...columnValues }
      newValues[columnName] = value
      onColumnValuesChange(newValues)
    },
    [columnValues, onColumnValuesChange]
  )

  const handleBulkEdit = useCallback(
    (value: string) => {
      if (value) {
        // Chỉ cập nhật các cột trong trang hiện tại
        const startIndex = (page - 1) * ITEMS_PER_PAGE
        const endIndex = startIndex + ITEMS_PER_PAGE
        const currentPageColumns = filteredColumns.slice(startIndex, endIndex)

        const newValues = { ...columnValues }
        currentPageColumns.forEach(col => {
          newValues[col.name] = value
        })
        onColumnValuesChange(newValues)
        setBulkEditValue('')
        toast.success(`Đã cập nhật ${currentPageColumns.length} cột trong trang hiện tại`)
      }
    },
    [page, filteredColumns, columnValues, onColumnValuesChange]
  )

  const handleReset = useCallback(() => {
    // Reset về giá trị ban đầu sau khi upload
    onColumnValuesChange(initialColumnValues)
    setBulkEditValue('')
    toast.success('Đã reset tất cả các cột về giá trị ban đầu')
  }, [initialColumnValues, onColumnValuesChange])

  const handleOpenDialog = useCallback(
    (columnName: string, isBulk: boolean = false) => {
      setSelectedColumn(columnName)
      setDialogValue(columnValues[columnName] || '')
      setOpenDialog(true)
    },
    [columnValues]
  )

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false)
    setSelectedColumn('')
    setDialogValue('')
  }, [])

  const handleDialogSave = useCallback(
    (value: string) => {
      if (selectedColumn) {
        const newValues = { ...columnValues }
        newValues[selectedColumn] = value
        onColumnValuesChange(newValues)
      }
    },
    [selectedColumn, columnValues, onColumnValuesChange]
  )

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant='subtitle1' sx={{ mb: 2 }}>
        Grouped Product Template Columns
      </Typography>
      <Box sx={{ mb: 3 }}>
        <input
          type='file'
          accept='.xlsx,.xls,.csv,.xlsm'
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <Button
          variant='outlined'
          onClick={() => fileInputRef.current?.click()}
          startIcon={isLoading ? <CircularProgress size={20} /> : <i className='tabler-upload' />}
          disabled={isLoading}
        >
          {isLoading ? 'Uploading...' : 'Upload Grouped Product Template File'}
        </Button>
        <Typography variant='caption' sx={{ ml: 2, color: 'text.secondary' }}>
          Supported formats: XLSX, XLS, CSV, XLSM
        </Typography>
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : columns.length > 0 ? (
        <Box sx={{ mt: 3 }}>
          <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
            <DebouncedInput
              fullWidth
              size='small'
              placeholder='Search columns...'
              value={searchTerm}
              onChange={value => setSearchTerm(value as string)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <i className='tabler-search' />
                  </InputAdornment>
                )
              }}
            />
            <Typography variant='body2' sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
              {filteredColumns.length} results
            </Typography>
          </Box>

          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              overflow: 'hidden'
            }}
          >
            <Suspense
              fallback={
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <CircularProgress />
                </Box>
              }
            >
              <VirtualizedTable
                columns={filteredColumns}
                columnValues={columnValues}
                onColumnValueChange={handleColumnValueChange}
                onOpenDialog={handleOpenDialog}
                initialColumnValues={initialColumnValues}
                onBulkEdit={handleBulkEdit}
                bulkEditValue={bulkEditValue}
                setBulkEditValue={setBulkEditValue}
                onReset={handleReset}
              />
            </Suspense>
          </Box>
        </Box>
      ) : null}

      <DefaultValueDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSave={handleDialogSave}
        value={dialogValue}
        title='Select Default Value'
      />
    </Box>
  )
}

export default GroupedListingSection
