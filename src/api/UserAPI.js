import {useState, useEffect} from 'react'
import axios from 'axios'
import swal from 'sweetalert'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])

    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get(`${process.env.REACT_APP_URL_API}/user/infor`, {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true)  : setIsAdmin(false)
                    setCart(res.data.cart)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()
            
        }
    },[token])

    

    const addCart = async (product) => {
        if(!isLogged) 
        return swal({
            title: `Information`,
            text: "Please Login to continue buying",
            icon: "info",
        });

        const check = cart.every(item =>{
            return item._id !== product._id
        })

        if(check){
            setCart([...cart, {...product, quantity: 1}])

            swal({
                title: `Success`,
                text: "Item added in your cart",
                icon: "success",
            });

            await axios.patch(`/user/addcart`, {cart: [...cart, {...product, quantity: 1}]}, {
                headers: {Authorization: token}
            })

        }else{
            swal({
                title: `Warning`,
                text: "Item is already listed in your cart",
                icon: "error",
            });
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory],
    }
}

export default UserAPI
 