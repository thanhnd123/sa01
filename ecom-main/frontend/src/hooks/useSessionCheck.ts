// 'use client'

// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'

// export const useSessionCheck = () => {
//     const router = useRouter()

//     useEffect(() => {
//         const checkSession = async () => {
//             try {
//                 const response = await fetch('/api/check-session')
//                 const data = await response.json()

//                 if (!data.success) {
//                     console.log('data', data)
//                     router.push(data.redirectTo)
//                     return
//                 }

//                 router.push(data.redirectTo)
//             } catch (error) {
//                 console.error('Session check error:', error)
//                 router.push('/auth/login')
//             }
//         }

//         // checkSession()
//     }, [router])
// }