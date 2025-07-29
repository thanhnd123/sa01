import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react'
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

interface TemplateColumn {
    name: string
    required: boolean
    description: string
    defaultValue?: string
    type: 'parent' | 'child'
}

interface VariantListingSectionProps {
    onColumnsChange: (columns: TemplateColumn[]) => void
    onColumnValuesChange: (values: Record<string, string>) => void
    columnValues: Record<string, string>
    initialColumns?: TemplateColumn[]
    templateId?: string
}

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

const VariantListingSection: React.FC<VariantListingSectionProps> = ({
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
    const [isBulkEdit, setIsBulkEdit] = useState(false)
    const rowsPerPage = 20

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
                handleVariantProductUpload(workbook)
            } catch (error) {
                toast.error('Failed to read template file')
                setIsLoading(false)
            }
        }
        reader.readAsArrayBuffer(file)
    }

    const handleVariantProductUpload = (workbook: XLSX.WorkBook) => {
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
                const parentChildIndex = headers.findIndex(h => h.toLowerCase() === 'parent_child')
                if (parentChildIndex === -1) {
                    toast.error('Template must contain a column named "parent_child"')
                    setIsLoading(false)
                    return
                }

                // Xử lý các dòng dữ liệu mẫu (từ dòng 4 trở đi)
                const dataRows = jsonData.slice(3) as string[][]

                // Lấy dòng parent đầu tiên
                const parentRow = dataRows.find(
                    row =>
                        Array.isArray(row) &&
                        (String(row[parentChildIndex]).toLowerCase().trim() === 'parent' ||
                            String(row[parentChildIndex]).trim() === '')
                ) as string[] | undefined

                if (!parentRow) {
                    toast.error('Không tìm thấy dòng parent')
                    setIsLoading(false)
                    return
                }

                // Lấy vị trí dòng parent đầu tiên
                const parentRowIndex = dataRows.findIndex(
                    row =>
                        Array.isArray(row) &&
                        (String(row[parentChildIndex]).toLowerCase().trim() === 'parent' ||
                            String(row[parentChildIndex]).trim() === '')
                )

                // Lấy các dòng child từ sau dòng parent đến trước dòng parent tiếp theo (nếu có)
                const childRowsData = dataRows.slice(parentRowIndex + 1).filter((row, index, array) => {
                    if (
                        String(row[parentChildIndex]).toLowerCase().trim() === 'parent' ||
                        String(row[parentChildIndex]).trim() === ''
                    ) {
                        return false
                    }
                    return (
                        Array.isArray(row) &&
                        (String(row[parentChildIndex]).toLowerCase().trim() === 'child' ||
                            String(row[parentChildIndex]).trim() === '')
                    )
                }) as string[][]

                // Lấy cột có dữ liệu ở parent
                let parentColIndexes: number[] = []
                parentColIndexes = parentRow.map((val, idx) => idx).filter(idx => idx !== -1)

                // Lấy cột có dữ liệu ở child đầu tiên
                let childColIndexes: number[] = []
                if (childRowsData.length > 0) {
                    childColIndexes = childRowsData[0].map((val, idx) => idx).filter(idx => idx !== -1)
                }

                // Tạo columns cho parent và child
                const parentCols = parentColIndexes.map(idx => {
                    const colName = headers[idx]
                    let defaultValue = String(defaultValues[idx] || '').trim()

                    // Áp dụng các rule đặc biệt cho parent columns
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
                        name: `parent.${colName}`,
                        required: true,
                        description: colName,
                        defaultValue,
                        type: 'parent' as const
                    }
                })

                // Tạo columns cho child với format child[1-n].tên cột
                const childCols = childColIndexes
                    .map(idx => {
                        const colName = headers[idx]
                        const childColumns: TemplateColumn[] = []

                        for (let i = 1; i <= childRowsData.length; i++) {
                            let defaultValue = String(defaultValues[idx] || '').trim()

                            // Áp dụng các rule đặc biệt cho child columns
                            if (colName === 'item_name') {
                                defaultValue = `{product_title} ${defaultValue}`
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

                            childColumns.push({
                                name: `child[${i}].${colName}`,
                                required: true,
                                description: colName,
                                defaultValue,
                                type: 'child' as const
                            })
                        }
                        return childColumns
                    })
                    .flat()

                const allColumns = [...parentCols, ...childCols]
                setColumns(allColumns)
                onColumnsChange(allColumns)

                // Set default values for all columns
                const initialColumnValues = allColumns.reduce(
                    (acc, col) => {
                        acc[col.name] = col.defaultValue || ''
                        return acc
                    },
                    {} as Record<string, string>
                )
                onColumnValuesChange(initialColumnValues)
                toast.success(`Đã nhận 1 parent và ${childRowsData.length} child`)
            } else {
                toast.error('Invalid template file format. File must have at least 4 rows.')
            }
        } catch (error) {
            toast.error('Failed to process variant product template')
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
                const startIndex = (page - 1) * rowsPerPage
                const endIndex = startIndex + rowsPerPage
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

    const handleOpenDialog = useCallback(
        (columnName: string, isBulk: boolean = false) => {
            setSelectedColumn(columnName)
            setDialogValue(columnValues[columnName] || '')
            setIsBulkEdit(isBulk)
            setOpenDialog(true)
        },
        [columnValues]
    )

    const handleCloseDialog = useCallback(() => {
        setOpenDialog(false)
        setSelectedColumn('')
        setDialogValue('')
        setIsBulkEdit(false)
    }, [])

    const handleDialogSave = useCallback(
        (value: string) => {
            if (isBulkEdit) {
                setBulkEditValue(value)
                handleBulkEdit(value)
            } else if (selectedColumn) {
                const newValues = { ...columnValues }
                newValues[selectedColumn] = value
                onColumnValuesChange(newValues)
            }
        },
        [isBulkEdit, columnValues, selectedColumn, onColumnValuesChange, handleBulkEdit]
    )

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant='subtitle1' sx={{ mb: 2 }}>
                Variant Template Columns
            </Typography>
            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
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
                    {isLoading ? 'Uploading...' : 'Upload Variant Template File'}
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
                        <TableContainer sx={{ maxWidth: '100%', overflowX: 'auto', maxHeight: 500 }}>
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
                                                <Button
                                                    variant='contained'
                                                    size='small'
                                                    onClick={() => handleBulkEdit(bulkEditValue)}
                                                    disabled={!bulkEditValue}
                                                >
                                                    Edit
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredColumns.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((column, index) => (
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
                                                    onChange={value => handleColumnValueChange(column.name, value)}
                                                    defaultValue={column.defaultValue || ''}
                                                    onOpenDialog={handleOpenDialog}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
                            <Pagination
                                count={Math.ceil(filteredColumns.length / rowsPerPage)}
                                page={page}
                                onChange={(_, newPage) => setPage(newPage)}
                                color='primary'
                            />
                        </Box>
                    </Box>
                </Box>
            ) : null}

            <DefaultValueDialog
                open={openDialog}
                onClose={handleCloseDialog}
                onSave={handleDialogSave}
                value={dialogValue}
                title={isBulkEdit ? 'Bulk Edit Default Value' : 'Select Default Value'}
            />
        </Box>
    )
}

export default VariantListingSection
