'use client'

// React Imports
import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

// Next Imports
import Link from 'next/link'

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
import { Alert, Snackbar } from '@mui/material'

// Third-party Imports
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { email, object, minLength, string, pipe, boolean, literal } from 'valibot'
import axios from 'axios'

// Type Imports
import type { SystemMode } from '@core/types'
import type { Locale } from '@configs/i18n'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Styled Component Imports
import AuthIllustrationWrapper from '@/views/auth/AuthIllustrationWrapper'

// Thêm type cho form data
type FormData = {
  username: string
  email: string
  password: string
  terms: boolean
}

// Sửa lại schema validation
const schema = object({
  username: pipe(string(), minLength(3, 'Username must be at least 3 characters')),
  email: pipe(string(), minLength(1, 'Email is required'), email('Invalid email format')),
  password: pipe(string(), minLength(6, 'Password must be at least 6 characters')),
  terms: pipe(boolean(), literal(true, 'You must accept the terms'))
})

const Register = ({ mode }: { mode: SystemMode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [errorState, setErrorState] = useState<{ message: string[] } | null>(null)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  // Vars
  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-register-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-register-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-register-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-register-light-border.png'

  // Hooks
  const params = useParams()
  const locale = params?.lang as Locale
  const router = useRouter()
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      terms: false
    }
  })

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit = async (data: FormData) => {
    const res = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        username: data.username,
        email: data.email,
        password: data.password
      })
      .then(res => {

        setSnackbarMessage('Please contact your administrator to activate your account')
        setOpenSnackbar(true)
      })
      .catch(err => {

        setErrorState({ message: [err.response?.data?.error || 'Registration failed'] })
      })
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
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
              <Typography variant='h4'>Adventure starts here 🚀</Typography>
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
                label='Username'
                placeholder='Enter your username'
                {...register('username')}
                error={Boolean(errors.username)}
                helperText={errors.username?.message}
              />
              <CustomTextField
                fullWidth
                label='Email'
                placeholder='Enter your email'
                {...register('email')}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
              <CustomTextField
                fullWidth
                label='Password'
                placeholder='············'
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
              <FormControlLabel
                control={
                  <Checkbox
                    {...register('terms', {
                      setValueAs: value => value
                    })}
                  />
                }
                label={
                  <>
                    <span>I agree to </span>
                    <Link className='text-primary' href='/' onClick={e => e.preventDefault()}>
                      privacy policy & terms
                    </Link>
                  </>
                }
              />
              {errors.terms && (
                <Typography color='error' variant='caption'>
                  {errors.terms.message}
                </Typography>
              )}
              <Typography variant='body2' className='text-textPrimary'>
                Contact support{' '}
                <Link href='https://t.me/Heath0701' target='_blank' className='text-primary'>
                  Tele: @Heath0701
                </Link>
              </Typography>
              <Button fullWidth variant='contained' type='submit'>
                Sign Up
              </Button>
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>Already have an account?</Typography>
                <Typography component={Link} href={getLocalizedUrl('/login', locale as Locale)} color='primary.main'>
                  Sign in instead
                </Typography>
              </div>
              {/* <Divider className='gap-2 text-textPrimary'>or</Divider> */}
              {/* <div className='flex justify-center items-center gap-1.5'>
                <IconButton className='text-facebook' size='small'>
                  <i className='tabler-brand-facebook-filled' />
                </IconButton>
                <IconButton className='text-twitter' size='small'>
                  <i className='tabler-brand-twitter-filled' />
                </IconButton>
                <IconButton className='text-textPrimary' size='small'>
                  <i className='tabler-brand-github-filled' />
                </IconButton>
                <IconButton className='text-error' size='small'>
                  <i className='tabler-brand-google-filled' />
                </IconButton>
              </div> */}
            </form>
          </CardContent>
        </Card>
      </AuthIllustrationWrapper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity='success' sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Register
