'use client'

// React Imports
import { useState, useMemo, useEffect } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import TablePagination from '@mui/material/TablePagination'
import { styled } from '@mui/material/styles'
import type { TextFieldProps } from '@mui/material/TextField'

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
import type { UsersType } from '@/types/apps/userTypes'
import type { Locale } from '@configs/i18n'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import OptionMenu from '@core/components/option-menu'
import CustomTextField from '@core/components/mui/TextField'
import TablePaginationComponent from '@components/TablePaginationComponent'

// Util Imports
import { getInitials } from '@/utils/getInitials'
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type UsersTypeWithAction = UsersType & {
  action?: string
}

type UserRoleType = {
  [key: string]: { icon: string; color: string }
}

type UserStatusType = {
  [key: string]: ThemeColor
}

// Styled Components
const Icon = styled('i')({})

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
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
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Vars
const userRoleObj: UserRoleType = {
  admin: { icon: 'tabler-crown', color: 'primary' },
  author: { icon: 'tabler-device-desktop', color: 'error' },
  editor: { icon: 'tabler-edit', color: 'warning' },
  maintainer: { icon: 'tabler-chart-pie', color: 'info' },
  subscriber: { icon: 'tabler-user', color: 'success' }
}

const userStatusObj: UserStatusType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// Column Definitions
const columnHelper = createColumnHelper<UsersTypeWithAction>()

const RolesTable = ({ tableData }: { tableData?: UsersType[] }) => {
  // States
  const [role, setRole] = useState<string>('')
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(...[tableData])
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')

  // Hooks
  const params = useParams()
  const locale = params?.lang as string

  // const columns = useMemo<ColumnDef<UsersTypeWithAction, any>[]>(
  //   () => [
  //     {
  //       id: 'select',
  //       header: ({ table }) => (
  //         <Checkbox
  //           {...{
  //             checked: table.getIsAllRowsSelected(),
  //             indeterminate: table.getIsSomeRowsSelected(),
  //             onChange: table.getToggleAllRowsSelectedHandler()
  //           }}
  //         />
  //       ),
  //       cell: ({ row }) => (
  //         <Checkbox
  //           {...{
  //             checked: row.getIsSelected(),
  //             disabled: !row.getCanSelect(),
  //             indeterminate: row.getIsSomeSelected(),
  //             onChange: row.getToggleSelectedHandler()
  //           }}
  //         />
  //       )
  //     },
  //     columnHelper.accessor('data.name', {
  //       header: 'User',
  //       cell: ({ row }) => (
  //         <div className='flex items-center gap-4'>
  //           {getAvatar({ avatar: row.original.data[0].avatar, name: row.original.data[0].name })}
  //           <div className='flex flex-col'>
  //             <Typography className='font-medium' color='text.primary'>
  //               {row.original.data[0].name}
  //             </Typography>
  //             <Typography variant='body2'>{row.original.data[0].email}</Typography>
  //           </div>
  //         </div>
  //       )
  //     }),
  //     columnHelper.accessor('data.role', {
  //       header: 'Role',
  //       cell: ({ row }) => (
  //         <div className='flex items-center gap-2'>
  //           <Icon
  //             className={userRoleObj[row.original.data[0].role == '' ? 'Other' : row.original.data[0].role].icon}
  //             sx={{
  //               color: `var(--mui-palette-${userRoleObj[row.original.data[0].role == '' ? 'Other' : row.original.data[0].role].color}-main)`
  //             }}
  //           />
  //           <Typography className='capitalize' color='text.primary'>
  //             {row.original.data[0].role == '' ? 'Other' : row.original.data[0].role}
  //           </Typography>
  //         </div>
  //       )
  //     }),
  //     columnHelper.accessor('data.status', {
  //       header: 'Status',
  //       cell: ({ row }) => (
  //         <div className='flex items-center gap-3'>
  //           <Chip
  //             variant='tonal'
  //             className='capitalize'
  //             label={row.original.data[0].status}
  //             size='small'
  //             color={userStatusObj[row.original.data[0].status]}
  //           />
  //         </div>
  //       )
  //     }),
  //     columnHelper.accessor('action', {
  //       header: 'Actions',
  //       cell: ({ row }) => (
  //         <div className='flex items-center'>
  //           <IconButton
  //             onClick={() => setData(data?.filter(product => product.data[0]._id !== row.original.data[0]._id))}
  //           >
  //             <i className='tabler-trash text-textSecondary' />
  //           </IconButton>
  //           <IconButton>
  //             <Link href={getLocalizedUrl('/apps/user/view', locale as Locale)} className='flex'>
  //               <i className='tabler-eye text-textSecondary' />
  //             </Link>
  //           </IconButton>
  //           <OptionMenu
  //             iconButtonProps={{ size: 'medium' }}
  //             iconClassName='text-textSecondary'
  //             options={[
  //               {
  //                 text: 'Download',
  //                 icon: 'tabler-download',
  //                 menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
  //               },
  //               {
  //                 text: 'Edit',
  //                 icon: 'tabler-edit',
  //                 menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
  //               }
  //             ]}
  //           />
  //         </div>
  //       ),
  //       enableSorting: false
  //     })
  //   ],
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [data, filteredData]
  // )

  // const table = useReactTable({
  //   data: filteredData as UsersType[],
  //   columns,
  //   filterFns: {
  //     fuzzy: fuzzyFilter
  //   },
  //   state: {
  //     rowSelection,
  //     globalFilter
  //   },
  //   initialState: {
  //     pagination: {
  //       pageSize: 10
  //     }
  //   },
  //   enableRowSelection: true,
  //   globalFilterFn: fuzzyFilter,
  //   onRowSelectionChange: setRowSelection,
  //   getCoreRowModel: getCoreRowModel(),
  //   onGlobalFilterChange: setGlobalFilter,
  //   getFilteredRowModel: getFilteredRowModel(),
  //   getSortedRowModel: getSortedRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   getFacetedRowModel: getFacetedRowModel(),
  //   getFacetedUniqueValues: getFacetedUniqueValues(),
  //   getFacetedMinMaxValues: getFacetedMinMaxValues()
  // })

  // const getAvatar = (params: { avatar: string; name: string }) => {
  //   const { avatar, name } = params

  //   if (avatar) {
  //     return <CustomAvatar src={avatar} skin='light' size={34} />
  //   } else {
  //     return (
  //       <CustomAvatar skin='light' size={34}>
  //         {getInitials(name)}
  //       </CustomAvatar>
  //     )
  //   }
  // }

  // useEffect(() => {
  //   const filteredData = data?.filter(user => {
  //     if (role && user.data[0].role !== role) return false

  //     return true
  //   })

  //   setFilteredData(filteredData)
  // }, [role, data, setFilteredData])

  return (
    <Card>
      {/* <CardContent className='flex justify-between flex-col gap-4 items-start sm:flex-row sm:items-center'>
        <div className='flex items-center gap-2'>
          <Typography>Show</Typography>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='max-sm:is-full sm:is-[70px]'
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
        </div>
        <div className='flex gap-4 flex-col !items-start max-sm:is-full sm:flex-row sm:items-center'>
          <DebouncedInput
            value={globalFilter ?? ''}
            className='max-sm:is-full min-is-[250px]'
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search User'
          />
          <CustomTextField
            select
            value={role}
            onChange={e => setRole(e.target.value)}
            id='roles-app-role-select'
            className='max-sm:is-full sm:is-[160px]'
            slotProps={{
              select: { displayEmpty: true }
            }}
          >
            <MenuItem value=''>Select Role</MenuItem>
            <MenuItem value='admin'>Admin</MenuItem>
            <MenuItem value='author'>Author</MenuItem>
            <MenuItem value='editor'>Editor</MenuItem>
            <MenuItem value='maintainer'>Maintainer</MenuItem>
            <MenuItem value='subscriber'>Subscriber</MenuItem>
          </CustomTextField>
        </div>
      </CardContent> */}
      {/* <div className='overflow-x-auto'>
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
              {table
                .getRowModel()
                .rows.slice(0, table.getState().pagination.pageSize)
                .map(row => {
                  return (
                    <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                      ))}
                    </tr>
                  )
                })}
            </tbody>
          )}
        </table>
      </div> */}
      {/* <TablePagination
        component={() => <TablePaginationComponent table={table} />}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
      /> */}
    </Card>
  )
}

export default RolesTable
