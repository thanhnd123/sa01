import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Autocomplete } from '@mui/material';

export const defaultOptions = [
    { value: 'product_title', label: 'Product Title' },
    { value: 'description', label: 'Description' },
    { value: 'short_description', label: 'Short Description' },
    { value: 'main_image', label: 'Main Image' },
    { value: 'sku', label: 'SKU' },
    { value: 'bullet_point_1', label: 'Bullet Point 1' },
    { value: 'bullet_point_2', label: 'Bullet Point 2' },
    { value: 'bullet_point_3', label: 'Bullet Point 3' },
    { value: 'bullet_point_4', label: 'Bullet Point 4' },
    { value: 'bullet_point_5', label: 'Bullet Point 5' },
    ...Array.from({ length: 10 }, (_, i) => ({
        value: `image_${i + 1}`,
        label: `Image ${i + 1}`
    }))
];

interface DefaultValueDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (value: string) => void;
    value: string;
    title?: string;
}

const DefaultValueDialog: React.FC<DefaultValueDialogProps> = ({
    open,
    onClose,
    onSave,
    value,
    title = 'Select Default Value'
}) => {
    const [dialogValue, setDialogValue] = React.useState(value);

    React.useEffect(() => {
        setDialogValue(value);
    }, [value]);

    const handleSave = () => {
        onSave(dialogValue);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Autocomplete
                    freeSolo
                    options={defaultOptions}
                    getOptionLabel={(option) => {
                        if (typeof option === 'string') return option;
                        return option.label;
                    }}
                    value={dialogValue}
                    onChange={(_, newValue) => {
                        if (typeof newValue === 'string') {
                            setDialogValue(newValue);
                        } else if (newValue) {
                            setDialogValue(`{${newValue.value}}`);
                        }
                    }}
                    onInputChange={(_, newInputValue) => {
                        setDialogValue(newInputValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            autoFocus
                            fullWidth
                            placeholder="Select or type a value..."
                            variant="outlined"
                        />
                    )}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DefaultValueDialog; 