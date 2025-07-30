import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libs/auth'

export async function POST() {
    try {
        const session = await getServerSession(authOptions)

        if (session) {
            // Xóa session ở server
            // Có thể thêm logic xóa token ở database nếu cần

            return NextResponse.json({
                success: true,
                message: 'Logged out successfully'
            })
        }

        return NextResponse.json({
            success: false,
            message: 'No active session'
        }, { status: 401 })

    } catch (error) {
        console.error('Logout error:', error)
        return NextResponse.json({
            success: false,
            message: 'Internal server error'
        }, { status: 500 })
    }
} 