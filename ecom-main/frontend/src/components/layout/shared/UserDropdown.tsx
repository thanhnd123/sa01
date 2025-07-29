'use client'

// React Imports
import { useRef, useState, useMemo, useCallback, memo } from 'react'
import type { MouseEvent } from 'react'

// Next Imports
import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Cookies from 'js-cookie'

// Third-party Imports
import { signOut, useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

// Type Imports
import type { Locale } from '@configs/i18n'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'
import { useUser } from '@/contexts/UserContext'

// Styled component for badge content
const BadgeContentSpan = styled('span')({
  width: 8,
  height: 8,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: 'var(--mui-palette-success-main)',
  boxShadow: '0 0 0 2px var(--mui-palette-background-paper)'
})

const UserDropdown = () => {
  // States
  const [open, setOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  // Refs
  const anchorRef = useRef<HTMLDivElement>(null)

  // Hooks
  const router = useRouter()
  const { data: session } = useSession()
  const { user, loading, logout: logoutUser } = useUser()
  
  // Memoized values to prevent unnecessary rerenders
  const displayUser = useMemo(() => user || session?.user, [user, session?.user])
  const displayName = useMemo(() => displayUser?.name || 'User', [displayUser?.name])
  const displayEmail = useMemo(() => displayUser?.email || 'user@example.com', [displayUser?.email])
  const displayAvatar = useMemo(() => user?.avatar || session?.user?.image || '', [user?.avatar, session?.user?.image])
  const { settings } = useSettings()
  const params = useParams()
  const locale = params?.lang as string

  const handleDropdownOpen = useCallback(() => {
    setOpen(prev => !prev)
  }, [])

  const handleDropdownClose = useCallback((event?: MouseEvent<HTMLLIElement> | (MouseEvent | TouchEvent), url?: string) => {
    if (url) {
      router.push(getLocalizedUrl(url, locale as Locale))
    }

    if (anchorRef.current && anchorRef.current.contains(event?.target as HTMLElement)) {
      return
    }
    setOpen(false)
  }, [router, locale])

  const handleUserLogout = useCallback(async () => {
    try {
      logoutUser() // Logout từ UserContext
      await signOut({ callbackUrl: process.env.NEXT_PUBLIC_APP_URL })
      Cookies.remove('user')
    } catch (error) {
      console.error(error)
    }
  }, [logoutUser])

  // Memoized loading component - phải đặt trước mọi return
  const loadingComponent = useMemo(() => (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
    </div>
  ), [])

  // Don't render if no user and no session, but allow rendering during loading
  if (!user && !session && !loading) {
    return null
  }

  // Show loading state if still loading
  if (loading) {
    return loadingComponent
  }

  return (
    <>
      <Badge
        ref={anchorRef}
        overlap='circular'
        badgeContent={<BadgeContentSpan onClick={handleDropdownOpen} />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        className='mis-2'
      >
        <Avatar
          ref={anchorRef}
          alt={displayName}
          src={displayAvatar}
          onClick={handleDropdownOpen}
          className='cursor-pointer bs-[38px] is-[38px]'
          sx={{ width: 38, height: 38 }}
        />
      </Badge>
      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-end'
        anchorEl={anchorRef.current}
        className='min-is-[240px] !mbs-3 z-[1]'
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top'
            }}
          >
            <Paper className={settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg'}>
              <ClickAwayListener onClickAway={e => handleDropdownClose(e as MouseEvent | TouchEvent)}>
                <MenuList>
                  <div className='flex items-center plb-2 pli-6 gap-2' tabIndex={-1}>
                    <Avatar alt={displayName} src={displayAvatar} />
                    <div className='flex items-start flex-col'>
                      <Typography className='font-medium' color='text.primary'>
                        {displayName}
                      </Typography>
                      <Typography variant='caption'>{displayEmail}</Typography>
                    </div>
                  </div>
                  <Divider className='mlb-1' />
                  <MenuItem className='mli-2 gap-3' onClick={e => handleDropdownClose(e, '/pages/user-profile')}>
                    <i className='tabler-user' />
                    <Typography color='text.primary'>My Profile</Typography>
                  </MenuItem>
                  <div className='flex items-center plb-2 pli-3'>
                    <Button
                      fullWidth
                      variant='contained'
                      color='error'
                      size='small'
                      endIcon={<i className='tabler-logout' />}
                      onClick={handleUserLogout}
                      sx={{ '& .MuiButton-endIcon': { marginInlineStart: 1.5 } }}
                    >
                      Logout
                    </Button>
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default memo(UserDropdown)
