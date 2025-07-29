/**
 * ! The server actions below are used to fetch the static data from the fake-db. If you're using an ORM
 * ! (Object-Relational Mapping) or a database, you can swap the code below with your own database queries.
 */

'use server'

// Data Imports


import type { User, UsersType } from '@/types/apps/userTypes'


import { getUserData as getUserDataClient } from '@/data/cookies/user'
import axiosInstance from '@/libs/axios'

// export const getUserData = async (limit: number = 25, page: number = 1, search: string = '') => {
//   try {
//     const response = await axiosInstance.get('/api/authenticated/users', {
//       params: {
//         limit,
//         page,
//         search
//       }
//     })
//     return response.data
//   } catch (error) {
//     console.error('Error fetching user data:', error)
//     throw error
//   }
// }

export const deleteUser = async (userData: any) => {
  try {
    const response = await axiosInstance.post('/api/authenticated/users/delete', userData)
    return response.data
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}

export const addUserData = async (dataRequest: User) => {
  const userCurrent = await getUserDataClient()

  dataRequest['token_admin'] = userCurrent?.token_admin ?? ''

  if (dataRequest['token_admin'] == '') {
    return 'Error token admin'
  }

  const fetchData = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/authenticated/users/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + userCurrent?.token_user
    },
    body: JSON.stringify(dataRequest)
  })

  const convertJsonData = await fetchData.json()

  console.log(convertJsonData);

  const data: User = await convertJsonData.result

  return data
}

export const updateUserData = async (dataRequest: User) => {
  const userCurrent = await getUserDataClient()
  if (userCurrent?.role == 'Manager' || userCurrent?.role == 'admin') {
    dataRequest['token_admin'] = "$2y$12$UqTmw4c437JJpWwsLBFBaOv4tKJoLTnpWZqcuzon5amDHLAk6RPim"
  } else {
    return 'Error role'
  }

  if (dataRequest['token_admin'] == '') {
    return 'Error token admin'
  }

  const fetchData = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/authenticated/users/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + userCurrent?.token_user
    },
    body: JSON.stringify(dataRequest)
  })

  const convertJsonData = await fetchData.json()

  const data: User = await convertJsonData.result

  return data;
}
