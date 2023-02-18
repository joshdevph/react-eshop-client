import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'

function OrderDetails() {
    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    const [orderDetails, setOrderDetails] = useState([])

    const params = useParams()

    useEffect(() => {
        if(params.id){
            history.forEach(item =>{
                if(item._id === params.id) setOrderDetails(item)
            })
        }
    },[params.id, history])


    if(orderDetails.length === 0) return null;

    return (
        <div className="w-full p-5 md:w-1/2 m-auto">
            <h1 className="mt-5 uppercase tracking-widest text-2xl font-pop font-semibold">Order Details</h1>
            {/* <table className="w-full mt-5 mb-20">
                    <thead >
                        <tr className="border-2 border-black">
                        <th className="border-2 border-black p-3 bg-red-200 uppercase tracking-wider"> Name</th>
                        <th className="border-2 border-black p-3 bg-red-200 uppercase tracking-wider"> Address</th>
                        <th className="border-2 border-black p-3 bg-red-200 uppercase tracking-wider"> Postal Code</th>
                        <th className="border-2 border-black p-3 bg-red-200 uppercase tracking-wider"> Country</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        history.map(item => (
                            <tr key={item._id}>
                                <td className="border-2 border-black p-2 truncate tracking-wide text-center">{orderDetails.address.recipient_name}</td>
                                <td className="border-2 border-black p-2 truncate text-center tracking-widest">{orderDetails.address.city}</td>
                                <td className="border-2 border-black p-2 truncate text-center tracking-widest">{orderDetails.address.postal_code}</td>
                                <td className="border-2 border-black p-2 truncate text-center tracking-widest">{orderDetails.address.country_code}</td>
                            </tr>
                        ))
                    }
                    </tbody>
            </table> */}
            {/* <span className=" flex justify-center mt-10 uppercase tracking-widest font-pop font-semibold">  Products Ordered </span> */}
            <table className="w-full mt-10">
                    <thead >
                        <tr className="border-2 border-black">
                        <th className="border-2 border-black p-3  tracking-wider"> </th>
                        <th className="border-2 border-black p-3  tracking-wider"> Products</th>
                        <th className="border-2 border-black p-3  tracking-wider"> Quantity</th>
                        <th className="border-2 border-black p-3  tracking-wider"> Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        orderDetails.cart.map(item => (
                            <tr key={item._id}>
                                <td className="border-2 border-black p-2 truncate tracking-wide text-center m-auto"><img className=" h-16" src={item.images.url} alt="" /></td>
                                <td className="border-2 border-black p-2 truncate text-center tracking-widest capitalize text-lg font-bold font-pop">{item.title}</td>
                                <td className="border-2 border-black p-2 truncate text-center tracking-widest">{item.quantity}</td>
                                <td className="border-2 border-black p-2 truncate text-center tracking-widest">{item.price * item.quantity}</td>
                            </tr>
                        ))
                    }
                    </tbody>
            </table>


            {/* <table style={{margin: "30px 0px"}}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Products</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetails.cart.map(item =>(
                        <tr key={item._id}>
                            <td><img src={item.images.url} alt="" /></td>
                            <td>{item.title}</td>
                            <td>{item.quantity}</td>
                            <td>$ {item.price * item.quantity}</td>
                        </tr>
                        ))
                    }
                    
                </tbody>
            </table> */}
        </div>
    )
}

export default OrderDetails
