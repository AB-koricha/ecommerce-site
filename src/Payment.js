import { CardElement,useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { Link,useHistory } from 'react-router-dom'
import CheckoutProduct from './CheckoutProduct'
import './Payment.css'
import { getBasketTotal } from './reducer'
import { useStateValue } from './StateProvider'
import axios from './axios'
import { db } from './firebase'
function Payment() {
    const [{basket,user},dispatch]=useStateValue()
    const history=useHistory()

    const [succeeded,setSucceeded]=useState(false)
    const [processing,setProcessing]=useState("")
    const [error,setError]=useState(null)
    const [disabled,setDisabled]=useState(true)
    const [clientSecret,setClientSecret]=useState("true")//this is like when you want to charge client with stripe

    const stripe=useStripe()
    const elements=useElements()
    useEffect(()=>{
        //generate the special stripe secret which allows us to charge a customer
        const getClientSecret=async ()=>{
            const response=await axios({
                method:'post',
                //stripe expect the total in currency subunits its like ukiataka kuandika
                //$10 its good uandike 10000
                url:`/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret()
    },[basket])

    console.log('The secret is >>>', clientSecret)

    const handleSubmit= async (event) => {
        //do all fancy stripe staff
        event.preventDefault();
        setProcessing(true);

        const payload=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{
            //paymentIntent=is like payment confirmation

            //database
            db.collection('user')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket:basket,
                amount:paymentIntent.amount,
                created:paymentIntent.created
            })
            setSucceeded(true)
            setError(null)
            setProcessing(false)

            dispatch({
                type:"EMPTY_BASKET"
            })

            history.replace('/orders')
        })
    }
    const handleChange=event=>{
        //listen for changes on CarElement
        //and Display error when a customer types their card details

        setDisabled(event.empty)
        setError(event.error ? event.error.message:"")
    }
    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    {/*this one make you to back to the checkout page*/}
                    Checkout (
                    <Link to="/checkout">{basket?.length} items</Link>
                    )
                </h1>
                {/*payment section with delivery address*/}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>56 Isiolo moti</p>
                        <p>Isiolo Town</p>
                    </div>
                </div>
                {/*payment section with Review items*/}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Reviews Items and Delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item=>(
                            <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                            />
                        ))}
                    </div>

                </div>
                {/*payment section with payment method*/}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment method</h3>
                    </div>
                    <div className="payment__details">
                        {/*this is where stripe magic will go*/}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                renderText={(value)=>(
                                    <h3>Order Total={value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p>:"Buy now"}</span>
                                </button>
                            </div>
                            {/*Error*/}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
