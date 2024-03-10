import { useOutletContext } from "react-router-dom";
import './JewelleryList.css';
import { useEffect, useState } from "react";
import { loadItems } from "./service";

const JewelleryList = () => {
    const [data, setData] = useState(false);
    const [requestObject] = useOutletContext();

    useEffect(() => {
        const items = (async () => await loadItems(requestObject))();
        items.then(data => setData(data))
    }, [requestObject])

    const elements = data ? data.map(item => 
        <li key={item.id} className="card">
            <h3 className="card__title">{item.product}</h3>
            <div className="card__footer">
                <span className="card__brand">{item.brand ? item.brand : 'Без бренда'}</span>
                <span className="card__price">Цена: {item.price}₽</span>
            </div>
        </li>    
    ) : <div>Loading</div>;

    return(
        <ul className="jewellery-list">
            {elements}
        </ul>
    )
}

export default JewelleryList;