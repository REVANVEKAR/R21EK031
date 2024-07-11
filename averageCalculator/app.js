const express = require('express');
const axios = require('axios');

const app = express();

const PORT = 8000;

const window_size = 10;

const windows = {
    prime: [],
    fibbonaci: [],
    even: [],
    random: []
};

const apiEndpoints = {
    prime: 'http://20.244.56.144/test/primes',
    fibbonaci: 'http://20.244.56.144/test/fibonacci',
    even: 'http://20.244.56.144/test/even',
    random: 'http://20.244.56.144/test/rand'
};

const fetchNumbers = async (type) => {
    try {
        const response = await axios.get(apiEndpoints[type], { timeout: 500 });
        return response.data.numbers;
    } catch (error) {
        console.error(`Error fetching ${type} numbers:`, error.message);
        return [];
    }
};



const calculateAverage = (numbers) => {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return (sum / numbers.length) || 0;
};



app.listen(PORT,()=>{
    console.log("server running on port 8000");
})