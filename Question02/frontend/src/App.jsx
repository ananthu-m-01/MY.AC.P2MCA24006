import axios from 'axios';
import { useState } from 'react';

function App() {
  const [numbers, setNumbers] = useState([]);
  const [average, setAverage] = useState(0);
  const [error, setError] = useState('');

  const fetchNumbers = async (id) => {
    try {
      const response = await axios.get(`http://localhost:9876/numbers/${id}`);
      console.log(response.data);
      setNumbers(response.data.windowCurrState);
      setAverage(response.data.avg);
      setError('');
    } catch (error) {
      console.error("Error fetching numbers: ", error);
      setError('Failed to fetch numbers');
    }
  };

  return (
    <div>
      <h1>Number Average Fetcher</h1>
      <button onClick={() => fetchNumbers('p')}>Prime</button>
      <button onClick={() => fetchNumbers('f')}>Fibonacci</button>
      <button onClick={() => fetchNumbers('e')}>Even</button>
      <button onClick={() => fetchNumbers('r')}>Random</button>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Current Window:</h3>
      <p>{numbers.join(', ')}</p>
      <h3>Average: {average}</h3>
    </div>
  );
}

export default App;
