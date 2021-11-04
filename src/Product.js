import React from 'react'
import './Product.css'
import { useStateValue } from './StateProvider'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
function Product({id,title,image,price,rating}) {
    const [{basket,like},dispatch]=useStateValue()

    const addToBasket=()=>{
        //dispatch item into the datalayer
        dispatch({
            type:"ADD_TO_BASKET",
            item:{
                id:id,
                title:title,
                image:image,
                price:price,
                rating:rating
            },
        })
    }
    const addToLike=()=>{
        dispatch({
            type:"ADD_LIKE",
        })
    }
    return (
        <div className="product">
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating).fill().map((_, i)=>(
                       <p>🌟</p> 
                    ))} 
                </div>
            </div>
            <img src={image} alt="" />
            <button onClick={addToBasket}>Add to basket</button>
            <button onClick={addToLike}>
                <ThumbUpIcon />
                <span>{like?.length}</span>
            </button>
        </div>
    )
}

export default Product
