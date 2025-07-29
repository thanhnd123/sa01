// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

// Third-Party Imports
import classnames from 'classnames'

// Type Imports
import type { ColumnType, TaskType } from '@/types/apps/designTypes'
import type { AppDispatch } from '@/redux-store'
import type { ThemeColor } from '@core/types'

// Slice Imports
import { getCurrentTask, deleteDesign as deleteDesignAction } from '@/redux-store/slices/design'

// Service Imports
import { deleteDesign } from '@/services/designService'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Styles Imports
import styles from './styles.module.css'
import { Avatar } from '@mui/material'

type chipColorType = {
  color: ThemeColor
}

type TaskCardProps = {
  task: TaskType
  dispatch: AppDispatch
  column: ColumnType
  setDrawerOpen: (value: boolean) => void
  tasksList: TaskType[]
  setTasksList: (value: TaskType[]) => void
}

export const chipColor: { [key: string]: chipColorType } = {
  'T-Shirt': { color: 'success' },
  'Hoodie': { color: 'error' },
  'Sweater': { color: 'info' },
  'Jeans': { color: 'warning' },
  'Jacket': { color: 'secondary' },
  'Shoes': { color: 'primary' }
}

const TaskCard = (props: TaskCardProps) => {
  // Props
  const { task, dispatch, setDrawerOpen, tasksList, setTasksList } = props

  // States
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // Thêm useEffect để theo dõi thay đổi của task
  useEffect(() => {
    // Component sẽ tự động re-render khi task thay đổi
  }, [task]);

  // Handle menu click
  const handleClick = (e: any) => {
    e.stopPropagation();
    setMenuOpen(true)
    setAnchorEl(e.currentTarget)
  }

  // Handle menu close
  const handleClose = () => {
    setAnchorEl(null)
    setMenuOpen(false)
  }

  // Handle Delete Dialog
  const handleDeleteDialogOpen = () => {
    handleClose();
    setDeleteDialogOpen(true);
  }

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  }

  // Handle Delete Design
  const handleDeleteDesign = async () => {
    try {
      setIsDeleting(true);

      // Call API to delete design
      await deleteDesign(task.id);

      // Update Redux store
      dispatch(deleteDesignAction(task.id));

      // Update local state
      setTasksList(tasksList.filter((t: TaskType) => t.id !== task.id));

      // Close dialog
      setDeleteDialogOpen(false);
      console.log('✅ Design deleted successfully:', task.id);
    } catch (error) {
      console.error('❌ Failed to delete design:', error);
    } finally {
      setIsDeleting(false);
    }
  }

  // Handle Task Click
  const handleTaskClick = () => {
    if (!isDragging) {
      setDrawerOpen(true)
      dispatch(getCurrentTask(task.id))
    }
  }

  // Drag event handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('🔄 Starting drag for task:', task.id);

    // Set the task ID in the drag data
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.effectAllowed = 'move';

    if (e.currentTarget.classList) {
      e.currentTarget.classList.add(styles['is-dragging']);
    }

    setIsDragging(true);

    setTimeout(() => {
      setIsDragging(true);
    }, 0);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('🏁 Ending drag for task:', task.id);

    // Remove the dragging class
    if (e.currentTarget.classList) {
      e.currentTarget.classList.remove(styles['is-dragging']);
    }

    // Reset dragging state after a short delay to prevent click event
    setTimeout(() => {
      setIsDragging(false);
    }, 100);
  };

  return (
    <>
      <Card
        className={classnames(
          'item-draggable is-[16.5rem] cursor-grab active:cursor-grabbing overflow-visible mbe-4',
          styles.card,
          { [styles['is-dragging']]: isDragging }
        )}
        onClick={() => handleTaskClick()}
        draggable={true}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        data-task-id={task.id}
      >
        <CardContent className='flex flex-col gap-y-2 items-start relative overflow-hidden'>
          {/* Product Types as badges (similar to badgeText in Kanban) */}
          {task.product_types && task.product_types.length > 0 && (
            <div className='flex flex-wrap items-center justify-start gap-2 is-full max-is-[85%]'>
              {task.product_types.map(
                (type, index) =>
                  chipColor[type]?.color && (
                    <Chip variant='tonal' key={index} label={type} size='small' color={chipColor[type].color} />
                  )
              )}
            </div>
          )}

          {/* Menu icon in the top-right corner */}
          <div className='absolute block-start-4 inline-end-3' onClick={e => e.stopPropagation()}>
            <IconButton
              aria-label='more'
              size='small'
              className={classnames(styles.menu, {
                [styles.menuOpen]: menuOpen
              })}
              aria-controls='long-menu'
              aria-haspopup='true'
              onClick={handleClick}
            >
              <i className='tabler-dots-vertical' />
            </IconButton>
            <Menu
              id='long-menu'
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Copy Task Link</MenuItem>
              <MenuItem onClick={handleDeleteDialogOpen}>
                Delete
              </MenuItem>
            </Menu>
          </div>

          {/* Banner Image (if available) */}
          {task.banner && <img src={task.banner} alt='task banner' className='is-full rounded aspect-square object-cover' />}

          {/* Task Title */}
          <Typography color='text.primary' className='max-is-[85%] break-words'>
            Note {task.seller_note}
          </Typography>

          {/* Footer with metadata */}
          <div className='flex justify-between items-center gap-4 is-full'>
            <div className='flex items-center gap-3'>
              {/* Dropbox links count */}
              <div className='flex items-center gap-1'>
                <i className='tabler-link text-xl text-textSecondary' />
                <Typography color='text.secondary'>
                  {Array.isArray(task.dropbox) ? task.dropbox.length : 0}
                </Typography>
              </div>

              {/* Comments count */}
              <div className='flex items-center gap-1'>
                <i className='tabler-message text-xl text-textSecondary' />
                <Typography color='text.secondary'>
                  {Array.isArray(task.comments) ? task.comments.length : 0}
                </Typography>
              </div>
            </div>

            {/* Hiển thị avatar cho mỗi designer */}
            {Array.isArray(task.designer_id) && task.designer_id.length > 0 && (
              <div className='flex items-center -space-x-2'>
                {task.designer_id.slice(0, 3).map((designerId, index) => (
                  <Tooltip key={index} title={designerId}>
                    <CustomAvatar
                      src=""
                      alt={designerId}
                      size={26}
                      className='cursor-pointer border   hover:transition-transform  hover:translate-y-[-5px] hover:z-10'
                      sx={{
                        width: 22,
                        height: 22,
                        fontSize: '0.675rem',
                        bgcolor: 'primary.main',
                        color: 'white',
                      }}
                    >
                      {/* {typeof designerId === 'string' && designerId.charAt(0).toUpperCase()} */}
                    </CustomAvatar>
                  </Tooltip>
                ))}

                {task.designer_id.length > 3 && (
                  <Tooltip title={`${task.designer_id.length - 3} more designers`}>
                    <CustomAvatar
                      size={26}
                      className='cursor-pointer border-2 border-background hover:transform hover:translate-y-[-5px] hover:z-10'
                      sx={{
                        width: 22,
                        height: 22,
                        fontSize: '0.675rem',
                        bgcolor: 'secondary.light',
                      }}
                    >
                      +{task.designer_id.length - 3}
                    </CustomAvatar>
                  </Tooltip>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          Delete Design
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this design? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteDialogClose}
            color="secondary"
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteDesign}
            color="error"
            variant="contained"
            disabled={isDeleting}
            startIcon={isDeleting ? <i className="tabler-loader animate-spin" /> : <i className="tabler-trash" />}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TaskCard
