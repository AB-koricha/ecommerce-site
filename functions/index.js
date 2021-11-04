const functions = require("firebase-functions");
const express=require("express")
const cors=require("cors");
const stripe=require("stripe")('sk_test_51JSwT7BpzQ2tdltXnlhPEvwD4jIG3lRFQyywYLYlRsiO8D2jY8wkchaB1sweoaibCVb0StcbuSsRFpmFcmnK7jHD006u42szAY')


//API

//-APP CONFIG
const app=express()

//-MIDDLE-WARES
app.use(cors({ origin:true }))//its just kind of security
app.use(express.json())

//-API ROUTES
app.get('/',(request,response)=>response.status(200).send('Hello world'))
//iko kuconnectiwa na ile ya payment.js ujue
app.post('/payments/create',async (request,response)=>{
    const total=request.query.total

    console.log('payment request received Boom!! for this Amount >>>',total)

    const paymentIntent=await stripe.paymentIntents.create({
        amount:total,//subunit of the currency
        currency:"usd",
    })

    //okey -created
    response.status(201).send({
        clientSecret:paymentIntent.client_secret,
    })
})

//-LISTEN COMMAND
exports.api= functions.https.onRequest(app)