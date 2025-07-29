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
import { ProductTypes, Template, MockupSelect, BannerGenerateRequest } from './index'

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


    const handleMockupChange = (e: SelectChangeEvent<string>) => {
        const mockupId = e.target.value;
        setSelectedMockupId(mockupId);
        onMockupChange(mockupId);
    };

    return (
        <Card className="mt-2 border border-gray-200">
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

interface GenBannerFormDesignProps {
    open: boolean,
    handleCloseModal: () => void,
    productIdeal: any,
    productTypes: ProductTypes,
    userId: string
}

const GenBannerFormDesign = ({
    open,
    handleCloseModal,
    productIdeal,
    productTypes,
    userId: propUserId
}: GenBannerFormDesignProps) => {
    const [valueSelectModal, setValueSelectModal] = useState<string[]>([])
    const [templates, setTemplates] = useState<Template[]>([]);
    const [mockupSelects, setMockupSelects] = useState<MockupSelect[]>([]);
    const [isGeneratingBanner, setIsGeneratingBanner] = useState(false);
    const [selectedMockupRender, setSelectedMockupRender] = useState<string | null>(null);
    const { data: session, status } = useSession()
    
    // Pre-select product types if available in the design
    useEffect(() => {
        if (productIdeal?.product_type && Array.isArray(productIdeal.product_type) && productIdeal.product_type.length > 0) {
            setValueSelectModal(productIdeal.product_type);
        }
        
        // Log mockup links information
        console.log('GenBannerFromDesign received mockup_links:', productIdeal?.mockup_links);
    }, [productIdeal]);
    
    // Reset templates when product types change
    useEffect(() => {
        // Remove templates for product types that are no longer selected
        setTemplates(prev => prev.filter(t => valueSelectModal.includes(t.product_type)));
        
        // Also clean up mockupSelects
        setMockupSelects(prev => prev.filter(m => valueSelectModal.includes(m.product_type)));
    }, [valueSelectModal]);

    // Get mockup links directly from the prop
    const getMockupLinks = (): string[] => {
        if (productIdeal?.mockup_links && Array.isArray(productIdeal.mockup_links)) {
            return productIdeal.mockup_links;
        }
        return [];
    };

    const mockupLinks = getMockupLinks();

    // Hàm trích xuất tên file từ URL và format theo yêu cầu
    const formatLinkDisplay = (url: string, index: number): string => {
        if (!url) return `Render ${index + 1}: Unknown File`;
        
        try {
            // Lấy phần cuối của URL (sau dấu / cuối cùng)
            const parts = url.split('/');
            let fileName = parts[parts.length - 1];
            
            // Loại bỏ các tham số query nếu có
            if (fileName.includes('?')) {
                fileName = fileName.split('?')[0];
            }
            
            // Nếu tên quá dài, cắt bớt phần giữa
            if (fileName.length > 50) {
                const firstPart = fileName.substring(0, 25);
                const lastPart = fileName.substring(fileName.length - 25);
                fileName = `${firstPart}.......${lastPart}`;
            }
            
            return `Render ${index + 1}: ${fileName}`;
        } catch (error) {
            console.error('Error formatting link:', error);
            return `Render ${index + 1}: Unknown File`;
        }
    };

    // Render mockup links selection UI
    const renderMockupLinksSelection = () => {
        if (mockupLinks.length === 0) {
            return (
                <Typography variant="body2" color="text.secondary">
                    No mockup renders available
                </Typography>
            );
        }

        return (
            <div className="space-y-4">
                <FormControl fullWidth>
                    <InputLabel id="mockup-render-select">Select Mockup Render</InputLabel>
                    <Select
                        labelId="mockup-render-select"
                        value={selectedMockupRender || ''}
                        onChange={(e) => setSelectedMockupRender(e.target.value)}
                        label="Select Mockup Render"
                    >
                        <MenuItem value="">-- Select a mockup render --</MenuItem>
                        {mockupLinks.map((link, index) => (
                            <MenuItem key={index} value={link}>
                                {formatLinkDisplay(link, index)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
                {selectedMockupRender && (
                    <div className="mt-4 p-2 border border-gray-200 rounded">
                        <Typography variant="body2" className="mb-2">
                            <span className="font-semibold">Selected:</span> {selectedMockupRender}
                        </Typography>
                        <div className="flex justify-center">
                            <img 
                                src={selectedMockupRender} 
                                alt="Selected mockup render"
                                style={{ maxHeight: '200px', maxWidth: '100%', objectFit: 'contain' }}
                                className="border border-gray-100 rounded"
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const canGenerateBanner = () => {
        const hasValidMockupRender = !!selectedMockupRender;
        const hasProductTypeMockup = mockupSelects.length > 0;
        
        return hasValidMockupRender && hasProductTypeMockup;
    };

    const handleMockupChange = (productType: string, mockupId: string) => {
        console.log('handleMockupChange called with:', { productType, mockupId });
        if (mockupId) {
            // Find mockup information from the API
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
        if (!selectedMockupRender) {
            toast.error('Please select a mockup render');
            return;
        }
        
        if (mockupSelects.length === 0) {
            toast.error('Please select at least one mockup');
            return;
        }
        
        setIsGeneratingBanner(true);
        try {
            console.log('Current mockupSelects:', mockupSelects);
            // Get the product types that are selected
            const productTypes = valueSelectModal;
            
            // Define product type for the request
            interface Product {
                title: string;
                product_type: string;
                banners: any[];
                main_images: string;
                status: string;
                mockup_name: string;
            }
            
            const products: Product[] = [];
            
            // Create a promise array to fetch mockup data for each product type
            const promises = productTypes.map(async (productType) => {
                try {
                    // Get the selected mockup for this product type
                    const existingMockup = mockupSelects.find(m => m.product_type === productType);
                    
                    if (existingMockup) {
                        // If there's a selected mockup, add it to products
                        products.push({
                            title: productIdeal.title || '',
                            product_type: productType,
                            banners: [],
                            main_images: "",
                            status: 'pending',
                            mockup_name: existingMockup.mockup_name
                        });
                    } else {
                        // If no mockup is selected, get the default one
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
            
            // Wait for all promises to resolve
            await Promise.all(promises);
            
            console.log('Products to send:', products);
            
            // Prepare the request data
            const requestData = {
                ideal_id: productIdeal._id,
                ideal_banner: productIdeal.banner || '',
                name: productIdeal.title || '',
                png: selectedMockupRender, // Use the selected mockup render URL
                created_by: propUserId,
                worker: '',
                products: products
            };
            
            console.log('Request data:', requestData);
            
            // Send the request as JSON
            const response = await apiClient.post<ApiResponse>('/design/actions/create', requestData);
            
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
                    {/* Mockup Renders Selection */}
                    <div className="mt-4 mb-4">
                        <Typography variant="h6" className="mb-3">
                            Select Mockup Render
                        </Typography>
                        {renderMockupLinksSelection()}
                    </div>
                                      
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} variant='tonal' color='secondary'>
                        Close
                    </Button>
                    <Button 
                        onClick={handleGenerateBanner} 
                        variant='outlined' 
                        color='primary' 
                        disabled={isGeneratingBanner || !canGenerateBanner()}
                        startIcon={isGeneratingBanner ? <CircularProgress size={20} /> : <i className='tabler-photo' />}
                    >
                        Generate Banner
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default GenBannerFormDesign