import { useState } from 'react'
import commish from '../assets/commissioner.jpeg'
import './styles/App.css'
import NavBar from './components/NavBar.jsx'
import TeamPage from './components/TeamPage.jsx'
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
  const animals = ["tiger","lion","bear","penguin"];

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
      <div className="table-container">
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
