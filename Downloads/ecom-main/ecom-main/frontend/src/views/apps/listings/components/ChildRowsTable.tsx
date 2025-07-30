import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Pagination, TextField } from '@mui/material';

interface ChildRowsTableProps {
    childRows: string[][];
    headers: string[];
    onCellChange: (rowIdx: number, colIdx: number, value: string) => void;
    page: number;
    setPage: (value: number) => void;
    pageSize: number;
}

const ChildRowsTable: React.FC<ChildRowsTableProps> = ({
    childRows,
    headers,
    onCellChange,
    page,
    setPage,
    pageSize
}) => {
    const pagedRows = childRows.slice((page - 1) * pageSize, page * pageSize);
    return (
        <Box sx={{ flex: 1, minWidth: 300 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Child Rows</Typography>
            {pagedRows.map((row, rowIdx) => {
                const globalIdx = (page - 1) * pageSize + rowIdx;
                return (
                    <Box key={globalIdx} sx={{ mb: 3 }}>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                            Child #{globalIdx + 1}
                        </Typography>
                        <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                            <Table size="small" stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Column Name</TableCell>
                                        <TableCell>Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {headers.map((header: string, colIdx: number) => (
                                        <TableRow key={header}>
                                            <TableCell>{header}</TableCell>
                                            <TableCell>
                                                <TextField
                                                    value={row[colIdx] || ''}
                                                    onChange={e => onCellChange(globalIdx, colIdx, e.target.value)}
                                                    size="small"
                                                    fullWidth
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                );
            })}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                <Pagination
                    count={Math.ceil(childRows.length / pageSize)}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    size="small"
                    color="primary"
                />
            </Box>
        </Box>
    );
};

export default ChildRowsTable; 