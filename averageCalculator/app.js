require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;

const windows = {
    p: [],
    f: [],
    e: [],
    r: []
};

const apiEndpoints = {
    p: 'http://20.244.56.144/test/primes',
    f: 'http://20.244.56.144/test/fibonacci',
    e: 'http://20.244.56.144/test/even',
    r: 'http://20.244.56.144/test/rand'
};

const fetchNumbers = async (type) => {
    try {
        const response = await axios.get(apiEndpoints[type], {
            timeout: 500,
            headers: {
                'access_token': `Bearer ${process.env.AUTH_TOKEN}`
            }
        });
        return response.data.numbers;
    }  catch (error) {
        console.error(`Error fetching ${type} numbers:`, error.message);
        return [];
    }
};

const updateWindow = (type, numbers) => {
    const uniqueNumbers = [...new Set(numbers)];
    const prevWindow = [...windows[type]];

    windows[type] = [...windows[type], ...uniqueNumbers].slice(-WINDOW_SIZE);

    return prevWindow;
};

const calculateAverage = (numbers) => {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return (sum / numbers.length) || 0;
};

app.get('/numbers/:type', async (req, res) => {
    const { type } = req.params;

    if (!['p', 'f', 'e', 'r'].includes(type)) {
        return res.status(400).send({ error: 'Invalid type' });
    }

    const numbers = await fetchNumbers(type);
    const windowPrevState = updateWindow(type, numbers);
    const windowCurrState = windows[type];
    const avg = calculateAverage(windowCurrState);

    res.json({
        numbers,
        windowPrevState,
        windowCurrState,
        avg: avg.toFixed(2)
    });

    
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
