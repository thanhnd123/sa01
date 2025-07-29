'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

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

import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { useForm } from 'react-hook-form'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { email, object, minLength, string, pipe, nonEmpty } from 'valibot'
import { signIn } from 'next-auth/react'

// Type Imports
import type { Locale } from '@configs/i18n'
import type { SystemMode } from '@core/types'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Config Imports
import themeConfig from '@configs/themeConfig'

import { useSettings } from '@core/hooks/useSettings'

import { useImageVariant } from '@core/hooks/useImageVariant'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Styled Component Imports
import AuthIllustrationWrapper from '@/views/auth/AuthIllustrationWrapper'

const schema = object({
  email: pipe(string(), minLength(1, 'This field is required')),
  password: pipe(
    string(),
    nonEmpty('This field is required'),
    minLength(5, 'Password must be at least 5 characters long')
  )
})

type ErrorType = {
  message: string[]
}

type FormData = {
  email: string
  password: string
  rememberMe: boolean
}

const Login = ({ mode }: { mode: SystemMode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [errorState, setErrorState] = useState<ErrorType | null>(null)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)

  // Vars
  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-login-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-login-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-login-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-login-light-border.png'

  // Hooks
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams()
  const locale = params?.lang as Locale
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode, lightImg, darkImg)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  })

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit = async (data: FormData) => {
    try {
      
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: '/'
      })
      if (!res) {
        setErrorState({ message: ['No response from server'] })
        return
      }
      if (res.error) {
        try {
          // Check if the error is a JSON string before parsing
          if (res.error.startsWith('{')) {
            const error = JSON.parse(res.error)

            setErrorState({ message: [error.error] })
          } else {
            // If not JSON, use the error string directly
            setErrorState({ message: [res.error] })
          }
        } catch (e) {
          // Handle JSON parse errors
          setErrorState({ message: [res.error || 'An unexpected error occurred'] })
        }
      } else if (res.ok) {
        const redirectURL = searchParams?.get('redirectTo') ?? '/'


        router.replace(getLocalizedUrl(redirectURL, locale))
      }
    } catch (error) {
      console.error('Login error:', error)
      setErrorState({ message: ['An unexpected error occurred during login'] })
    }
  }

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
            {errorState && (
              <div className='mbe-4 p-4 bg-error text-error rounded'>
                {errorState.message.map((msg, index) => (
                  <Typography key={index}>{msg}</Typography>
                ))}
              </div>
            )}
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
              <CustomTextField
                autoFocus
                fullWidth
                label='Email or Username'
                placeholder='Enter your email or username'
                {...register('email')}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
              <CustomTextField
                fullWidth
                label='Password'
                placeholder='············'
                id='outlined-adornment-password'
                type={isPasswordShown ? 'text' : 'password'}
                {...register('password')}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
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

              <Divider className='gap-2 text-textPrimary'>
                <Typography variant='body2' className='px-2'>
                  or
                </Typography>
              </Divider>

              {/* <Button
                fullWidth
                variant='outlined'
                onClick={() => signIn('google', { callbackUrl: getLocalizedUrl('/', locale as Locale) })}
                startIcon={<i className='tabler-brand-google text-red-500' />}
                className='border-gray-300 hover:border-gray-400'
              >
                Continue with Google
              </Button> */}
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>New on our platform?</Typography>
                <Typography component={Link} href={getLocalizedUrl('/register', locale as Locale)} color='primary.main'>
                  Create an account
                </Typography>
              </div>
            </form>
          </CardContent>
        </Card>
      </AuthIllustrationWrapper>
    </div>
  )
}

export default Login
