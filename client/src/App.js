import React from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  const [allCanvasNotes, setAllCanvasNotes] = React.useState([{}]);
  const [name, setName] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [message, setMessage] = React.useState('');

  console.log(allCanvasNotes)

  React.useEffect(() => {
    fetch("/canvas")
      .then((res) => res.json())
      .then((json) => setAllCanvasNotes(json.data));
  }, []);
  
  // Override default submit behavior
  // Send a POST API request to create a new canvas record in the database
  // Indicate success or failure with a message back to the user
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/canvas', {
      method: "POST",
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        notes: notes,
      })
    })
    .then((res) => res.json())
    .then((json) => {
      if (json.status === 201) {
        setName('');
        setNotes('');
        setMessage('Notes saved');

        // reload the page to see the newly added note in the list
        window.location.reload(false);
      } else {
        setMessage('Error saving notes');
      }
    });
  }
  
  return (
    <div className="App">
      <h3>Add Canvassing Notes</h3>
      <div className="canvas-form">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={name} 
            placeholder="Name"
            onChange={(e) => setName(e.target.value)} 
          />
          <br/>
          <textarea 
            value={notes} 
            placeholder="Notes"
            onChange={(e) => setNotes(e.target.value)} 
          />
          <br/>
          <button type='submit' >Save Notes</button>
          <div className="message">
            {message ? <p>{message}</p> : null}
          </div>
        </form>
      </div>

      <hr></hr>

      <h1>Canvassing Notes</h1>
      {/* Iterate through each item coming back from the API and display the info */}
      {allCanvasNotes.map(function(note) {
        return (
          <div className="canvas-note">
            <b><p>{note.name}:</p></b> 
            {note.notes}
          </div>
        )
      })}
    </div>
  );
}

export default App;
