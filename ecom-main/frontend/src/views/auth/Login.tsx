'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

// Type Imports
import type { Locale } from '@configs/i18n'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Styled Component Imports
import AuthIllustrationWrapper from './AuthIllustrationWrapper'

const Login = () => {
    // States
    const [isPasswordShown, setIsPasswordShown] = useState(false)

    // Hooks
    const params = useParams()
  const locale = params?.lang as string

    const handleClickShowPassword = () => setIsPasswordShown(show => !show)

    return (
        <div className='flex flex-col justify-center items-center min-bs-[100dvh] p-6'>
            <AuthIllustrationWrapper>
                <Card className='flex flex-col sm:is-[450px]'>
                    <CardContent className='sm:!p-12'>
                        <Link href={getLocalizedUrl('/', locale as Locale)} className='flex justify-center mbe-6'>
                            <Logo />
                        </Link>
                        <div className='flex flex-col gap-1 mbe-6'>
                            <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
                            <Typography>Please sign-in to your account and start the adventure</Typography>
                        </div>
                        <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()} className='flex flex-col gap-6'>
                            <CustomTextField autoFocus fullWidth label='Email or Username' placeholder='Enter your email or username' />
                            <CustomTextField
                                fullWidth
                                label='Password'
                                placeholder='············'
                                id='outlined-adornment-password'
                                type={isPasswordShown ? 'text' : 'password'}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                                                    <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                }}
                            />
                            <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
                                <FormControlLabel control={<Checkbox />} label='Remember me' />
                                <Typography
                                    className='text-end'
                                    color='primary.main'
                                    component={Link}
                                    href={getLocalizedUrl('/pages/auth/forgot-password-v1', locale as Locale)}
                                >
                                    Forgot password?
                                </Typography>
                            </div>
                            <Button fullWidth variant='contained' type='submit'>
                                Login
                            </Button>
                            <div className='flex justify-center items-center flex-wrap gap-2'>
                                <Typography>New on our platform?</Typography>
                                <Typography
                                    component={Link}
                                    href={getLocalizedUrl('/pages/auth/register-v1', locale as Locale)}
                                    color='primary.main'
                                >
                                    Create an account
                                </Typography>
                            </div>
                            <Divider className='gap-2 text-textPrimary'></Divider>
                        </form>
                    </CardContent>
                </Card>
            </AuthIllustrationWrapper>
        </div>
    )
}

export default Login
