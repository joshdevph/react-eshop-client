import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import PaypalButton from './PaypalButton'
import { MdErrorOutline } from "react-icons/md";
import swal from 'sweetalert'
function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)
    const [isLogged] = state.userAPI.isLogged
    
    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])

    const addToCart = async (cart) =>{
        await axios.patch(`${process.env.REACT_APP_URL_API}/user/addcart`, {cart}, {
            headers: {Authorization: token}
        })
    }


    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = id =>{

        // if(answer == true)
        //     {

        // }
        swal("Are you sure to remove this?", {
            buttons: {
              remove: {
                value: "remove",
              },
              cancel: "Cancel",
            },
            icon: "warning"
          })
          .then((value) => {
            // eslint-disable-next-line default-case
            switch (value) {
              case "remove":
                swal("Gotcha!", "Item removed successfully", "success");
                cart.forEach((item, index) => {
                    if(item._id === id){
                        cart.splice(index, 1)
                    }
                })
    
                setCart([...cart])
                addToCart(cart)
                break;
           
                case "cancel":
                    break;
            }
          });
    }

    const tranSuccess = async(payment) => {
        const {paymentID, address} = payment;

        await axios.post(`${process.env.REACT_APP_URL_API}/api/payment`, {cart, paymentID, address}, {
            headers: {Authorization: token}
        })

        setCart([])
        addToCart([])
        swal({
            title: `Thank You!`,
            text: "You have successfully placed an order.",
            icon: "success",
        });
    }




    return (
        <div className="w-4/5 m-auto mt-10 flex flex-col md:w-3/4 md:m-auto md:grid md:grid-cols-3 md:gap-4">
            {
                isLogged ?
                <>
                    <div className="col-span-2  mt-4">
                    {
                        cart.map(product => (
                                
                                <div key={product._id} className="bg-white-300 w-full h-72 mb-1 shadow-md rounded-md md:mb-2 md:grid md:grid-cols-4 md:h-36 md:w-full  md:col-span-1 ">
                                    <div className=" h-42 w-full ">
                                        <img className="h-36 border-4 w-full border-black" src={product.images.url} alt=""/>
                                    </div>
                                    <div className=" h-28 md:col-span-3 pl-5 flex flex-col overflow-hidden md:h-full">
                                        <div className=" h-24 truncate mt-2">
                                            <h1 className="uppercase text-xl font-bold">{product.title}</h1>
                                            <h1 className="uppercase text-md font-semibold">PHP {product.price}.00</h1>
                                            {/* <h1 className="uppercase text-xs truncate">{product.description}</h1> */}
                                        </div>
                                        <div className="h-10 flex items-center justify-between w-full md:mb-4">
                                            <div className=" flex space-x-1 items-center">
                                                <span className="bg-white align-middle inline-block h-full px-2 cursor-pointer border-2 hover:border-black rounded-md" onClick={() => increment(product._id)}> + </span>
                                                <input className="w-10 m-auto focus:outline-none cursor-not-allowed border-2 text-right  " type="number" value={product.quantity} readOnly/>
                                                <span className="bg-white align-middle inline-block h-full px-2 cursor-pointer border-2 hover:border-black rounded-md"onClick={() => decrement(product._id)}> - </span>
                                            </div>
                                            <div className="mr-5">
                                                <button className="bg-red-400 p-2 uppercase text-sm  font-semibold tracking-wider rounded-sm hover:bg-gray-200 transition ease-out duration-200" onClick={() => removeProduct(product._id)}>Remove</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                
                                
                        ))
                    }
                    </div>
                    <div className="bg-white w-full shadow-lg mt-4 h-48 mb-10 sticky grid grid-rows-4 md:h-64 rounded-xl">
                        <div className="flex justify-center items-center bg-gray-300 ">
                            <h1 className="text-lg font-bold uppercase tracking-widest">Order Summary</h1>
                        </div>
                        <div className="flex items-center justify-between m-10 bg-red-300 ">
                            <span className="text-md tracking-wider font-semibold">Subtotal Purchase :</span>
                            <span className="text-lg font-bold">PHP {total}.00</span>
                        </div>
                        <div className="flex items-center justify-between m-10 ">
                            <span></span>
                            <PaypalButton
                            total = {total}
                            tranSuccess = {tranSuccess}
                            />
                        </div>
                        
                    </div>
                </>
                :
                <div className=" col-span-3 flex flex-col justify-center items-center w-full mt-56">
                    <span className="text-xl font-semibold tracking-widest">Please Sign In to continue Shopping ...</span>
                    <MdErrorOutline className="mt-10 text-9xl"/>
                </div>
            }


        </div>

    )
}

export default Cart
