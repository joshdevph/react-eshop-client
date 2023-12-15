import React, {useContext, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'

function OrderHistory() {
    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    

    useEffect(() => {
        if(token){
            const getHistory = async() =>{
                if(isAdmin){
                    const res = await axios.get(`/api/payment`, {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                }else{
                    const res = await axios.get(`/user/history`, {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                }
            }
            getHistory()
        }
    },[token, isAdmin, setHistory])

    return (
        <div className="md:w-3/4 bg-white shadow-sm mt-5 m-auto">
            <div className="flex flex-col justify-center items-center p-10">
                <h1 className="uppercase font-bold text-2xl tracking-widest"> Order History</h1>
                <h1 className="mt-5 font-semibold"> You have ({history.length}) payment history</h1>
            </div>

            {
                history.length
                ?
                <div className="md:w-5/6 md:m-auto p-10">
                    <table className="w-full">
                            <thead >
                                <tr className="border-2 border-black">
                                {/* <th className="border-2 border-black p-3 bg-red-200 uppercase tracking-wider"> Payment ID</th> */}
                                <th className="border-2 border-black p-3 bg-red-200 uppercase tracking-wider"> Date Purchased</th>
                                <th className="border-2 border-black p-3 bg-red-200 uppercase tracking-wider"> View</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                history.map(item => (
                                    <tr key={item._id}>
                                        {/* <td className="border-2 border-black p-2 truncate tracking-wide text-center font-pop">{item.paymentID}</td> */}
                                        <td className="border-2 border-black p-2 truncate text-center tracking-widest">{new Date(item.createdAt).toLocaleDateString()}</td>
                                        <td className="border-2 border-black p-2 truncate text-center text-blue-700 text-sm font-semibold font-pop uppercase"><Link to={`/history/${item._id}`}> Check</Link></td> 
                                    </tr>
                                ))
                            }
                            </tbody>
                    </table>
                </div>
                :
                " "

            }
        </div>
    )
}

export default OrderHistory
