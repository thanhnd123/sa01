import { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CustomTextField from '@core/components/mui/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import { toast } from 'react-toastify'
import axiosInstance from '@/libs/axios'
import * as XLSX from 'xlsx'
import LinearProgress from '@mui/material/LinearProgress'
import TextField from '@mui/material/TextField'
import React from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import Autocomplete from '@mui/material/Autocomplete'
import { DebouncedInput } from '@/components/DebouncedInput'
import Grid from '@mui/material/Grid'
import ParentColumnsTable from './ParentColumnsTable'
import ChildRowsTable from './ChildRowsTable'
import VariantListingSection from './amazon/VariantListingSection'
import SingleListingSection from './amazon/SingleListingSection'
import GroupedListingSection from './amazon/GroupedListingSection'

interface TemplateColumn {
  name: string
  required: boolean
  description: string
  defaultValue?: string
}

interface Template {
  _id: string
  name: string
  description: string
  status: string
  platform: string
  product_type: string
  listing_type: string
  columns: TemplateColumn[]
}

interface AddTemplateFormProps {
  onClose: () => void
  onSuccess: () => void
  editData?: Template | null
}

const platforms = [
  { value: 'amazon', label: 'Amazon' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'etsy', label: 'Etsy' },
  { value: 'ebay', label: 'eBay' }
]

const listingTypes = [
  { value: 'single', label: 'Single Product' },
  { value: 'variant', label: 'Variant Product' },
  { value: 'grouped', label: 'Grouped Product' }
]

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
}

const DefaultValueSelect = React.memo(
  ({ column, value, onChange, defaultValue }: DefaultValueSelectProps) => {
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
        renderInput={params => <TextField {...params} size='small' fullWidth placeholder='Enter or select value' />}
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

export default function AddTemplateForm({ onClose, onSuccess, editData }: AddTemplateFormProps) {
  const { data: session } = useSession()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Memoize initial state
  const initialState = useMemo(
    () => ({
      name: editData?.name || '',
      description: editData?.description || '',
      status: editData?.status || 'active',
      platform: editData?.platform || 'amazon',
      product_type: editData?.product_type || '',
      listing_type: editData?.listing_type || 'single',
      columns: [] as TemplateColumn[]
    }),
    [editData]
  )

  const [newTemplate, setNewTemplate] = useState(initialState)
  const [productTypes, setProductTypes] = useState<{ value: string; label: string }[]>([])
  const [loadingProductTypes, setLoadingProductTypes] = useState(false)
  const [columnValues, setColumnValues] = useState<Record<string, string>>({})
  const [templateColumns, setTemplateColumns] = useState<TemplateColumn[]>(editData?.columns || [])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredColumns, setFilteredColumns] = useState<TemplateColumn[]>(editData?.columns || [])
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  // Memoize initial column values
  const initialColumnValues = useMemo(() => {
    if (editData?.columns) {
      return editData.columns.reduce(
        (acc, col) => {
          acc[col.name] = col.defaultValue || ''
          return acc
        },
        {} as Record<string, string>
      )
    }
    return {}
  }, [editData])

  // Set initial column values from editData
  useEffect(() => {
    setColumnValues(initialColumnValues)
    if (editData?.columns) {
      console.log('Khởi tạo columns từ editData:', editData.columns)
    }
  }, [initialColumnValues, editData])

  // Memoize set template
  const setTemplate = useCallback((field: string, value: string) => {
    setNewTemplate(prev => ({ ...prev, [field]: value }))
  }, [])

  // Memoize handle input change
  const handleInputChange = useCallback(
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setTemplate(field, value)
    },
    [setTemplate]
  )

  // Memoize name input props
  const nameInputProps = useMemo(
    () => ({
      label: 'Name',
      defaultValue: newTemplate.name,
      onChange: handleInputChange('name'),
      fullWidth: true,
      required: true,
      variant: 'outlined' as const,
      size: 'small' as const,
      InputLabelProps: {
        shrink: true
      }
    }),
    [newTemplate.name, handleInputChange]
  )

  // Memoize description input props
  const descriptionInputProps = useMemo(
    () => ({
      label: 'Description',
      defaultValue: newTemplate.description,
      onChange: handleInputChange('description'),
      multiline: true,
      rows: 4,
      fullWidth: true,
      variant: 'outlined' as const,
      InputLabelProps: {
        shrink: true
      }
    }),
    [newTemplate.description, handleInputChange]
  )

  // Memoize handle column value change
  const handleColumnValueChange = useCallback((columnName: string, value: string) => {
    setColumnValues(prev => ({
      ...prev,
      [columnName]: value
    }))
  }, [])

  // Memoize get select value
  const getSelectValue = useCallback(
    (column: TemplateColumn) => {
      return columnValues[column.name] || column.defaultValue || ''
    },
    [columnValues]
  )

  // Memoize columns data
  const columnsData = useMemo(
    () =>
      templateColumns.map(column => ({
        ...column,
        selectValue: getSelectValue(column)
      })),
    [templateColumns, getSelectValue]
  )

  // Memoize filtered columns
  const memoizedFilteredColumns = useMemo(() => {
    return templateColumns.filter(column => column.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [searchTerm, templateColumns])

  // Update filtered columns when memoizedFilteredColumns changes
  useEffect(() => {
    setFilteredColumns(memoizedFilteredColumns)
  }, [memoizedFilteredColumns])

  // Fetch product types
  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        setLoadingProductTypes(true)
        const response = await axiosInstance.get('/products/product-types')
        const types = Object.entries(response.data.result).map(([value, label]) => ({
          value,
          label: label as string
        }))
        setProductTypes(types)
      } catch (error) {
        console.error('Error fetching product types:', error)
        toast.error('Failed to load product types')
      } finally {
        setLoadingProductTypes(false)
      }
    }

    if (newTemplate.platform === 'amazon') {
      fetchProductTypes()
    }
  }, [newTemplate.platform])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Reset file input để có thể upload lại cùng một file
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }

    // Reset state trước khi đọc file mới
    setTemplateColumns([])
    setColumnValues({})
    setIsLoading(true)
    setUploadedFile(file)

    const reader = new FileReader()
    reader.onload = e => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })

        // Xử lý file dựa vào listing type
        switch (newTemplate.listing_type) {
          case 'single':
            handleSingleProductUpload(workbook)
            break
          case 'variant':
            handleVariantProductUpload(workbook)
            break
          case 'grouped':
            handleGroupedProductUpload(workbook)
            break
          default:
            toast.error('Invalid listing type')
            setIsLoading(false)
        }
      } catch (error) {
        console.error('Error reading file:', error)
        toast.error('Failed to read template file')
        setIsLoading(false)
      }
    }
    reader.readAsArrayBuffer(file)
  }

  const handleSingleProductUpload = (workbook: XLSX.WorkBook) => {
    try {
      // Tìm sheet có tên Template
      const templateSheet = workbook.Sheets['Template']
      if (!templateSheet) {
        toast.error('Template sheet not found. Please make sure the file has a sheet named "Template"')
        setIsLoading(false)
        return
      }

      // Đọc dữ liệu từ sheet Template với xử lý số và tiền tệ
      const jsonData = XLSX.utils.sheet_to_json(templateSheet, {
        header: 1,
        defval: '',
        blankrows: false,
        raw: false // Đảm bảo chuyển đổi số thành chuỗi
      })

      if (jsonData.length > 3) {
        const headers = jsonData[2] as string[]
        if (!headers[0] || headers[0].toLowerCase() !== 'feed_product_type') {
          toast.error('Invalid template format. First column in row 3 must be "feed_product_type"')
          setIsLoading(false)
          return
        }

        // Lấy dòng thứ 4 (index 3) cho giá trị mặc định
        const defaultValues = jsonData[3] as string[]

        // Tìm số cột tối đa từ tất cả các dòng
        const maxColumns = Math.max(...jsonData.map(row => (row as string[]).length))

        // Đảm bảo mảng headers có đủ số cột
        const paddedHeaders = [...headers]
        while (paddedHeaders.length < maxColumns) {
          paddedHeaders.push('')
        }

        // Đảm bảo mảng defaultValues có đủ số cột
        const paddedDefaultValues = [...defaultValues]
        while (paddedDefaultValues.length < maxColumns) {
          paddedDefaultValues.push('')
        }

        // Hàm xử lý giá trị mặc định
        const processDefaultValue = (value: any, header: string): string => {
          if (value === undefined || value === null) return ''

          // Chuyển đổi giá trị thành chuỗi
          const strValue = String(value).trim()

          // Xử lý các trường hợp đặc biệt
          if (strValue === '') return ''

          // Xử lý số
          if (!isNaN(Number(strValue))) {
            return strValue
          }

          // Xử lý tiền tệ (giả sử định dạng là $XX.XX hoặc XX.XX)
          if (strValue.startsWith('$') || /^\d+\.\d{2}$/.test(strValue)) {
            return strValue
          }

          return strValue
        }

        const columns = paddedHeaders.map((header, index) => {
          const defaultValue = processDefaultValue(paddedDefaultValues[index], header)
          return {
            name: header,
            required: true,
            description: header,
            defaultValue: defaultValue
          }
        })

        if (columns.length === 0) {
          toast.error('No columns found in the template file')
          setIsLoading(false)
          return
        }

        setTemplateColumns(columns)
        // Set default values from file
        const initialColumnValues = columns.reduce(
          (acc, col) => {
            acc[col.name] = col.defaultValue
            return acc
          },
          {} as Record<string, string>
        )
        setColumnValues(initialColumnValues)
        console.log('Khởi tạo columns từ file single:', columns)
        toast.success(`Successfully loaded ${columns.length} columns`)
      } else {
        toast.error('Invalid template file format. File must have at least 4 rows.')
      }
    } catch (error) {
      console.error('Error processing single product template:', error)
      toast.error('Failed to process single product template')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVariantProductUpload = (workbook: XLSX.WorkBook) => {
    try {
      console.log('handleVariantProductUpload')
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
        const dataRows = jsonData.slice(4)
        // Ép kiểu row về string[] để tránh lỗi linter
        const parentRows = dataRows.filter(
          row => Array.isArray(row) && String(row[parentChildIndex]).toLowerCase() === 'parent'
        ) as string[][]
        const childRowsData = dataRows.filter(
          row => Array.isArray(row) && String(row[parentChildIndex]).toLowerCase() === 'child'
        ) as string[][]

        // Lấy cột có dữ liệu ở parent đầu tiên
        let parentColIndexes: number[] = []
        if (parentRows.length > 0) {
          parentColIndexes = parentRows[0].map((val, idx) => (val !== '' ? idx : -1)).filter(idx => idx !== -1)
        }
        // Lấy cột có dữ liệu ở child đầu tiên
        let childColIndexes: number[] = []
        if (childRowsData.length > 0) {
          childColIndexes = childRowsData[0].map((val, idx) => (val !== '' ? idx : -1)).filter(idx => idx !== -1)
        }

        // Tạo columns cho parent
        const parentCols = parentColIndexes.map(idx => ({
          name: headers[idx],
          required: true,
          description: headers[idx],
          defaultValue: String(defaultValues[idx] || '').trim()
        }))
        // Tạo columns cho child
        const childCols = childColIndexes.map(idx => ({
          name: headers[idx],
          required: true,
          description: headers[idx],
          defaultValue: String(defaultValues[idx] || '').trim()
        }))
        console.log(parentCols, childCols)
        setTemplateColumns([...parentCols, ...childCols])
        const initialColumnValues = [...parentCols, ...childCols].reduce(
          (acc, col) => {
            acc[col.name] = col.defaultValue
            return acc
          },
          {} as Record<string, string>
        )
        setColumnValues(initialColumnValues)
        console.log('Khởi tạo columns từ file variant:', [...parentCols, ...childCols])
        toast.success(`Đã nhận ${parentRows.length} parent và ${childRowsData.length} child`)
      } else {
        toast.error('Invalid template file format. File must have at least 4 rows.')
      }
    } catch (error) {
      console.error('Error processing variant product template:', error)
      toast.error('Failed to process variant product template')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGroupedProductUpload = (workbook: XLSX.WorkBook) => {
    try {
      // Kiểm tra các sheet cần thiết
      const templateSheet = workbook.Sheets['Template']
      const groupSheet = workbook.Sheets['Group']

      if (!templateSheet || !groupSheet) {
        toast.error('Template must contain both "Template" and "Group" sheets')
        setIsLoading(false)
        return
      }

      // Xử lý sheet Template
      const templateData = XLSX.utils.sheet_to_json(templateSheet, {
        header: 1,
        defval: '',
        blankrows: false,
        raw: false
      })

      // Xử lý sheet Group
      const groupData = XLSX.utils.sheet_to_json(groupSheet, {
        header: 1,
        defval: '',
        blankrows: false,
        raw: false
      })

      if (templateData.length > 3 && groupData.length > 1) {
        const headers = templateData[2] as string[]
        const defaultValues = templateData[3] as string[]

        // Xử lý tương tự như single product nhưng thêm các cột group
        const columns = headers.map((header, index) => ({
          name: header,
          required: true,
          description: header,
          defaultValue: String(defaultValues[index] || '').trim()
        }))

        // Thêm các cột group
        const groupHeaders = groupData[0] as string[]
        groupHeaders.forEach(header => {
          if (!columns.find(col => col.name === header)) {
            columns.push({
              name: header,
              required: false,
              description: `Group: ${header}`,
              defaultValue: ''
            })
          }
        })

        setTemplateColumns(columns)
        const initialColumnValues = columns.reduce(
          (acc, col) => {
            acc[col.name] = col.defaultValue
            return acc
          },
          {} as Record<string, string>
        )
        setColumnValues(initialColumnValues)
        console.log('Khởi tạo columns từ file grouped:', columns)
        toast.success(`Successfully loaded ${columns.length} columns including group information`)
      } else {
        toast.error('Invalid group template format')
      }
    } catch (error) {
      console.error('Error processing grouped product template:', error)
      toast.error('Failed to process grouped product template')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTemplate = async () => {
    try {
      const columnsWithValues = templateColumns.map(col => ({
        ...col,
        defaultValue: columnValues[col.name] || col.defaultValue
      }))

      const formData = new FormData()
      formData.append('name', newTemplate.name)
      formData.append('description', newTemplate.description)
      formData.append('status', newTemplate.status)
      formData.append('platform', newTemplate.platform)
      formData.append('product_type', newTemplate.product_type)
      formData.append('listing_type', newTemplate.listing_type)

      if (newTemplate.platform === 'amazon') {
        formData.append('columns', JSON.stringify(columnsWithValues))
        if (uploadedFile) {
          formData.append('template_file', uploadedFile)
        }
      }

      let response
      if (editData?._id) {
        response = await axiosInstance.put(`/api/authenticated/config/listing-templates/${editData._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      } else {
        response = await axiosInstance.post('/api/authenticated/config/listing-templates/store', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      }

      if (response.data.success) {
        toast.success(editData?._id ? 'Template updated successfully' : 'Template created successfully')
        onSuccess()
      }
    } catch (error) {
      console.error('Error saving template:', error)
      toast.error(editData?._id ? 'Failed to update template' : 'Failed to create template')
    }
  }

  const handleClose = () => {
    // Reset all states to default values
    setNewTemplate({
      name: '',
      description: '',
      status: 'active',
      platform: 'amazon',
      product_type: '',
      listing_type: 'single',
      columns: []
    })
    setTemplateColumns([])
    setColumnValues({})
    setSearchTerm('')
    setFilteredColumns([])
    setUploadedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onClose()
  }

  // Xóa các useMemo không cần thiết
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTemplate(prev => ({ ...prev, name: e.target.value }))
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTemplate(prev => ({ ...prev, description: e.target.value }))
  }

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant='h6' sx={{ mb: 3 }}>
          {editData?._id ? 'Edit Template' : 'Create New Template'}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  label='Name'
                  value={newTemplate.name}
                  onChange={handleNameChange}
                  fullWidth
                  required
                  variant='outlined'
                  size='small'
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label='Description'
                  value={newTemplate.description}
                  onChange={handleDescriptionChange}
                  multiline
                  rows={4}
                  fullWidth
                  variant='outlined'
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <FormControl fullWidth required>
                  <Autocomplete
                    value={productTypes.find(type => type.value === newTemplate.product_type) || null}
                    onChange={(_, newValue) => {
                      setNewTemplate(prev => ({
                        ...prev,
                        product_type: newValue ? newValue.value : ''
                      }))
                    }}
                    options={productTypes}
                    getOptionLabel={option => option.label}
                    loading={loadingProductTypes}
                    disabled={loadingProductTypes}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label='Product Type'
                        required
                        size='small'
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {loadingProductTypes ? <CircularProgress color='inherit' size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </>
                          )
                        }}
                      />
                    )}
                    renderOption={(props, option) => (
                      <li {...props} key={option.value}>
                        <Typography>{option.label}</Typography>
                      </li>
                    )}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: '40px'
                      }
                    }}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Platform</InputLabel>
                  <Select
                    value={newTemplate.platform}
                    label='Platform'
                    size='small'
                    onChange={e =>
                      setNewTemplate(prev => ({
                        ...prev,
                        platform: e.target.value,
                        columns: []
                      }))
                    }
                  >
                    {platforms.map(platform => (
                      <MenuItem key={platform.value} value={platform.value}>
                        {platform.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Listing Type</InputLabel>
                  <Select
                    value={newTemplate.listing_type}
                    label='Listing Type'
                    size='small'
                    onChange={e =>
                      setNewTemplate(prev => ({
                        ...prev,
                        listing_type: e.target.value
                      }))
                    }
                  >
                    {listingTypes.map(type => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={newTemplate.status}
                    label='Status'
                    size='small'
                    onChange={e => setNewTemplate(prev => ({ ...prev, status: e.target.value }))}
                  >
                    <MenuItem value='active'>Active</MenuItem>
                    <MenuItem value='inactive'>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>

          {newTemplate.platform === 'amazon' ? (
            <>
              {newTemplate.listing_type === 'variant' && (
                <VariantListingSection
                  onColumnsChange={cols => setTemplateColumns(cols)}
                  onColumnValuesChange={setColumnValues}
                  columnValues={columnValues}
                />
              )}
              {newTemplate.listing_type === 'single' && (
                <SingleListingSection
                  onColumnsChange={cols => setTemplateColumns(cols)}
                  onColumnValuesChange={setColumnValues}
                  columnValues={columnValues}
                />
              )}
              {newTemplate.listing_type === 'grouped' && (
                <GroupedListingSection
                  onColumnsChange={cols => setTemplateColumns(cols)}
                  onColumnValuesChange={setColumnValues}
                  columnValues={columnValues}
                />
              )}
            </>
          ) : (
            <>
              <Typography variant='subtitle1' sx={{ mb: 2 }}>
                Amazon Template Columns
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
                  {isLoading ? 'Uploading...' : 'Upload Template File'}
                </Button>
                <Typography variant='caption' sx={{ ml: 2, color: 'text.secondary' }}>
                  Supported formats: XLSX, XLS, CSV, XLSM
                </Typography>
              </Box>

              {templateColumns.length > 0 && (
                <Box
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    overflow: 'hidden'
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderBottom: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
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
                  </Box>
                  <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
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
                        {filteredColumns.map((column, index) => (
                          <TableRow key={column.name}>
                            <TableCell
                              sx={{
                                width: { xs: '50px', sm: '60px', md: '80px' },
                                minWidth: { xs: '50px', sm: '60px', md: '80px' },
                                maxWidth: { xs: '50px', sm: '60px', md: '80px' }
                              }}
                            >
                              {index + 1}
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
                              <DefaultValueSelect
                                column={column}
                                value={getSelectValue(column)}
                                onChange={value => handleColumnValueChange(column.name, value)}
                                defaultValue={column.defaultValue || ''}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant='outlined' onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant='contained'
              onClick={handleAddTemplate}
              disabled={!newTemplate.name || (newTemplate.platform === 'amazon' && templateColumns.length === 0)}
            >
              {editData?._id ? 'Update Template' : 'Create Template'}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
