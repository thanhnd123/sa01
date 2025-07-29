// Next Imports
import type { Metadata } from 'next'

// Component Imports
import Login from '@/views/Login'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account'
}

const LoginPage = async () => {
  // Vars
  const mode = await getServerMode()
  return <div className='flex flex-col justify-center items-center min-bs-[100dvh] p-6'>
    <Login mode={mode} />
  </div>
}

export default LoginPage
