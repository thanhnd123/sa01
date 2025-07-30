import React from 'react';
import { Card, CardContent, Typography, Box, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemIcon, ListItemText, Chip, Button } from '@mui/material';
import {
    Book as BookIcon,
    ExpandMore as ExpandMoreIcon,
    CheckCircle as CheckCircleIcon,
    Download as DownloadIcon,
    Image as ImageIcon,
    Extension as ExtensionIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const TutorialsPage: React.FC = () => {
    const handleDownloadExtension = async () => {
        try {
            // Lấy base URL từ environment hoặc sử dụng localhost
            const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            
            // Tạo URL download
            const downloadURL = `${baseURL}/file/download-extension`;
            
            // Thử download trực tiếp trước
            try {
                const response = await fetch(downloadURL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/zip',
                    },
                });
                
                if (response.ok) {
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'crawl_ideal_v3_1.zip';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                    
                    // Thông báo thành công
                    setTimeout(() => {
                        toast.success('Extension đã được tải thành công! Vui lòng kiểm tra thư mục Downloads.');
                    }, 500);
                    return;
                }
            } catch (fetchError) {
                console.log('Fetch failed, trying direct link method...');
            }
            
            // Fallback: Mở link trực tiếp trong tab mới
            const link = document.createElement('a');
            link.href = downloadURL;
            link.download = 'crawl_ideal_v3_1.zip';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            
            // Thêm vào DOM và click
            document.body.appendChild(link);
            link.click();
            
            // Xóa link khỏi DOM sau một chút
            setTimeout(() => {
                document.body.removeChild(link);
            }, 100);
            
            // Thông báo hướng dẫn
            setTimeout(() => {
                toast.info('Nếu file không tự động tải, vui lòng kiểm tra popup blocker hoặc cho phép popup cho trang này');
            }, 1000);
            
        } catch (error) {
            console.error('Lỗi khi download extension:', error);
            toast.error('Có lỗi xảy ra khi tải extension. Vui lòng thử lại sau.');
        }
    };

    const tutorials = [
        {
            id: '1',
            title: 'Hướng dẫn cài đặt Extension',
            description: 'Cài đặt và cấu hình extension để tạo banner tự động',
            difficulty: 'beginner',
            duration: 10,
            category: 'setup',
            content: [
                {
                    step: 1,
                    title: 'Tải extension',
                    description: 'Tải file extension từ link được cung cấp',
                    details: [
                        'Nhấn vào nút "Download Extension" bên dưới',
                        'Lưu file .zip vào máy tính',
                        'Giải nén file vào thư mục mong muốn'
                    ]
                },
                {
                    step: 2,
                    title: 'Cài đặt vào trình duyệt',
                    description: 'Thêm extension vào trình để sử dụng',
                    details: [
                        'Mở trình duyệt Chrome và truy cập: ',
                        'click: Load unpacked',
                        'Chọn thư mục chứa extension đã giải nén',
                        'click: Restart trình duyệt để áp dụng'
                    ]
                },
                {
                    step: 3,
                    title: 'Cấu hình ban đầu',
                    description: 'Thiết lập các thông số cơ bản',
                    details: [
                        'Mở extension từ menu Window > Extensions',
                        'Nhập thông tin API key (nếu có)',
                        'Chọn thư mục lưu trữ banner',
                        'Kiểm tra kết nối với server'
                    ]
                }
            ]
        },
        // {
        //     id: '2',
        //     title: 'Hướng dẫn tạo Banner từ PNG và Ideal',
        //     description: 'Tạo banner đẹp từ file PNG và thông tin ideal',
        //     difficulty: 'intermediate',
        //     duration: 15,
        //     category: 'banner',
        //     content: [
        //         {
        //             step: 1,
        //             title: 'Chuẩn bị file PNG',
        //             description: 'Chuẩn bị file hình ảnh sản phẩm',
        //             details: [
        //                 'Đảm bảo file PNG có nền trong suốt',
        //                 'Kích thước khuyến nghị: 800x800px trở lên',
        //                 'Chất lượng hình ảnh cao (300 DPI)',
        //                 'Đặt tên file theo quy tắc: product_name.png'
        //             ]
        //         },
        //         {
        //             step: 2,
        //             title: 'Tạo Ideal mới',
        //             description: 'Tạo ideal với thông tin sản phẩm',
        //             details: [
        //                 'Đăng nhập vào hệ thống',
        //                 'Vào menu "Ideals" > "Tạo mới"',
        //                 'Nhập thông tin sản phẩm: tên, mô tả, giá',
        //                 'Upload file PNG đã chuẩn bị',
        //                 'Chọn category và tags phù hợp'
        //             ]
        //         },
        //         {
        //             step: 3,
        //             title: 'Chọn template banner',
        //             description: 'Chọn mẫu banner phù hợp với sản phẩm',
        //             details: [
        //                 'Trong ideal, chọn tab "Banners"',
        //                 'Xem trước các template có sẵn',
        //                 'Chọn template phù hợp với style sản phẩm',
        //                 'Có thể tùy chỉnh màu sắc và font chữ'
        //             ]
        //         },
        //         {
        //             step: 4,
        //             title: 'Tạo banner tự động',
        //             description: 'Sử dụng extension để tạo banner',
        //             details: [
        //                 'Mở extension trong Photoshop',
        //                 'Chọn ideal cần tạo banner',
        //                 'Chọn template đã chọn',
        //                 'Nhấn "Generate Banner"',
        //                 'Chờ quá trình xử lý hoàn tất'
        //             ]
        //         },
        //         {
        //             step: 5,
        //             title: 'Kiểm tra và xuất bản',
        //             description: 'Kiểm tra kết quả và xuất bản banner',
        //             details: [
        //                 'Xem lại banner đã tạo',
        //                 'Điều chỉnh nếu cần thiết',
        //                 'Lưu banner với định dạng phù hợp',
        //                 'Upload lên hệ thống hoặc sử dụng trực tiếp'
        //             ]
        //         }
        //     ]
        // }
    ];

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner':
                return 'success';
            case 'intermediate':
                return 'warning';
            case 'advanced':
                return 'error';
            default:
                return 'default';
        }
    };

    const getDifficultyLabel = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner':
                return 'Cơ bản';
            case 'intermediate':
                return 'Trung bình';
            case 'advanced':
                return 'Nâng cao';
            default:
                return difficulty;
        }
    };

    return (
        <Card>
            <CardContent>
                {/* Header Section */}
                <Box display="flex" alignItems="center" gap={2} mb={6}>
                    <BookIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                    <Box>
                        <Typography variant="h4" fontWeight="bold">
                            Hướng dẫn sử dụng
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Các hướng dẫn chi tiết để sử dụng hệ thống hiệu quả
                        </Typography>
                    </Box>
                </Box>

                {/* Tutorials List */}
                <Box>
                    {tutorials.map((tutorial) => (
                        <Accordion key={tutorial.id} sx={{ mb: 2 }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Box display="flex" alignItems="center" gap={2} width="100%">
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">
                                            {tutorial.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {tutorial.description}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" gap={1} ml="auto">
                                        <Chip
                                            label={getDifficultyLabel(tutorial.difficulty)}
                                            color={getDifficultyColor(tutorial.difficulty) as any}
                                            size="small"
                                        />
                                        <Chip
                                            label={`${tutorial.duration} phút`}
                                            variant="outlined"
                                            size="small"
                                        />
                                    </Box>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box>
                                    {tutorial.content.map((step) => (
                                        <Box key={step.step} mb={3}>
                                            <Box display="flex" alignItems="center" gap={2} mb={2}>
                                                <Chip
                                                    label={`Bước ${step.step}`}
                                                    color="primary"
                                                    size="small"
                                                />
                                                <Typography variant="h6" fontWeight="bold">
                                                    {step.title}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body1" color="textSecondary" mb={2}>
                                                {step.description}
                                            </Typography>
                                            <List dense>
                                                {step.details.map((detail, index) => (
                                                    <ListItem key={index} sx={{ py: 0.5 }}>
                                                        <ListItemIcon sx={{ minWidth: 32 }}>
                                                            <CheckCircleIcon color="success" fontSize="small" />
                                                        </ListItemIcon>
                                                        <ListItemText 
                                                            primary={
                                                                step.step === 2 && index === 0 ? (
                                                                    <Box display="flex" alignItems="center" gap={1}>
                                                                        <span>Mở trình duyệt Chrome và truy cập: </span>
                                                                        <Button
                                                                            variant="text"
                                                                            color="primary"
                                                                            size="small"
                                                                            onClick={() => {
                                                                                // Copy URL to clipboard
                                                                                navigator.clipboard.writeText('chrome://extensions/');
                                                                                alert('Đã copy link chrome://extensions/ vào clipboard. Vui lòng paste vào thanh địa chỉ của Chrome để truy cập.');
                                                                            }}
                                                                            sx={{ 
                                                                                textTransform: 'none',
                                                                                p: 0,
                                                                                minWidth: 'auto',
                                                                                textDecoration: 'underline'
                                                                            }}
                                                                        >
                                                                            chrome://extensions/
                                                                        </Button>
                                                                    </Box>
                                                                ) : (
                                                                    detail
                                                                )
                                                            } 
                                                        />
                                                    </ListItem>
                                                ))}
                                            </List>
                                            
                                            {/* Download Extension Button for Step 1 */}
                                            {step.step === 1 && tutorial.id === '1' && (
                                                                                                 <Box display="flex" flexDirection="column" gap={2} mt={2}>
                                                    <Button
                                                        variant="contained"
                                                        startIcon={<DownloadIcon />}
                                                        onClick={() => {
                                                            handleDownloadExtension();
                                                        }}
                                                    >
                                                        Download Extension
                                                    </Button>
                                                </Box>
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default TutorialsPage; 