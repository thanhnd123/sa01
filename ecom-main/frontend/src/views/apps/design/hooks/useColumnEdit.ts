import { useState } from 'react'
import { AppDispatch } from '@/redux-store'
import { editColumn, deleteColumn } from '@/redux-store/slices/design'
import type { ColumnType } from '@/types/apps/designTypes'

interface UseColumnEditProps {
    column: ColumnType
    dispatch: AppDispatch
    columns: ColumnType[]
    setColumns: (columns: ColumnType[]) => void
}

export const useColumnEdit = ({ column, dispatch, columns, setColumns }: UseColumnEditProps) => {
    const [editDisplay, setEditDisplay] = useState(false)
    const [title, setTitle] = useState(column.title)

    const handleSubmitEdit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setEditDisplay(false)
        dispatch(editColumn({ id: column.id, title }))

        const newColumn = columns.map(col =>
            col.id === column.id ? { ...col, title } : col
        )

        setColumns(newColumn)
    }

    const cancelEdit = () => {
        setEditDisplay(false)
        setTitle(column.title)
    }

    const handleDeleteColumn = () => {
        dispatch(deleteColumn({ columnId: column.id }))
        setColumns(columns.filter(col => col.id !== column.id))
    }

    return {
        editDisplay,
        setEditDisplay,
        title,
        setTitle,
        handleSubmitEdit,
        cancelEdit,
        handleDeleteColumn
    }
} 