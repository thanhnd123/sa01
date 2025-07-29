import { NextResponse } from 'next/server'
import axiosInstance from '@/libs/axios'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libs/auth'
import { cardClasses } from '@mui/material'

// GET /api/design?type=new
// GET /api/design?type=my
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const type = searchParams.get('type')

        // Xử lý route /api/design/new
        if (type === 'new') {
            try {
                const response = await axiosInstance.get(process.env.NEXT_PUBLIC_API_URL + '/api/authenticated/design/new')
                return NextResponse.json(response.data, { status: response.status })
            } catch (err: any) {
                const status = err.response?.status || 500
                const message = err.response?.data?.error || err.message
                return NextResponse.json({
                    result: [],
                    message,
                    success: false
                }, { status })
            }
        }

        // Xử lý route /api/design/my
        if (type === 'my') {
            try {
                const response = await axiosInstance.get(process.env.NEXT_PUBLIC_API_URL + '/api/authenticated/design/my', 
                    {
                        params: searchParams
                    }
                )
                return NextResponse.json(response.data, { status: response.status })
            } catch (err: any) {
                const status = err.response?.status || 500
                const message = err.response?.data?.error || err.message
                return NextResponse.json({
                    result: [],
                    message,
                    success: false
                }, { status })
            }
        }

        // Nếu không có type hoặc type không hợp lệ
        return NextResponse.json(
            { error: 'Invalid type parameter' },
            { status: 400 }
        )

    } catch (error) {
        console.error('Error in /api/design:', error)
        return NextResponse.json(
            { error: 'Failed to fetch designs' },
            { status: 500 }
        )
    }
}