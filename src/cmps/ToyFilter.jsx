import { useEffect, useRef, useState } from "react"

import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"


export function ToyFilter({ filterBy, setFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    setFilterBy = useRef(utilService.debounce(setFilterBy))

    useEffect(() => {
        setFilterBy.current(filterByToEdit)
    }, [filterByToEdit])


    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;
            case 'checkbox':
                value = target.checked
                break
            case 'select-multiple':
                value = Array.from(target.selectedOptions, (option) => option.value)
                break
            default:
                break;
        }
        setFilterByToEdit(prevFilterToEdit => ({ ...prevFilterToEdit, [field]: value }))
    }

    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <label htmlFor="search">name:</label>
                <input type="text"
                    id="search"
                    name="search"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice}
                    onChange={handleChange}
                />

                <select name="inStock" value={filterByToEdit.inStock} onChange={handleChange}>
                    <option value="">All</option>
                    <option value={true}>in stock</option>
                    <option value={false}>not in stock</option>
                </select>
                <select name="label" value={filterByToEdit.lable} onChange={handleChange}>
                    <option value="">All</option>
                    <option value="on-wheels">on wheels</option>
                    <option value="box-game">box game</option>
                    <option value="baby">baby</option>
                </select>
            </form>
            {/* <label >
                Page:
                <input type="number"
                    name="pageIdx"
                    value={pageIdx}
                    onChange={handleChange}
                />
            </label> */}

        </section>
    )
}