import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import './Jewellery.css';
import refreshIcon from './assets/refresh.svg';

const options = ["name", "brand", "price"];

const defaultParams = {
    action: "get_ids",
    params: {offset: 0, limit: 50}
}

const Jewellery = () => {
    const {pageNumber} = useParams();

    const [requestParams, setRequestParams] = useState(defaultParams);
    const navigate = useNavigate();

    const filterOptions = options.map(option => 
        <div className="filter" key={option}>
            <label htmlFor={option} className="filter__label">{option}</label>
            <input className='filter__input' type={option === "price" ? 'number' : 'text'} id={option} />
        </div>
    ) 

    const handlePreviousButtonClick = () => {
        if(pageNumber > 1){
            navigate('./' + (pageNumber  - 1));
        }
    }
    
    const handleNextButtonClick = () => {
        navigate('./' + (Number(pageNumber) + 1));
    }

    const handleFilterRefresh = (e) => {
        e.preventDefault();

        const form = e.target;
        const params = {};

        if(form.brand.value) params.brand = form.brand.value;
        if(form.price.value) params.price = Number(form.price.value);
        if(form.name.value) params.product = form.name.value;

        const requestObject = {
            action: 'filter',
            params: params
        }

        if(Object.keys(requestObject.params).length === 0){
            setRequestParams(defaultParams);
        }else{
            setRequestParams(requestObject);
        }

        navigate('./1')
    }

    useEffect(() => {
        const request = {...requestParams};
        request.params.offset = (pageNumber - 1) * 50;
        setRequestParams(request);
    }, [pageNumber])

    return(
        <>
            <form name="filters" className='filters-container' onSubmit={handleFilterRefresh}>
                <div className='filters'>
                    {filterOptions}
                </div>

                <button type="submit" id='refresh-button'>
                    <img className='refresh-icon' src={refreshIcon} alt="refresh icon" />
                </button>
            </form>

            <div className='items'>
                <Outlet context={[requestParams]}/>
            </div>

            <div className='navigation-block'>
                <button onClick={handlePreviousButtonClick} disabled={Number(pageNumber) === 1} >Назад</button>
                <button onClick={handleNextButtonClick} >Вперед</button>
            </div>
        </>
    )
}

export default Jewellery;