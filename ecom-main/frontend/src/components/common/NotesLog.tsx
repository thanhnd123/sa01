import { useState, useCallback, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import { useDropzone } from 'react-dropzone'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CircularProgress from '@mui/material/CircularProgress'

import { useSession } from 'next-auth/react'
import axiosInstance from '@/libs/axios'

interface Note {
    _id: string
    content: string
    ideal_id?: string
    design_id?: string
    user_id: string
    team_id: string
    note_type: 'comment' | 'task' | 'bug' | 'feature'
    image_url?: string
    created_at: number
    updated_at: number
    user?: {
        username: string
        email: string
        avatar?: string
    }
}

interface NotesLogProps {
    idealId?: string
    designId?: string
    onNoteAdded?: (note: Note) => void
    onNoteUpdated?: (note: Note) => void
    onNoteDeleted?: (noteId: string) => void
}

const NotesLog = ({ idealId, designId, onNoteAdded, onNoteUpdated, onNoteDeleted }: NotesLogProps) => {
    const { data: session } = useSession()
    const [notes, setNotes] = useState<Note[]>([])
    const [loading, setLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [content, setContent] = useState('')
    const [noteType, setNoteType] = useState<'comment' | 'task' | 'bug' | 'feature'>('comment')
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [editingNote, setEditingNote] = useState<Note | null>(null)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [editContent, setEditContent] = useState('')
    const [editNoteType, setEditNoteType] = useState<'comment' | 'task' | 'bug' | 'feature'>('comment')
    const [editSelectedImage, setEditSelectedImage] = useState<File | null>(null)
    const [editImagePreview, setEditImagePreview] = useState<string | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)
    const editFileInputRef = useRef<HTMLInputElement>(null)

    // Get the correct ID for API calls
    const entityId = idealId || designId
    const isDesign = !!designId

    // Fetch notes
    const fetchNotes = useCallback(async () => {
        if (!entityId) {
            return
        }

        setLoading(true)
        try {
            const endpoint = isDesign
                ? `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/notes/design/${entityId}`
                : `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/notes/${entityId}`

            const response = await axiosInstance.get(endpoint)

            if (response.data.success) {
                setNotes(response.data.data || [])
            } else {
            }
        } catch (error) {
            const err = error as any;
            console.error('Error fetching notes:', err);
            console.error('Error details:', err.response?.data);
            toast.error('Failed to load notes')
        } finally {
            setLoading(false)
        }
    }, [entityId, isDesign, designId, idealId])

    useEffect(() => {
        if (entityId) {
            fetchNotes()
        }
    }, [entityId, fetchNotes])

    // Image dropzone
    const onImageDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return
        const file = acceptedFiles[0]

        // Validate file type
        if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
            toast.error('Please upload a valid image file (PNG, JPG)')
            return
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size must be less than 5MB')
            return
        }

        // Validate file name
        if (!file.name || file.name.trim() === '') {
            toast.error('Invalid file name')
            return
        }

        setSelectedImage(file)
        setImagePreview(URL.createObjectURL(file))
    }, [])

    const { getRootProps: getImageRootProps, getInputProps: getImageInputProps, isDragActive: isImageDragActive } = useDropzone({
        onDrop: onImageDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg']
        },
        maxFiles: 1,
        maxSize: 5 * 1024 * 1024
    })

    // Edit image dropzone
    const onEditImageDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return
        const file = acceptedFiles[0]

        // Validate file type
        if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
            toast.error('Please upload a valid image file (PNG, JPG)')
            return
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size must be less than 5MB')
            return
        }

        // Validate file name
        if (!file.name || file.name.trim() === '') {
            toast.error('Invalid file name')
            return
        }

        setEditSelectedImage(file)
        setEditImagePreview(URL.createObjectURL(file))
    }, [])

    const { getRootProps: getEditImageRootProps, getInputProps: getEditImageInputProps, isDragActive: isEditImageDragActive } = useDropzone({
        onDrop: onEditImageDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg']
        },
        maxFiles: 1,
        maxSize: 5 * 1024 * 1024
    })

    // Submit note
    const handleSubmit = async () => {
        if (!content.trim() && !selectedImage) {
            toast.error('Please enter a comment or upload an image')
            return
        }

        setSubmitting(true)
        try {
            const formData = new FormData()
            formData.append('content', content.trim())
            formData.append('note_type', noteType)

            // Add the correct ID parameter
            if (idealId) {
                formData.append('ideal_id', idealId)
            } else if (designId) {
                formData.append('design_id', designId)
            }

            if (selectedImage) {
                formData.append('image', selectedImage)
            }

            const response = await axiosInstance.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/notes`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )

            if (response.data.success) {
                const newNote = response.data.data
                setNotes(prev => [newNote, ...prev])
                setContent('')
                setSelectedImage(null)
                setImagePreview(null)
                setNoteType('comment')
                onNoteAdded?.(newNote)
                toast.success('Note added successfully')
            } else {
                throw new Error(response.data.message || 'Failed to add note')
            }
        } catch (error: any) {
            console.error('Error creating note:', error)
            console.error('Error response:', error.response?.data)
            const errorMessage = error.response?.data?.message || error.message || 'Failed to add note'
            toast.error(errorMessage)
        } finally {
            setSubmitting(false)
        }
    }

    // Edit note
    const handleEditNote = (note: Note) => {
        setEditingNote(note)
        setEditContent(note.content)
        setEditNoteType(note.note_type)
        setEditSelectedImage(null)
        setEditImagePreview(note.image_url || null)
        setEditDialogOpen(true)
    }

    // Submit edit
    const handleSubmitEdit = async () => {
        if (!editingNote) return

        setSubmitting(true)
        try {
            const formData = new FormData()
            formData.append('content', editContent.trim())
            formData.append('note_type', editNoteType)

            if (editSelectedImage) {
                formData.append('image', editSelectedImage)
            }

            const response = await axiosInstance.put(
                `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/notes/${editingNote._id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )

            if (response.data.success) {
                const updatedNote = response.data.data
                setNotes(prev => prev.map(note => note._id === editingNote._id ? updatedNote : note))
                setEditDialogOpen(false)
                setEditingNote(null)
                onNoteUpdated?.(updatedNote)
                toast.success('Note updated successfully')
            } else {
                throw new Error(response.data.message || 'Failed to update note')
            }
        } catch (error: any) {
            console.error('Error updating note:', error)
            const errorMessage = error.response?.data?.message || error.message || 'Failed to update note'
            toast.error(errorMessage)
        } finally {
            setSubmitting(false)
        }
    }

    // Delete note
    const handleDeleteNote = async (noteId: string) => {
        if (!confirm('Are you sure you want to delete this note?')) return

        try {
            const response = await axiosInstance.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/notes/${noteId}`
            )

            if (response.data.success) {
                setNotes(prev => prev.filter(note => note._id !== noteId))
                onNoteDeleted?.(noteId)
                toast.success('Note deleted successfully')
            }
        } catch (error) {
            console.error('Error deleting note:', error)
            toast.error('Failed to delete note')
        }
    }

    // Remove image
    const handleRemoveImage = () => {
        setSelectedImage(null)
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview)
            setImagePreview(null)
        }
    }

    const handleRemoveEditImage = () => {
        setEditSelectedImage(null)
        if (editImagePreview && !editingNote?.image_url) {
            URL.revokeObjectURL(editImagePreview)
            setEditImagePreview(null)
        }
    }

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview)
            }
            if (editImagePreview && !editingNote?.image_url) {
                URL.revokeObjectURL(editImagePreview)
            }
        }
    }, [imagePreview, editImagePreview, editingNote])

    const getNoteTypeColor = (type: string) => {
        switch (type) {
            case 'task': return 'primary'
            case 'bug': return 'error'
            case 'feature': return 'success'
            default: return 'default'
        }
    }

    const getNoteTypeIcon = (type: string) => {
        switch (type) {
            case 'task': return '📋'
            case 'bug': return '🐛'
            case 'feature': return '✨'
            default: return '💬'
        }
    }

    const formatDate = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleString()
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                Notes & Comments
            </Typography>

            {/* Add new note */}
            <Card sx={{ mb: 2 }}>
                <CardContent sx={{ p: 1.5, pb: 1 }}>
                    <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                        <Chip
                            label="Comment"
                            color={noteType === 'comment' ? 'primary' : 'default'}
                            onClick={() => setNoteType('comment')}
                            size="small"
                            sx={{ height: 24, fontSize: '11px' }}
                        />
                        <Chip
                            label="Task"
                            color={noteType === 'task' ? 'primary' : 'default'}
                            onClick={() => setNoteType('task')}
                            size="small"
                            sx={{ height: 24, fontSize: '11px' }}
                        />
                        <Chip
                            label="Bug"
                            color={noteType === 'bug' ? 'primary' : 'default'}
                            onClick={() => setNoteType('bug')}
                            size="small"
                            sx={{ height: 24, fontSize: '11px' }}
                        />
                        <Chip
                            label="Feature"
                            color={noteType === 'feature' ? 'primary' : 'default'}
                            onClick={() => setNoteType('feature')}
                            size="small"
                            sx={{ height: 24, fontSize: '11px' }}
                        />
                    </Box>

                    <TextField
                        fullWidth
                        multiline
                        rows={2}
                        placeholder="Write a comment..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        sx={{ mb: 1 }}
                        size="small"
                    />

                    {/* Image upload area */}
                    {selectedImage || imagePreview ? (
                        <Box sx={{ mb: 1, position: 'relative' }}>
                            <img
                                src={imagePreview || undefined}
                                alt="Preview"
                                style={{ maxWidth: '100%', maxHeight: 120, borderRadius: 4 }}
                            />
                            <IconButton
                                size="small"
                                onClick={handleRemoveImage}
                                sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'rgba(0,0,0,0.5)' }}
                            >
                                <i className="tabler-x" style={{ color: 'white', fontSize: '12px' }} />
                            </IconButton>
                        </Box>
                    ) : (
                        <Box
                            {...getImageRootProps()}
                            sx={{
                                border: '2px dashed',
                                borderColor: isImageDragActive ? 'primary.main' : 'divider',
                                borderRadius: 1,
                                p: 1.5,
                                textAlign: 'center',
                                cursor: 'pointer',
                                mb: 1,
                                '&:hover': { borderColor: 'primary.main' }
                            }}
                        >
                            <input {...getImageInputProps()} />
                            <Typography variant="caption" color="text.secondary">
                                {isImageDragActive ? 'Drop image here' : 'Drag & drop image or click to select'}
                            </Typography>
                        </Box>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => {
                                setContent('')
                                handleRemoveImage()
                            }}
                        >
                            Clear
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleSubmit}
                            disabled={submitting || (!content.trim() && !selectedImage)}
                        >
                            {submitting ? <CircularProgress size={16} /> : 'Add Note'}
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            {/* Notes list */}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                    <CircularProgress />
                </Box>
            ) : (
                // Đặt scroll chỉ cho danh sách notes
                <Box sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {notes.map((note) => (
                            <Card key={note._id} sx={{ mb: 1.5, p: 1, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                                <CardContent sx={{ p: 1, pb: ".8em !important" }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Avatar sx={{ width: 18, height: 18 }}>
                                                {note.user?.username?.[0] || 'U'}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                                    {note.user?.username || 'Unknown User'}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                                    {formatDate(note.created_at)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <Chip
                                                icon={<span>{getNoteTypeIcon(note.note_type)}</span>}
                                                label={note.note_type}
                                                color={getNoteTypeColor(note.note_type) as any}
                                                size="small"
                                                sx={{ height: 20, fontSize: '10px' }}
                                            />
                                            <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                    setAnchorEl(e.currentTarget)
                                                    e.currentTarget.setAttribute('data-note-id', note._id)
                                                }}
                                                sx={{ p: 0.5 }}
                                            >
                                                <i className="tabler-dots-vertical" style={{ fontSize: '14px' }} />
                                            </IconButton>
                                        </Box>
                                    </Box>

                                    <Typography variant="body2" sx={{ mb: 0.2, lineHeight: 1.4 }}>
                                        {note.content}
                                    </Typography>

                                    {note.image_url && (
                                        <Box sx={{ mb: 0.5 }}>
                                            <img
                                                src={note.image_url}
                                                alt="Note attachment"
                                                style={{
                                                    maxWidth: '100%',
                                                    maxHeight: 120,
                                                    borderRadius: 4,
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => window.open(note.image_url, '_blank')}
                                                title="Click to view full size"
                                            />
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>
            )}

            {/* Menu for note actions */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={() => {
                    const selectedNote = notes.find(note => note._id === anchorEl?.getAttribute('data-note-id'))
                    if (selectedNote) {
                        handleEditNote(selectedNote)
                    }
                    setAnchorEl(null)
                }}>
                    <ListItemIcon>
                        <i className="tabler-edit" />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => {
                    const selectedNote = notes.find(note => note._id === anchorEl?.getAttribute('data-note-id'))
                    if (selectedNote) {
                        handleDeleteNote(selectedNote._id)
                    }
                    setAnchorEl(null)
                }}>
                    <ListItemIcon>
                        <i className="tabler-trash" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
            </Menu>

            {/* Edit dialog */}
            <Dialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle sx={{ pb: 1 }}>Edit Note</DialogTitle>
                <DialogContent sx={{ pt: 1 }}>
                    <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                        <Chip
                            label="Comment"
                            color={editNoteType === 'comment' ? 'primary' : 'default'}
                            onClick={() => setEditNoteType('comment')}
                            size="small"
                            sx={{ height: 24, fontSize: '11px' }}
                        />
                        <Chip
                            label="Task"
                            color={editNoteType === 'task' ? 'primary' : 'default'}
                            onClick={() => setEditNoteType('task')}
                            size="small"
                            sx={{ height: 24, fontSize: '11px' }}
                        />
                        <Chip
                            label="Bug"
                            color={editNoteType === 'bug' ? 'primary' : 'default'}
                            onClick={() => setEditNoteType('bug')}
                            size="small"
                            sx={{ height: 24, fontSize: '11px' }}
                        />
                        <Chip
                            label="Feature"
                            color={editNoteType === 'feature' ? 'primary' : 'default'}
                            onClick={() => setEditNoteType('feature')}
                            size="small"
                            sx={{ height: 24, fontSize: '11px' }}
                        />
                    </Box>

                    <TextField
                        fullWidth
                        multiline
                        rows={2}
                        placeholder="Write a comment..."
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        sx={{ mb: 1 }}
                        size="small"
                    />

                    {/* Edit image upload area */}
                    {editSelectedImage || editImagePreview ? (
                        <Box sx={{ mb: 1, position: 'relative' }}>
                            <img
                                src={editImagePreview || undefined}
                                alt="Preview"
                                style={{ maxWidth: '100%', maxHeight: 120, borderRadius: 4 }}
                            />
                            <IconButton
                                size="small"
                                onClick={handleRemoveEditImage}
                                sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'rgba(0,0,0,0.5)' }}
                            >
                                <i className="tabler-x" style={{ color: 'white', fontSize: '12px' }} />
                            </IconButton>
                        </Box>
                    ) : (
                        <Box
                            {...getEditImageRootProps()}
                            sx={{
                                border: '2px dashed',
                                borderColor: isEditImageDragActive ? 'primary.main' : 'divider',
                                borderRadius: 1,
                                p: 1.5,
                                textAlign: 'center',
                                cursor: 'pointer',
                                mb: 1,
                                '&:hover': { borderColor: 'primary.main' }
                            }}
                        >
                            <input {...getEditImageInputProps()} />
                            <Typography variant="caption" color="text.secondary">
                                {isEditImageDragActive ? 'Drop image here' : 'Drag & drop image or click to select'}
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 2, pt: 0 }}>
                    <Button size="small" onClick={() => setEditDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleSubmitEdit}
                        disabled={submitting}
                    >
                        {submitting ? <CircularProgress size={16} /> : 'Update Note'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default NotesLog 