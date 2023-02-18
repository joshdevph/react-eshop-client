import './loading.css'
import React, {useContext} from 'react'
import {GlobalState} from '../../../../GlobalState'

function Loading() {
    const state = useContext(GlobalState)
    const products = state.productsAPI.products
    return (
        <div className="load-page mt-20">
            <div className="loader">
                <div>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-3/4 m-auto mt-10 flex justify-center">
                {
                    products[0].length > 0 ? <h1 className="text-2xl font-semibold text-red-400">Loading Products ... </h1>
                    : <h1 className="text-2xl font-semibold text-red-400"> No Product Found </h1>
                }
                
            </div>
        </div>
    )
}

export default Loading
