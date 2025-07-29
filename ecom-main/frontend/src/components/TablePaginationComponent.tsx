// MUI Imports
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// Third Party Imports
import type { useReactTable, Table } from '@tanstack/react-table'

interface TablePaginationProps {
  table: Table<any>
}

const TablePaginationComponent = ({ table }: TablePaginationProps) => {
  const { pageSize, pageIndex } = table.getState().pagination
  const totalRows = table.options.data.length
  const totalItems = (table.options.pageCount ?? 1) * pageSize

  const start = pageIndex * pageSize + 1
  const end = Math.min(totalItems, (pageIndex + 1) * pageSize)

  return (
    <div className='flex items-center justify-between gap-4 p-4'>
      <Typography variant='body2'>
        Showing {start} to {end > totalRows ? totalRows : end} of {totalRows} entries
      </Typography>
      <div className='flex items-center gap-2'>
        <Pagination
          count={table.getPageCount()}
          page={pageIndex + 1}
          onChange={(_, page) => {
            table.setPageIndex(page - 1)
          }}
          shape='rounded'
        />
      </div>
    </div>
  )
}

export default TablePaginationComponent
