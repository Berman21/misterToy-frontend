import { httpService } from './http.service'
// import { storageService } from './async-storage.service.js'


// const STORAGE_KEY = 'toyDB' //for storage

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getDefaultSort,
    getLabels
}

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]

function query(filterBy, sort) {
    return httpService.get('toy', { params: { filterBy, sort } })
}

// function query(filterBy = {}, sortBy = {}) {  // from storage
//     return storageService.query(STORAGE_KEY)
//         .then(toys => {
//             if (filterBy.search) {
//                 const regExp = new RegExp(filterBy.search, 'i')
//                 toys = toys.filter(toy => regExp.test(toy.name))
//             }

//             if (filterBy.maxPrice) {
//                 toys = toys.filter(toy => toy.price <= filterBy.maxPrice)
//             }

//             if (filterBy.inStock) {
//                 toys = toys.filter(toy => toy.inStock === filterBy.inStock)
//             }

//             toys.sort((toy1, toy2) => {
//                 const dir = sortBy.asc ? 1 : -1
//                 if (sortBy.by === 'price') return (toy1.price - toy2.price) * dir
//                 if (sortBy.by === 'name') return toy1.name.localeCompare(toy2.name) * dir
//             })

//             return toys
//         })
// }

function getLabels() {
    return [...labels]
}


function getById(toyId) {
    return httpService.get(`toy/${toyId}`)
}
// function getById(toyId) { // from storage
//     return storageService.get(STORAGE_KEY, toyId)
// }


function remove(toyId) {
    return httpService.delete(`toy/${toyId}`)
}

// function remove(toyId) { // from storage
//     return storageService.remove(STORAGE_KEY, toyId)
// }

function save(toy) {
    if (toy._id) {
        return httpService.put(`toy/${toy._id}`, toy)
    } else {
        return httpService.post('toy', toy)
    }
}

// function save(toy) { // from storage
//     if (toy._id) {
//         return storageService.put(STORAGE_KEY, toy)
//     } else {
//         return storageService.post(STORAGE_KEY, toy)
//     }
// }

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: ''
    }
}


function getDefaultFilter() {
    return {
        search: '',
        maxPrice: '',
        labels: [],
        inStock: ''
    }
}

function getDefaultSort() {
    return {
        // 
        by: 'name',
        asc: true
    }
}

