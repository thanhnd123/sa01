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
  Stack,
  Checkbox
} from '@mui/material'
import { useState } from 'react'
import { useAdmin, useManager } from '@/contexts/UserContext'
import ShowDesign from './ShowDesign'
import { Design } from '../types'
import axiosInstance from '@/libs/axios'

interface DesignListProps {
  designs: Design[];
  onDelete: (id: string) => void;
  onGenerateBanner: (design: Design) => void;
  onReject?: (id: string) => void;
  onBulkReject?: (ids: string[]) => void;
  onApprove?: (id: string) => void; // Thêm prop này
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: any) => void;
  onSubmitSuccess?: () => void;
  onReloadNewDesigns?: () => void;
  currentUser?: {
    _id: string;
    role: string;
    statusFilter?: string; // Thêm trạng thái lọc
  };
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
      return 'info';
    case 'submitted':
    case 'submit':
      return 'warning';
    case 'new':
      return 'warning';
    case 'pending approval':
      return 'warning';
    case 'rejected':
      return 'error';
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
  onReject,
  onBulkReject,
  onApprove,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
  onSubmitSuccess,
  onReloadNewDesigns,
  currentUser
}: DesignListProps) => {
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [selectedDesigns, setSelectedDesigns] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const isManager = useManager();
  const isAdmin = useAdmin();

  const handleRowClick = (design: Design) => {
    setSelectedDesign(design);
  };

  const handleCloseDialog = () => {
    setSelectedDesign(null);
  };

  // Kiểm tra quyền reject
  const canRejectDesign = (design: Design) => {
    if (!currentUser || !onReject) return false;

    // Manager hoặc admin có thể reject
    if (currentUser.role === 'manager' || currentUser.role === 'admin') {
      return true;
    }

    // Người tạo design có thể reject
    if (design.order_by_user_id === currentUser._id) {
      return true;
    }

    return false;
  };

  // Bulk action handlers
  const handleSelectDesign = (designId: string) => {
    setSelectedDesigns(prev =>
      prev.includes(designId)
        ? prev.filter(id => id !== designId)
        : [...prev, designId]
    );
  };

  const handleSelectAll = () => {
    if (selectedDesigns.length === paginatedDesigns.length) {
      setSelectedDesigns([]);
    } else {
      setSelectedDesigns(paginatedDesigns.map(design => design._id));
    }
  };

  const handleBulkReject = async () => {
    if (selectedDesigns.length > 0) {
      try {
        // Gửi request update cho từng design được chọn
        const updatePromises = selectedDesigns.map(designId =>
          axiosInstance.put(`/api/authenticated/design/${designId}/update`, {
            status: 'rejected'
          })
        );

        await Promise.all(updatePromises);

        // Gọi callback nếu có
        if (onBulkReject) {
          onBulkReject(selectedDesigns);
        }

        setSelectedDesigns([]);
        setSelectionMode(false);

        // Refresh data nếu có callback
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
        if (onReloadNewDesigns) {
          onReloadNewDesigns();
        }
      } catch (error) {
        console.error('Error rejecting designs:', error);
        // Có thể thêm toast notification ở đây
      }
    }
  };

  // Thêm hàm xử lý move to trash hàng loạt
  const handleBulkMoveToTrash = async () => {
    if (selectedDesigns.length > 0) {
      try {
        // Gửi request xóa cho từng design được chọn
        const deletePromises = selectedDesigns.map(designId =>
          axiosInstance.delete(`/api/authenticated/design/${designId}`)
        );
        await Promise.all(deletePromises);
        setSelectedDesigns([]);
        setSelectionMode(false);
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
        if (onReloadNewDesigns) {
          onReloadNewDesigns();
        }
      } catch (error) {
        console.error('Error moving designs to trash:', error);
      }
    }
  };

  const handleToggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    if (!selectionMode) {
      setSelectedDesigns([]);
    }
  };

  const handleClearSelection = () => {
    setSelectedDesigns([]);
    setSelectionMode(false);
  };

  // Sắp xếp designs theo status
  // Nếu không filter status (All), loại bỏ deleted và rejected
  let filteredDesigns = designs;
  if (!currentUser?.statusFilter || currentUser?.statusFilter === '') {
    filteredDesigns = designs.filter(d => d.status !== 'deleted' && d.status !== 'rejected');
  } else if (currentUser.statusFilter === 'deleted') {
    filteredDesigns = designs.filter(d => d.status === 'deleted');
  }
  const sortedDesigns = [...filteredDesigns].sort((a, b) => {
    const priorityA = getStatusPriority(a.status);
    const priorityB = getStatusPriority(b.status);
    return priorityA - priorityB;
  });

  // Sử dụng designs đã được paginate từ backend, không paginate lại
  const paginatedDesigns = sortedDesigns;

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(event, value - 1);
  };

  const totalPages = Math.ceil(totalCount / rowsPerPage);

  return (
    <>
      {/* Selection Mode Indicator */}
      {selectionMode && (
        <Box sx={{
          mb: 2,
          p: 2,
          bgcolor: 'warning.light',
          color: 'warning.contrastText',
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <i className="tabler-check" />
            <Typography variant="body2">
              Selection Mode - Hover cards to see checkboxes
            </Typography>
          </Box>
          <Button
            size="small"
            variant="outlined"
            onClick={handleToggleSelectionMode}
            sx={{ color: 'inherit', borderColor: 'inherit' }}
          >
            Exit Mode
          </Button>
        </Box>
      )}

      {/* Bulk Actions - Floating Center */}
      {selectedDesigns.length > 0 && (
        <Box sx={{
          position: 'fixed',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 4,
          border: '1px solid',
          borderColor: 'divider',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          minWidth: 300
        }}>
          <Typography variant="body2" color="text.secondary">
            {selectedDesigns.length} selected
          </Typography>

          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={handleBulkReject}
            startIcon={<i className="tabler-x" />}
          >
            Reject
          </Button>

          <Button
            size="small"
            variant="contained"
            color="warning"
            onClick={handleBulkMoveToTrash}
            startIcon={<i className="tabler-trash" />}
          >
            Move to Trash
          </Button>

          <Button
            size="small"
            variant="outlined"
            onClick={handleClearSelection}
          >
            Clear
          </Button>

          <Button
            size="small"
            variant="outlined"
            onClick={handleSelectAll}
            startIcon={<i className="tabler-check" />}
          >
            Select All
          </Button>
        </Box>
      )}

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
              <Box
                sx={{
                  position: 'relative',
                  '&:hover .hover-checkbox': {
                    opacity: 1
                  }
                }}
              >
                {/* Hover Selection Checkbox */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    zIndex: 4,
                    bgcolor: selectedDesigns.includes(design._id)
                      ? 'rgba(25, 118, 210, 0.2)'
                      : 'rgba(255, 255, 255, 0.98)',
                    borderRadius: '4px',
                    backdropFilter: 'blur(4px)',
                    border: selectedDesigns.includes(design._id)
                      ? '2px solid rgba(25, 118, 210, 0.5)'
                      : '1px solid rgba(0, 0, 0, 0.15)',
                    opacity: (selectedDesigns.includes(design._id) || selectionMode) ? 1 : 0,
                    transition: 'opacity 0.2s ease, transform 0.2s ease, background-color 0.2s ease',
                    cursor: 'pointer',
                    padding: '2px',
                    '&:hover': {
                      bgcolor: selectedDesigns.includes(design._id)
                        ? 'rgba(25, 118, 210, 0.3)'
                        : 'rgba(255, 255, 255, 1)',
                      transform: 'scale(1.05)'
                    }
                  }}
                  className="hover-checkbox"
                >
                  <Checkbox
                    checked={selectedDesigns.includes(design._id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleSelectDesign(design._id);
                    }}
                    size="small"
                    sx={{
                      color: 'rgba(0, 0, 0, 0.7)',
                      '&.Mui-checked': {
                        color: '#000000'
                      },
                      '&:hover': {
                        backgroundColor: 'transparent'
                      },
                      '& .MuiSvgIcon-root': {
                        fontSize: '18px'
                      }
                    }}
                  />
                </Box>

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

                  {/* Card Content */}
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    {/* Seller Note */}
                    {design.seller_note && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        {/* <Avatar sx={{ width: 24, height: 24 }}>
                          <i className="tabler-user" />
                        </Avatar> */}
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            lineHeight: 1.2,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {design.seller_note}
                        </Typography>
                      </Box>
                    )}
                    {/* Creator Info */}
                    {design.created_by_user_name && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        title={"Created by " + design.created_by_user_name}
                        sx={{
                          fontSize: '.8em',
                          display: 'block',
                          mt: 0.5
                        }}
                      >
                        By: {design.created_by_user_name}
                      </Typography>
                    )}
                    {/* Created Date */}
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      title={"Created at"}
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        fontSize: '.7em',
                        display: 'block',
                        mt: 'auto'
                      }}
                    >
                      {formatDate(design.created_at)}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      title={"Design by " + design.designer_name}
                      sx={{
                        fontSize: '.8em',
                        display: 'block',
                        mt: 'auto'
                      }}
                    >
                      {design.designer_name != "" && (
                        <>
                          Design by: {design.designer_name}
                        </>
                      )}
                    </Typography>
                  </CardContent>


                  {/* Hover Actions */}
                  <Box
                    className="design-actions"
                    sx={{
                      fontSize: '12px',
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      zIndex: 2
                    }}
                  >
                    <Stack direction="row" spacing={1}>

                      {/* Reject Action - Chỉ hiện cho manager/admin hoặc người tạo */}
                      {canRejectDesign(design) && (
                        <Tooltip title="Reject Design">
                          <IconButton
                            size="small"
                            onClick={async (e) => {
                              e.stopPropagation();
                              try {
                                await axiosInstance.put(`/api/authenticated/design/${design._id}/update`, {
                                  status: 'rejected'
                                });

                                // Gọi callback nếu có
                                if (onReject) {
                                  onReject(design._id);
                                }

                                // Refresh data nếu có callback
                                if (onSubmitSuccess) {
                                  onSubmitSuccess();
                                }
                                if (onReloadNewDesigns) {
                                  onReloadNewDesigns();
                                }
                              } catch (error) {
                                console.error('Error rejecting design:', error);
                                // Có thể thêm toast notification ở đây
                              }
                            }}
                            sx={{
                              bgcolor: 'error.main',
                              color: 'white',
                              '&:hover': {
                                bgcolor: 'error.dark'
                              }
                            }}
                          >
                            <i className="tabler-x" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Stack>
                  </Box>
                </Card>

                {/* Status Chip and Actions - Always visible */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    zIndex: 3,
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center'
                  }}
                >
                  {/* Reject Action - Always visible for authorized users */}
                  {canRejectDesign(design) && (
                    <Tooltip title="Reject Design">
                      <IconButton
                        size="small"
                        onClick={async (e) => {
                          e.stopPropagation();
                          try {
                            await axiosInstance.put(`/api/authenticated/design/${design._id}/update`, {
                              status: 'rejected'
                            });

                            // Gọi callback nếu có
                            if (onReject) {
                              onReject(design._id);
                            }

                            // Refresh data nếu có callback
                            if (onSubmitSuccess) {
                              onSubmitSuccess();
                            }
                            if (onReloadNewDesigns) {
                              onReloadNewDesigns();
                            }
                          } catch (error) {
                            console.error('Error rejecting design:', error);
                            // Có thể thêm toast notification ở đây
                          }
                        }}
                        sx={{
                          bgcolor: 'error.main',
                          color: 'white',
                          width: 24,
                          height: 24,
                          '&:hover': {
                            bgcolor: 'error.dark'
                          }
                        }}
                      >
                        <i className="tabler-x" style={{ fontSize: '12px' }} />
                      </IconButton>
                    </Tooltip>
                  )}

                  {canRejectDesign(design) && design.status === 'pending approval' && onApprove && (
                    <Tooltip title="Duyệt Design">
                      <IconButton
                        size="small"
                        onClick={async (e) => {
                          e.stopPropagation();
                          await onApprove(design._id);
                        }}
                        sx={{
                          bgcolor: 'success.main',
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'success.dark'
                          }
                        }}
                      >
                        <i className="tabler-check" />
                      </IconButton>
                    </Tooltip>
                  )}

                  <Chip
                    label={design.status}
                    color={getStatusColor(design.status)}
                    size="small"
                    sx={{
                      fontWeight: 'bold'
                    }}
                  />
                </Box>
              </Box>
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
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={rowsPerPage}
              onChange={onRowsPerPageChange}
              displayEmpty
            >
              <MenuItem value={25}>25 per page</MenuItem>
              <MenuItem value={50}>50 per page</MenuItem>
            </Select>
          </FormControl>


        </Box>

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
          isManager={isManager}
          isAdmin={isAdmin}
          onGenerateBanner={onGenerateBanner}
          onSubmitSuccess={() => {
            handleCloseDialog();
            onSubmitSuccess?.();
          }}
          onUpdate={async (id, data) => {
            // Implement update logic here
            await axiosInstance.put(`/api/authenticated/design/${id}/update`, data);
          }}
        />
      )}
    </>
  )
} 