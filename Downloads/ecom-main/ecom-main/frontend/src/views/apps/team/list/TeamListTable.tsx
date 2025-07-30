'use client'

// React Imports
import React, { useEffect, useState, useMemo } from 'react'

// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination'
import type { TextFieldProps } from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    getPaginationRowModel,
    getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Type Imports
import type { ThemeColor } from '@core/types'
import type { Team, TeamResponse, TeamApiResponse } from '@/types/apps/teamTypes'

// Component Imports
import AddTeamDialog from './AddTeamDialog'
import EditTeamDialog from './EditTeamDialog'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import { toast } from 'react-toastify'
import axiosInstance from '@/libs/axios'

declare module '@tanstack/table-core' {
    interface FilterFns {
        fuzzy: FilterFn<unknown>
    }
    interface FilterMeta {
        itemRank: RankingInfo
    }
}

type TeamsTypeWithAction = Team & {
    action?: string
}

type TeamStatusType = {
    [key: string]: ThemeColor
}

// Styled Components
const Icon = styled('i')({})

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({
        itemRank
    })
    return itemRank.passed
}

const DebouncedInput = ({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value])

    return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Vars
const teamStatusObj: TeamStatusType = {
    'active': 'success',
    'inactive': 'secondary'
}

// Column Definitions
const columnHelper = createColumnHelper<TeamsTypeWithAction>()

// API Functions
const getTeamData = async (limit: number = 25, page: number = 1, search: string = ''): Promise<TeamResponse> => {
    try {
        const response = await axiosInstance.get<TeamResponse>('/api/authenticated/teams', {
            params: {
                limit,
                page,
                search
            }
        })
        return response.data
    } catch (error) {
        console.error('Error fetching team data:', error)
        throw error
    }
}

const deleteTeam = async (teamData: Team): Promise<TeamApiResponse> => {
    try {
        const response = await axiosInstance.post<TeamApiResponse>('/api/authenticated/teams/delete', teamData)
        return response.data
    } catch (error) {
        console.error('Error deleting team:', error)
        throw error
    }
}

const TeamListTable = () => {
    // States
    const [addTeamOpen, setAddTeamOpen] = useState(false)
    const [editTeamOpen, setEditTeamOpen] = useState(false)
    const [rowSelection, setRowSelection] = useState({})
    const [data, setData] = useState<Team[]>([])
    const [filteredData, setFilteredData] = useState<Team[]>(data)
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [perPage, setPerPage] = useState<number>(25)
    const [totalItems, setTotalItems] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(Math.ceil(totalItems / (perPage || 25)))
    const [dataUpdate, setDataUpdate] = useState<Team>()

    // Fetch initial data
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await getTeamData(perPage, currentPage)
                setData(response.data)
                setFilteredData(response.data)
                setTotalItems(response.total)
                setTotalPages(Math.ceil(response.total / perPage))
            } catch (error) {
                console.error('Error fetching initial data:', error)
                toast.error('Failed to fetch teams')
            }
        }

        fetchInitialData()
    }, [])

    const handleDeleteTeam = async (teamData: Team) => {
        const apiRequest = await deleteTeam(teamData)
        toast.info("Team deleted successfully")
        const newData = await getTeamData(perPage, 1)
        setData(newData.data)
        setFilteredData(newData.data)
        setTotalItems(newData.total)
        setTotalPages(Math.ceil(newData.total / Number(perPage)))
    }

    const columns = useMemo<ColumnDef<TeamsTypeWithAction, any>[]>(
        () => [
            columnHelper.accessor('name', {
                header: 'Team Name',
                cell: ({ row }) => (
                    <Typography color='text.primary' className='font-medium'>
                        {row.original.name}
                    </Typography>
                )
            }),
            columnHelper.accessor('description', {
                header: 'Description',
                cell: ({ row }) => (
                    <Typography color='text.primary'>
                        {row.original.description ?? '-'}
                    </Typography>
                )
            }),
            columnHelper.accessor('status', {
                header: 'Status',
                cell: ({ row }) => (
                    <div className='flex items-center gap-3'>
                        <Chip
                            variant='tonal'
                            label={row.original.status}
                            size='small'
                            color={teamStatusObj[row.original.status ?? 'active']}
                            className='capitalize'
                        />
                    </div>
                )
            }),
            columnHelper.accessor('action', {
                header: 'Action',
                cell: ({ row }) => (
                    <div className='flex items-center'>
                        <IconButton onClick={() => {
                            setEditTeamOpen(true)
                            setDataUpdate(row.original)
                        }}>
                            <i className='tabler-edit text-textSecondary' />
                        </IconButton>
                        <IconButton onClick={() => {
                            handleDeleteTeam(row.original)
                        }}>
                            <i className='tabler-trash text-textSecondary' />
                        </IconButton>
                    </div>
                ),
                enableSorting: false
            })
        ],
        [data, filteredData]
    )

    const table = useReactTable({
        data: filteredData,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter
        },
        state: {
            pagination: {
                pageSize: perPage,
                pageIndex: currentPage - 1
            },
            rowSelection,
            globalFilter: ''
        },
        initialState: {
            pagination: {
                pageSize: perPage,
                pageIndex: currentPage - 1
            }
        },
        manualPagination: true,
        pageCount: totalPages,
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues()
    })

    const handleChangeLimitPage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const valueLimit: number = parseInt(e.target.value)
        const newData = await getTeamData(valueLimit, 1)

        setData(newData.data)
        setFilteredData(newData.data)
        setTotalItems(newData.total)
        setPerPage(Number(valueLimit))
        setCurrentPage(1)
        setTotalPages(Math.ceil(newData.total / Number(valueLimit)))
    }

    const handlePageChange = async (_: any, page: number) => {
        const newData = await getTeamData(perPage, page + 1)

        setData(newData.data)
        setFilteredData(newData.data)
        setTotalItems(newData.total)
        setCurrentPage(page + 1)
        table.setPageIndex(page)
    }

    const handleSearchTeam = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newData = await getTeamData(perPage, 1, search)

        setData(newData.data)
        setFilteredData(newData.data)
        setTotalItems(newData.total)
    }

    const handleReload = async () => {
        const newData = await getTeamData(perPage, currentPage)
        setData(newData.data)
        setFilteredData(newData.data)
        setTotalItems(newData.total)
        setTotalPages(Math.ceil(newData.total / Number(perPage)))
    }

    return (
        <>
            <Card>
                <CardHeader
                    title='Teams'
                    className='pbe-4'
                    action={
                        <Button
                            variant='outlined'
                            className='p-1'
                            onClick={handleReload}
                        >
                            <i className='tabler-refresh' />
                        </Button>
                    }
                />
                <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
                    <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
                        <Button
                            variant='contained'
                            startIcon={<i className='tabler-plus' />}
                            onClick={() => setAddTeamOpen(!addTeamOpen)}
                            className='max-sm:is-full'
                        >
                            Add New Team
                        </Button>
                    </div>
                    <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
                        <form onSubmit={handleSearchTeam} className='flex items-center gap-2'>
                            <DebouncedInput
                                value={search}
                                onChange={value => setSearch(String(value))}
                                placeholder='Search Team'
                                className='max-sm:is-full'
                                sx={{ height: '40px' }}
                            />
                            <Button
                                type='submit'
                                variant='outlined'
                                className='p-1'
                                sx={{ minWidth: '56px', height: '40px' }}
                            >
                                <i className='tabler-search' />
                            </Button>
                        </form>
                    </div>
                </div>
                <div className='overflow-x-auto'>
                    <table className={tableStyles.table}>
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
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
                                                            asc: <i className='tabler-chevron-up text-xl' />,
                                                            desc: <i className='tabler-chevron-down text-xl' />
                                                        }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                                                    </div>
                                                </>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        {table.getFilteredRowModel().rows.length === 0 ? (
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
                                        <tr key={row.original._id} className={classnames({ selected: row.getIsSelected() })}>
                                            {row.getVisibleCells().map(cell => (
                                                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                                            ))}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        )}
                    </table>
                </div>
                <div className='flex justify-end p-4'>
                    <TablePagination
                        component={() => (
                            <TablePaginationComponent
                                table={{
                                    ...table,
                                    options: {
                                        ...table.options,
                                        data: filteredData,
                                        pageCount: Math.ceil(totalItems / perPage)
                                    },
                                    getState: () => ({
                                        ...table.getState(),
                                        pagination: {
                                            pageSize: perPage,
                                            pageIndex: currentPage - 1
                                        }
                                    }),
                                    setPageIndex: async (updater: number | ((old: number) => number)) => {
                                        const newIndex = typeof updater === 'function' ? updater(currentPage - 1) : updater
                                        await handlePageChange(null, newIndex)
                                    }
                                }}
                            />
                        )}
                        count={totalItems}
                        rowsPerPage={perPage}
                        page={currentPage - 1}
                        onPageChange={handlePageChange}
                        rowsPerPageOptions={[25, 50, 100]}
                        onRowsPerPageChange={handleChangeLimitPage}
                    />
                </div>
            </Card>
            <AddTeamDialog
                open={addTeamOpen}
                handleClose={() => setAddTeamOpen(false)}
                onSuccess={async () => {
                    const newData = await getTeamData(perPage, currentPage)
                    setData(newData.data)
                    setFilteredData(newData.data)
                    setTotalItems(newData.total)
                    setTotalPages(Math.ceil(newData.total / perPage))
                }}
            />
            <EditTeamDialog
                open={editTeamOpen}
                handleClose={() => setEditTeamOpen(false)}
                onSuccess={async () => {
                    const newData = await getTeamData(perPage, currentPage)
                    setData(newData.data)
                    setFilteredData(newData.data)
                    setTotalItems(newData.total)
                    setTotalPages(Math.ceil(newData.total / perPage))
                }}
                dataUpdate={dataUpdate!}
            />
        </>
    )
}

export default TeamListTable 