import { useEffect, useState } from 'react'

import { toast } from 'react-toastify'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import MenuItem from '@mui/material/MenuItem'
import type { SelectChangeEvent } from '@mui/material/Select'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'

import DialogCloseButton from '@components/dialogs/DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'
import { User } from '@/types/apps/userTypes'
import { useSession } from 'next-auth/react'
import Cookies from 'js-cookie'

import * as kanbanService from '@/services/kanbanService'
import { getMockupsByProductType, Mockup as IMockup } from '@/services/templateService'
import apiClient from '@/services/apiClient'
import { createDesignAction } from '@/services/designService'
import { ApiResponse } from '@/services/designService'

import { SelectMultiple } from './IdealComponents'
import { ProductTypes, Template, MockupSelect, DataDesign, DataRequest, BannerGenerateRequest } from './index'

interface BannerGenerateDialogProps {
    open: boolean,
    handleCloseModal: () => void,
    productIdeal: any,
    productTypes: ProductTypes,
    userId: string
}

const BannerGenerateDialog = ({
    open,
    handleCloseModal,
    productIdeal,
    productTypes,
    userId: propUserId
}: BannerGenerateDialogProps) => {
    const [valueSelectModal, setValueSelectModal] = useState<string[]>([])
    const [dataDesign, setDataDesign] = useState<DataDesign[]>([]);
    const [templates, setTemplates] = useState<Template[]>([]);
    const [mockupSelects, setMockupSelects] = useState<MockupSelect[]>([]);
    const [isGeneratingBanner, setIsGeneratingBanner] = useState(false);
    const [placeholderImage, setPlaceholderImage] = useState<File | null>(null);
    const [placeholderPreview, setPlaceholderPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const { data: session, status } = useSession()
    
    useEffect(() => {
        if (!productIdeal?._id) return;
        fetch(process.env.NEXT_PUBLIC_API_URL + `/teamexp/designs/list?id=${productIdeal._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then((response) => {
            const dataResult = response.result;
            setDataDesign(dataResult)
        });

    }, [productIdeal]);

    // Reset templates when product types change
    useEffect(() => {
        // Remove templates for product types that are no longer selected
        setTemplates(prev => prev.filter(t => valueSelectModal.includes(t.product_type)));
        
        // Also clean up mockupSelects
        setMockupSelects(prev => prev.filter(m => valueSelectModal.includes(m.product_type)));
    }, [valueSelectModal]);

    const canGenerateBanner = () => {
        // Check if a placeholder PNG has been uploaded
        return !!placeholderPreview;
    };

    // Handle file upload for placeholder PNG
    const handlePlaceholderUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }
        
        const file = e.target.files[0];
        if (!file.type.includes('image/png')) {
            toast.error('Please upload a PNG file');
            return;
        }
        setIsUploading(true);
        
        try {
            setPlaceholderImage(file);
            const previewUrl = URL.createObjectURL(file);
            setPlaceholderPreview(previewUrl);
            await new Promise(resolve => setTimeout(resolve, 500));
            toast.success('Placeholder PNG uploaded');
        } catch (error) {
            console.error('Error handling file upload:', error);
            toast.error('Failed to upload placeholder PNG');
        } finally {
            setIsUploading(false);
        }
    };
    
    // Remove the placeholder image
    const handleRemovePlaceholder = () => {
        setPlaceholderImage(null);
        setPlaceholderPreview(null);
    };

    const handleMockupChange = (productType: string, mockupId: string) => {
        console.log('handleMockupChange called with:', { productType, mockupId });
        if (mockupId) {
            // Find mockup information from MockupSelector component that called this function
            // We'll get this information from the API directly instead of trying to find it in an empty array
            getMockupsByProductType(productTypes[productType])
                .then(mockups => {
                    const selectedMockup = mockups?.find(m => m._id === mockupId);
                    if (selectedMockup) {
                        console.log('Found mockup:', selectedMockup);
                        const updatedMockupSelect: MockupSelect = {
                            product_type: productType,
                            mockup_id: mockupId,
                            mockup_name: selectedMockup.name,
                            mockup_file: selectedMockup.images?.[0] || ''
                        };
                        
                        const existingIndex = mockupSelects.findIndex(m => m.product_type === productType);
                        const newMockupSelects = [...mockupSelects];
                        
                        if (existingIndex >= 0) {
                            newMockupSelects[existingIndex] = updatedMockupSelect;
                        } else {
                            newMockupSelects.push(updatedMockupSelect);
                        }
                        
                        console.log('Setting mockupSelects to:', newMockupSelects);
                        setMockupSelects(newMockupSelects);
                    } else {
                        console.error('Mockup not found in API response:', { mockupId, mockups });
                    }
                })
                .catch(error => {
                    console.error('Error fetching mockup details:', error);
                });
        } else {
            // If "No mockup" is selected, remove this product type from selections
            const newMockupSelects = mockupSelects.filter(m => m.product_type !== productType);
            setMockupSelects(newMockupSelects);
        }
    };

    const handleGenerateBanner = async () => {
        if (!placeholderPreview) {
            toast.error('Please upload a placeholder PNG');
            return;
        }
        
        if (mockupSelects.length === 0) {
            toast.error('Please select at least one mockup');
            return;
        }
        
        setIsGeneratingBanner(true);
        try {
            console.log('Current mockupSelects:', mockupSelects);
            // Lấy danh sách mockups đã chọn để gửi lên server
            const productTypes = valueSelectModal;
            
            // Định nghĩa kiểu cho sản phẩm
            interface Product {
                title: string;
                product_type: string;
                banners: any[];
                main_images: string;
                status: string;
                mockup_name: string;
            }
            
            const products: Product[] = [];
            
            // Tạo một mảng các promise để lấy dữ liệu mockup cho từng product type đã chọn
            const promises = productTypes.map(async (productType) => {
                try {
                    // Lấy mockup đã chọn cho product type này
                    const existingMockup = mockupSelects.find(m => m.product_type === productType);
                    
                    if (existingMockup) {
                        // Đã có mockup được chọn cho product type này
                        products.push({
                            title: productIdeal.title || '',
                            product_type: productType,
                            banners: [],
                            main_images: "",
                            status: 'pending',
                            mockup_name: existingMockup.mockup_name
                        });
                    } else {
                        // Nếu chưa có mockup được chọn, lấy danh sách mockup và chọn cái đầu tiên
                        const productTypeName = productTypes[productType as keyof typeof productTypes];
                        const mockups = await getMockupsByProductType(typeof productTypeName === 'string' ? productTypeName : '');
                        if (mockups && mockups.length > 0) {
                            const defaultMockup = mockups[0];
                            products.push({
                                title: productIdeal.title || '',
                                product_type: productType,
                                banners: [],
                                main_images: "",
                                status: 'pending',
                                mockup_name: defaultMockup.name
                            });
                        }
                    }
                } catch (error) {
                    console.error(`Error fetching mockup for ${productType}:`, error);
                }
            });
            
            // Đợi tất cả các promise hoàn thành
            await Promise.all(promises);
            
            console.log('Products to send:', products);
            
            // Chuẩn bị dữ liệu gửi lên API theo cấu trúc mới
            const requestData: BannerGenerateRequest = {
                ideal_id: productIdeal._id,
                ideal_banner: productIdeal.banner || '',
                name: productIdeal.title || '',
                png: placeholderPreview || '', 
                created_by: propUserId,
                worker: '',
                products: products
            };
            
            console.log('Request data:', requestData);
            
            // Tạo FormData object
            const formData = new FormData();
            
            // Thêm dữ liệu JSON vào FormData
            formData.append('data', JSON.stringify(requestData));
            
            // Nếu có file PNG, thêm file vào FormData
            if (placeholderImage) {
                formData.append('png', placeholderImage);
            } else if (placeholderPreview && placeholderPreview.startsWith('blob:')) {
                // Nếu không có file nhưng có blob URL, tải file từ blob URL
                try {
                    const response = await fetch(placeholderPreview);
                    const blob = await response.blob();
                    const file = new File([blob], 'placeholder.png', { type: 'image/png' });
                    formData.append('png', file);
                } catch (error) {
                    console.error('Error fetching blob:', error);
                    toast.error('Error processing image file');
                    setIsGeneratingBanner(false);
                    return;
                }
            }
            
            // Gửi API request với FormData
            const response = await apiClient.post<ApiResponse>('/design/actions/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            if (response.result) {
                toast.success('Banner generation request submitted successfully!');
                handleCloseModal();
            } else {
                toast.error('Failed to submit banner generation request');
            }
        } catch (error) {
            console.error('Error generating banner:', error);
            toast.error('Failed to generate banner');
        } finally {
            setIsGeneratingBanner(false);
        }
    };


    return (
        <>
            <Dialog
                onClose={handleCloseModal}
                aria-labelledby='customized-dialog-title'
                open={open}
                closeAfterTransition={false}
                PaperProps={{ sx: { overflow: 'visible' } }}
                maxWidth={'lg'}
            >
                <DialogTitle id='customized-dialog-title'>
                    <Typography variant='h5' component='span'>
                        {productIdeal?.title || ''}
                    </Typography>
                    <DialogCloseButton onClick={handleCloseModal} disableRipple>
                        <i className='tabler-x' />
                    </DialogCloseButton>
                </DialogTitle>
                {productIdeal?.banner && (
                    <div className="flex justify-center p-4 border-b">
                        <img 
                            src={productIdeal.market === 'Etsy' ? productIdeal.banner : process.env.NEXT_PUBLIC_API_URL + productIdeal.banner}
                            alt={productIdeal?.title || 'Product banner'}
                            className="max-h-[200px] object-contain rounded"
                        />
                    </div>
                )}
                <DialogContent>                           
                    <SelectMultiple
                        productTypes={productTypes || { productTypes: {} }}
                        valueSelectModal={valueSelectModal}
                        setValueSelectModal={setValueSelectModal}
                    />
                    
                    {valueSelectModal.length > 0 && (
                        <div className="mt-4">
                            <Typography variant="h6" className="mb-2">Mockup Selections</Typography>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {valueSelectModal.map(productType => (
                                    <MockupSelector 
                                        key={productType}
                                        productType={productType}
                                        productTypeName={productTypes[productType]}
                                        mockupSelects={mockupSelects}
                                        onMockupChange={(mockupId) => handleMockupChange(productType, mockupId)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                                        
                    {/* Placeholder PNG Uploader */}
                    <div className="mt-4 mb-4  rounded-md">
                        <Typography variant="h6" className="mb-3">
                            Upload Placeholder PNG (Required)
                        </Typography>
                        
                        {placeholderPreview ? (
                            <div className="mt-2 p-4 border">
                                <div className="flex justify-center mb-2">
                                    <img 
                                        src={placeholderPreview}
                                        alt="Placeholder preview"
                                        className="max-h-[150px] object-contain rounded border"
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <button 
                                        className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50 flex items-center gap-1"
                                        onClick={handleRemovePlaceholder}
                                    >
                                        <i className="tabler-trash text-sm" /> Remove
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <label 
                                    className={`w-full px-3 py-2 flex justify-center items-center gap-2 border rounded cursor-pointer ${isUploading ? 'cursor-not-allowed' : 'hover:text-gray-400'}`}
                                >
                                    {isUploading ? (
                                        <>
                                            <CircularProgress size={16} /> Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <i className="tabler-upload" /> Upload PNG
                                        </>
                                    )}
                                    <input
                                        hidden
                                        accept="image/png"
                                        type="file"
                                        onChange={handlePlaceholderUpload}
                                        disabled={isUploading}
                                    />
                                </label>
                            </div>
                        )}
                    </div>

                    {/* <div className='mt-3'>
                        <Typography variant='h5' component='span'>
                            List designs have been created
                        </Typography>
                    </div> *
                    <div className='mt-2 overflow-x-auto'>
                        {dataDesign && dataDesign.length > 0 ? dataDesign.map((item, index) => (
                            <div className='grid grid-cols-[auto] gap-4' key={index}>
                                <Card className='h-full w-[350px]'>
                                    <CardContent>
                                        <div className='flex flex-col gap-4'>
                                            <div className='flex justify-center'>
                                                <img
                                                    src={item.banner}
                                                    alt={item.title}
                                                    className='rounded-lg max-h-[200px] object-contain'
                                                />
                                            </div>
                                            <div className='flex flex-col gap-2'>
                                                <Typography variant='h6' className='line-clamp-2 text-wrap' title={item.title}>
                                                    {item.title}
                                                </Typography>
                                                <div className='grid grid-cols-2 gap-3 p-1 border-b-2 border-grey-300'>
                                                    <div>
                                                        <Typography variant='h6' className='line-clamp-2 text-wrap' title='Designer in charge'>Designer in charge</Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant='body2' className='font-bold text-end' title='Designer in charge'>{item.designer || ''}</Typography>
                                                    </div>
                                                </div>
                                                <div className='grid grid-cols-2 gap-3 p-1 border-b-2 border-grey-300'>
                                                    <div>
                                                        <Typography variant='h6' className='line-clamp-2 text-wrap' title="Seller's request">{`Seller's request`}</Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant='body2' className='font-bold text-end' title="Seller's request">{item.seller || ''}</Typography>
                                                    </div>
                                                </div>
                                                <div className='grid grid-cols-2 gap-3 p-1 border-b-2 border-grey-300'>
                                                    <div>
                                                        <Typography variant='h6' className='line-clamp-2 text-wrap' title="Seller's request">{`Seller's note`}</Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant='body2' className='font-bold text-end' title="Seller's request">{item.seller_note || ''}</Typography>
                                                    </div>
                                                </div>
                                                <div className='grid grid-cols-2 gap-3 p-1 border-b-2 border-grey-300'>
                                                    <div>
                                                        <Typography variant='h6' className='line-clamp-2 text-wrap' title="Seller's request">{`Seller's note`}</Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant='body2' className='line-clamp-2 text-wrap text-end' title="Seller's request">{item.seller_note || ''}</Typography>
                                                    </div>
                                                </div>
                                                <div className='grid grid-cols-2 gap-3 p-1 border-b-2 border-grey-300'>
                                                    <div>
                                                        <Typography variant='h6' className='line-clamp-2 text-wrap' title="status">Status</Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant='body2' className='line-clamp-2 text-wrap text-end' title="Seller's request">{item.status || ''}</Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )) : <>
                            <Typography variant='h5' component='span'>
                                No previous designs have been created
                            </Typography>
                        </>}
                    </div> */}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} variant='tonal' color='secondary'>
                        Close
                    </Button>
                    <Button 
                        onClick={handleGenerateBanner} 
                        variant='outlined' 
                        color='primary' 
                        disabled={isGeneratingBanner}
                        startIcon={isGeneratingBanner ? <CircularProgress size={20} /> : <i className='tabler-photo' />}
                    >
                        Generate Banner
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

// Simple MockupSelector component without placeholder handling
interface MockupSelectorProps {
    productType: string;
    productTypeName: string;
    mockupSelects: MockupSelect[];
    onMockupChange: (mockupId: string) => void;
}

const MockupSelector = ({ 
    productType, 
    productTypeName, 
    mockupSelects,
    onMockupChange
}: MockupSelectorProps) => {
    const [availableMockups, setAvailableMockups] = useState<IMockup[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedMockupId, setSelectedMockupId] = useState('');

    // Find existing mockup selection for this product type
    useEffect(() => {
        const existingMockup = mockupSelects.find(m => m.product_type === productType);
        if (existingMockup) {
            setSelectedMockupId(existingMockup.mockup_id);
        } else {
            setSelectedMockupId('');
        }
    }, [mockupSelects, productType]);

    useEffect(() => {
        const fetchMockups = async () => {
            try {
                setLoading(true);
                const mockups = await getMockupsByProductType(productTypeName);
                setAvailableMockups(mockups || []);
            } catch (error) {
                console.error('Error fetching mockups:', error);
                setAvailableMockups([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMockups();
    }, [productTypeName]);

    const handleMockupChange = (e: SelectChangeEvent<string>) => {
        const mockupId = e.target.value;
        setSelectedMockupId(mockupId);
        onMockupChange(mockupId);
    };

    return (
        <Card className="mt-2 border">
            <CardContent className="p-3">
                <div className="flex flex-wrap items-center justify-between mb-2">
                    <Typography variant="subtitle1" className="font-medium">{productTypeName}</Typography>
                </div>

                <div className="mb-3">
                    {loading ? (
                        <div className="flex justify-center py-2">
                            <CircularProgress size={24} />
                        </div>
                    ) : (
                        <FormControl fullWidth size="small">
                            <InputLabel id={`mockup-select-${productType}`}>Select Mockup</InputLabel>
                            <Select
                                labelId={`mockup-select-${productType}`}
                                value={selectedMockupId}
                                onChange={handleMockupChange}
                                label="Select Mockup"
                            >
                                <MenuItem value="">-- No mockup --</MenuItem>
                                {availableMockups.map((mockup) => (
                                    <MenuItem key={mockup._id} value={mockup._id}>
                                        {mockup.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default BannerGenerateDialog