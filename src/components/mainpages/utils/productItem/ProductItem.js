import React from 'react'
import BtnRender from './BtnRender'

function ProductItem({product, isAdmin, deleteProduct, handleCheck}) {

    return (
        <div className=" mx-auto bg-aqua my-2 bg-white shadow-lg rounded-lg w-3/4 md:w-full md:ml-2 md:h-96  ">
            {
                isAdmin && <input className="absolute form-checkbox" type="checkbox" checked={product.checked}
                onChange={() => handleCheck(product._id)} />
            }
            <img className="object-cover w-full h-56 m-auto rounded" src={product.images.url} alt="" />

            <div className=" h-auto pl-2">
                <h2 className="text-2xl uppercase font-bold mt-2 font-pop" title={product.title}>{product.title}</h2>
                <span className="text-sm font-semibold font-pop">Php. {product.price}</span>
                <p className="text-xs mt-2 font-pop truncate nowrap">{product.description}</p>
            </div>

            
            <BtnRender product={product} deleteProduct={deleteProduct} />
        </div>
    )
}

export default ProductItem
