import React, { useState } from 'react';
import './App.css';
function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState({
    alphabets: false,
    numbers: false,
    highestLowercase: false
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(jsonInput);
      const res = await fetch('https://bfhl-kjgc.onrender.com/bfhl', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedData)
      });
      
      const result = await res.json();
      setResponse(result);
    } catch (error) {
      alert('Invalid JSON format');
    }
  };

  const handleOptionChange = (e) => {
    const { name, checked } = e.target;
    setDropdownOptions(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  return (
    <div className="App">
      <h1>React Frontend for Backend API</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter JSON:</label>
        <textarea
          rows="5"
          cols="50"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter a valid JSON like { "data": ["A","B","1"] }'
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      {response && (
        <>
          <h2>Select What to Display:</h2>
          <div>
            <label>
              <input
                type="checkbox"
                name="alphabets"
                checked={dropdownOptions.alphabets}
                onChange={handleOptionChange}
              />
              Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                name="numbers"
                checked={dropdownOptions.numbers}
                onChange={handleOptionChange}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                name="highestLowercase"
                checked={dropdownOptions.highestLowercase}
                onChange={handleOptionChange}
              />
              Highest Lowercase Alphabet
            </label>
          </div>

          <h3>Response:</h3>
          <pre>
            {dropdownOptions.alphabets && <p>Alphabets: {JSON.stringify(response.alphabets)}</p>}
            {dropdownOptions.numbers && <p>Numbers: {JSON.stringify(response.numbers)}</p>}
            {dropdownOptions.highestLowercase && <p>Highest Lowercase: {JSON.stringify(response.highest_lowercase_alphabet)}</p>}
          </pre>
        </>
      )}
    </div>
  );
}

export default App;

