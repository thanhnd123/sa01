// src/app/server/actions.ts
import { cookies } from 'next/headers'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'
import type { User } from '@/types/apps/userTypes'

export async function getUserData() {
  const session = await getServerSession(authOptions)
  if (session?.user?.id) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/authenticated/users/show`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + session.user.accessToken
      },
      body: JSON.stringify({ _id: session.user.id })
    })
    const data = await response.json()
    const dataResult = data.result
    const userData = {
      id: dataResult._id,
      name: dataResult.name,
      email: dataResult.email,
      password: dataResult.password,
      role: dataResult.role,
      status: dataResult.status,
      team: dataResult.team,
      team_id: dataResult.team_id,
      token_admin: dataResult.token_admin,
      token_user: dataResult.token_user
    }
    return userData
  }
  return null
}
