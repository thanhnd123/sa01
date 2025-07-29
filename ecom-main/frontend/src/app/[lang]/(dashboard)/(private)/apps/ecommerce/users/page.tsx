// Component Imports
import UserList from '@views/apps/user/list'
import type { UsersType } from '@/types/apps/userTypes'

const UserListApp = async () => {
    const fetchData = await fetch(process.env.NEXT_PUBLIC_API_URL + '/teamexp/users/list?limit=25', {
        method: 'GET'
    })

    const convertJsonData = await fetchData.json()

    const data: UsersType[] = await convertJsonData

    return <UserList/>
}

export default UserListApp