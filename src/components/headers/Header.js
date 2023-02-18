import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import {Link} from 'react-router-dom'
import { FiShoppingCart, FiAlignRight, FiLogOut, FiX} from "react-icons/fi";
import axios from 'axios'

function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [menu, setMenu] = useState(false)

    const logoutUser = async () =>{
        await axios.get('/user/logout')
        
        localStorage.removeItem('firstLogin')
        
        window.location.href = "/";
    }

    const adminRouter = () =>{
        return(
            <>
                <span className=" tracking-wider text-md uppercase border-b-2 border-gray-50 hover:border-red-400"><Link to="/create_product">Create Product</Link></span>
                <span className=" tracking-wider text-md uppercase border-b-2 border-gray-50 hover:border-red-400"><Link to="/category">Categories</Link></span>
            </>
        )
    }

    const loggedRouter = () =>{
        return(
            <>
                <span className=" tracking-wider text-md uppercase border-b-2 border-gray-50 hover:border-red-400"><Link to="/history">History</Link></span>
                <span className=" tracking-wider text-md uppercase border-b-2 border-gray-50 hover:border-red-400"><Link to="/" onClick={logoutUser}>Logout</Link></span>
            </>
        )
    }


    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        
        <header className="w-full shadow  bg-gray-50 font-pop">
        <div className="flex flex-row justify-between items-center m-auto w-5/6 py-5">
            <div className="md:hidden">
                <FiAlignRight className=" mr-5 text-4xl md:hidden" onClick={() => setMenu(!menu)} />
            </div>

            <div>
                <h1 className="text-3xl font-bold">
                    <Link to="/"><span className="text-red-500 uppercase tracking-widest">{isAdmin ? "Admin" : "EShop"}</span></Link>
                </h1>
            </div>

            <div className="hidden space-x-10 md:flex md:items-center md:justify-center">
                <span className="tracking-wide text-md uppercase border-b-2 border-gray-50 hover:border-red-400"><Link to="/">{isAdmin ? 'Product' : 'Shop'}</Link></span>

                {isAdmin && adminRouter()} {
                    isLogged ? loggedRouter() : <span className="trackin-wide text-md uppercase border-b-2 border-gray-50 hover:border-red-400"><Link to="/login">Login</Link></span>
                }

                { isAdmin ? '' :
                                <div>
                                <Link to="/cart"><FiShoppingCart className=" mt-4 text-2xl absolute"/>
                                <span className="relative text-sm font-semibold flex justify-center items-center w-7 h-7 top-0 left-3 bg-red-400 rounded-full">{cart.length}</span>
                                <span className="relative text-sm font-semibold flex justify-center items-center w-7 h-7 bottom-7 left-3 bg-red-400 rounded-full animate-ping"></span>
                                </Link>
                                </div>
                }
                

            </div>
        </div>

        <div>
            <div className="navs md:hidden flex flex-col space-y-16" style={styleMenu}>
                <div className="flex w-full justify-end mb-10">
                    <span className=" right-10 bg-gray-100 p-2 rounded-full mt-10 shadow-2xl hover:bg-red-400 transition duration-300 ease-in-out"><FiX onClick={() => setMenu(!menu)}/></span>
                </div>
                    <span className="tracking-wide text-md uppercase border-b-2 border-gray-50 hover:border-red-400"><Link to="/">{isAdmin ? 'Product' : 'SHOP'}</Link></span>

                    {isAdmin && adminRouter()} {
                        isLogged ? loggedRouter() : <span className="trackin-wide text-md uppercase border-b-2 border-gray-50 hover:border-red-400"><Link to="/login">Login</Link></span>
                    }

                    { isAdmin ? '' :
                                    <div>
                                    <Link to="/cart"><FiShoppingCart className=" mt-4 text-2xl absolute"/>
                                    <span className="relative text-sm font-semibold flex justify-center items-center w-7 h-7 top-0 left-3 bg-red-400 rounded-full">{cart.length}</span>
                                    <span className="relative text-sm font-semibold flex justify-center items-center w-7 h-7 bottom-7 left-3 bg-red-400 rounded-full animate-ping"></span>
                                    </Link>
                                    </div>
                    }


            </div>

        </div>

    </header>
    )
}

export default Header
