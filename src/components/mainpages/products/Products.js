import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import Filters from './Filters'
import LoadMore from './LoadMore'
// import io from 'socket.io-client';


function Products() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.productsAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    const handleCheck = (id) =>{
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }

    const deleteProduct = async(id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post(`${process.env.REACT_APP_URL_API}/api/destroy`, {public_id},{
                headers: {Authorization: token}
            })
            const deleteProduct = axios.delete(`${process.env.REACT_APP_URL_API}/api/products/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteProduct
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () =>{
        products.forEach(product => {
            product.checked = !isCheck
        })
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    const deleteAll = () =>{
        products.forEach(product => {
            if(product.checked) deleteProduct(product._id, product.images.public_id)
        })
    }

    if(loading) return <div><Loading /></div>

    // const socket = io('localhost:3000')

    // console.log(socket)

    return (
        <>
        <Filters />
        
        {
            isAdmin && 
            <div className="w-3/4 m-auto flex items-center md:justify-end justify-between space-x-4">
                <div className="flex items-center space-x-2 ">
                    <span>Select all</span>
                    <input type="checkbox" checked={isCheck} onChange={checkAll} />
                </div>
                <button className="bg-red-300 p-2 rounded-lg" onClick={deleteAll}>Delete All</button>
            </div>
        }

        <div className="w-full mt-5 flex flex-col mx-auto md:grid md:grid-cols-4 md:w-3/4 md:gap-3 md:mx-auto ">
            {
                products.map(product => {
                    return <ProductItem key={product._id} product={product}
                    isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                })
            } 
        </div>

        <LoadMore />
        {products.length === 0 && <Loading />}
        </>
    )
}

export default Products
