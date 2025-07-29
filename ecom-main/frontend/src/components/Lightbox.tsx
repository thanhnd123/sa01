import React, { useState } from 'react'
import { Dialog, DialogActions, DialogContent, Button } from '@mui/material'

type Props = {
  imageUrl: string | string[]
  open: boolean
  handleClose: () => void
  imageAlt: string | string[]
  initialIndex?: number
}

function Lightbox(props: Props) {
  const { imageUrl, open, handleClose, imageAlt, initialIndex = 0 } = props
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const images = Array.isArray(imageUrl) ? imageUrl : [imageUrl]
  const alts = Array.isArray(imageAlt) ? imageAlt : [imageAlt]

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % images.length)
  }

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='lg'>
        <DialogContent sx={{ position: 'relative' }}>
          <img
            src={images[currentIndex]}
            alt={alts[currentIndex]}
            style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
          />

          {images.length > 1 && (
            <>
              <Button
                onClick={handlePrev}
                sx={{
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)'
                  }
                }}
              >
                <i className='tabler-chevron-left' />
              </Button>

              <Button
                onClick={handleNext}
                sx={{
                  position: 'absolute',
                  right: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)'
                  }
                }}
              >
                <i className='tabler-chevron-right' />
              </Button>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color='primary'
            sx={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)'
              }
            }}
            startIcon={<i className='tabler-x' />}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Lightbox
