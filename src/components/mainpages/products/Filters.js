import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

function Filters() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories

    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search


    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

    return (
        <div className=" mt-10 w-5/6 m-auto grid grid-cols-3 gap-1 items-center md:w-3/4">
            <div className=" h-10 p-2 col-span-3 md:col-span-1 w-full flex mb-2 items-center">
                <span className="w-1/4">Filters: </span>
                <select className="border-red-400 border-b-2 w-3/4 h-8 cursor-pointer focus:outline-none capitalize" name="category" value={category} onChange={handleCategory} >
                    <option  value=''>All Products</option>
                    {
                        categories.map(category => (
                            <option className="uppercase text-sm" value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <input className="col-span-3 md:col-span-1 rounded-full pl-5 mb-2" type="text" value={search} placeholder="Search ..."
            onChange={e => setSearch(e.target.value.toLowerCase())} />

            <div className=" h-10 p-2 col-span-3 md:col-span-1 w-full flex items-center mb-2">
                <span className="w-1/4">Sort By: </span>
                <select className="border-red-400 border-b-2 w-3/4 h-8 cursor-pointer focus:outline-none" value={sort} onChange={e => setSort(e.target.value)} >
                    <option value=''>Newest</option>
                    <option value='sort=oldest'>Oldest</option>
                    <option value='sort=-sold'>Best sales</option>
                    <option value='sort=-price'>Price: Hight-Low</option>
                    <option value='sort=price'>Price: Low-Hight</option>
                </select>
            </div>
            <hr className="w-full m-auto mt-4 mb-5 col-span-3"></hr>
        </div>
    )
}

export default Filters
