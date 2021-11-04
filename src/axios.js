import axios from 'axios'


const instance=axios.create({
    baseURL:'http://localhost:5001/kokoshop-52d97/us-central1/api'//this is where API(cloud function)URL  
})

export default instance;