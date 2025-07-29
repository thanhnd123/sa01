import React, { useState, useEffect, useCallback, useMemo } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import axiosInstance from '@/libs/axios'

interface IdealCardProps {
  item: {
    title: string
    market: string
    banner: string
    store: string
    sold_24h: number
    views_24h: number
    total_sold: number
    estimated_revenue: number
    daily_views: number
    rate_favorite: number
    total_farvorites: number
    original_creation: string
    last_modified: string
    hey_etsy_tags: string
    png: string
    _id: string
    id: string
  }
  valueFavorites: string
  onPushToDesigner: (item: any) => void
  onPngClick: (item: any) => void
  onRemoveFavorite: (item: any) => void
  onAddFavorite: (item: any) => void
  onShowDetails: (item: any) => void
  onEdit: (item: any) => void
}

const IdealCard: React.FC<IdealCardProps> = ({
  item,
  valueFavorites,
  onPushToDesigner,
  onPngClick,
  onRemoveFavorite,
  onAddFavorite,
  onShowDetails,
  onEdit
}) => {
  const [ideal, setIdeal] = useState(item)
  const [editMode, setEditMode] = useState(false)
  const [newTag, setNewTag] = useState('')
  const [localTags, setLocalTags] = useState<string[]>([])

  // Initialize local tags from item
  useEffect(() => {
    if (typeof item.hey_etsy_tags === 'string') {
      setLocalTags(item.hey_etsy_tags?.split(',').filter(tag => tag.trim()) || [])
    } else {
      setLocalTags([])
    }
  }, [item.hey_etsy_tags])

  const tags = localTags
  const displayTags = useMemo(() => tags, [tags]) // Hiển thị full tags
  const hasMoreTags = useMemo(() => false, []) // Không cần hasMoreTags nữa

  // Tag styling - black and white with border
  const getTagStyle = useCallback((index: number) => {
    return {
      backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fa',
      color: '#000000',
      border: '1px solid #000000',
      fontWeight: 'bold'
    }
  }, [])

  const handleRemoveTag = useCallback((index: number) => {
    setLocalTags(prev => prev.filter((_, i) => i !== index))
  }, [])

  const handleAddTag = useCallback((tag: string) => {
    if (tag.trim()) {
      setLocalTags(prev => {
        if (!prev.includes(tag.trim())) {
          return [...prev, tag.trim()]
        }
        return prev
      })
    }
  }, [])

  const handleSaveTags = useCallback(async () => {
    try {
      const response = await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/ideals/${item._id}/tags`,
        {
          keywords: localTags.join(',')
        }
      )

      setEditMode(false)
      setIdeal(response.data.ideal)
    } catch (error) {
      console.error('Error saving tags:', error)
    }
  }, [localTags, item._id])

  const handleCancelEdit = useCallback(() => {
    setLocalTags(item.hey_etsy_tags?.split(',').filter(tag => tag.trim()) || [])
    setEditMode(false)
    setNewTag('')
  }, [item.hey_etsy_tags])

  const handleNewTagChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value)
  }, [])

  const handleNewTagKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && newTag.trim()) {
        handleAddTag(newTag.trim())
        setNewTag('')
      }
    },
    [newTag, handleAddTag]
  )

  const handleAddTagClick = useCallback(() => {
    if (newTag.trim()) {
      handleAddTag(newTag.trim())
      setNewTag('')
    }
  }, [newTag, handleAddTag])

  // Format date helper
  const formatDate = useCallback((dateString: string) => {
    if (!dateString || dateString === 'Unknown') return 'N/A'
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    })
  }, [])

  return (
    <Card className='h-full relative hover:shadow-lg transition-shadow duration-200'>
      {/* PNG Badge */}
      {item.png && (
        <Tooltip title='PNG Ready' placement='top'>
          <div className='absolute top-2 left-2 z-10 bg-warning text-white px-2 py-1 rounded-full text-xs font-bold'>
            <i className='tabler-file-type-png mr-1' />
          </div>
        </Tooltip>
      )}

      <CardContent className='p-3'>
        <div className='flex flex-col gap-3'>
          {/* Product Image */}
          <div className='flex justify-center'>
            <img
              src={item.banner}
              alt={item.title}
              className='rounded-lg h-48 w-full object-cover'
            />
          </div>

          {/* Product Title */}
          <Typography variant='h6' className='line-clamp-2 text-wrap font-semibold' title={item.title}>
            {item.title}
          </Typography>

          {/* Store Info */}
          <div className='flex justify-between items-center'>
            <Chip
              label={`${item.market || ''}-${item.store || ''}`}
              size='small'
              color='primary'
              variant='filled'
            />
            <Typography variant='caption' className='text-info '>
              {item.original_creation}
            </Typography>
          </div>

          {/* Key Metrics - Compact Grid */}
          <div className='grid grid-cols-4 gap-2'>
            <Tooltip title='Sold 24H' placement='top'>
              <div className='bg-green-100 rounded-lg p-2 text-center'>
                <div className='text-green-600 font-bold text-sm'>{item.sold_24h || 0}</div>
                <div className='text-xs text-gray-600'>24h</div>
              </div>
            </Tooltip>
            <Tooltip title='Views 24H' placement='top'>
              <div className='bg-blue-100 rounded-lg p-2 text-center'>
                <div className='text-blue-600 font-bold text-sm'>{item.views_24h || 0}</div>
                <div className='text-xs text-gray-600'>Views</div>
              </div>
            </Tooltip>
            <Tooltip title='Total Sold' placement='top'>
              <div className='bg-orange-100 rounded-lg p-2 text-center'>
                <div className='text-orange-600 font-bold text-sm'>{item.total_sold || 0}</div>
                <div className='text-xs text-gray-600'>Total</div>
              </div>
            </Tooltip>
            <Tooltip title='Revenue' placement='top'>
              <div className='bg-purple-100 rounded-lg p-2 text-center'>
                <div className='text-purple-600 font-bold text-sm'>${item.estimated_revenue || 0}</div>
                <div className='text-xs text-gray-600'>Revenue</div>
              </div>
            </Tooltip>
          </div>

          {/* Additional Stats - Compact */}
          <div className='grid grid-cols-2 gap-2 text-xs'>
            <div className='flex justify-between items-center bg-gray-50 rounded px-2 py-1'>
              <span className='text-gray-600'>Favorites:</span>
              <span className='font-semibold text-blue-600'>{item.total_farvorites || 0} ({item.rate_favorite || 0}%)</span>
            </div>
            <div className='flex justify-between items-center bg-gray-50 rounded px-2 py-1'>
              <span className='text-gray-600'>Daily Views:</span>
              <span className='font-semibold text-pink-600'>{item.daily_views || 0}</span>
            </div>
          </div>

          {/* Tags Section */}
          <div className='flex flex-col gap-2'>
            <div className='flex justify-between items-center'>
              <Typography variant='body2' className='font-semibold text-primary'>
                Keywords ({tags.length})
              </Typography>
              <div className='flex gap-1'>
                {editMode ? (
                  <>
                    <IconButton
                      size='small'
                      onClick={handleSaveTags}
                      className='text-green-600 hover:text-green-700'
                      title='Save Tags'
                    >
                      <i className='tabler-check text-sm' />
                    </IconButton>
                    <IconButton
                      size='small'
                      onClick={handleCancelEdit}
                      className='text-red-600 hover:text-red-700'
                      title='Cancel'
                    >
                      <i className='tabler-x text-sm' />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    size='small'
                    onClick={() => setEditMode(true)}
                    className='text-blue-600 hover:text-blue-700'
                    title='Edit Tags'
                  >
                    <i className='tabler-edit text-sm' />
                  </IconButton>
                )}
              </div>
            </div>

            <div className='flex flex-wrap gap-1'>
              {editMode ? (
                <>
                  {tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size='small'
                      onDelete={() => handleRemoveTag(index)}
                      deleteIcon={<i className='tabler-x text-xs' />}
                      className='hover:shadow-md transition-shadow'
                      sx={getTagStyle(index)}
                    />
                  ))}
                  <div className='flex items-center gap-1'>
                    <TextField
                      size='small'
                      placeholder='Add tag...'
                      value={newTag}
                      onChange={handleNewTagChange}
                      onKeyPress={handleNewTagKeyPress}
                      className='w-20'
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          height: '28px',
                          fontSize: '0.75rem'
                        }
                      }}
                    />
                    <IconButton
                      size='small'
                      onClick={handleAddTagClick}
                      disabled={!newTag.trim()}
                      className='text-green-600 hover:text-green-700'
                      title='Add Tag'
                    >
                      <i className='tabler-plus text-sm' />
                    </IconButton>
                  </div>
                </>
              ) : (
                <>
                  {displayTags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size='small'
                      className='hover:shadow-md transition-shadow'
                      sx={getTagStyle(index)}
                    />
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex justify-center gap-2 pt-2 border-t border-gray-200'>
            <Tooltip title='Push to designer' placement='top'>
              <IconButton
                size='small'
                onClick={() => onPushToDesigner(item)}
                color='primary'
              >
                <i className='tabler-brush' />
              </IconButton>
            </Tooltip>
            <Tooltip title='PNG' placement='top'>
              <IconButton
                size='small'
                onClick={() => onPngClick(item)}
                color={item.png ? 'success' : 'info'}
              >
                <i className='tabler-file-type-png' />
              </IconButton>
            </Tooltip>
            <Tooltip title={valueFavorites === 'my_favorites' ? 'Unfavorite' : 'Add to favorites'} placement='top'>
              <IconButton
                size='small'
                onClick={() => valueFavorites === 'my_favorites' ? onRemoveFavorite(item) : onAddFavorite(item)}
                color={valueFavorites === 'my_favorites' ? 'warning' : 'success'}
              >
                <i className={`tabler-heart${valueFavorites === 'my_favorites' ? '-filled' : ''}`} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Show Details' placement='top'>
              <IconButton
                size='small'
                onClick={() => onShowDetails(item)}
                color='info'
              >
                <i className='tabler-eye text-sm' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Edit' placement='top'>
              <IconButton
                size='small'
                onClick={() => onEdit(item)}
                color='primary'
              >
                <i className='tabler-edit text-sm' />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default IdealCard