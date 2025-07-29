'use client'

import { useCallback, useEffect, useRef, useState, MutableRefObject, memo, useLayoutEffect } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'
import type { TextFieldProps } from '@mui/material/TextField'
import Select from '@mui/material/Select'
import type { SelectChangeEvent } from '@mui/material/Select/SelectInput'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { toast } from 'react-toastify'
import CustomTextField from '@core/components/mui/TextField'
import { DebouncedInput } from '@/components/DebouncedInput'
// import UserDataProvider from '@/data/cookies/user_client'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Switch from '@mui/material/Switch'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useSession } from 'next-auth/react'
import Checkbox from '@mui/material/Checkbox'
import type { MouseEvent } from 'react'
import Menu from '@mui/material/Menu'
import { useKeenSlider } from 'keen-slider/react'
import { DialogAddTemplate } from '@/app/[lang]/(dashboard)/(private)/apps/ecommerce/products/listing/dialogs'
import { DialogListingTemplate } from './dialogs/listing_dialog'
import axiosInstance from '@/libs/axios'
import { DialogShowFileListings } from './dialogs/show_file_listing'
import { FileListings } from './interfaces/template_interface'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import PaginationControls from '@/components/PaginationControls'
import { DeleteDialog } from './components/DeleteDialog'
import Lightbox from '@/components/Lightbox'
import { AIConfigDialog, Config } from './components/AIConfigDialog'
import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Popover from '@mui/material/Popover'
import { useRouter } from 'next/navigation'
import Fade from '@mui/material/Fade'
import Skeleton from '@mui/material/Skeleton'
import DOMPurify from 'dompurify'

interface Listing {
  _id: string
  shop_id: string
  title: string
  bullet_points: string[]
  description: string
  main_image: string
  images: string[]
  status: string
  created_at: string
  updated_at: string
  shop: {
    _id: string
    name: string
  }
  product_type_id: string
  sku: string
  parent_id?: string
  children_ids?: string[]
}

interface dataUser {
  _id: string
  email: string
  name: string
  password: string
  role: string
  role_id: string
  status: string
  team: string
  team_id: string
  token_admin: string
  token_user: string
}

interface QueryParam {
  index: string
  value: string
}

interface SortParam {
  index: string
  value: string
}

type ProductTypeMap = {
  [key: string]: string
}

interface Prompting {
  id: string
  name: string
  description: string
}

interface ExportFileResponse {
  success: boolean
  data: {
    file_url: string
    filename: string
    file_size: string
    total_records: number
    expires_at: string
    download_limit: number
  }
  message: string
  file_url: string
}

const SwiperThumbnails = ({ images }: { images: string[] | null }) => {
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'free',
    slides: {
      perView: 3,
      spacing: 0
    }
  })
  return (
    <div ref={ref} className='flex keen-slider'>
      {images ? (
        images.map((imgSrc, index) => (
        <div key={index} className='keen-slider__slide'>
          <img src={imgSrc} alt={`swiper ${index + 1}`} className='items-center' style={{ maxWidth: '250px' }} />
        </div>
        ))
      ) : (
        <img src='' alt='swiper 21' />
      )}
    </div>
  )
}

export default function ListingBlock() {
  const [listings, setListings] = useState<Listing[]>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [totalItems, setTotalItems] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedListings, setSelectedListings] = useState<string[]>([])
  const [openListingDetail, setOpenListingDetail] = useState<boolean>(false)
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null)
  const { data: session } = useSession()
  const [productTypes, setProductType] = useState<ProductTypeMap>({})
  const [openAddProduct, setOpenAddProduct] = useState<boolean>(false)
  const [parentChildFilter, setParentChildFilter] = useState<'all' | 'parent' | 'child'>('all')
  const [parentChildMenuAnchor, setParentChildMenuAnchor] = useState<null | HTMLElement>(null)
  const handleClickOpen = () => setOpenAddProduct(true)
  const handleClose = () => setOpenAddProduct(false)
  const refFormAddProduct = useRef(null)
  const [rewriteTitle, setRewriteTitle] = useState(true)
  const [pendingLoading, setPendingLoading] = useState(false)
  const [rewriteDescription, setRewriteDescription] = useState(true)
  const [openDialogAddTemplate, setOpenDialogAddTemplate] = useState<boolean>(false)
  const [openDialogListingTemplate, setOpenDialogListingTemplate] = useState<boolean>(false)
  const [template, setTemplate] = useState(null)
  const [shop, setShop] = useState(null)
  const [openDialogShowFileListing, setOpenDialogShowFileListing] = useState<boolean>(false)
  const [fileListings, setFileListings] = useState<FileListings[]>([])
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [listingToDelete, setListingToDelete] = useState<string | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [editingField, setEditingField] = useState<{
    id: string
    field: 'title' | 'bullet_points' | 'description'
  } | null>(null)
  const [editValues, setEditValues] = useState<{
    title: string
    bullet_points: string[]
    description: string
  }>({
    title: '',
    bullet_points: [],
    description: ''
  })
  const [originalValues, setOriginalValues] = useState<{
    title: string
    bullet_points: string[]
    description: string
  }>({
    title: '',
    bullet_points: [],
    description: ''
  })
  const [openLightBox, setOpenLightBox] = useState(false)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [openAIConfig, setOpenAIConfig] = useState(false)
  const [selectedAIConfig, setSelectedAIConfig] = useState<Config | null>(null)
  const [promptings, setPromptings] = useState<Prompting[]>([])
  const [selectedPrompting, setSelectedPrompting] = useState<Prompting | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [statusMenuAnchor, setStatusMenuAnchor] = useState<null | HTMLElement>(null)
  const [openTemplateModal, setOpenTemplateModal] = useState(false)
  const [shopFilter, setShopFilter] = useState<string>('all')
  const [productTypeFilter, setProductTypeFilter] = useState<string>('all')
  const [shopMenuAnchor, setShopMenuAnchor] = useState<null | HTMLElement>(null)
  const [productTypeMenuAnchor, setProductTypeMenuAnchor] = useState<null | HTMLElement>(null)
  const [shops, setShops] = useState<{ _id: string; name: string }[]>([])
  const [createFileAnchorEl, setCreateFileAnchorEl] = useState<HTMLElement | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [templates, setTemplates] = useState<any[]>([])
  const router = useRouter()
  const [recentlyCreatedFile, setRecentlyCreatedFile] = useState<string | null>(null)
  const [loadingDialogOpen, setLoadingDialogOpen] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateKey, setUpdateKey] = useState(0)
  const [openBulletPointsDialog, setOpenBulletPointsDialog] = useState(false)
  const [editingBulletPoints, setEditingBulletPoints] = useState<string[]>([])
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [editingContent, setEditingContent] = useState({
    title: '',
    description: ''
  })
  const [openAddChildDialog, setOpenAddChildDialog] = useState(false)
  const [selectedParentListing, setSelectedParentListing] = useState<Listing | null>(null)
  const [availableChildListings, setAvailableChildListings] = useState<Listing[]>([])
  const [selectedChildListings, setSelectedChildListings] = useState<string[]>([])
  const [existingChildListings, setExistingChildListings] = useState<Listing[]>([])
  const [existingChildrenPage, setExistingChildrenPage] = useState(1)
  const [availableChildrenPage, setAvailableChildrenPage] = useState(1)
  const [existingChildrenLimit, setExistingChildrenLimit] = useState(5)
  const [availableChildrenLimit, setAvailableChildrenLimit] = useState(5)
  const [availableSearchTerm, setAvailableSearchTerm] = useState('')
  const [filteredAvailableListings, setFilteredAvailableListings] = useState<Listing[]>([])
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  // Thêm useEffect để debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(availableSearchTerm)
    }, 300) // 300ms delay

    return () => clearTimeout(timer)
  }, [availableSearchTerm])

  // Cập nhật useEffect filter để sử dụng debouncedSearchTerm
  useEffect(() => {
    if (debouncedSearchTerm.trim() === '') {
      setFilteredAvailableListings(availableChildListings)
    } else {
      const searchTerm = debouncedSearchTerm.toLowerCase()
      const filtered = availableChildListings.filter(listing => {
        const title = listing?.title?.toLowerCase() || ''
        const sku = listing?.sku?.toLowerCase() || ''
        const productType = (productTypes[listing?.product_type_id] || '').toLowerCase()

        return title.includes(searchTerm) || sku.includes(searchTerm) || productType.includes(searchTerm)
      })
      setFilteredAvailableListings(filtered)
    }
  }, [debouncedSearchTerm, availableChildListings, productTypes])

  const fetchListings = useCallback(
    async (page = 1, limit = itemsPerPage, query: QueryParam | false = false, sort: SortParam | false = false) => {
    if (!session?.user?.id) return

    try {
      setIsLoading(true)
      const params = new URLSearchParams({
        limit: limit.toString(),
        page: page.toString()
      })

      // Thêm các tham số filter
      if (shopFilter !== 'all') {
        params.append('shop_id', shopFilter)
      }
      if (productTypeFilter !== 'all') {
        params.append('product_type_id', productTypeFilter)
      }
      if (statusFilter !== 'all') {
        params.append('status', statusFilter)
      }
        if (parentChildFilter !== 'all') {
          params.append('parent_child', parentChildFilter)
      }
      if (globalFilter) {
        params.append('search', globalFilter)
      }

      if (query) {
        params.append(query.index, query.value)
      }

      if (sort) {
        params.append('sort', sort.index)
        params.append('sort-by', sort.value)
      }

      const response = await axiosInstance.get(`/api/authenticated/listing/list?${params.toString()}`)
      const { data } = response.data

        // Lọc danh sách dựa trên parentChildFilter
        let filteredListings = data.listings
        if (parentChildFilter === 'parent') {
          filteredListings = data.listings.filter(
            (listing: Listing) => listing.children_ids && listing.children_ids.length > 0 && !listing.parent_id
          )
        } else if (parentChildFilter === 'child') {
          filteredListings = data.listings.filter((listing: Listing) => listing.parent_id && !listing.children_ids)
        }

        setListings(filteredListings)
      setItemsPerPage(data.pagination.limit)
      setCurrentPage(data.pagination.page)
      setTotalPages(data.pagination.total_pages)
      setTotalItems(data.pagination.total)
    } catch (error) {
      console.error('Error fetching listings:', error)
      toast.error('Failed to fetch listings')
    } finally {
      setIsLoading(false)
    }
    },
    [itemsPerPage, session, shopFilter, productTypeFilter, statusFilter, parentChildFilter, globalFilter]
  )

  const loadProductType = async () => {
    try {
      const response = await axiosInstance.get('/products/product-types')
      const result = response.data.result
      console.log('result', result)
      const typeMap: ProductTypeMap = {}
      Object.entries(result).forEach(([key, value]) => {
        typeMap[key] = value as string
      })
      console.log('typeMap', typeMap)
      setProductType(typeMap)
    } catch (error) {
      console.error('Error loading product types:', error)
      toast.error('Failed to load product types')
    }
  }

  useEffect(() => {
    if (session?.user?.id) {
      fetchListings(1, itemsPerPage)
      loadProductType()
    }
  }, [session, fetchListings])

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    fetchListings(value, itemsPerPage)
  }

  const handleLimitChange = (event: SelectChangeEvent<number>) => {
    const newLimit = event.target.value as number
    setItemsPerPage(newLimit)
    fetchListings(1, newLimit)
  }

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    fetchListings(1, itemsPerPage)
  }

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>, listingId: string) => {
    setSelectedListings(prev => (e.target.checked ? [...prev, listingId] : prev.filter(id => id !== listingId)))
  }

  const handleCheckboxAll = () => {
    setSelectedListings(prev => (prev.length === listings.length ? [] : listings.map(item => item._id)))
  }

  const handleOpenDetail = (listing: Listing) => {
    setSelectedListing(listing)
    setOpenListingDetail(true)
  }

  const handleOpenFileListing = async () => {
    if (selectedListings.length === 0) {
      toast.warning('Please select at least one listing')
      return
    }

    if (shopFilter === 'all') {
      toast.warning('Please select a shop first')
      return
    }

    if (productTypeFilter === 'all') {
      toast.warning('Please select a product type first')
      return
    }

    try {
      const response = await axiosInstance.get(
        `/api/authenticated/config/listing-templates/get-by-product-type?product_type_id=${productTypeFilter}`
      )
      setTemplates(response.data.data)
      setOpenTemplateModal(true)
    } catch (error) {
      console.error('Error fetching templates:', error)
      toast.error('Failed to fetch templates')
    }
  }

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPendingLoading(true)
    const form = refFormAddProduct.current
    if (!form) return
    const formData = new FormData(form)
    formData.append('rewrite_title', rewriteTitle ? 'on' : 'off')
    formData.append('rewrite_description', rewriteDescription ? 'on' : 'off')
    formData.append('type_request', 'create_product')
    formData.append('seller_id', session?.user?.id || '')
    formData.append('product_type_id', formData.get('product_type') || '')
    const url = process.env.NEXT_PUBLIC_API_URL + `/api/authenticated/products/create`
    const post = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + session?.user.accessToken
      },
      body: formData
    })
    const response = await post.json()
    const result = response.result
    setPendingLoading(false)
    if (result._id) {
      toast.success('Create product id ' + result._id + ' success')
      fetchListings(1, itemsPerPage, false, false)
      setOpenAddProduct(false)
    } else {
      toast.error('Create product error ' + response)
    }
  }

  const handleDeleteClick = (listingId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setListingToDelete(listingId)
    setOpenDeleteDialog(true)
  }

  const handleDeleteConfirm = async () => {
    if (!listingToDelete) return

    try {
      setDeleteLoading(true)
      await axiosInstance.post('/api/authenticated/listing/delete', {
        listing_ids: [listingToDelete]
      })
      toast.success('Successfully deleted listing')
      fetchListings(currentPage, itemsPerPage)
    } catch (error) {
      console.error('Error deleting listing:', error)
      toast.error('Failed to delete listing')
    } finally {
      setDeleteLoading(false)
      setOpenDeleteDialog(false)
      setListingToDelete(null)
    }
  }

  const handleEdit = (listing: Listing, field: 'title' | 'bullet_points' | 'description') => {
    if (field === 'bullet_points') {
      setEditingField({
        id: listing._id,
        field
      })
      setEditingBulletPoints(listing.bullet_points || Array(5).fill(''))
      setOpenBulletPointsDialog(true)
    } else {
      setEditingField({
        id: listing._id,
        field
      })
      setEditingContent({
        title: listing.title,
        description: listing.description
      })
      setOpenEditDialog(true)
    }
  }

  const handleEditChange = useCallback((field: string, value: string | string[]) => {
    setEditValues(prev => ({
      ...prev,
      [field]: field === 'bullet_points' ? (value as string).split('\n') : value
    }))
  }, [])

  const hasChanges = () => {
    return (
      editValues.title !== originalValues.title ||
      JSON.stringify(editValues.bullet_points) !== JSON.stringify(originalValues.bullet_points) ||
      editValues.description !== originalValues.description
    )
  }

  const handleEditSave = useCallback(
    async (listingId: string) => {
    if (!hasChanges()) {
        setEditingField(null)
        return
    }

    try {
      const response = await axiosInstance.post('/api/authenticated/listing/update', {
        listing_id: listingId,
        ...editValues
        })

      setListings(prevListings =>
          prevListings.map(listing => (listing._id === listingId ? { ...listing, ...editValues } : listing))
        )

        toast.success('Listing updated successfully')
    } catch (error) {
        console.error('Error updating listing:', error)
        toast.error('Failed to update listing')
    } finally {
        setEditingField(null)
    }
    },
    [editValues, hasChanges]
  )

  const handleEditCancel = () => {
    setEditingField(null)
    setEditValues(originalValues)
  }

  const handleImageClick = (images: string[], index: number) => {
    setSelectedImages(images)
    setSelectedImageIndex(index)
    setOpenLightBox(true)
  }

  const handleAIClick = (e: React.MouseEvent, field: 'title' | 'bullet_points' | 'description') => {
    e.preventDefault()
    e.stopPropagation()
    console.log(selectedAIConfig)
    if (!selectedAIConfig) {
      toast.warning('Please select an AI configuration first')
      return
    }

    handleAIGenerate(field)
  }

  const handleAIGenerate = async (field: 'title' | 'bullet_points' | 'description') => {
    setPendingLoading(true)
    setIsUpdating(true)

    if (!selectedAIConfig) {
      toast.warning('Please select an AI configuration first')
      setPendingLoading(false)
      setIsUpdating(false)
      return
    }

    try {
      const items = [
        {
        title: editValues.title,
        product_description: selectedAIConfig.base_description
        }
      ]
      const aisUrl = process.env.NEXT_PUBLIC_AIS_URL || 'https://ais.teamexp.net'
      const response = await axiosInstance.post(aisUrl + '/api/ecom/batch/process-batch', items)

      if (response.data.status === 'success') {
        const generatedItems = response.data.results
        if (generatedItems && generatedItems.length > 0) {
          // Cập nhật trực tiếp giá trị trong state thay vì gọi handleUpdateFromGenerated
          const result = generatedItems[0]
          if (field === 'title') {
            setEditingContent(prev => ({
              ...prev,
              title: result.title || prev.title
            }))
          } else if (field === 'description') {
            setEditingContent(prev => ({
              ...prev,
              description: result.description || prev.description
            }))
          } else if (field === 'bullet_points') {
            setEditingBulletPoints(result.bullet_points || Array(5).fill(''))
          }
          toast.success('Generated content successfully')
      } else {
          toast.error('No content generated')
        }
      } else {
        toast.error(response.data.message || 'Failed to generate content')
      }
    } catch (err) {
      console.log(err)
      toast.error('Có lỗi xảy ra khi generate')
    } finally {
      setPendingLoading(false)
      // Reset animation state sau 500ms
      setTimeout(() => {
        setIsUpdating(false)
      }, 500)
    }
  }

  const handleUpdateFromGenerated = async (generatedItems: any[]) => {
    try {
      // Chuẩn bị dữ liệu để gửi lên server
      const itemsToUpdate = generatedItems.map(item => ({
        listing_id: item._id,
        title: item.title,
        description: item.description,
        bullet_points: item.bullet_points
      }))

      // Gọi API để cập nhật listings
      const response = await axiosInstance.post('/api/authenticated/listing/update-from-generated', {
        generated_items: itemsToUpdate
      })

      if (response.data.success) {
        // Cập nhật lại danh sách listings
        await fetchListings(currentPage, itemsPerPage)
        toast.success('Successfully updated listings')
      } else {
        toast.error(response.data.message || 'Failed to update listings')
      }
    } catch (error) {
      console.error('Error updating listings:', error)
      toast.error('Failed to update listings')
    }
  }

  const handleOpenAIConfig = () => {
    setOpenAIConfig(true)
  }

  const handleCloseAIConfig = () => {
    setOpenAIConfig(false)
  }

  const handleApplyAIConfig = (config: Config | null) => {
    setSelectedAIConfig(config)
    setOpenAIConfig(false)

    // Lưu config vào localStorage
    if (config) {
      localStorage.setItem('selectedAIConfig', JSON.stringify(config))
    } else {
      localStorage.removeItem('selectedAIConfig')
    }
  }

  // Load config từ localStorage khi component mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('selectedAIConfig')
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig)
        setSelectedAIConfig(parsedConfig)
      } catch (error) {
        console.error('Error parsing saved AI config:', error)
        localStorage.removeItem('selectedAIConfig')
      }
    }
  }, [])

  const handleNewAIConfig = () => {
    // TODO: Xử lý tạo mới prompting
  }

  const handleSelectPrompting = (prompting: Prompting) => {
    setSelectedPrompting(prompting)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    setStatusMenuAnchor(null)
    fetchListings(1, itemsPerPage)
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'new':
        return 'info'
      case 'pushed':
        return 'success'
      case 'trashed':
        return 'error'
      default:
        return 'default'
    }
  }

  const EditableTextField = memo(
    ({
    value: initialValue,
    onChange,
    onBlur,
    field,
    listingId,
    onAIClick
  }: {
      value: string
      onChange: (value: string) => void
      onBlur: () => void
      field: 'title' | 'bullet_points' | 'description'
      listingId: string
      onAIClick: (e: React.MouseEvent, field: 'title' | 'bullet_points' | 'description') => void
  }) => {
      const inputRef = useRef<HTMLInputElement>(null)
      const hasFocusedRef = useRef(false)
      const [localValue, setLocalValue] = useState(initialValue)
      const [mounted, setMounted] = useState(false)
      const debounceTimeoutRef = useRef<NodeJS.Timeout>()
      const isUpdatingRef = useRef(false)
      const cursorPositionRef = useRef<number | null>(null)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
      }, [])

    useEffect(() => {
      if (!hasFocusedRef.current && inputRef.current) {
          inputRef.current.focus()
          const length = inputRef.current.value.length
          inputRef.current.setSelectionRange(length, length)
          hasFocusedRef.current = true
        }
      }, [])

    useEffect(() => {
      if (!inputRef.current?.matches(':focus')) {
          setLocalValue(initialValue)
        }
      }, [initialValue])

      const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = e.target.value
          const cursorPosition = e.target.selectionStart
          cursorPositionRef.current = cursorPosition

          setLocalValue(newValue)
          onChange(newValue)
        },
        [onChange]
      )

    useEffect(() => {
      if (inputRef.current && cursorPositionRef.current !== null) {
          inputRef.current.focus()
          inputRef.current.setSelectionRange(cursorPositionRef.current, cursorPositionRef.current)
      }
      }, [localValue])

    const handleBlur = useCallback(() => {
      if (localValue !== initialValue) {
          onChange(localValue)
        }
        onBlur()
        cursorPositionRef.current = null
      }, [localValue, initialValue, onChange, onBlur])

    if (!mounted) {
        return null
    }

    if (field === 'title') {
      return (
        <Box sx={{ position: 'relative', width: '100%' }}>
          <CustomTextField
            inputRef={inputRef}
            value={localValue}
            onChange={handleChange}
            onBlur={handleBlur}
              size='small'
            multiline
            minRows={2}
            maxRows={4}
            fullWidth
            sx={{
              pr: 6,
              transition: 'all 0.3s ease-in-out',
              transform: isUpdating ? 'scale(0.95)' : 'scale(1)',
              opacity: isUpdating ? 0.5 : 1,
              '& .MuiInputBase-input': {
                fontSize: '0.875rem',
                lineHeight: 1.5,
                padding: '8px 12px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }
            }}
          />
          <IconButton
              size='small'
              onMouseDown={e => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onClick={e => onAIClick(e, field)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.2s ease-in-out',
              boxShadow: 2,
              zIndex: 1
            }}
          >
            <i className='tabler-robot' />
          </IconButton>
        </Box>
        )
    }

    if (field === 'description') {
      return (
        <Box sx={{ position: 'relative', width: '100%' }}>
          <CustomTextField
            inputRef={inputRef}
            value={localValue}
            onChange={handleChange}
            onBlur={handleBlur}
              size='small'
            multiline
            minRows={3}
            fullWidth
            sx={{
              pr: 6,
              transition: 'all 0.3s ease-in-out',
              transform: isUpdating ? 'scale(0.95)' : 'scale(1)',
              opacity: isUpdating ? 0.5 : 1,
              '& .MuiInputBase-input': {
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                lineHeight: 1.5,
                padding: '8px 12px'
              }
            }}
          />
          <Box
            sx={{
              mt: 2,
              p: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              bgcolor: 'background.paper',
              '& *': {
                maxWidth: '100%'
              }
            }}
          >
              <Typography variant='caption' color='text.secondary' sx={{ mb: 1, display: 'block' }}>
              Preview:
            </Typography>
            <Box
              sx={{
                '& img': {
                  maxWidth: '100%',
                  height: 'auto'
                },
                '& p': {
                  margin: '0.5em 0'
                },
                '& ul, & ol': {
                  paddingLeft: '1.5em'
                }
              }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(localValue, {
                    ALLOWED_TAGS: [
                      'p',
                      'b',
                      'i',
                      'em',
                      'strong',
                      'a',
                      'ul',
                      'ol',
                      'li',
                      'img',
                      'br',
                      'h1',
                      'h2',
                      'h3',
                      'h4',
                      'h5',
                      'h6'
                    ],
                  ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'style']
                })
              }}
            />
          </Box>
          <IconButton
              size='small'
              onMouseDown={e => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onClick={e => onAIClick(e, field)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.2s ease-in-out',
              boxShadow: 2,
              zIndex: 1
            }}
          >
            <i className='tabler-robot' />
          </IconButton>
        </Box>
        )
    }

    return (
      <Box sx={{ position: 'relative', width: '100%' }}>
        <CustomTextField
          inputRef={inputRef}
          value={localValue}
          onChange={handleChange}
          onBlur={handleBlur}
            size='small'
          multiline
          minRows={2}
          maxRows={4}
          fullWidth
          sx={{
            pr: 6,
            transition: 'all 0.3s ease-in-out',
            transform: isUpdating ? 'scale(0.95)' : 'scale(1)',
            opacity: isUpdating ? 0.5 : 1,
            '& .MuiInputBase-input': {
              fontSize: '0.875rem',
              lineHeight: 1.5,
              padding: '8px 12px'
            }
          }}
        />
        <IconButton
            size='small'
            onMouseDown={e => {
              e.preventDefault()
              e.stopPropagation()
            }}
            onClick={e => onAIClick(e, field)}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'primary.dark',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.2s ease-in-out',
            boxShadow: 2,
            zIndex: 1
          }}
        >
          <i className='tabler-robot' />
        </IconButton>
      </Box>
      )
    },
    (prevProps, nextProps) => {
      return prevProps.value === nextProps.value
    }
  )

  const handleBulkRewrite = async () => {
    if (!selectedAIConfig) {
      toast.warning('Please select an AI configuration first')
      return
    }

    if (selectedListings.length === 0) {
      toast.warning('Please select at least one listing')
      return
    }

    try {
      setPendingLoading(true)
      setLoadingMessage('Đang xử lý...')
      setLoadingDialogOpen(true)

      // Lấy danh sách các sản phẩm được chọn
      const selectedItems = listings.filter(listing => selectedListings.includes(listing._id))

      // Tạo danh sách object cần generate
      const items = selectedItems.map(item => ({
        _id: item._id,
        title: item.title,
        product_description: selectedAIConfig.base_description
      }))
      const aisUrl = process.env.NEXT_PUBLIC_AIS_URL || 'https://ais.teamexp.net'
      const response = await axiosInstance.post(aisUrl + '/api/ecom/batch/process-batch', items)

      if (response.data.status === 'success') {
        const generatedItems = response.data.results
        if (generatedItems && generatedItems.length > 0) {
          // Cập nhật lại danh sách listings với dữ liệu mới
          handleUpdateFromGenerated(generatedItems)
        } else {
          toast.error('No content generated')
        }
      } else {
        toast.error(response.data.message || 'Failed to generate content')
      }
    } catch (error) {
      console.error('Error generating AI content:', error)
      toast.error('Failed to generate content')
    } finally {
      setPendingLoading(false)
      setLoadingDialogOpen(false)
    }
  }

  // Fetch shops
  const fetchShops = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/api/authenticated/shops/my')
      setShops(response.data.data)
    } catch (error) {
      console.error('Error fetching shops:', error)
      toast.error('Failed to fetch shops')
    }
  }, [])

  useEffect(() => {
    if (session?.user?.id) {
      fetchShops()
    }
  }, [session, fetchShops])

  const handleShopFilter = (shopId: string) => {
    setShopFilter(shopId)
    setShopMenuAnchor(null)
    if (shopId === 'all') {
      fetchListings(1, itemsPerPage)
    } else {
      fetchListings(1, itemsPerPage, { index: 'shop_id', value: shopId })
    }
  }

  const handleProductTypeFilter = (typeId: string) => {
    setProductTypeFilter(typeId)
    setProductTypeMenuAnchor(null)
    if (typeId === 'all') {
      fetchListings(1, itemsPerPage)
    } else {
      fetchListings(1, itemsPerPage, { index: 'product_type_id', value: typeId })
    }
  }

  const handleCreateFilePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setCreateFileAnchorEl(event.currentTarget)
  }

  const handleCreateFilePopoverClose = () => {
    setCreateFileAnchorEl(null)
  }

  const openCreateFilePopover = Boolean(createFileAnchorEl)

  const handleCreateFile = async () => {
    if (!selectedTemplate) {
      toast.warning('Please select a template')
      return
    }

    if (selectedListings.length === 0) {
      toast.warning('Please select at least one listing')
      return
    }

    try {
      const response = await axiosInstance
        .post<ExportFileResponse>('/api/authenticated/listing/create_file_listing', {
        shop_id: shopFilter,
        template_id: selectedTemplate,
        listing_ids: selectedListings
        })
        .then(response => {
        console.log(response.data)
        const file_url = response.data.file_url

        // Save file information
        console.log(file_url)
          setRecentlyCreatedFile(file_url)

        // Show success message with details
        toast.success(
          <div>
            <p>File created successfully!</p>
          </div>
          )
        })
        .catch(e => {
          toast.error('Failed to create file: ' + e.response.data.message)
        return e.response.data
        })
    } catch (error: any) {
      console.error('Error creating file:', error)

      // Handle specific error types
      if (error.response) {
        switch (error.response.status) {
          case 400:
            toast.error('Invalid data. Please check your information.')
            break
          case 401:
            toast.error('Session expired. Please login again.')
            break
          case 403:
            toast.error('You do not have permission to perform this action.')
            break
          case 404:
            toast.error('Template or listings not found.')
            break
          case 413:
            toast.error('Too much data. Please reduce the number of listings.')
            break
          case 500:
            toast.error('System error. Please try again later.')
            break
          default:
            toast.error('An error occurred. Please try again.')
        }
      } else {
        toast.error('Cannot connect to server. Please check your network connection.')
      }
    }
  }

  const handleCreateTemplate = () => {
    setOpenTemplateModal(false)
    router.push('/apps/listings/templates')
  }

  const handleEditBulletPoints = (listing: Listing) => {
    setEditingField({
      id: listing._id,
      field: 'bullet_points'
    })
    setEditingBulletPoints(listing.bullet_points || Array(5).fill(''))
    setOpenBulletPointsDialog(true)
  }

  const handleSaveBulletPoints = async () => {
    if (!editingField?.id) return

    try {
      const response = await axiosInstance.post('/api/authenticated/listing/update', {
        listing_id: editingField.id,
        bullet_points: editingBulletPoints
      })

      setListings(prevListings =>
        prevListings.map(listing =>
          listing._id === editingField.id ? { ...listing, bullet_points: editingBulletPoints } : listing
        )
      )

      toast.success('Bullet points updated successfully')
      setOpenBulletPointsDialog(false)
      setEditingField(null)
    } catch (error) {
      console.error('Error updating bullet points:', error)
      toast.error('Failed to update bullet points')
    }
  }

  const handleGenerateBulletPoints = async () => {
    if (!editingField?.id || !selectedAIConfig) {
      toast.warning('Please select an AI configuration first')
      return
    }

    try {
      setPendingLoading(true)
      setIsUpdating(true)

      // Lấy listing hiện tại
      const currentListing = listings.find(l => l._id === editingField.id)
      if (!currentListing) {
        toast.error('Listing not found')
        return
      }

      const items = [
        {
        title: currentListing.title,
        product_description: selectedAIConfig.base_description
        }
      ]

      const response = await axiosInstance.post(
        process.env.NEXT_PUBLIC_AIS_URL + '/api/ecom/batch/process-batch',
        items
      )

      if (response.data.status === 'success' && response.data.results.length > 0) {
        const result = response.data.results[0]
        setEditingBulletPoints(result.bullet_points || Array(5).fill(''))
        toast.success('Generated bullet points successfully')
      } else {
        toast.error('No content generated')
      }
    } catch (err) {
      console.log(err)
      toast.error('Có lỗi xảy ra khi generate')
    } finally {
      setPendingLoading(false)
      setTimeout(() => {
        setIsUpdating(false)
      }, 500)
    }
  }

  const handleSaveEdit = async () => {
    if (!editingField?.id) return

    try {
      const response = await axiosInstance.post('/api/authenticated/listing/update', {
        listing_id: editingField.id,
        ...editingContent
      })

      setListings(prevListings =>
        prevListings.map(listing => (listing._id === editingField.id ? { ...listing, ...editingContent } : listing))
      )

      toast.success('Updated successfully')
      setOpenEditDialog(false)
      setEditingField(null)
    } catch (error) {
      console.error('Error updating:', error)
      toast.error('Failed to update')
    }
  }

  const handleGenerateContent = async () => {
    if (!editingField?.id || !selectedAIConfig) {
      toast.warning('Please select an AI configuration first')
      return
    }

    try {
      setPendingLoading(true)
      setIsUpdating(true)

      const currentListing = listings.find(l => l._id === editingField.id)
      if (!currentListing) {
        toast.error('Listing not found')
        return
      }

      const items = [
        {
        title: currentListing.title,
        product_description: selectedAIConfig.base_description
        }
      ]

      const response = await axiosInstance.post(
        process.env.NEXT_PUBLIC_AIS_URL + '/api/ecom/batch/process-batch',
        items
      )

      if (response.data.status === 'success' && response.data.results.length > 0) {
        const result = response.data.results[0]
        setEditingContent(prev => ({
          ...prev,
          title: result.title || prev.title,
          description: result.description || prev.description
        }))
        toast.success('Generated content successfully')
      } else {
        toast.error('No content generated')
      }
    } catch (err) {
      console.log(err)
      toast.error('Có lỗi xảy ra khi generate')
    } finally {
      setPendingLoading(false)
      setTimeout(() => {
        setIsUpdating(false)
      }, 500)
    }
  }

  const handleParentChildFilter = (filter: 'all' | 'parent' | 'child') => {
    setParentChildFilter(filter)
    setParentChildMenuAnchor(null)
    fetchListings(1, itemsPerPage)
  }

  // Cập nhật handleOpenAddChildDialog để reset cả search term và debounced search term
  const handleOpenAddChildDialog = async (listing: Listing) => {
    try {
      setPendingLoading(true)
      setSelectedParentListing(listing)
      setAvailableSearchTerm('') // Reset search term
      setDebouncedSearchTerm('') // Reset debounced search term

      // Gọi API để lấy danh sách sản phẩm có thể làm con
      const response = await axiosInstance.get(`/api/authenticated/listing/available-children`, {
        params: {
          parent_id: listing._id,
          product_type_id: listing.product_type_id,
          page: 1,
          limit: 5
        }
      })

      if (response.data.success) {
        setAvailableChildListings(response.data.data.available_children.items)
        setExistingChildListings(response.data.data.existing_children.items)
      } else {
        toast.error(response.data.message || 'Failed to fetch available child products')
      }
    } catch (error) {
      console.error('Error fetching available child products:', error)
      toast.error('Failed to fetch available child products')
    } finally {
      setPendingLoading(false)
      setSelectedChildListings([])
      setOpenAddChildDialog(true)
    }
  }

  const handleExistingChildrenPageChange = async (page: number) => {
    try {
      setPendingLoading(true)
      const response = await axiosInstance.get(`/api/authenticated/listing/available-children`, {
        params: {
          parent_id: selectedParentListing?._id,
          product_type_id: selectedParentListing?.product_type_id,
          page: page,
          limit: existingChildrenLimit
        }
      })

      if (response.data.success) {
        setExistingChildListings(response.data.data.existing_children.items)
        setExistingChildrenPage(page)
      }
    } catch (error) {
      console.error('Error fetching existing children:', error)
      toast.error('Failed to fetch existing children')
    } finally {
      setPendingLoading(false)
    }
  }

  const handleAvailableChildrenPageChange = async (page: number) => {
    try {
      setPendingLoading(true)
      const response = await axiosInstance.get(`/api/authenticated/listing/available-children`, {
        params: {
          parent_id: selectedParentListing?._id,
          product_type_id: selectedParentListing?.product_type_id,
          page: page,
          limit: availableChildrenLimit
        }
      })

      if (response.data.success) {
        setAvailableChildListings(response.data.data.available_children.items)
        setAvailableChildrenPage(page)
      }
    } catch (error) {
      console.error('Error fetching available children:', error)
      toast.error('Failed to fetch available children')
    } finally {
      setPendingLoading(false)
    }
  }

  const handleAddChildProducts = async () => {
    if (!selectedParentListing || selectedChildListings.length === 0) return

    try {
      setPendingLoading(true)
      const response = await axiosInstance.post('/api/authenticated/listing/add-children', {
        parent_id: selectedParentListing._id,
        child_ids: selectedChildListings
      })

      if (response.data.success) {
        toast.success('Successfully added child products')
        // Cập nhật lại danh sách
        fetchListings(currentPage, itemsPerPage)
      } else {
        toast.error(response.data.message || 'Failed to add child products')
      }
    } catch (error) {
      console.error('Error adding child products:', error)
      toast.error('Failed to add child products')
    } finally {
      setPendingLoading(false)
      setOpenAddChildDialog(false)
    }
  }

  const handleRemoveChild = (listingId: string) => {
    setSelectedChildListings(prev => prev.filter(id => id !== listingId))
  }

  // Thêm nút Add Children vào cột Actions
  const renderActions = (listing: Listing) => (
    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
      {!listing.parent_id && (
        <IconButton
          size='small'
          onClick={() => handleOpenAddChildDialog(listing)}
          color='primary'
          title='Add Child Products'
        >
          <i className='tabler-git-branch' />
        </IconButton>
      )}
      <IconButton size='small' onClick={() => handleEdit(listing, 'title')}>
        <i className='tabler-edit' />
      </IconButton>
      <IconButton size='small' onClick={e => handleDeleteClick(listing._id, e)} color='error'>
        <i className='tabler-trash' />
      </IconButton>
    </Box>
  )

  // Thêm Dialog để chọn sản phẩm con
  const renderAddChildDialog = () => (
    <Dialog open={openAddChildDialog} onClose={() => setOpenAddChildDialog(false)} maxWidth='xl' fullWidth>
      <DialogTitle>Add Child Products to {selectedParentListing?.title}</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          {/* Available Products Table - Left Side */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant='subtitle1'>Available Products to Add</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {availableSearchTerm && (
                  <Typography variant='body2' color='text.secondary'>
                    {filteredAvailableListings.length} results
                  </Typography>
                )}
                <CustomTextField
                  size='small'
                  placeholder='Search by title, SKU or type...'
                  value={availableSearchTerm}
                  onChange={e => setAvailableSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ mr: 1, color: 'text.secondary' }}>
                        <i className='tabler-search' />
                      </Box>
                    ),
                    endAdornment: availableSearchTerm && (
                      <IconButton
                        size='small'
                        onClick={() => {
                          setAvailableSearchTerm('')
                          setDebouncedSearchTerm('')
                        }}
                        sx={{ mr: -1 }}
                      >
                        <i className='tabler-x' />
                      </IconButton>
                    )
                  }}
                  sx={{ width: '300px' }}
                />
              </Box>
            </Box>
            <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell padding='checkbox'>
                      <Checkbox
                        checked={selectedChildListings.length === filteredAvailableListings.length}
                        indeterminate={
                          selectedChildListings.length > 0 &&
                          selectedChildListings.length < filteredAvailableListings.length
                        }
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectedChildListings(filteredAvailableListings.map(l => l._id))
                          } else {
                            setSelectedChildListings([])
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>Banner</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>SKU</TableCell>
                    <TableCell>Product Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAvailableListings.length > 0 ? (
                    filteredAvailableListings.map(listing => (
                      <TableRow key={listing._id}>
                        <TableCell padding='checkbox'>
                          <Checkbox
                            checked={selectedChildListings.includes(listing._id)}
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectedChildListings([...selectedChildListings, listing._id])
                              } else {
                                setSelectedChildListings(selectedChildListings.filter(id => id !== listing._id))
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          {listing.main_image && (
                            <img
                              src={listing.main_image}
                              alt='Banner'
                              style={{
                                width: 50,
                                height: 50,
                                objectFit: 'cover',
                                borderRadius: '4px',
                                cursor: 'pointer'
                              }}
                              onClick={() => handleImageClick([listing.main_image], 0)}
                            />
                          )}
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {listing.title}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant='body2'
                            sx={{
                              fontFamily: 'monospace',
                              color: 'text.secondary'
                            }}
                          >
                            {listing.sku}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant='body2'
                            sx={{
                              color: 'text.secondary'
                            }}
                          >
                            {productTypes[listing.product_type_id] || 'N/A'}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align='center'>
                        <Typography color='text.secondary'>
                          {availableSearchTerm ? 'No matching products found' : 'No available products found'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  count={Math.ceil((filteredAvailableListings.length || 0) / availableChildrenLimit)}
                  page={availableChildrenPage}
                  onChange={(_, page) => handleAvailableChildrenPageChange(page)}
                  color='primary'
                />
              </Box>
            </TableContainer>
          </Box>

          {/* Existing Child Products Table - Right Side */}
          <Box sx={{ flex: 1 }}>
            <Typography variant='subtitle1' sx={{ mb: 2 }}>
              Existing Child Products
            </Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Banner</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>SKU</TableCell>
                    <TableCell>Product Type</TableCell>
                    <TableCell align='right'>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {existingChildListings.length > 0 ? (
                    existingChildListings.map(listing => (
                      <TableRow key={listing._id}>
                        <TableCell>
                          {listing.main_image && (
                            <img
                              src={listing.main_image}
                              alt='Banner'
                              style={{
                                width: 50,
                                height: 50,
                                objectFit: 'cover',
                                borderRadius: '4px',
                                cursor: 'pointer'
                              }}
                              onClick={() => handleImageClick([listing.main_image], 0)}
                            />
                          )}
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {listing.title}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant='body2'
                            sx={{
                              fontFamily: 'monospace',
                              color: 'text.secondary'
                            }}
                          >
                            {listing.sku}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant='body2'
                            sx={{
                              color: 'text.secondary'
                            }}
                          >
                            {productTypes[listing.product_type_id] || 'N/A'}
                          </Typography>
                        </TableCell>
                        <TableCell align='right'>
                          <IconButton size='small' onClick={() => handleRemoveChild(listing._id)} color='error'>
                            <i className='tabler-trash' />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align='center'>
                        <Typography color='text.secondary'>No existing child products</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  count={Math.ceil((existingChildListings.length || 0) / existingChildrenLimit)}
                  page={existingChildrenPage}
                  onChange={(_, page) => handleExistingChildrenPageChange(page)}
                  color='primary'
                />
              </Box>
            </TableContainer>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenAddChildDialog(false)}>Cancel</Button>
        <Button
          variant='contained'
          onClick={handleAddChildProducts}
          disabled={selectedChildListings.length === 0 || pendingLoading}
        >
          Add Selected Products
        </Button>
      </DialogActions>
    </Dialog>
  )

  return (
    <Card>
      <CardContent>
        <div className='flex justify-between items-center mb-4'>
          <Typography variant='h5' className='font-bold'>
            Listing Items
          </Typography>
          <div className='flex gap-3'>
            <Button
              variant='contained'
              onClick={handleOpenAIConfig}
              startIcon={<i className='tabler-settings' />}
              sx={{
                backgroundColor: 'info.main',
                '&:hover': {
                  backgroundColor: 'info.dark'
                },
                maxWidth: '300px',
                '& .MuiButton-label': {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }
              }}
            >
              {selectedAIConfig
                ? `AI Config: ${selectedAIConfig.name.length > 20 ? selectedAIConfig.name.substring(0, 20) + '...' : selectedAIConfig.name}`
                : 'AI Config'}
            </Button>
            <Button
              variant='contained'
              onClick={() => fetchListings(currentPage, itemsPerPage)}
              sx={{
                backgroundColor: 'warning.main',
                '&:hover': {
                  backgroundColor: 'warning.dark'
                },
                minWidth: '40px',
                width: '40px',
                height: '40px',
                padding: 0
              }}
            >
              <i className='tabler-refresh' />
            </Button>
          </div>
        </div>

        <div className='flex justify-between items-center gap-4 mb-4'>
          <div className='flex gap-3'>
            <Box
              onMouseEnter={handleCreateFilePopoverOpen}
              onMouseLeave={handleCreateFilePopoverClose}
              sx={{ position: 'relative' }}
            >
              <Button
                variant='contained'
                onClick={handleOpenFileListing}
                startIcon={<i className='tabler-file-plus' />}
                disabled={shopFilter === 'all' || productTypeFilter === 'all'}
                sx={{
                  backgroundColor: 'success.main',
                  '&:hover': {
                    backgroundColor: 'success.dark'
                  },
                  '&.Mui-disabled': {
                    backgroundColor: 'action.disabledBackground',
                    color: 'action.disabled'
                  }
                }}
              >
                Create File
              </Button>
              <Popover
                sx={{
                  pointerEvents: 'none'
                }}
                open={openCreateFilePopover}
                anchorEl={createFileAnchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center'
                }}
                onClose={handleCreateFilePopoverClose}
                disableRestoreFocus
              >
                <Box sx={{ p: 2, maxWidth: 300 }}>
                  <Typography variant='subtitle2' sx={{ mb: 1, fontWeight: 'bold' }}>
                    Để sử dụng tính năng này, bạn cần:
                  </Typography>
                  <Box component='ul' sx={{ m: 0, pl: 2 }}>
                    <Typography component='li' variant='body2' sx={{ mb: 0.5 }}>
                      Chọn một shop từ bộ lọc shop
                    </Typography>
                    <Typography component='li' variant='body2' sx={{ mb: 0.5 }}>
                      Chọn một loại sản phẩm từ bộ lọc loại sản phẩm
                    </Typography>
                    <Typography component='li' variant='body2'>
                      Chọn ít nhất một listing từ danh sách
                    </Typography>
                  </Box>
                </Box>
              </Popover>
            </Box>
            <Button
              variant='contained'
              onClick={handleBulkRewrite}
              startIcon={<i className='tabler-robot' />}
              sx={{
                backgroundColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.dark'
                }
              }}
            >
              Bulk Rewrite
            </Button>
          </div>

          <div className='flex gap-3 items-center flex-1 justify-end'>
            <div>
              <Button
                variant='outlined'
                size='small'
                onClick={e => setParentChildMenuAnchor(e.currentTarget)}
                startIcon={<i className='tabler-git-branch' />}
                endIcon={<i className='tabler-chevron-down' />}
                sx={{
                  height: '40px',
                  minWidth: '120px',
                  '& .MuiButton-startIcon': {
                    marginRight: '4px'
                  },
                  '& .MuiButton-endIcon': {
                    marginLeft: '4px'
                  }
                }}
              >
                {parentChildFilter === 'all'
                  ? 'All Products'
                  : parentChildFilter === 'parent'
                    ? 'Parent Products'
                    : 'Child Products'}
              </Button>
              <Menu
                anchorEl={parentChildMenuAnchor}
                open={Boolean(parentChildMenuAnchor)}
                onClose={() => setParentChildMenuAnchor(null)}
              >
                <MenuItem onClick={() => handleParentChildFilter('all')}>
                  <Chip label='All' size='small' color='default' className='mr-2' />
                  All Products
                </MenuItem>
                <MenuItem onClick={() => handleParentChildFilter('parent')}>
                  <Chip label='Parent' size='small' color='primary' className='mr-2' />
                  Parent Products
                </MenuItem>
                <MenuItem onClick={() => handleParentChildFilter('child')}>
                  <Chip label='Child' size='small' color='secondary' className='mr-2' />
                  Child Products
                </MenuItem>
              </Menu>
            </div>

            <div>
              <Autocomplete
                value={shopFilter === 'all' ? null : shops.find(s => s._id === shopFilter) || null}
                onChange={(_, newValue) => {
                  handleShopFilter(newValue ? newValue._id : 'all')
                }}
                options={shops}
                getOptionLabel={option => option.name}
                renderInput={params => (
                  <TextField
                    {...params}
                    size='small'
                    placeholder='All Shops'
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          <i className='tabler-building-store mr-2' />
                          {params.InputProps.startAdornment}
                        </>
                      )
                    }}
                    sx={{
                      minWidth: '200px',
                      '& .MuiOutlinedInput-root': {
                        height: '40px'
                      }
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option._id}>
                    <Typography>{option.name}</Typography>
                  </li>
                )}
                isOptionEqualToValue={(option, value) => option._id === value._id}
              />
            </div>

            <div>
              <Autocomplete
                value={
                  productTypeFilter === 'all' ? null : { id: productTypeFilter, name: productTypes[productTypeFilter] }
                }
                onChange={(_, newValue) => {
                  handleProductTypeFilter(newValue ? newValue.id : 'all')
                }}
                options={Object.entries(productTypes).map(([id, name]) => ({ id, name }))}
                getOptionLabel={option => option.name}
                renderInput={params => (
                  <TextField
                    {...params}
                    size='small'
                    placeholder='All Types'
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          <i className='tabler-tag mr-2' />
                          {params.InputProps.startAdornment}
                        </>
                      )
                    }}
                    sx={{
                      minWidth: '200px',
                      '& .MuiOutlinedInput-root': {
                        height: '40px'
                      }
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Typography>{option.name}</Typography>
                  </li>
                )}
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />
            </div>

            <div>
              <Button
                variant='outlined'
                size='small'
                onClick={e => setStatusMenuAnchor(e.currentTarget)}
                startIcon={<i className='tabler-filter' />}
                endIcon={<i className='tabler-chevron-down' />}
                sx={{
                  height: '40px',
                  minWidth: '120px',
                  '& .MuiButton-startIcon': {
                    marginRight: '4px'
                  },
                  '& .MuiButton-endIcon': {
                    marginLeft: '4px'
                  }
                }}
              >
                {statusFilter ? statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1) : 'All Status'}
              </Button>
              <Menu
                anchorEl={statusMenuAnchor}
                open={Boolean(statusMenuAnchor)}
                onClose={() => setStatusMenuAnchor(null)}
              >
                <MenuItem onClick={() => handleStatusFilter('all')}>All Status</MenuItem>
                <MenuItem onClick={() => handleStatusFilter('new')}>
                  <Chip label='New' size='small' color='info' className='mr-2' />
                  New
                </MenuItem>
                <MenuItem onClick={() => handleStatusFilter('pushed')}>
                  <Chip label='Pushed' size='small' color='success' className='mr-2' />
                  Pushed
                </MenuItem>
                <MenuItem onClick={() => handleStatusFilter('trashed')}>
                  <Chip label='Trashed' size='small' color='error' className='mr-2' />
                  Trashed
                </MenuItem>
              </Menu>
            </div>

            <form className='max-w-md' onSubmit={handleSearch}>
              <DebouncedInput
                value={globalFilter ?? ''}
                onChange={value => setGlobalFilter(value as string)}
                placeholder='Search listings...'
                className='w-full'
              />
            </form>
          </div>
        </div>

        <div className='mt-3'>
          <Fade in={!isLoading} timeout={500}>
            <div>
              {listings.length > 0 ? (
                <TableContainer
                  component={Paper}
                  sx={{
                    transition: 'all 0.3s ease-in-out',
                    opacity: isLoading ? 0 : 1,
                    '&.MuiTableContainer-root': {
                      minHeight: '400px'
                    }
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell padding='checkbox'>
                          <Checkbox
                            checked={selectedListings.length === listings.length}
                            indeterminate={selectedListings.length > 0 && selectedListings.length < listings.length}
                            onChange={handleCheckboxAll}
                          />
                        </TableCell>
                        <TableCell>Shop Name</TableCell>
                        <TableCell>Product Type</TableCell>
                        <TableCell>SKU</TableCell>
                        <TableCell>Relationship</TableCell>
                        <TableCell
                          sx={{
                          width: {
                            xs: '120px',
                            sm: '150px',
                            md: '200px',
                            lg: '250px',
                            xl: '300px'
                          },
                          maxWidth: {
                            xs: '120px',
                            sm: '150px',
                            md: '200px',
                            lg: '250px',
                            xl: '300px'
                          }
                          }}
                        >
                          Title
                        </TableCell>
                        <TableCell>Bullet Points</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Main Image</TableCell>
                        <TableCell>Images</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell align='right'>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listings.map(listing => (
                        <TableRow
                          key={listing._id}
                          hover
                          sx={{
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                            }
                          }}
                        >
                          <TableCell padding='checkbox'>
                            <Checkbox
                              checked={selectedListings.includes(listing._id)}
                              onChange={e => handleCheckbox(e, listing._id)}
                            />
                          </TableCell>
                          <TableCell>{listing.shop.name}</TableCell>
                          <TableCell>
                            <Typography
                              variant='body2'
                              sx={{
                                color: 'text.secondary',
                                fontWeight: 500
                              }}
                            >
                              {productTypes[listing.product_type_id] || 'N/A'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant='body2'
                              sx={{
                                color: 'text.secondary',
                                fontWeight: 500,
                                fontFamily: 'monospace'
                              }}
                            >
                              {listing.sku || 'N/A'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {listing.parent_id ? (
                              <Chip
                                label='Child'
                                size='small'
                                color='secondary'
                                icon={<i className='tabler-git-branch' />}
                                sx={{ mr: 1 }}
                              />
                            ) : listing.children_ids && listing.children_ids.length > 0 ? (
                              <Chip
                                label='Parent'
                                size='small'
                                color='primary'
                                icon={<i className='tabler-git-branch' />}
                                sx={{ mr: 1 }}
                              />
                            ) : (
                              <Chip
                                label='Standalone'
                                size='small'
                                color='default'
                                icon={<i className='tabler-git-branch' />}
                                sx={{ mr: 1 }}
                              />
                            )}
                            {listing.children_ids && listing.children_ids.length > 0 && (
                              <Typography variant='caption' color='text.secondary'>
                                ({listing.children_ids.length} variants)
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell
                            sx={{
                            width: {
                              xs: '120px',
                              sm: '150px',
                              md: '200px',
                              lg: '250px',
                              xl: '300px'
                            },
                            maxWidth: {
                              xs: '120px',
                              sm: '150px',
                              md: '200px',
                              lg: '250px',
                              xl: '300px'
                            }
                            }}
                          >
                            <Typography
                              onClick={() => handleEdit(listing, 'title')}
                              sx={{
                                cursor: 'pointer',
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                  color: 'primary.main',
                                  transform: 'translateX(4px)'
                                },
                                color: !listing.title ? 'text.disabled' : 'inherit',
                                fontStyle: !listing.title ? 'italic' : 'normal',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                lineHeight: '1.5em',
                                maxHeight: '4.5em'
                              }}
                            >
                              {listing.title || 'Click to add title...'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box
                              onClick={() => handleEdit(listing, 'bullet_points')}
                              sx={{
                                cursor: 'pointer',
                                transition: 'all 0.2s ease-in-out',
                                color: !listing.bullet_points?.length ? 'text.disabled' : 'inherit',
                                fontStyle: !listing.bullet_points?.length ? 'italic' : 'normal',
                                p: 1,
                                borderRadius: 1,
                                bgcolor: 'background.paper',
                                border: '1px solid',
                                borderColor: 'divider',
                                minHeight: '150px',
                                display: 'flex',
                                flexDirection: 'column',
                                '&:hover': {
                                  borderColor: 'primary.main',
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                  color: 'primary.main',
                                  transform: 'translateX(4px)'
                                }
                              }}
                            >
                              {listing.bullet_points?.length ? (
                                <Box
                                  component='ul'
                                  sx={{
                                  m: 0,
                                  p: 0,
                                  listStyle: 'none',
                                  height: '100%'
                                  }}
                                >
                                  {listing.bullet_points.map((point, index) => (
                                    <Box
                                      component='li'
                                      key={index}
                                      sx={{
                                        mb: 1,
                                        fontSize: '0.875rem',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 1,
                                        '&:last-child': {
                                          mb: 0
                                        },
                                        '&::before': {
                                          content: '"•"',
                                          color: 'primary.main',
                                          fontWeight: 'bold',
                                          fontSize: '1.2em',
                                          lineHeight: 1,
                                          flexShrink: 0
                                        }
                                      }}
                                    >
                                      <Box
                                        sx={{
                                        flex: 1,
                                        wordBreak: 'break-word',
                                        whiteSpace: 'normal'
                                        }}
                                      >
                                        {point}
                                      </Box>
                                    </Box>
                                  ))}
                                </Box>
                              ) : (
                                <Box
                                  sx={{
                                  height: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'text.secondary'
                                  }}
                                >
                                  Click to add bullet points...
                                </Box>
                              )}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              onClick={() => handleEdit(listing, 'description')}
                              sx={{
                                cursor: 'pointer',
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                  color: 'primary.main',
                                  transform: 'translateX(4px)'
                                },
                                color: !listing.description ? 'text.disabled' : 'inherit',
                                fontStyle: !listing.description ? 'italic' : 'normal',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                lineHeight: '1.5em',
                                maxHeight: '4.5em',
                                '& *': {
                                  maxWidth: '100%'
                                },
                                '& p': {
                                  margin: 0,
                                  padding: 0
                                },
                                '& br': {
                                  display: 'none'
                                }
                              }}
                            >
                              {listing.description ? (
                                <Box
                                  sx={{
                                    '& *': {
                                      maxWidth: '100%'
                                    }
                                  }}
                                  dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(listing.description, {
                                      ALLOWED_TAGS: [
                                        'p',
                                        'b',
                                        'i',
                                        'em',
                                        'strong',
                                        'a',
                                        'ul',
                                        'ol',
                                        'li',
                                        'img',
                                        'br',
                                        'h1',
                                        'h2',
                                        'h3',
                                        'h4',
                                        'h5',
                                        'h6'
                                      ],
                                      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'style']
                                    })
                                  }}
                                />
                              ) : (
                                'Click to add description...'
                              )}
                            </Box>
                          </TableCell>
                          <TableCell>
                            {listing.main_image && (
                              <img
                                src={listing.main_image}
                                alt='Main'
                                style={{ width: 50, height: 50, objectFit: 'cover', cursor: 'pointer' }}
                                onClick={() => handleImageClick([listing.main_image], 0)}
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              {listing.images
                                ?.slice(0, 3)
                                .map((image, index) => (
                                <img
                                  key={index}
                                  src={image}
                                  alt={`Image ${index + 1}`}
                                  style={{ width: 40, height: 40, objectFit: 'cover', cursor: 'pointer' }}
                                  onClick={() => handleImageClick(listing.images || [], index)}
                                />
                              ))}
                              {listing.images?.length > 3 && (
                                <Typography variant='body2' sx={{ alignSelf: 'center' }}>
                                  +{listing.images.length - 3}
                                </Typography>
                              )}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant='body2'
                              className={`font-bold ${
                                listing.status === 'active'
                                  ? 'text-green-600'
                                  : listing.status === 'pending'
                                    ? 'text-yellow-600'
                                    : 'text-red-600'
                                }`}
                            >
                              {listing.status}
                            </Typography>
                          </TableCell>
                          <TableCell>{new Date(listing.created_at).toLocaleDateString()}</TableCell>
                          <TableCell align='right'>{renderActions(listing)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Box
                  sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '200px',
                  opacity: isLoading ? 0 : 1,
                  transition: 'opacity 0.3s ease-in-out'
                  }}
                >
                  <Typography>No listings found</Typography>
                </Box>
              )}
            </div>
          </Fade>

          {isLoading && (
            <Box
              sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              p: 2
              }}
            >
              {[...Array(5)].map((_, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Skeleton variant='circular' width={40} height={40} />
                  <Skeleton variant='rectangular' width='20%' height={40} />
                  <Skeleton variant='rectangular' width='15%' height={40} />
                  <Skeleton variant='rectangular' width='30%' height={40} />
                  <Skeleton variant='rectangular' width='25%' height={40} />
                  <Skeleton variant='rectangular' width='10%' height={40} />
                </Box>
              ))}
            </Box>
          )}
        </div>

        {listings.length > 0 && (
          <Box className='mt-4'>
            <PaginationControls
              itemsPerPage={itemsPerPage}
              totalPages={totalPages}
              currentPage={currentPage}
              totalItems={totalItems}
              items={listings}
              onPageChange={handlePageChange}
              onLimitChange={handleLimitChange}
            />
          </Box>
        )}
      </CardContent>

      <DeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
      />

      <Dialog open={openListingDetail} onClose={() => setOpenListingDetail(false)} maxWidth='lg' fullWidth>
        <DialogTitle>Listing Detail</DialogTitle>
        <DialogContent>
          {selectedListing && (
            <>
              <DialogContentText>{selectedListing.shop.name}</DialogContentText>
              <div className='mt-4'>
                <Typography variant='h6'>Status: {selectedListing.status}</Typography>
                <Typography variant='body2'>
                  Created: {new Date(selectedListing.created_at).toLocaleString()}
                </Typography>
                <Typography variant='body2'>
                  Updated: {new Date(selectedListing.updated_at).toLocaleString()}
                </Typography>
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenListingDetail(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <DialogListingTemplate
        _open={openDialogListingTemplate}
        _onClose={() => setOpenDialogListingTemplate(false)}
        _templates={template}
        _shop={shop}
        _productIds={selectedListings}
      />
      <DialogShowFileListings
        _open={openDialogShowFileListing}
        _onClose={() => setOpenDialogShowFileListing(false)}
        _fileListings={fileListings}
      />
      <Lightbox
        open={openLightBox}
        handleClose={() => setOpenLightBox(false)}
        imageUrl={selectedImages}
        imageAlt={selectedImages.map((_, index) => `Image ${index + 1}`)}
        initialIndex={selectedImageIndex}
      />

      <AIConfigDialog open={openAIConfig} onClose={handleCloseAIConfig} onApply={handleApplyAIConfig} />

      <Dialog
        open={openTemplateModal}
        onClose={() => {
          setOpenTemplateModal(false)
          setSelectedTemplate(null)
          setRecentlyCreatedFile(null)
        }}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>Create File</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant='subtitle1' sx={{ mb: 2 }}>
              Select Template
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <FormControl fullWidth>
                <Select
                  value={selectedTemplate || ''}
                  onChange={e => setSelectedTemplate(e.target.value)}
                  displayEmpty
                  sx={{ minHeight: '40px' }}
                >
                  <MenuItem value='' disabled>
                    <em>Select a template</em>
                  </MenuItem>
                  {templates.map(template => (
                    <MenuItem key={template._id} value={template._id}>
                      {template.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant='outlined'
                onClick={handleCreateTemplate}
                startIcon={<i className='tabler-plus' />}
                sx={{
                  minWidth: '150px',
                  whiteSpace: 'nowrap'
                }}
              >
                Create Template
              </Button>
            </Box>

            <Typography variant='subtitle1' sx={{ mb: 2 }}>
              Selected Items
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Banner</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Shop</TableCell>
                    <TableCell>Product Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listings
                    .filter(listing => selectedListings.includes(listing._id))
                    .map(listing => (
                      <TableRow key={listing._id}>
                        <TableCell>
                          {listing.main_image && (
                            <img
                              src={listing.main_image}
                              alt='Banner'
                              style={{
                                width: 50,
                                height: 50,
                                objectFit: 'cover',
                                borderRadius: '4px',
                                cursor: 'pointer'
                              }}
                              onClick={() => handleImageClick([listing.main_image], 0)}
                            />
                          )}
                        </TableCell>
                        <TableCell>{listing.title}</TableCell>
                        <TableCell>{listing.shop.name}</TableCell>
                        <TableCell>{productTypes[listing.product_type_id] || 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenTemplateModal(false)
              setSelectedTemplate(null)
              setRecentlyCreatedFile(null)
            }}
          >
            Close
          </Button>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {recentlyCreatedFile && (
              <Button
                variant='contained'
                color='success'
                onClick={() => {
                  console.log(recentlyCreatedFile)
                  const downloadUrl = process.env.NEXT_PUBLIC_API_URL + recentlyCreatedFile
                  window.open(downloadUrl, '_blank')
                }}
                startIcon={<i className='tabler-download' />}
                sx={{
                  '&:hover': {
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                Download File
              </Button>
            )}
            <Button
              variant='contained'
              onClick={handleCreateFile}
              disabled={!selectedTemplate || selectedListings.length === 0}
              startIcon={<i className='tabler-file-plus' />}
            >
              Create File
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      <Dialog
        open={loadingDialogOpen}
        PaperProps={{
          sx: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            overflow: 'hidden'
          }
        }}
      >
        <Box
          sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          p: 3,
          backgroundColor: 'background.paper',
          borderRadius: 1
          }}
        >
          <CircularProgress />
          <Typography>{loadingMessage}</Typography>
        </Box>
      </Dialog>

      <Dialog
        open={openBulletPointsDialog}
        onClose={() => {
          setOpenBulletPointsDialog(false)
          setEditingField(null)
        }}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>Edit Bullet Points</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {[...Array(5)].map((_, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Typography sx={{ minWidth: '30px', color: 'text.secondary', pt: 1 }}>{index + 1}.</Typography>
                <CustomTextField
                  value={editingBulletPoints[index] || ''}
                  onChange={e => {
                    const newBulletPoints = [...editingBulletPoints]
                    newBulletPoints[index] = e.target.value
                    setEditingBulletPoints(newBulletPoints)
                  }}
                  size='small'
                  fullWidth
                  placeholder={`Enter bullet point ${index + 1}`}
                  multiline
                  minRows={2}
                  maxRows={4}
                />
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenBulletPointsDialog(false)
              setEditingField(null)
            }}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            onClick={handleGenerateBulletPoints}
            startIcon={<i className='tabler-robot' />}
            disabled={!selectedAIConfig}
            sx={{
              mr: 1,
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark'
              },
              '&.Mui-disabled': {
                backgroundColor: 'action.disabledBackground',
                color: 'action.disabled'
              }
            }}
          >
            Generate with AI
          </Button>
          <Button variant='contained' onClick={handleSaveBulletPoints}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEditDialog}
        onClose={() => {
          setOpenEditDialog(false)
          setEditingField(null)
        }}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>{editingField?.field === 'title' ? 'Edit Title' : 'Edit Description'}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {editingField?.field === 'title' ? (
              <>
                <Typography variant='subtitle1' sx={{ mb: 1 }}>
                  Title
                </Typography>
                <CustomTextField
                  value={editingContent.title}
                  onChange={e => setEditingContent(prev => ({ ...prev, title: e.target.value }))}
                  size='small'
                  fullWidth
                  multiline
                  minRows={2}
                  maxRows={4}
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '0.875rem',
                      lineHeight: 1.5,
                      padding: '8px 12px',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word'
                    }
                  }}
                />
              </>
            ) : (
              <>
                <Typography variant='subtitle1' sx={{ mb: 1 }}>
                  Description
                </Typography>
                <CustomTextField
                  value={editingContent.description}
                  onChange={e => setEditingContent(prev => ({ ...prev, description: e.target.value }))}
                  size='small'
                  fullWidth
                  multiline
                  minRows={4}
                  maxRows={8}
                  sx={{
                    '& .MuiInputBase-input': {
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      lineHeight: 1.5,
                      padding: '8px 12px'
                    }
                  }}
                />

                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    bgcolor: 'background.paper',
                    '& *': {
                      maxWidth: '100%'
                    }
                  }}
                >
                  <Typography variant='caption' color='text.secondary' sx={{ mb: 1, display: 'block' }}>
                    Preview:
                  </Typography>
                  <Box
                    sx={{
                      '& img': {
                        maxWidth: '100%',
                        height: 'auto'
                      },
                      '& p': {
                        margin: '0.5em 0'
                      },
                      '& ul, & ol': {
                        paddingLeft: '1.5em'
                      }
                    }}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(editingContent.description, {
                        ALLOWED_TAGS: [
                          'p',
                          'b',
                          'i',
                          'em',
                          'strong',
                          'a',
                          'ul',
                          'ol',
                          'li',
                          'img',
                          'br',
                          'h1',
                          'h2',
                          'h3',
                          'h4',
                          'h5',
                          'h6'
                        ],
                        ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'style']
                      })
                    }}
                  />
                </Box>
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenEditDialog(false)
              setEditingField(null)
            }}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            onClick={handleGenerateContent}
            startIcon={<i className='tabler-robot' />}
            disabled={!selectedAIConfig}
            sx={{
              mr: 1,
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark'
              },
              '&.Mui-disabled': {
                backgroundColor: 'action.disabledBackground',
                color: 'action.disabled'
              }
            }}
          >
            Generate with AI
          </Button>
          <Button variant='contained' onClick={handleSaveEdit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {renderAddChildDialog()}
    </Card>
  )
}
