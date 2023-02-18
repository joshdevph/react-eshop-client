import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function BtnRender({product, deleteProduct}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const addCart = state.userAPI.addCart

    
    return (
        <div className=" flex m-2">
            {
                isAdmin ? 
                <>
                    <Link className="w-full text-center p-1 rounded-sm" id="btn_buy" to="#!" 
                    onClick={() =>deleteProduct(product._id, product.images.public_id)}>
                        Delete
                    </Link>
                    <Link className="w-full text-center p-1 rounded-sm" id="btn_view" to={`/edit_product/${product._id}`}>
                        Edit
                    </Link>
                </>
                : <>
                    <Link className="mt-5 w-full text-center text-xs p-2 rounded-full uppercase text-white font-pop tracking-widest hover:bg-green-300 transition duration-300 ease-in-out" id="btn_buy" to="#!" onClick={() => addCart(product)}>
                        Buy
                    </Link>
                    <Link className="mt-5 w-full text-center text-xs p-2 rounded-full uppercase text-white font-pop tracking-widest hover:bg-green-300 transition duration-300 ease-in-out" id="btn_view" to={`/detail/${product._id}`}>
                        View
                    </Link>
                </>
            }
                
        </div>
    )
}

export default BtnRender
