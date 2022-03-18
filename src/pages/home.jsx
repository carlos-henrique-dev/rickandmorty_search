import React, { useEffect, useMemo, useState } from 'react'
import Card from '../components/Card'
import { API } from '../utils/api'
import InfiniteScroll from 'react-infinite-scroll-component'
import Modal from '../components/Modal'

function Home() {
  const [characters, setCharacters] = useState([])
  const [name, setName] = useState('')
  const [feedback, setFeedback] = useState('')
  const [pagination, setPagination] = useState({ current: 1, max: 1 })
  const [showModal, setShowModal] = useState(false)
  const [selectedCharacter, setSelecetedCharacter] = useState(null)

  const handleSelectCharacter = (character) => {
    setSelecetedCharacter(character)
    setShowModal(true)
  }

  const handleNameInput = (event) => {
    setName(event.target.value)
  }

  const handleFeedback = (text) => {
    setFeedback(text)
  }

  const searchCharacter = async () => {
    try {
      const { data } = await API.get('/character', {
        params: {
          name: name,
        },
      })

      const { info, results } = data

      setCharacters(results)
      handleFeedback(`${info.count} characters found with the name ${name}`)
    } catch (error) {
      console.log(error)
      setCharacters([])

      handleFeedback(`No characters found with the name ${name}`)
    }
  }

  const getAllCharacters = async () => {
    const { data } = await API.get('/character')

    setCharacters(data.results)
    setPagination({ ...pagination, max: data.info.pages })
    handleFeedback('')
  }

  const handlePagination = async () => {
    const { current } = pagination

    try {
      const { data } = await API.get('/character', {
        params: {
          page: current + 1,
        },
      })

      setPagination({ ...pagination, current: current + 1 })
      setCharacters([...characters, ...data.results])
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllCharacters()
  }, [])

  const renderCards = useMemo(() => {
    return characters.map((character, index) => <Card key={index} data={character} onSelect={handleSelectCharacter} />)
  }, [characters])

  return (
    <section className="content">
      <section className="column header">
        <h1>Rick and Morty Characters</h1>

        <div className="row">
          <input type="text" value={name} onChange={handleNameInput} />
          <button disabled={name === ''} onClick={searchCharacter}>
            Search
          </button>
          <button onClick={getAllCharacters}>Clear Search</button>
        </div>

        <div className="feedback">{feedback}</div>
      </section>

      <Modal open={showModal} data={selectedCharacter} onClose={setShowModal} />

      <InfiniteScroll
        className="cards"
        dataLength={characters.length} //This is important field to render the next data
        next={handlePagination}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {renderCards}
      </InfiniteScroll>
    </section>
  )
}

export default Home
