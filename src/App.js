import React, { useState, useEffect } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleDropdownChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedOptions(options);
  };

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);

      const res = await fetch('http://localhost:3000/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: parsedJson.data }),
      });

      const data = await res.json();

      if (data.is_success) {
        setResponse(data);
        setError('');
      } else {
        setError('API request failed.');
      }
    } catch (err) {
      setError('Invalid JSON input.');
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div>
        {selectedOptions.includes('Numbers') && (
          <div>Numbers: {JSON.stringify(response.numbers)}</div>
        )}
        {selectedOptions.includes('Alphabets') && (
          <div>Alphabets: {JSON.stringify(response.alphabets)}</div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <div>
            Highest Lowercase Alphabet: {JSON.stringify(response.highest_lowercase_alphabet)}
          </div>
        )}
      </div>
    );
  };

  // Set the title of the page
  useEffect(() => {
    document.title = '21BCE0088'; // Replace with your roll number
  }, []);

  return (
    <div className="App">
      <h1>{'ABCD123'}</h1> {/* Replace with your roll number */}
      <textarea
        value={jsonInput}
        onChange={handleInputChange}
        placeholder='Enter JSON input here'
        rows={10}
        cols={50}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <div className="error">{error}</div>}

      {response && (
        <>
          <select multiple={true} onChange={handleDropdownChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>

          {renderResponse()}
        </>
      )}
    </div>
  );
}

export default App;
