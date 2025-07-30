import { useState, useRef } from 'react'
import { AppDispatch } from '@/redux-store'
import { updateSingleTask } from '@/redux-store/slices/design'
import { updateDesign } from '@/services/designService'
import type { TaskType, ColumnType } from '@/types/apps/designTypes'

interface UseColumnDragProps {
    column: ColumnType
    store: {
        tasks: TaskType[]
    }
    dispatch: AppDispatch
    setTasksList: (tasks: TaskType[] | ((prevTasks: TaskType[]) => TaskType[])) => void
}

export const useColumnDrag = ({ column, store, dispatch, setTasksList }: UseColumnDragProps) => {
    const [isDragOver, setIsDragOver] = useState(false)
    const columnRef = useRef<HTMLDivElement>(null)

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'

        if (!isDragOver) {
            setIsDragOver(true)
            columnRef.current?.classList.add('dragover')
        }
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        const rect = columnRef.current?.getBoundingClientRect()

        if (rect &&
            (e.clientX < rect.left ||
                e.clientX >= rect.right ||
                e.clientY < rect.top ||
                e.clientY >= rect.bottom)) {
            setIsDragOver(false)
            columnRef.current?.classList.remove('dragover')
        }
    }

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()

        setIsDragOver(false)
        columnRef.current?.classList.remove('dragover')

        const taskId = e.dataTransfer.getData('taskId')

        if (!taskId) {
            console.log('⚠️ Drop cancelled: No task ID found in dataTransfer')
            return
        }

        const taskToUpdate = store.tasks.find(t => t.id === taskId)
        if (!taskToUpdate) {
            console.log('⚠️ Drop cancelled: Task not found with ID:', taskId)
            return
        }

        if (taskToUpdate.status === column.status) {
            console.log('⚠️ Drop cancelled: Task already in this column')
            return
        }

        try {
            await updateDesign({
                id: taskToUpdate.id,
                status: column.status,
            })

            dispatch(updateSingleTask({
                taskId: taskToUpdate.id,
                status: column.status,
            }))

            const updatedTask = { ...taskToUpdate, status: column.status }

            setTasksList(prevList => {
                const filteredList = prevList.filter(t => t.id !== updatedTask.id)
                return [...filteredList, updatedTask]
            })

            console.log('🎉 Drop complete')
        } catch (error) {
            console.error('❌ Drop failed:', error)
        }
    }

    return {
        isDragOver,
        columnRef,
        handleDragOver,
        handleDragLeave,
        handleDrop
    }
} 