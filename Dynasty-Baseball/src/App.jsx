import { useState } from 'react'
import commish from './assets/commissioner.jpeg'
import './App.css'
import NavBar from './NavBar.jsx'
import TeamPage from './TeamPage.jsx'
import { Link } from "react-router";

function List(props) {
  return (
    <>
      {!props.animals && <div>Loading...</div>}
      {props.animals && props.animals.length > 0 && (
        <ul>
          {props.animals.map((animal) => {
            return <li key={animal}>{animal}</li>;
          })}
        </ul>
      )}
      {props.animals && props.animals.length === 0 && <div>There are no animals in the list!</div>}
    </>
  );
}

function App() {
  const [count, setCount] = useState(0)
  const animals = [];

  return (
    <>
      <NavBar />
      <h1>Dynasty Baseball</h1>
      <div>
        <img src={commish} className="logo" alt="Commish" />
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <div class="table-container">
        <table>
          <tr>
            <th>Year</th>
            <th>Winner</th>
          </tr>
          <tr>
            <td>2025</td>
            <td>Alec Nelson</td>
          </tr>
        </table>
      </div>

      <h1>animals</h1>
      <List animals={animals} />
    </>
  )
}

export default App
