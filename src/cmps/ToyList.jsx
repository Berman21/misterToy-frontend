import { Link } from "react-router-dom"
import { ToyPreview } from "./ToyPreview.jsx"


export function ToyList({ toys, onRemoveToy, onEditToy}) {

    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div>
                        <button onClick={() => onRemoveToy(toy._id)}>x</button>
                        <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
                    </div>
                    {/* <button className="buy" onClick={() => addToCart(toy)}>Add to Cart</button> */}
                </li>
            )}
        </ul>
    )
}