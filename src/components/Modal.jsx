import React from 'react'

function Modal({ data, open, onClose }) {
  const handleClose = () => onClose(false)

  if (!data) return null

  const { name, status, species, type, gender, origin, location, image, episode, url, created } = data

  const renderCreatedAt = () => new Date(created).toDateString()

  const renderEpisodes = () => {
    return (
      <ul>
        {episode.map((epi) => (
          <li>{epi}</li>
        ))}
      </ul>
    )
  }

  return (
    <div className={`modal ${open ? 'open' : ''}`}>
      <div className="container">
        <div className="header row">
          <h1>{name}</h1>
          <button onClick={handleClose}>Fechar</button>
        </div>

        <div className="content row">
          <img src={image} alt={`Avatar of ${name}`} />
          <div className="info column">
            <span>Status: {status}</span>
            <span>Species: {species}</span>
            <span>Type: {type}</span>
            <span>Gender: {gender}</span>
            <span>
              Link: <a href={url}>rickandmortyapi.com/{name}</a>
            </span>
            <span>Created at: {renderCreatedAt()}</span>
            <span>Origin: {origin.name}</span>
            <span>Location: {location.name}</span>
            <span>Episodes: {renderEpisodes()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal

/* 
{
      "id",
      "name",
      "status",
      "species",
      "type",
      "gender",
      "origin",
        "name",
        "url",
      },
      "location",
        "name",
        "url",
      },
      "image",
      "episode",
        "",
      ],
      "url",
      "created",
    }
*/
