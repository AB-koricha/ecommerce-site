import React,{useEffect} from 'react';
import './App.css';
import Header from './Header';
import Home from './Home'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Checkout from './Checkout'
import Login from './Login';
import { auth } from './firebase'
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from './Orders'

const promise=loadStripe
('pk_test_51JSwT7BpzQ2tdltXG7WyXtf61pBmqozKKO9TqEyDp27qggXsyeOblGgPqEBsGyjaLDqF103I9LeG2RNYNG3bZ1uP00FIwT4wpn')

function App() {
  const [{},dispatch]=useStateValue()

useEffect(()=>{
  //will only run once when the component loads when you leave hiyo array ya chini empty
  //onAuthStateChanged is a listen its like when we login it refer to this code when we logout it refer to this code

  auth.onAuthStateChanged(authUser=>{
    console.log('The User is>>>',authUser)

    if(authUser){
      //the user is login/or the user was login
      dispatch({
        type:"SET_USER",
        user:authUser
      })
    }else{
      //the User was logout
      dispatch({
        type:"SET_USER",
        user:null
      })
    }
  })
},[])
  return (
    <Router>
    <div className="app">
      <Switch>
      <Route path="/orders">
         <Header />
         <Orders />
       </Route>
      <Route path="/login">
         <Login />
       </Route>
      <Route path="/checkout">
         <Header />
         <Checkout />
       </Route>
       <Route path="/payment">
         <Header />
         <Elements stripe={promise}>
         <Payment />
         </Elements>
       </Route>
        <Route path="/">
          <Header />
         <Home />
       </Route>
     </Switch>
    </div>
    </Router>
  );
}

export default App;
