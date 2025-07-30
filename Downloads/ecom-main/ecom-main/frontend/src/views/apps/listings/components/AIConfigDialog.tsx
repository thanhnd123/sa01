import { useEffect, useState, useCallback } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import axiosInstance from '@/libs/axios'
import { toast } from 'react-toastify'
import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import InputAdornment from '@mui/material/InputAdornment'
import { DebouncedInput } from '@/components/DebouncedInput'

export interface Config {
  _id: string
  name: string
  base_description: string
  created_at?: string
  updated_at?: string
  user_id?: string
}

interface AIConfigDialogProps {
  open: boolean
  onClose: () => void
  onApply: (config: Config | null) => void
  onNewConfig?: () => void
}

export const AIConfigDialog = ({ open, onClose, onApply }: AIConfigDialogProps) => {
  // State
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [configs, setConfigs] = useState<Config[]>([])
  const [selectedConfigId, setSelectedConfigId] = useState<string>('')
  const [showCreate, setShowCreate] = useState(false)
  const [name, setName] = useState('')
  const [baseDescription, setBaseDescription] = useState('')
  const [saving, setSaving] = useState(false)
  const [validation, setValidation] = useState<{name?: string, baseDescription?: string}>({})
  const [success, setSuccess] = useState(false)
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const itemsPerPage = 5
  const [editingConfig, setEditingConfig] = useState<Config | null>(null)
  const [deletingConfigId, setDeletingConfigId] = useState<string | null>(null)

  // Fetch configs
  const fetchConfigs = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axiosInstance.get('/api/authenticated/config/ai-configs')
      setConfigs(response.data.data)
    } catch (err) {
      setError('Failed to load configurations. Please try again.')
      console.error('Error fetching configs:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!open) return
    setConfigs([])
    setShowCreate(false)
    setSelectedConfigId('')
    setName('')
    setBaseDescription('')
    setSuccess(false)
    fetchConfigs()
  }, [open])

  // Debounced validation
  const validateName = useCallback(
    (value: string) => {
      if (!value.trim()) {
        setValidation(prev => ({ ...prev, name: 'Name is required.' }))
      } else if (value.length < 3) {
        setValidation(prev => ({ ...prev, name: 'Minimum 3 characters.' }))
      } else if (value.length > 50) {
        setValidation(prev => ({ ...prev, name: 'Maximum 50 characters.' }))
      } else if (!/^[\w\s-]+$/.test(value)) {
        setValidation(prev => ({ ...prev, name: 'Only letters, numbers, spaces, hyphens and underscores are allowed.' }))
      } else {
        setValidation(prev => ({ ...prev, name: undefined }))
      }
    },
    []
  )

  const validateDescription = useCallback(
    (value: string) => {
      if (!value.trim()) {
        setValidation(prev => ({ ...prev, baseDescription: 'Base description is required.' }))
      } else if (value.length < 10) {
        setValidation(prev => ({ ...prev, baseDescription: 'Minimum 10 characters.' }))
      } else if (value.length > 1000) {
        setValidation(prev => ({ ...prev, baseDescription: 'Maximum 1000 characters.' }))
      } else {
        setValidation(prev => ({ ...prev, baseDescription: undefined }))
      }
    },
    []
  )

  // Handle input changes
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setName(value)
    validateName(value)
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setBaseDescription(value)
    validateDescription(value)
  }

  // Handle create new config
  const handleCreate = async () => {
    if (validation.name || validation.baseDescription) return
    
    try {
      setSaving(true)
      setError(null)
      
      const response = await axiosInstance.post('/api/authenticated/config/ai-configs', {
        name,
        base_description: baseDescription
      })

      const newConfig = response.data.data
      setConfigs(prev => [...prev, newConfig])
      setShowCreate(false)
      setSelectedConfigId(newConfig._id)
      setName('')
      setBaseDescription('')
      setSuccess(true)
      toast.success('Configuration created successfully!')
    } catch (err) {
      console.error('Error creating config:', err)
      setError('Failed to create configuration. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  // Handle save selected config
  const handleSave = () => {
    const selected = configs.find(c => c._id === selectedConfigId) || null
    onApply(selected)
  }

  // Handle edit config
  const handleEdit = async (config: Config) => {
    if (!config) return
    
    try {
      setSaving(true)
      setError(null)
      
      const response = await axiosInstance.put(`/api/authenticated/config/ai-configs/${config._id}`, {
        name: config.name,
        base_description: config.base_description
      })

      const updatedConfig = response.data.data
      setConfigs(prev => prev.map(c => c._id === updatedConfig._id ? updatedConfig : c))
      setEditingConfig(null)
      toast.success('Configuration updated successfully!')
    } catch (err) {
      console.error('Error updating config:', err)
      setError('Failed to update configuration. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  // Handle start edit
  const handleStartEdit = (config: Config) => {
    if (!config) return
    setEditingConfig({...config})
    setSelectedConfigId('')
  }

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingConfig(null)
  }

  // Handle delete config
  const handleDelete = async (configId: string) => {
    try {
      setDeletingConfigId(configId)
      await axiosInstance.delete(`/api/authenticated/config/ai-configs/${configId}`)
      
      setConfigs(prev => prev.filter(c => c._id !== configId))
      if (selectedConfigId === configId) {
        setSelectedConfigId('')
      }
      setDeletingConfigId(null)
      toast.success('Configuration deleted successfully!')
    } catch (err) {
      console.error('Error deleting config:', err)
      setError('Failed to delete configuration. Please try again.')
      setDeletingConfigId(null)
    }
  }

  // Handle select config
  const handleSelectConfig = (configId: string) => {
    if (editingConfig) return
    const selected = configs.find(c => c._id === configId) || null
    onApply(selected)
  }

  // Filter and paginate configs
  const filteredConfigs = configs.filter(config => 
    config.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    config.base_description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const paginatedConfigs = filteredConfigs.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  const totalPages = Math.ceil(filteredConfigs.length / itemsPerPage)

  // Reset page when search changes
  useEffect(() => {
    setPage(1)
  }, [searchTerm])

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth 
      aria-labelledby="ai-config-dialog-title"
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: 24,
          minHeight: '80vh'
        }
      }}
    >
      <DialogTitle id="ai-config-dialog-title">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
          <Typography variant="h5" fontWeight={600}>AI Config Settings</Typography>
          <Button 
            size="small" 
            onClick={() => setShowCreate(true)}
            startIcon={<i className='tabler-plus' />}
            variant="contained"
          >
            Create New Configuration
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 3 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 180 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert 
            severity="error" 
            action={
              <Button 
                size="small" 
                onClick={fetchConfigs}
                sx={{ color: 'error.main' }}
              >
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        ) : (
          <>
            {/* Select Existing Config */}
            {configs.length > 0 && !showCreate && !editingConfig && (
              <Box>
                {/* Search */}
                <DebouncedInput
                  fullWidth
                  size="small"
                  placeholder="Search configurations..."
                  value={searchTerm}
                  onChange={(value) => setSearchTerm(value as string)}
                  className="mb-3"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <i className='tabler-search' />
                      </InputAdornment>
                    )
                  }}
                />
                
                {/* Config List */}
                <Box>
                  {paginatedConfigs.map((c) => {
                    return (
                      <Box
                        key={c._id}
                        onClick={() => handleSelectConfig(c._id)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          p: 2,
                          borderBottom: '1px solid',
                          borderColor: 'divider',
                          '&:hover': { bgcolor: 'action.hover' },
                          cursor: 'pointer',
                          bgcolor: selectedConfigId === c._id ? 'primary.main' : 'transparent',
                          color: selectedConfigId === c._id ? 'primary.contrastText' : 'inherit',
                          '& .MuiTypography-root': {
                            color: selectedConfigId === c._id ? 'primary.contrastText' : 'inherit'
                          }
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {c.name}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ 
                              mt: 0.5,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              lineHeight: '1.2em',
                              maxHeight: '2.4em'
                            }}
                          >
                            {c.base_description}
                          </Typography>
                        </Box>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            size="small"
                            color="default"
                            onClick={e => {
                              e.stopPropagation()
                              handleStartEdit(c)
                            }}
                          >
                            <i className='tabler-edit' />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={e => {
                              e.stopPropagation()
                              handleDelete(c._id)
                            }}
                            disabled={deletingConfigId === c._id}
                          >
                            {deletingConfigId === c._id ? (
                              <CircularProgress size={20} />
                            ) : (
                              <i className='tabler-trash' />
                            )}
                          </IconButton>
                        </Stack>
                      </Box>
                    )
                  })}
                </Box>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Pagination 
                      count={totalPages}
                      page={page}
                      onChange={(e, value) => setPage(value)}
                      color="primary"
                      size="small"
                    />
                  </Box>
                )}

                {/* No Results */}
                {filteredConfigs.length === 0 && (
                  <Box sx={{ 
                    textAlign: 'center', 
                    py: 8,
                    color: 'text.secondary'
                  }}>
                    <Typography variant="h6" gutterBottom>
                      No configurations found
                    </Typography>
                    {searchTerm && (
                      <Typography variant="body2">
                        Try adjusting your search
                      </Typography>
                    )}
                  </Box>
                )}
              </Box>
            )}

            {/* Edit Config */}
            {editingConfig && (
              <Box sx={{ maxWidth: 600, mx: 'auto' }}>
                <Typography variant="h6" sx={{ mb: 3 }}>Edit Configuration</Typography>
                <DebouncedInput
                  label="Name *"
                  fullWidth
                  value={editingConfig.name}
                  onChange={(value) => {
                    setEditingConfig(prev => prev ? {...prev, name: value as string} : null)
                    validateName(value as string)
                  }}
                  error={!!validation.name}
                  helperText={validation.name}
                  inputProps={{ 
                    minLength: 3,
                    'aria-label': 'Configuration name'
                  }}
                  className="mb-3"
                  autoFocus
                />
                <DebouncedInput
                  label="Base Description *"
                  fullWidth
                  multiline
                  minRows={4}
                  value={editingConfig.base_description}
                  onChange={(value) => {
                    setEditingConfig(prev => prev ? {...prev, base_description: value as string} : null)
                    validateDescription(value as string)
                  }}
                  error={!!validation.baseDescription}
                  helperText={validation.baseDescription}
                  inputProps={{ 
                    minLength: 10,
                    'aria-label': 'Base description'
                  }}
                  className="mb-3"
                />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={handleCancelEdit}
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(editingConfig)}
                    disabled={!!validation.name || !!validation.baseDescription || saving}
                    startIcon={saving ? <CircularProgress size={20} /> : null}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Box>
              </Box>
            )}

            {/* Create New Config */}
            {(showCreate || configs.length === 0) && (
              <Box sx={{ maxWidth: 600, mx: 'auto' }}>
                <Typography variant="h6" sx={{ mb: 3 }}>Create New Configuration</Typography>
                <DebouncedInput
                  label="Name *"
                  fullWidth
                  value={name}
                  onChange={(value) => {
                    setName(value as string)
                    validateName(value as string)
                  }}
                  error={!!validation.name}
                  helperText={validation.name}
                  inputProps={{ 
                    minLength: 3,
                    'aria-label': 'Configuration name'
                  }}
                  className="mb-3"
                  autoFocus
                />
                <DebouncedInput
                  label="Base Description *"
                  fullWidth
                  multiline
                  minRows={4}
                  value={baseDescription}
                  onChange={(value) => {
                    setBaseDescription(value as string)
                    validateDescription(value as string)
                  }}
                  error={!!validation.baseDescription}
                  helperText={validation.baseDescription}
                  inputProps={{ 
                    minLength: 10,
                    'aria-label': 'Base description'
                  }}
                  className="mb-3"
                />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setShowCreate(false)
                      setName('')
                      setBaseDescription('')
                    }}
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleCreate}
                    disabled={!!validation.name || !!validation.baseDescription || saving}
                    startIcon={saving ? <CircularProgress size={20} /> : null}
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </Button>
                </Box>
              </Box>
            )}

            {/* Success */}
            {success && (
              <Alert severity="success" sx={{ mt: 3 }}>
                Configuration saved successfully!
              </Alert>
            )}

            {/* Empty State */}
            {configs.length === 0 && !showCreate && !loading && (
              <Box sx={{ 
                textAlign: 'center', 
                py: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2
              }}>
                <Typography variant="h6" color="text.secondary">
                  No existing configurations
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create your first configuration to get started
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setShowCreate(true)}
                  startIcon={<i className='tabler-plus' />}
                >
                  Create New Configuration
                </Button>
              </Box>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} aria-label="Cancel">Cancel</Button>
      </DialogActions>
    </Dialog>
  )
} 