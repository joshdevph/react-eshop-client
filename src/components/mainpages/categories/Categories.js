import React, {useState, useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import swal from 'sweetalert'
import {FiTrash2, FiEdit2} from 'react-icons/fi'

function Categories() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.categoriesAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    const createCategory = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axios.put(`${process.env.REACT_APP_URL_API}/api/category/${id}`, {name: category}, {
                    headers: {Authorization: token}
                })
                swal({
                    title: 'Success',
                    text: res.data.msg,
                    icon: "success",
                });
            }else{
                const res = await axios.post(`${process.env.REACT_APP_URL_API}/api/category`, {name: category}, {
                    headers: {Authorization: token}
                })
                swal({
                    title: 'Success',
                    text: res.data.msg,
                    icon: "success",
                });

            }
            setOnEdit(false)
            setCategory('')
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
            swal({
                title: 'Server Error',
                text: err.response.data.msg,
                icon: "error",
            });
        }
    }

    const editCategory = async (id, name) =>{
        setID(id)
        setCategory(name)
        setOnEdit(true)
    }

    const deleteCategory = async id =>{
        try {
            swal({
                title: 'Success',
                text: "Category deleted successfully",
                icon: "success",
            });
            const res = await axios.delete(`${process.env.REACT_APP_URL_API}/api/category/${id}`, {
                headers: {Authorization: token}
            })

            setCallback(!callback)
        } catch (err) {
            swal({
                title: 'Server Error',
                text: err.response.data.msg,
                icon: "error",
            });
        }
    }

    return (
        <div className="w-5/6 md:w-1/2 m-auto mt-10">
            <form onSubmit={createCategory} className="flex items-center justify-center space-x-4 p-5 h-20 bg-gray-100 shadow-xl">
                <label htmlFor="category">Category</label>
                <input className="w-1/2 rounded-md pl-5" type="text" name="category" value={category} required
                onChange={e => setCategory(e.target.value)} />

                <button className="p-2 bg-red-300 px-5 hover:bg-red-400  transition duration-300 ease-in-out uppercase text-sm font-semibold rounded-md" type="submit">{onEdit? "Update" : "Create"}</button>
            </form>

            <div className="mt-10 grid grid-cols-1 gap-2 md:grid-cols-4">
                {
                    categories.map(category => (
                        <div className="col-span-1 bg-gray-50 flex flex-col justify-center items-center w-full shadow-lg rounded-xl" key={category._id}>
                            <p className="text-2xl uppercase mt-3 mb-3 font-pop font-bold">{category.name}</p>
                            <div className="flex justify-between space-x-6 mb-5 h-10">
                                <button className="bg-gray-100 border border-black shadow-md uppercase w-10 text-md flex items-center justify-center    hover:bg-green-400 focus:outline-none transition duration-300 ease-in-out  p-2 rounded-full  " onClick={() => editCategory(category._id, category.name)}><FiEdit2/></button>
                                <button className="bg-gray-100 border border-black shadow-md uppercase w-10 text-md flex items-center justify-center    hover:bg-red-400   focus:outline-none transition duration-300 ease-in-out p-2 rounded-full  " onClick={() => deleteCategory(category._id)}><FiTrash2/></button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories
