import {
  Box,
  Chip,
  IconButton,
  Typography,
  Tooltip,
  Button,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  Stack
} from '@mui/material'
import { useState } from 'react'
import ShowDesign from './ShowDesign'
import { Design } from '../types'
import axiosInstance from '@/libs/axios'

interface DesignListProps {
  designs: Design[];
  onDelete: (id: string) => void;
  onGenerateBanner: (design: Design) => void;
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: any) => void;
  onSubmitSuccess?: () => void;
}

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return dateString;
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
    case 'done':
      return 'success';
    case 'processing':
      return 'default';
    case 'submitted':
    case 'submit':
      return 'warning';
    case 'new':
      return 'warning';
    default:
      return 'default';
  }
};

const getStatusPriority = (status: string) => {
  switch (status.toLowerCase()) {
    case 'processing':
      return 1;
    case 'new':
      return 2;
    case 'submitted':
    case 'submit':
      return 3;
    case 'completed':
    case 'done':
      return 4;
    default:
      return 5;
  }
};

const shortenLink = (link: string) => {
  if (!link) return 'N/A';
  if (link.length <= 40) return link;
  return `${link.substring(0, 20)}...${link.substring(link.length - 15)}`;
};

export const DesignList = ({
  designs,
  onDelete,
  onGenerateBanner,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
  onSubmitSuccess
}: DesignListProps) => {
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);

  const handleRowClick = (design: Design) => {
    setSelectedDesign(design);
  };

  const handleCloseDialog = () => {
    setSelectedDesign(null);
  };

  // Sắp xếp designs theo status
  const sortedDesigns = [...designs].sort((a, b) => {
    const priorityA = getStatusPriority(a.status);
    const priorityB = getStatusPriority(b.status);
    return priorityA - priorityB;
  });

  // Paginate designs
  const paginatedDesigns = sortedDesigns.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(event, value - 1);
  };

  const totalPages = Math.ceil(totalCount / rowsPerPage);

  return (
    <>
      {/* Grid Layout */}
      {paginatedDesigns.length === 0 ? (
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
            bgcolor: 'background.paper',
            borderRadius: 1,
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="h6" color="text.secondary">
                    No designs found
                  </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {paginatedDesigns.map((design) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={design._id}>
              <Card
                  sx={{ 
                    cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                    '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                    '& .design-actions': {
                      opacity: 1
                    }
                  }
                  }}
                  onClick={() => handleRowClick(design)}
                >
                {/* Banner Image */}
                <CardMedia
                      component="img" 
                  height="200"
                  image={design.banner || '/images/cards/illustration-john.png'}
                  alt={design.product_ideal_id?.title || 'Design Banner'}
                  sx={{
                    objectFit: 'cover',
                    position: 'relative'
                  }}
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.src = '/images/cards/illustration-john.png';
                      }}
                    />

                {/* Status Chip */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    zIndex: 1
                  }}
                >
                    <Chip 
                      label={design.status} 
                      color={getStatusColor(design.status)}
                      size="small"
                    sx={{ fontWeight: 'bold' }}
                  />
                </Box>

                {/* Card Content */}
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  {/* Seller Note */}
                  {design.seller_note && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Avatar sx={{ width: 24, height: 24 }}>
                        <i className="tabler-user" />
                      </Avatar>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          lineHeight: 1.4
                        }}
                      >
                        {design.seller_note}
                      </Typography>
                    </Box>
                  )}

                  {/* Created Date */}
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: 'block',
                      mt: 'auto'
                    }}
                  >
                    Created: {formatDate(design.created_at)}
                  </Typography>

                  {/* Creator Info */}
                  {design.created_by_user_name && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: 'block',
                        mt: 0.5
                      }}
                    >
                      By: {design.created_by_user_name}
                    </Typography>
                  )}
                </CardContent>

                {/* Hover Actions */}
                <Box
                  className="design-actions"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    zIndex: 2
                  }}
                >
                  <Stack direction="row" spacing={1}>
                    <Tooltip title="Generate Banner">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onGenerateBanner(design);
                        }}
                        sx={{
                          bgcolor: 'primary.main',
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'primary.dark'
                          }
                        }}
                      >
                        <i className="tabler-wand" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(design._id);
                        }}
                        sx={{
                          bgcolor: 'error.main',
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'error.dark'
                          }
                        }}
                      >
                        <i className="tabler-trash" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 3,
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 1
      }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={rowsPerPage}
            onChange={onRowsPerPageChange}
            displayEmpty
          >
            <MenuItem value={5}>5 per page</MenuItem>
            <MenuItem value={10}>10 per page</MenuItem>
            <MenuItem value={25}>25 per page</MenuItem>
            <MenuItem value={50}>50 per page</MenuItem>
          </Select>
        </FormControl>

        <Pagination
          count={totalPages}
          page={page + 1}
          onChange={handlePageChange}
          color="primary"
          showFirstButton
          showLastButton
        />

        <Typography variant="body2" color="text.secondary">
          {`${page * rowsPerPage + 1}-${Math.min((page + 1) * rowsPerPage, totalCount)} of ${totalCount}`}
        </Typography>
      </Box>

      {/* Design Detail Modal */}
      {selectedDesign && (
        <ShowDesign
          open={!!selectedDesign}
          onClose={handleCloseDialog}
          design={selectedDesign}
          onDelete={onDelete}
          onGenerateBanner={onGenerateBanner}
          onSubmitSuccess={() => {
            handleCloseDialog();
            onSubmitSuccess?.();
          }}
          onUpdate={async (id, data) => {
            // Implement update logic here
            await axiosInstance.put(`/api/authenticated/design/${id}`, data);
          }}
        />
      )}
    </>
  )
} 