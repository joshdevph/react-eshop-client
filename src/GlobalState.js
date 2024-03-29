import React, {createContext, useState, useEffect} from 'react'
import ProductsAPI from './api/ProductsAPI'
import UserAPI from './api/UserAPI'
import CategoriesAPI from './api/CategoriesAPI'

import axios from 'axios'

export const GlobalState = createContext()


export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)
    const refreshToken = async () =>{
        var rfToken = localStorage.getItem('refreshtoken')
        const res = await axios.get(`${process.env.REACT_APP_URL_API}/user/refresh_token`,
        { params: { rf : rfToken } }
        )
        setToken(res.data.accesstoken)
    }

    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            refreshToken()
        }
    },[])


    
    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI()
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}