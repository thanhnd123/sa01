'use client'

// React Imports
import { useState, useEffect } from 'react'

// Next Auth Imports
import { useSession } from 'next-auth/react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

// Service Imports
import { createTemplate, getProductTypes, type TemplateCreateData } from '@/services/templateService'

// Types for product types
interface ProductType {
  _id: string
  name: string
}

// Define our own interface to match the Template structure in templateService.ts
interface Template {
  _id: string
  user_id: string
  team_id: string
  product_type: string
  fields: {
    template_name: string
    description: string
    template_link: string
  }
  created_at: string
  updated_at: string
}

// Create new template data structure
interface NewTemplateData {
  user_id: string
  team_id: string
  product_type: string
  fields: {
    template_name: string
    description: string
    template_link: string
  }
}

interface CreateTemplateModalProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

const CreateTemplateModal = ({ open, onClose, onSuccess }: CreateTemplateModalProps) => {
  // Get session data
  const { data: session, status } = useSession()
  
  // States
  const [loading, setLoading] = useState(false)
  const [productTypes, setProductTypes] = useState<ProductType[]>([])
  const [loadingProductTypes, setLoadingProductTypes] = useState(false)
  const [newTemplate, setNewTemplate] = useState<NewTemplateData>({
    user_id: '',
    team_id: '',
    product_type: '',
    fields: {
      template_name: '',
      description: '',
      template_link: ''
    }
  })

  // Update template data when session changes
  useEffect(() => {
    if (session?.user) {
      setNewTemplate(prev => ({
        ...prev,
        user_id: session.user.id || '',
        team_id: session.user.team_id || ''
      }))
    }
  }, [session?.user?.id, session?.user?.team_id])

  // Fetch product types from API
  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        setLoadingProductTypes(true)
        const result = await getProductTypes()
        setProductTypes(result)
      } catch (error) {
        console.error('Error fetching product types:', error)
      } finally {
        setLoadingProductTypes(false)
      }
    }

    fetchProductTypes()
  }, [])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setNewTemplate(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof NewTemplateData] as Record<string, any>,
          [child]: value
        }
      }))
    } else {
      setNewTemplate(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  // Handle select change
  const handleSelectChange = (e: any) => {
    const { name, value } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setNewTemplate(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof NewTemplateData] as Record<string, any>,
          [child]: value
        }
      }))
    } else {
      setNewTemplate(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  // Create new template
  const handleCreateTemplate = async () => {
    if (status === 'loading') return
    
    try {
      setLoading(true)
      // Create template data matching the expected format by the API
      // Note that the server expects "teamplate_name" (with a typo)
      const templateData: TemplateCreateData = {
        user_id: newTemplate.user_id,
        team_id: newTemplate.team_id,
        product_type: newTemplate.product_type,
        // Include fields at root level with the typo
        teamplate_name: newTemplate.fields.template_name,
        description: newTemplate.fields.description,
        // Also include them in fields for backward compatibility
        fields: {
          template_name: newTemplate.fields.template_name,
          description: newTemplate.fields.description,
          template_link: newTemplate.fields.template_link
        }
      }
      
      const result = await createTemplate(templateData)
      
      if (result) {
        // Reset form
        setNewTemplate({
          user_id: session?.user?.id || '',
          team_id: session?.user?.team_id || '',
          product_type: '',
          fields: {
            template_name: '',
            description: '',
            template_link: ''
          }
        })
        
        // Close dialog and notify parent of success
        onClose()
        onSuccess()
      } else {
        console.error('Failed to create template')
      }
    } catch (error) {
      console.error('Error creating template:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Create New Template</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mt: 2 }}>
          <FormControl fullWidth margin="dense">
            <InputLabel id="product-type-label">Product Type</InputLabel>
            <Select
              labelId="product-type-label"
              name="product_type"
              value={newTemplate.product_type}
              onChange={handleSelectChange}
              label="Product Type"
              required
              disabled={loadingProductTypes}
            >
              {productTypes.map((type) => (
                <MenuItem key={type._id} value={type._id}>{type.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Template Name"
            name="fields.template_name"
            value={newTemplate.fields.template_name}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            required
          />
          <TextField
            label="Description"
            name="fields.description"
            value={newTemplate.fields.description}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            multiline
            rows={3}
            sx={{ gridColumn: { md: '1 / 3' } }}
          />
          <TextField
            label="Template Link"
            name="fields.template_link"
            value={newTemplate.fields.template_link}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            sx={{ gridColumn: { md: '1 / 3' } }}
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleCreateTemplate}
          disabled={loading || !newTemplate.product_type || !newTemplate.fields.template_name || !newTemplate.fields.template_link || status === 'loading'}
        >
          {loading ? 'Creating...' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateTemplateModal 