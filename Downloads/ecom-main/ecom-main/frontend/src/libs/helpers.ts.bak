import axiosInstance from "./axios"




export const getProductTypes = async (query: object = {}, cb: (data: any) => void) => {
    const apiProductTypes = process.env.NEXT_PUBLIC_API_URL + '/products/product-types'
    const response = await axiosInstance.get(apiProductTypes, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    cb(response.data)
}



