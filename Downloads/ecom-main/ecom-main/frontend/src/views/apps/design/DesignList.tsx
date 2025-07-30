// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'

// Third-party imports
import classnames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion';

// Type Imports
import type { TaskType, ColumnType } from '@/types/apps/designTypes'
import type { AppDispatch } from '@/redux-store'

// Component Imports
import OptionMenu from '@core/components/option-menu'
import TaskCard from './TaskCard'

// Custom Hooks
import { useColumnDrag } from './hooks/useColumnDrag'
import { useColumnEdit } from './hooks/useColumnEdit'

// Styles Imports
import styles from './styles.module.css'

type DesignListProps = {
  column: ColumnType
  tasks: TaskType[]
  dispatch: AppDispatch
  store: {
    tasks: TaskType[]
    columns: ColumnType[]
    currentTaskId: string | null
  }
  setDrawerOpen: (value: boolean) => void
  columns: ColumnType[]
  setColumns: (value: ColumnType[]) => void
  currentTask: TaskType | undefined
}

const DesignList = (props: DesignListProps) => {
  const { column, tasks, dispatch, store, setDrawerOpen, columns, setColumns, currentTask } = props

  const [tasksList, setTasksList] = useState<TaskType[]>(tasks)

  const {
    isDragOver,
    columnRef,
    handleDragOver,
    handleDragLeave,
    handleDrop
  } = useColumnDrag({ column, store, dispatch, setTasksList })

  const {
    editDisplay,
    setEditDisplay,
    title,
    setTitle,
    handleSubmitEdit,
    cancelEdit,
    handleDeleteColumn
  } = useColumnEdit({ column, dispatch, columns, setColumns })

  // Update local tasks when tasks prop changes
  useEffect(() => {
    setTasksList(tasks)
  }, [tasks])

  // Update specific task when currentTask changes
  useEffect(() => {
    if (currentTask) {
      setTasksList(prevTasks =>
        prevTasks.map(task =>
          task.id === currentTask.id ? currentTask : task
        )
      )
    }
  }, [currentTask])

  return (
    <div
      ref={columnRef}
      className={classnames(
        'flex flex-col is-[16.5rem]',
        { [styles.dragover]: isDragOver }
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      data-column-id={column.id}
      data-status={column.status}
    >
      {editDisplay ? (
        <form
          className='flex items-center mbe-4'
          onSubmit={handleSubmitEdit}
          onKeyDown={e => {
            if (e.key === 'Escape') {
              cancelEdit()
            }
          }}
        >
          <InputBase
            value={title}
            autoFocus
            onChange={e => setTitle(e.target.value)}
            required
            className='flex-auto'
          />
          <IconButton color='success' size='small' type='submit'>
            <i className='tabler-check' />
          </IconButton>
          <IconButton color='error' size='small' type='reset' onClick={cancelEdit}>
            <i className='tabler-x' />
          </IconButton>
        </form>
      ) : (
        <div
          id='no-drag'
          className={classnames(
            'flex items-center justify-between is-[16.5rem] bs-[2.125rem] mbe-4',
            styles.kanbanColumn
            
          )}
        >
          <Typography variant='h5' noWrap className='max-is-[80%]'>
            {column.title}
          </Typography>
          <div className='flex items-center'>
            <i className={classnames('tabler-arrows-move text-textSecondary list-handle', styles.drag)} />
            <OptionMenu
              iconClassName='text-xl text-textPrimary'
              options={[
                {
                  text: 'Edit',
                  icon: 'tabler-pencil',
                  menuItemProps: {
                    className: 'flex items-center gap-2',
                    onClick: () => setEditDisplay(true)
                  }
                },
                {
                  text: 'Delete',
                  icon: 'tabler-trash',
                  menuItemProps: {
                    className: 'flex items-center gap-2',
                    onClick: handleDeleteColumn
                  }
                }
              ]}
            />
          </div>
        </div>
      )}
      <div className="flex flex-col">
        <AnimatePresence>
          {tasksList.map(task => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
            >
              <TaskCard
                task={task}
                dispatch={dispatch}
                column={column}
                setDrawerOpen={setDrawerOpen}
                tasksList={tasksList}
                setTasksList={setTasksList}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default DesignList
