'use client'

// React Imports
import React, { useEffect, useMemo, useState, useCallback } from 'react'

// Next Auth Imports
import { useSession } from 'next-auth/react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import TablePagination from '@mui/material/TablePagination'
import type { TextFieldProps } from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

// Third-party Imports
import classnames from 'classnames'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper
} from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'
import type { Column, Table, ColumnFiltersState, FilterFn, ColumnDef } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Type Imports
import type { TemplateDataType } from './types'

// Component Imports
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import CreateTemplateModal from './CreateTemplateModal'

// Service Imports
import { getTemplatesByTeamId, deleteTemplate } from '@/services/templateService'

// Icon Imports
import ChevronRight from '@menu/svg/ChevronRight'

// Style Imports
import styles from '@core/styles/table.module.css'

// Column Definitions
const columnHelper = createColumnHelper<TemplateDataType>()

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const fuzzyFilter: FilterFn<TemplateDataType> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const TemplateTable = () => {
  // Session data
  const { data: session, status } = useSession()
  
  // States
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [data, setData] = useState<TemplateDataType[]>([])
  const [loading, setLoading] = useState(false)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

  // Handle dialog open/close
  const handleCreateDialogOpen = () => {
    setCreateDialogOpen(true)
  }

  const handleCreateDialogClose = () => {
    setCreateDialogOpen(false)
  }

  const handleDeleteDialogOpen = (id: string) => {
    setSelectedItemId(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false)
    setSelectedItemId(null)
  }

  // Delete template
  const handleDeleteTemplate = async () => {
    if (!selectedItemId) return
    if (status === 'loading') return   

    try {
      setLoading(true)
      await deleteTemplate(selectedItemId)
      
      // Close dialog
      handleDeleteDialogClose()
      
      // Refresh data
      fetchData()
    } catch (error) {
      console.error('Error deleting template:', error)
    } finally {
      setLoading(false)
    }
  }

  // Bọc fetchData trong useCallback để tránh tạo hàm mới mỗi lần render
  const fetchData = useCallback(async () => {
    if (status === 'loading') return
    
    const team_id = session?.user?.team_id
    if (!team_id) {
      console.error('No team ID available')
      setLoading(false)
      return
    }
    
    try {
      setLoading(true)
      const templates = await getTemplatesByTeamId(team_id)
      setData(templates as TemplateDataType[])
    } catch (error) {
      console.error('Error fetching template data:', error)
      setData([])
    } finally {
      setLoading(false)
    }
  }, [session, status])

  // Define columns outside of render cycle
  const columns = useMemo<ColumnDef<TemplateDataType, any>[]>(
    () => [
      columnHelper.accessor('id', {
        cell: info => info.getValue(),
        header: 'ID'
      }),
      columnHelper.accessor('template_name', {
        cell: info => info.getValue(),
        header: 'Template Name'
      }),
      columnHelper.accessor('user_name', {
        cell: info => info.getValue(),
        header: 'User'
      }),
      columnHelper.accessor('product_type_name', {
        cell: info => info.getValue(),
        header: 'Product Type'
      }),
      columnHelper.accessor('description', {
        cell: info => {
          const description = info.getValue();
          // Handle long descriptions
          if (description && description.length > 50) {
            return (
              <Tooltip title={description}>
                <span>{description.substring(0, 50)}...</span>
              </Tooltip>
            );
          }
          return description || '';
        },
        header: 'Description'
      }),
      columnHelper.accessor('template_link', {
        cell: info => info.getValue() ? <a href={info.getValue()} target="_blank" rel="noopener noreferrer">View Template</a> : '',
        header: 'Template Link'
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: info => (
          <Tooltip title="Delete">
            <IconButton 
              color="error" 
              onClick={() => handleDeleteDialogOpen(info.row.original.id)}
            >
              <i className='tabler-trash text-danger' />
            </IconButton>
          </Tooltip>
        )
      })
    ],
    []
  )

  // Initialize table with empty data initially
  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      columnFilters,
      globalFilter
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  // Sau đó, trong useEffect, không cần đưa fetchData vào dependencies
  useEffect(() => {
    if (status === 'loading') return
    if (!session?.user?.team_id) return
    
    fetchData()
  }, [session, status, fetchData])

  // Handle template creation success
  const handleCreateSuccess = () => {
    fetchData()
  }

  return (
    <Card>
      <CardHeader
        title='Templates'
        action={
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateDialogOpen}
            startIcon={<i className='tabler-plus' />}
            disabled={!session?.user?.team_id}
          >
            Create Template
          </Button>
        }
      />
      <div className='overflow-x-auto'>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <ChevronRight fontSize='1.25rem' className='-rotate-90' />,
                              desc: <ChevronRight fontSize='1.25rem' className='rotate-90' />
                            }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  Loading data...
                </td>
              </tr>
            </tbody>
          ) : !session?.user?.team_id ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  No team ID available. Please ensure you&apos;re logged in with the correct account.
                </td>
              </tr>
            </tbody>
          ) : table.getFilteredRowModel().rows.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  No data available
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table.getRowModel().rows.map(row => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => {
                      return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          )}
        </table>
      </div>
      <TablePagination
        component={() => <TablePaginationComponent table={table} />}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
      />

      {/* Create Template Modal */}
      <CreateTemplateModal 
        open={createDialogOpen} 
        onClose={handleCreateDialogClose} 
        onSuccess={handleCreateSuccess} 
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete Template</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this template? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDeleteTemplate}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default TemplateTable
