import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import MenuItem from '@mui/material/MenuItem'
import type { SelectChangeEvent } from '@mui/material/Select'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'

import CustomTextField from '@core/components/mui/TextField'
import { getMockupsByProductType, Mockup as IMockup } from '@/services/templateService'
import { SelectMultipleProps, MockupSelect } from '@/components/dialogs/ideals'

export const SelectMultiple = ({ productTypes, valueSelectModal, setValueSelectModal }: SelectMultipleProps) => {
    const ITEM_HEIGHT = 48
    const ITEM_PADDING_TOP = 8

    const MenuProps = {
        PaperProps: {
            style: {
                width: 250,
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
            }
        }
    }

    const handleChangeValueSelectModal = (event: SelectChangeEvent<unknown>) => {
        const value = event.target.value;
        setValueSelectModal(Array.isArray(value) ? value as string[] : (value as string).split(','));
    }

    return (
        <div>
            <CustomTextField
                select
                fullWidth
                label='Product Types'
                value={valueSelectModal || []}
                id='select-multiple-default'
                slotProps={{
                    select: {
                        MenuProps,
                        multiple: true,
                        onChange: handleChangeValueSelectModal
                    }
                }}
            >
                <MenuItem key={0} value={''}>
                    -- Select product types --
                </MenuItem>
                {Object.keys(productTypes).map((key, index) => (
                    <MenuItem key={index} value={key}>
                        {productTypes[key]}
                    </MenuItem>
                ))}
            </CustomTextField>
        </div>
    )
}

interface MockupSelectorProps {
    productType: string;
    productTypeName: string;
    mockupSelects: MockupSelect[];
    setMockupSelects: (mockups: MockupSelect[]) => void;
    withPlaceholder?: boolean;
}

export const MockupSelector = ({ 
    productType, 
    productTypeName, 
    mockupSelects, 
    setMockupSelects,
    withPlaceholder = false
}: MockupSelectorProps) => {
    const [availableMockups, setAvailableMockups] = useState<IMockup[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedMockupId, setSelectedMockupId] = useState('');
    const [placeholderImage, setPlaceholderImage] = useState<File | null>(null);
    const [placeholderPreview, setPlaceholderPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    // Find existing mockup selection for this product type
    useEffect(() => {
        const existingMockup = mockupSelects.find(m => m.product_type === productType);
        if (existingMockup) {
            setSelectedMockupId(existingMockup.mockup_id);
            if (existingMockup.placeholder_png) {
                setPlaceholderPreview(existingMockup.placeholder_png);
            }
        } else {
            setSelectedMockupId('');
            setPlaceholderPreview(null);
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
        
        if (mockupId) {
            const selectedMockup = availableMockups.find(m => m._id === mockupId);
            
            if (selectedMockup) {
                const updatedMockupSelect: MockupSelect = {
                    product_type: productType,
                    mockup_id: mockupId,
                    mockup_name: selectedMockup.name,
                    mockup_file: selectedMockup.images?.[0] || ''
                };
                const existingMockup = mockupSelects.find(m => m.product_type === productType);
                if (existingMockup?.placeholder_png) {
                    updatedMockupSelect.placeholder_png = existingMockup.placeholder_png;
                }
                const existingIndex = mockupSelects.findIndex(m => m.product_type === productType);
                const newMockupSelects = [...mockupSelects];
                
                if (existingIndex >= 0) {
                    newMockupSelects[existingIndex] = updatedMockupSelect;
                } else {
                    newMockupSelects.push(updatedMockupSelect);
                }
                
                setMockupSelects(newMockupSelects);
                setSelectedMockupId(mockupId);
            }
        } else {
            // If "No mockup" is selected, remove this product type from selections
            const newMockupSelects = mockupSelects.filter(m => m.product_type !== productType);
            setMockupSelects(newMockupSelects);
            setSelectedMockupId('');
            setPlaceholderImage(null);
            setPlaceholderPreview(null);
        }
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
            // Update the mockup selection with the placeholder PNG
            if (selectedMockupId) {
                const existingIndex = mockupSelects.findIndex(m => m.product_type === productType);
                if (existingIndex >= 0) {
                    const newMockupSelects = [...mockupSelects];
                    newMockupSelects[existingIndex] = {
                        ...newMockupSelects[existingIndex],
                        placeholder_png: previewUrl
                    };
                    setMockupSelects(newMockupSelects);
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                    toast.success('Placeholder PNG uploaded');
                }
            }
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
        
        // Remove placeholder_png from mockup selection
        if (selectedMockupId) {
            const existingIndex = mockupSelects.findIndex(m => m.product_type === productType);
            if (existingIndex >= 0) {
                const newMockupSelects = [...mockupSelects];
                const { placeholder_png, ...rest } = newMockupSelects[existingIndex];
                newMockupSelects[existingIndex] = rest;
                setMockupSelects(newMockupSelects);
            }
        }
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
                    
                    {withPlaceholder && selectedMockupId && (
                        <div className="mt-2">
                            {/* Placeholder PNG Uploader */}
                            <div className="mt-3 border-t pt-3">
                                <Typography variant="body2" className="mb-2 font-medium">
                                    Placeholder PNG (Optional)
                                </Typography>
                                
                                {placeholderPreview ? (
                                    <div className="mt-2">
                                        <div className="flex justify-center mb-2">
                                            <img 
                                                src={placeholderPreview}
                                                alt="Placeholder preview"
                                                className="max-h-[100px] object-contain rounded border border-gray-200"
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
                                            className={`w-full px-3 py-2 flex justify-center items-center gap-2 border rounded cursor-pointer ${isUploading ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-50'}`}
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
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}; 