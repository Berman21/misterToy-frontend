import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToyOptimistic, saveToy } from '../store/actions/toy.actions.js'
import { ToySort } from '../cmps/ToySort.jsx'


export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const [filterBy, setFilterBy] = useState(toyService.getDefaultFilter())
    const [sortBy, setSortBy] = useState(toyService.getDefaultSort())
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys(filterBy,sortBy)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy, sortBy])


    function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                console.log('Cannot remove toy', err)
                showErrorMsg('Cannot remove toy')
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?', toy.price)
        const toyToSave = { ...toy, price }
        saveToy(toyToSave)
            .then(savedToy => {
                showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
            })
            .catch(err => {
                console.log('Cannot update Toy', err)
                showErrorMsg('Cannot update Toy')
            })
    }

    function onSetSortBy(sortBy) {
        setSortBy(sortBy)
    }

    return (
        <div>
            <main>
                <ToyFilter filterBy={filterBy} setFilterBy={setFilterBy} />
                <ToySort sortBy={sortBy} onSetSortBy={onSetSortBy} />
                <button><Link to="/toy/edit" >Add Toy</Link></button>
        
                {!isLoading && <ToyList
                    toys={toys}
                    onRemoveToy={onRemoveToy}
                    onEditToy={onEditToy} 
                />
                }

                {isLoading && <div>Loading...</div>}
                <hr />
                {/* <pre>{JSON.stringify(cart, null, 2)}</pre> */}
            </main>
        </div>
    )

}