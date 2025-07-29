'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { toast } from 'react-toastify'
import axiosInstance from '@/libs/axios'

// Type Imports
import type { TeamCreateData, TeamApiResponse } from '@/types/apps/teamTypes'

interface AddTeamDialogProps {
    open: boolean
    handleClose: () => void
    onSuccess: () => void
}

const AddTeamDialog = ({ open, handleClose, onSuccess }: AddTeamDialogProps) => {
    const [formData, setFormData] = useState<TeamCreateData>({
        name: '',
        description: '',
        status: 'active'
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.post<TeamApiResponse>('/api/authenticated/teams', formData)
            if (response.data.success) {
                toast.success(response.data.message || 'Team created successfully')
                onSuccess()
                handleClose()
                setFormData({
                    name: '',
                    description: '',
                    status: 'active'
                })
            } else {
                toast.error(response.data.result as string || 'Failed to create team')
            }
        } catch (error) {
            console.error('Error creating team:', error)
            toast.error('Failed to create team')
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Add New Team</DialogTitle>
                <DialogContent>
                    <div className='flex flex-col gap-4 pt-4'>
                        <TextField
                            fullWidth
                            label='Team Name'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            label='Description'
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                            multiline
                            rows={4}
                        />
                        <TextField
                            fullWidth
                            select
                            label='Status'
                            name='status'
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value='active'>Active</MenuItem>
                            <MenuItem value='inactive'>Inactive</MenuItem>
                        </TextField>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type='submit' variant='contained'>
                        Add Team
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default AddTeamDialog 