'use client'

import React from 'react'
import { useUser, useAdmin, useAuth } from '@/contexts/UserContext'
import { Typography, Button, Box, Avatar, Chip } from '@mui/material'

const UserInfo: React.FC = () => {
  const { user, loading, isAuthenticated, updateUser, logout } = useUser()
  const isAdmin = useAdmin()
  const { isAuthenticated: authStatus, loading: authLoading } = useAuth()

  if (loading || authLoading) {
    return (
      <Box className='p-4'>
        <Typography>Loading user information...</Typography>
      </Box>
    )
  }

  if (!isAuthenticated || !user) {
    return (
      <Box className='p-4'>
        <Typography variant='h6' color='error'>
          User not authenticated
        </Typography>
      </Box>
    )
  }

  return (
    <Box className='p-4 border rounded-lg'>
      <Box className='flex items-center gap-3 mb-4'>
        <Avatar src={user.avatar} alt={user.name} className='w-12 h-12'>
          {user.name?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant='h6'>{user.name}</Typography>
          <Typography variant='body2' color='textSecondary'>
            {user.email}
          </Typography>
        </Box>
      </Box>

      <Box className='space-y-2'>
        <Box className='flex items-center gap-2'>
          <Typography variant='body2' fontWeight='bold'>
            Role:
          </Typography>
          <Chip label={user.role} color={isAdmin ? 'error' : 'primary'} size='small' />
        </Box>

        {user.team_name && (
          <Box className='flex items-center gap-2'>
            <Typography variant='body2' fontWeight='bold'>
              Team:
            </Typography>
            <Typography variant='body2'>{user.team_name}</Typography>
          </Box>
        )}

        {user.teams && user.teams.length > 0 && (
          <Box className='flex items-center gap-2'>
            <Typography variant='body2' fontWeight='bold'>
              Teams:
            </Typography>
            <Box className='flex gap-1'>
              {user.teams.map((team, index) => (
                <Chip key={team._id} label={team.name} size='small' variant='outlined' />
              ))}
            </Box>
          </Box>
        )}

        <Box className='flex items-center gap-2'>
          <Typography variant='body2' fontWeight='bold'>
            Status:
          </Typography>
          <Chip
            label={isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
            color={isAuthenticated ? 'success' : 'error'}
            size='small'
          />
        </Box>
      </Box>

      <Box className='flex gap-2 mt-4'>
        <Button variant='outlined' size='small' onClick={() => updateUser({ name: 'Updated Name' })}>
          Update Name
        </Button>
        <Button variant='contained' color='error' size='small' onClick={logout}>
          Logout
        </Button>
      </Box>
    </Box>
  )
}

export default UserInfo
