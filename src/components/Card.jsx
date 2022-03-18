import React from 'react'

function Card({ data, onSelect }) {
  const { name, status, species, gender, image } = data

  return (
    <div className="card" onClick={() => onSelect(data)}>
      <img src={image} className="avatar" alt={`avatar of ${name}`} />

      <div className="info column">
        <h1 className="name">{name}</h1>

        <div className="about row">
          <span className="species">Species: {species}</span>
          <span className="gender">Gender: {gender}</span>
        </div>

        <span className="status">Status: {status}</span>
      </div>
    </div>
  )
}

export default Card
