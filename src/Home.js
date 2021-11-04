import React from 'react'
import './Home.css'
import Product from './Product'

function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img className="home__image"
                src="https://thumbs.dreamstime.com/b/attributes-holiday-gifts-confetti-basket-supermarket-plain-background-concept-holiday-shopping-140120079.jpg" 
                alt=""/>
                <div className="home__row">
                    <Product 
                    id="12345689"
                    title='The Lean StartUp.How constant Innovation Creates Radically succesfully Business Paperbag.'
                    price={19.99}
                    rating={5}
                    image='https://images1.penguinrandomhouse.com/cover/9780307939845'
                    />
                    <Product 
                    id="12568974"
                    title='Kenwood Kmix,stand Mixer
                    for Baking,Stylishing kitchen mixer with
                    K-beater,Dough hook and Whisk,5 liter Glass bowl.'
                    price={39.99}
                    rating={7}
                    image='https://store.flyingblue.com/media/catalog/product/cache/d18cb01b41c18fc26e1046af99e0e2f4/k/m/kmx750rd_5_3_1.jpg'
                    />
                </div>
                <div className="home__row">
                    <Product 
                    id="45689752"
                    title='Samsung LC49RG90SSUXEN 49 Curved led
                    Gaming Monitor.'
                    price={199.99}
                    rating={4}
                    image='https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s10-1.jpg'
                    />
                    <Product 
                    id="465689752"
                    title='Amazon Echo(3rd Generation) | smart speaker
                    with Alexa,charcoal Fabric.'
                    price={299.99}
                    rating={5}
                    image='https://5.imimg.com/data5/DP/RC/AC/SELLER-12479946/amazon-echo-smart-speaker-with-alexa-powered-by-dolby-black-500x500.jpg'
                    />
                    <Product 
                    id="457892356"
                    title='New Apple iPad pro (12-inch,wi-fi,128GB)-silver(4th Gen.'
                    price={399.99}
                    rating={3}
                    image='https://www.apple.com/newsroom/images/product/ipad/standard/Apple_new-iPad-Pro_03182020_big.jpg.large.jpg'/>
                </div>
                <div className="home__row">
                    <Product 
                    id="5689745213"
                    title='Samsung Tv 32 inch.'
                    price={550.99}
                    rating={5}
                    image='https://4.imimg.com/data4/MT/HV/ANDROID-27507109/product-500x500.jpeg'/>
                </div>
            </div>
        </div>
    )
}

export default Home
