'use client'

// React Imports
import { useState, useEffect } from 'react'

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
import type { Team, TeamUpdateData, TeamApiResponse } from '@/types/apps/teamTypes'

interface EditTeamDialogProps {
    open: boolean
    handleClose: () => void
    onSuccess: () => void
    dataUpdate: Team
}

const EditTeamDialog = ({ open, handleClose, onSuccess, dataUpdate }: EditTeamDialogProps) => {
    const [formData, setFormData] = useState<TeamUpdateData>({
        _id: '',
        name: '',
        description: '',
        status: 'active'
    })

    useEffect(() => {
        if (dataUpdate) {
            setFormData({
                _id: dataUpdate._id,
                name: dataUpdate.name,
                description: dataUpdate.description || '',
                status: dataUpdate.status || 'active'
            })
        }
    }, [dataUpdate])

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
            const response = await axiosInstance.put<TeamApiResponse>(`/api/authenticated/teams/${formData._id}`, formData)
            if (response.data.result) {
                toast.success('Team updated successfully')
                onSuccess()
                handleClose()
            } else {
                toast.error(response.data.result as string || 'Failed to update team')
            }
        } catch (error) {
            console.error('Error updating team:', error)
            toast.error('Failed to update team')
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Edit Team</DialogTitle>
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
                        Update Team
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default EditTeamDialog 