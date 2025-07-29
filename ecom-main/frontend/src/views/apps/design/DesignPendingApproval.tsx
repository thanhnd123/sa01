'use client'
import { useEffect, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Design } from './types';
import { DesignList } from './components/DesignList';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import ShowDesign from './components/ShowDesign';
import axiosInstance from '@/libs/axios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const DesignPendingApproval = () => {
    const { user } = useUser();
    const [designs, setDesigns] = useState<Design[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);

    // Lấy danh sách design status 'pending approval'
    const fetchPendingDesigns = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.get('/api/authenticated/design/pending-approval', {
                params: {
                    per_page: rowsPerPage,
                    page: page + 1,
                },
            });
            setDesigns(res.data.data || []);
        } catch (err: any) {
            setError('Failed to load pending approval designs.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingDesigns();
        // eslint-disable-next-line
    }, [page, rowsPerPage]);

    // Duyệt design (chuyển sang 'new')
    const handleApprove = async (id: string) => {
        try {
            await axiosInstance.put(`/api/authenticated/design/${id}/update`, { status: 'new' });
            fetchPendingDesigns();
        } catch (err) {
            alert('Failed to approve design!');
        }
    };

    // Từ chối design (chuyển sang 'rejected')
    const handleReject = async (id: string) => {
        try {
            await axiosInstance.put(`/api/authenticated/design/${id}/update`, { status: 'rejected' });
            fetchPendingDesigns();
        } catch (err) {
            alert('Failed to reject design!');
        }
    };

    // Chỉ cho phép admin/manager duyệt
    const canApprove = user?.role === 'manager' || user?.role === 'admin';

    if (loading) return <LoadingState />;
    if (error) return <ErrorState error={error} />;

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
                Pending Approval Designs
            </Typography>
            <DesignList
                designs={designs}
                onDelete={() => { }}
                onGenerateBanner={setSelectedDesign}
                page={page}
                rowsPerPage={rowsPerPage}
                totalCount={designs.length}
                onPageChange={(_, newPage) => setPage(newPage)}
                onRowsPerPageChange={e => setRowsPerPage(Number(e.target.value))}
                currentUser={user ? { _id: user.id, role: user.role || 'user', statusFilter: 'pending approval' } : undefined}
                onReject={handleReject}
                onApprove={canApprove ? handleApprove : undefined}
                onSubmitSuccess={fetchPendingDesigns}
                onReloadNewDesigns={fetchPendingDesigns}
            />
            {/* Dialog xem chi tiết và duyệt */}
            {selectedDesign && (
                <ShowDesign
                    open={!!selectedDesign}
                    onClose={() => setSelectedDesign(null)}
                    design={selectedDesign}
                    onDelete={() => { }}
                    onUpdate={async (id, data) => {
                        // Chỉ xử lý nếu có trường status
                        if ('status' in data) {
                            if (data.status === 'new') await handleApprove(id);
                            if (data.status === 'rejected') await handleReject(id);
                        }
                    }}
                    isAdmin={canApprove}
                    onSubmitSuccess={fetchPendingDesigns}
                />
            )}
        </Box>
    );
};

export default DesignPendingApproval; 