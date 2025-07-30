import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, Box } from '@mui/material';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        minWidth: 900,
        [theme.breakpoints.down('sm')]: {
            minWidth: '100%',
            margin: theme.spacing(2),
        },
    },
}));

export const DialogHeader = styled(DialogTitle)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
}));

export const DialogBody = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(3),
}));

export const ImagePreviewContainer = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
}));

export const ImagePreview = styled(Box)(({ theme }) => ({
    position: 'relative',
    paddingTop: '100%',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    border: `1px solid ${theme.palette.divider}`,
}));

export const ActionButtonsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(2),
    marginTop: theme.spacing(3),
})); 