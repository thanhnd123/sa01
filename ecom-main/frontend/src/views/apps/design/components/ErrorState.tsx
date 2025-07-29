import { Alert } from '@mui/material'

interface ErrorStateProps {
  error: string;
}

export const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <Alert severity="error" sx={{ mt: 2 }}>
      {error}
    </Alert>
  )
} 