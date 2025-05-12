import axios from 'axios';
import cors from 'cors';
import express from 'express';

const app = express();
const port = 9876;

app.use(cors());

let windowPrevState = [];

const TOKEN_TYPE = 'Bearer';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ3MDU0Mjg3LCJpYXQiOjE3NDcwNTM5ODcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjU0NWRmMDNkLTM2ZTUtNDcyNy05MmIwLWE2YjA0ZDlhZGZlMCIsInN1YiI6Im15LmFjLnAybWNhMjQwMDZAbXkuc3R1ZGVudHMuYW1yaXRhLmVkdSJ9LCJlbWFpbCI6Im15LmFjLnAybWNhMjQwMDZAbXkuc3R1ZGVudHMuYW1yaXRhLmVkdSIsIm5hbWUiOiJhbmFudGh1Lm0iLCJyb2xsTm8iOiJteS5hYy5wMm1jYTI0MDA2IiwiYWNjZXNzQ29kZSI6IlN3dXVLRSIsImNsaWVudElEIjoiNTQ1ZGYwM2QtMzZlNS00NzI3LTkyYjAtYTZiMDRkOWFkZmUwIiwiY2xpZW50U2VjcmV0IjoiVXBjc1FLanZ1d0ZmWFBadiJ9.EI3rLZfYnktgEtEXa4lZJc6oaCCYX3ofO4rTPeAioTM';

const windowSize = 10;

async function fetchNumbersFromAPI(id) {
  let url = '';
  switch (id) {
    case 'p':
      url = 'http://20.244.56.144/evaluation-service/primes';
      break;
    case 'f':
      url = 'http://20.244.56.144/evaluation-service/fibo';
      break;
    case 'e':
      url = 'http://20.244.56.144/evaluation-service/even';
      break;
    case 'r':
      url = 'http://20.244.56.144/evaluation-service/rand';
      break;
    default:
      throw new Error('Invalid ID');
  }

  try {
    console.log(`Fetching from: ${url}`);
    const response = await axios.get(url, {
      timeout: 500,
      headers: {
        Authorization: `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
      }
    });

    return response.data.numbers;
  } catch (error) {
    if (error.response) {
      console.error("Error Response Status:", error.response.status);
      console.error("Error Response Data:", error.response.data);
    } else if (error.request) {
      console.error("Error Request Data:", error.request);
    } else {
      console.error("Error Message:", error.message);
    }
    return null;
  }
}

app.get('/numbers/:id', async (req, res) => {
  const { id } = req.params;

  const validIds = ['p', 'f', 'e', 'r'];
  if (!validIds.includes(id)) {
    return res.status(400).json({ error: 'Invalid ID. Use p/f/e/r.' });
  }

  const numbers = await fetchNumbersFromAPI(id);
  if (!numbers) {
    return res.status(500).json({ error: 'Failed to fetch data from source' });
  }

  const updatedWindow = [...windowPrevState, ...numbers]
    .filter((v, i, arr) => arr.indexOf(v) === i)
    .slice(-windowSize);

  const avg = updatedWindow.length
    ? updatedWindow.reduce((sum, num) => sum + num, 0) / updatedWindow.length
    : 0;

  const result = {
    windowPrevState,
    windowCurrState: updatedWindow,
    numbers,
    avg: parseFloat(avg.toFixed(2)),
  };

  windowPrevState = updatedWindow;

  res.json(result);
});

app.listen(port, () => {
  console.log(` Server running at http://localhost:${port}`);
});
