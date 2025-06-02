import { useState } from "react";

export default function Player({ initialName, symbol, isActive }) {

  const [ playerName, setPlayerName ] = useState(initialName);
  const [ isEditing, setIsEditing ] = useState(false);

  function handleEditClick() {
      setIsEditing((isEditing) => !isEditing);
  }

  function handleChange(event) {
     setPlayerName(event.target.value);
  }

  let editPlayerName = <span className="player-name">{ playerName }</span>;

  if(isEditing) {
    editPlayerName = <input type="text" onChange={ handleChange } value={playerName} required />
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        { editPlayerName }
        <span className="player-symbol">{symbol}</span>
        <button onClick={ handleEditClick }>{isEditing ? 'Save' : 'Edit'}</button>
      </span>
    </li>
  );
}
