import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [newValue, setNewValue] = useState('');

  function onChange(event) {
	  console.log(event.target.value);
    setNewValue(event.target.value);
  }

  function onUpdate() {
    fetch('http://localhost:8080/update-value', {
      method: 'PUT',
      headers: {
       'content-type': 'application/json'
      },
      body: JSON.stringify({ value: newValue })
    }).then(() => {
      fetch('http://localhost:8080/get-value')
          .then(res => res.json())
          .then(res => {
            setData(res);
          });
    });
  }

  useEffect(() => {
    fetch('http://localhost:8080/get-value')
	  .then(res => res.json())
	  .then(res => {
            setData(res);
	  });
  }, []);

  if (!data) {
    return (<div className="App">Loading...</div>)
  }

  return (
    <div className="App">
       Current value is: <strong>{data.value}</strong>
	  <hr />
	  <input type="text" onChange={onChange} /> <button onClick={onUpdate}>Update</button>
    </div>
  );
}

export default App;
