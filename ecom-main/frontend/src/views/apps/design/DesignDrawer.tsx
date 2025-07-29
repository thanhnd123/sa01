// React Imports
import { useEffect, useState, useRef, ChangeEvent } from 'react'

// MUI Imports
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import InputAdornment from '@mui/material/InputAdornment'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { minLength, nonEmpty, object, pipe, string,  } from 'valibot'
import type { InferInput } from 'valibot'
import { formatDistanceToNow } from 'date-fns'

// Type Imports
import type { CommentType } from '@/types/apps/designTypes'
import type { AppDispatch, RootState } from '@/redux-store'

// Định nghĩa lại TaskType để phù hợp với designer_id có thể là mảng string
interface TaskType {
  id: string
  title: string
  status: number
  product_ideal_id: string
  seller_id: string
  designer_id: string | string[]
  product_types?: string[]
  banner?: string
  seller_note?: string
  dropbox?: string[]
  comments?: CommentType[]
}

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Data Imports
import { chipColor } from './TaskCard'
import { useSelector } from 'react-redux'

// Service Imports
import { updateDesign, fetchProductTypes } from '@/services/designService'

// Slice Imports
import { updateTaskDropbox, updateTaskComments } from '@/redux-store/slices/design'

type DesignDrawerProps = {
  drawerOpen: boolean
  dispatch: AppDispatch
  setDrawerOpen: (value: boolean) => void
  task: TaskType
}

type FormData = InferInput<typeof schema>

const schema = object({
  title: pipe(string(), nonEmpty('Title is required'), minLength(1))
})

const DesignDrawer = (props: DesignDrawerProps) => {
  // Props
  const { drawerOpen, dispatch, setDrawerOpen, task } = props

  // States
  const [commentContent, setCommentContent] = useState<string>('')
  const [dropboxLinks, setDropboxLinks] = useState<string[]>(task.dropbox || [])
  const [newDropboxLink, setNewDropboxLink] = useState<string>('')
  const [comments, setComments] = useState<CommentType[]>(task.comments || [])
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [designerIds, setDesignerIds] = useState<string[]>(
    Array.isArray(task.designer_id) 
      ? task.designer_id 
      : (task.designer_id ? [task.designer_id as string] : [])
  )
  const [newDesignerId, setNewDesignerId] = useState<string>('')
  
  // Get product types from Redux
  const productTypes = useSelector((state: RootState) => state.designReducer.productTypes)
  
  // Normalize product_types to always be an array
  const taskProductTypes = (() => {
    if (!task.product_types) return []
    return Array.isArray(task.product_types) ? task.product_types : [task.product_types]
  })()

  // User mock - in real app, get this from auth context
  const currentUser = {
    id: 'admin123',
    name: 'Admin User'
  }

  // Hooks
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      title: task.title
    },
    resolver: valibotResolver(schema)
  })

  // Close Drawer
  const handleClose = () => {
    setDrawerOpen(false)
    reset({ title: task.title })
    setCommentContent('')
    setDropboxLinks(task.dropbox || [])
    setNewDropboxLink('')
    setComments(task.comments || [])
  }

  // Update Task
  const updateTask = async (data: FormData) => {
    try {
      setIsUpdating(true)
      
      const updateData: any = {
        id: task.id
      };
      
      // Thêm title vào updateData nếu có thay đổi
      if (data.title !== task.title) {
        updateData.title = data.title;
      }
        
      if (!arraysEqual(dropboxLinks, task.dropbox)) {
        updateData.dropbox = dropboxLinks;
      }
        
      if (!arraysEqual(comments, task.comments)) {
        updateData.comments = comments;
      }
        
      if (designerIds.length > 0 && JSON.stringify(designerIds) !== JSON.stringify(task.designer_id)) {
        updateData.designer_id = designerIds;
      }
        
      // Gọi API để cập nhật
      if (Object.keys(updateData).length > 1) {
        const updatedTaskResponse = await updateDesign(updateData);
        
        // Dispatch action để cập nhật Redux store với toàn bộ task đã cập nhật
        dispatch({
          type: 'design/updateTask',
          payload: {
            taskId: task.id,
            updates: {
              ...task,
              ...updateData,
              dropbox: updateData.dropbox || task.dropbox,
              comments: updateData.comments || task.comments,
              designer_id: updateData.designer_id || task.designer_id
            }
          }
        });
        
        console.log('✅ Task updated successfully');
      } else {
        console.log('ℹ️ No changes to update');
      }
      
      handleClose();
    } catch (error) {
      console.error('❌ Error updating task:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Helper function to compare arrays
  const arraysEqual = (a: any[] | undefined, b: any[] | undefined): boolean => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (!a || !b) return false;
    if (a.length !== b.length) return false;

    // If comparing objects in arrays (like comments), we need to stringify them
    return JSON.stringify(a) === JSON.stringify(b);
  };

  // Add Comment
  const addComment = () => {
    if (commentContent.trim()) {
      const newComment: CommentType = {
        content: commentContent.trim(),
        by: currentUser.id,
        timestamp: new Date().toISOString()
      }
      
      const newComments = [...comments, newComment]
      setComments(newComments)
      setCommentContent('')
    }
  }

  // Remove Comment
  const removeComment = (index: number) => {
    const updatedComments = [...comments]
    updatedComments.splice(index, 1)
    setComments(updatedComments)
  }

  // Format date for display
  const formatCommentDate = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
    } catch (error) {
      return 'Invalid date'
    }
  }

  // To set the initial values according to the task
  useEffect(() => {
    reset({ title: task.title })
    setDropboxLinks(task.dropbox || [])
    setComments(task.comments || [])
    // Cập nhật designer_id dựa trên task
    setDesignerIds(Array.isArray(task.designer_id) ? task.designer_id : (task.designer_id ? [task.designer_id as string] : []));
  }, [task, reset])

  // Format product type name and ID for display
  const getProductTypeName = (typeId: string) => {
    const name = productTypes[typeId]
    if (!name) return `Unknown (${typeId})`
    return name
  }

  // Handle adding new dropbox link
  const handleAddDropboxLink = () => {
    if (newDropboxLink.trim()) {
      // Simple URL validation
      let url = newDropboxLink.trim();
      
      // Add protocol if missing
      if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
      }
      
      setDropboxLinks([...dropboxLinks, url]);
      setNewDropboxLink('');
    }
  }

  // Handle removing dropbox link
  const handleRemoveDropboxLink = (index: number) => {
    const updatedLinks = [...dropboxLinks]
    updatedLinks.splice(index, 1)
    setDropboxLinks(updatedLinks)
  }

  // Handle keypress event for dropbox input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddDropboxLink()
    }
  }

  // Handle keypress event for comment input
  const handleCommentKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault()
      addComment()
    }
  }

  return (
    <div>
      <Drawer
        open={drawerOpen}
        anchor='right'
        variant='temporary'
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
        onClose={handleClose}
      >
        <div className='flex justify-between items-center pli-6 plb-5 border-be'>
          <Typography variant='h5'>Edit Task</Typography>
          <IconButton size='small' onClick={handleClose}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>
        <div className='p-6'>
          <form className='flex flex-col gap-y-5' onSubmit={handleSubmit(updateTask)}>
            <Controller
              name='title'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  fullWidth
                  label='Title'
                  {...field}
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                />
              )}
            />

            {/* Product Types Section */}
            <div className='flex flex-col gap-2'>         
              {taskProductTypes.length > 0 ? (
                <Stack spacing={1} direction="row">
                  <Chip label={`${getProductTypeName(taskProductTypes[0])}`} color='success' icon={<i className='tabler-tag' />} sx={{ m: 0.5 }} />
                </Stack>
              ) : (
                <Typography variant='body2' color='text.secondary'>No product types assigned</Typography>
              )}
            </div>

            {/* Designer ID Section */}
            <div className='flex flex-col gap-2'>
              <Typography variant='subtitle2'>Designer IDs</Typography>
              
              <div className='flex items-center gap-2'>
                <TextField
                  fullWidth
                  size='small'
                  placeholder='Add Designer ID'
                  value={newDesignerId}
                  onChange={(e) => setNewDesignerId(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (newDesignerId.trim()) {
                        setDesignerIds([...designerIds, newDesignerId.trim()]);
                        setNewDesignerId('');
                      }
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton 
                          edge='end' 
                          onClick={() => {
                            if (newDesignerId.trim()) {
                              setDesignerIds([...designerIds, newDesignerId.trim()]);
                              setNewDesignerId('');
                            }
                          }}
                          disabled={!newDesignerId.trim()}
                        >
                          <i className='tabler-plus' />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </div>

              {designerIds.length > 0 ? (
                <List dense sx={{ 
                  maxHeight: '150px', 
                  overflowY: 'auto',
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider'
                }}>
                  {designerIds.map((id, index) => (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <IconButton edge="end" onClick={() => {
                          const updatedIds = designerIds.filter((_, i) => i !== index);
                          setDesignerIds(updatedIds);
                        }}>
                          <i className='tabler-trash text-error' />
                        </IconButton>
                      }
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem', bgcolor: 'primary.main' }}>
                          {id.charAt(0).toUpperCase()}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText primary={id} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant='body2' color='text.secondary'>No designers added</Typography>
              )}
            </div>

            {/* Dropbox Links Section */}
            <div className='flex flex-col gap-2'>
              <Typography variant='subtitle2'>Dropbox Links</Typography>
              
              <div className='flex items-center gap-2'>
                <TextField
                  fullWidth
                  size='small'
                  placeholder='Add Dropbox URL'
                  value={newDropboxLink}
                  onChange={(e) => setNewDropboxLink(e.target.value)}
                  onKeyPress={handleKeyPress}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton 
                          edge='end' 
                          onClick={handleAddDropboxLink}
                          disabled={!newDropboxLink.trim()}
                        >
                          <i className='tabler-plus' />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              
              {dropboxLinks.length > 0 ? (
                <List dense sx={{ 
                  maxHeight: '200px', 
                  overflowY: 'auto',
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider'
                }}>
                  {dropboxLinks.map((link, index) => (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <IconButton edge="end" onClick={() => handleRemoveDropboxLink(index)}>
                          <i className='tabler-trash text-error' />
                        </IconButton>
                      }
                      disablePadding
                    >
                      <ListItemButton component="a" href={link} target="_blank" rel="noopener noreferrer">
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <i className='tabler-link text-primary' />
                        </ListItemIcon>
                        <Typography 
                          variant='body2' 
                          noWrap 
                          title={link}
                          sx={{ maxWidth: '300px' }}
                        >
                          {link}
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant='body2' color='text.secondary'>No dropbox links added</Typography>
              )}
            </div>

            {/* Comments Section */}
            <div className='flex flex-col gap-2'>
              <Typography variant='subtitle2'>Comments ({comments.length})</Typography>
              
              <div className='flex items-center gap-2'>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  size='small'
                  placeholder='Add comment (Ctrl+Enter to submit)'
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  onKeyDown={handleCommentKeyPress}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton 
                          edge='end' 
                          onClick={addComment}
                          disabled={!commentContent.trim()}
                        >
                          <i className='tabler-send' />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              
              {comments.length > 0 ? (
                <List dense sx={{ 
                  maxHeight: '300px', 
                  overflowY: 'auto',
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider'
                }}>
                  {comments.map((comment, index) => (
                    <ListItem
                      key={index}
                      alignItems="flex-start"
                      // secondaryAction={
                      //   <IconButton edge="end" onClick={() => removeComment(index)}>
                      //     <i className='tabler-trash text-error' />
                      //   </IconButton>
                      // }
                      sx={{ pb: 2, pt: 2, borderBottom: index < comments.length - 1 ? '1px dashed' : 'none', borderColor: 'divider' }}
                    >
                      <div className="flex flex-col gap-1 width-full">
                        <div className="flex items-center gap-2">
                          <Avatar 
                            sx={{ width: 24, height: 24, fontSize: '0.75rem', bgcolor: 'primary.main' }}
                          >
                            {comment.by.charAt(0).toUpperCase()}
                          </Avatar>
                          <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2">
                            <Typography variant='subtitle2' sx={{ lineHeight: 1.2 }}>
                              {comment.by}
                            </Typography>
                            <Typography variant='caption' color="text.secondary" sx={{ lineHeight: 1.2 }}>
                              {formatCommentDate(comment.timestamp)}
                            </Typography>
                            </div>
                            <Typography variant='body2' sx={{ pl: 4 }}>
                              {comment.content}
                            </Typography>
                          </div>
                        </div>
                     
                      </div>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant='body2' color='text.secondary'>No comments added</Typography>
              )}
            </div>
            
            <div className='flex gap-4'>
              <Button 
                variant='contained' 
                color='primary' 
                type='submit'
                disabled={isUpdating}
                startIcon={isUpdating ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {isUpdating ? 'Updating...' : 'Update'}
              </Button>
              <Button 
                variant='tonal' 
                color='error' 
                onClick={handleClose}
                disabled={isUpdating}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Drawer>
    </div>
  )
}

export default DesignDrawer
