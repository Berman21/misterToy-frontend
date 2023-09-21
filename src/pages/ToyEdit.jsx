import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"


export function ToyEdit() {

    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(params.toyId)
            .then(setToyToEdit)
            .catch(err => {
                console.log('Had issued in toy edit:', err);
                navigate('/toy')
                showErrorMsg('Toy not found!')
            })
    }

    // function handleChange({ target }) {
    //     const value = target.value
    //     setToyToEdit(prevToy => ({ ...prevToy, name: value }))
    // }

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

            default:
                break;
        }

        setToyToEdit(prevToyToEdit => ({ ...prevToyToEdit, [field]: value }))
    }


    function onSaveToy(ev) {
        ev.preventDefault()

        saveToy(toyToEdit)
            .then(() => {
                showSuccessMsg('Toy saved successfully')
                navigate('/toy')
            })
            .catch(err => {
                showErrorMsg('Cannot save toy', err)
            })
    }

    const { name, price, createdAt, inStock } = toyToEdit
    console.log(price);
    return (
        <section className="toy-edit">
            <h2>Edit Toy</h2>

            <form onSubmit={onSaveToy} >
                <label htmlFor="name">Name:</label>
                <input onChange={handleChange} value={name} type="text" name="name" id="name" />

                <label htmlFor="price">Price:</label>
                <input onChange={handleChange} value={price} type="number" name="price" id="price" />

                {/* <label htmlFor="createdAt">launch:</label>
                <input onChange={handleChange} value={createdAt} type="date" name="createdAt" id="createdAt" /> */}

                <select name="inStock" value={inStock} onChange={handleChange}>
                    <option value={true}>in stock</option>
                    <option value={false}>not in stock</option>
                </select>

                <button>Save</button>
            </form>
        </section>
    )
}