import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function Players() {
  const [players, setPlayers] = useState<Array<any> | null>(null)

  /* useEffect(async() => {
      const result = await fetch(
        'https://api.mpg.football/api/data/championship-players-pool/1',
      );
  
      setPlayers(result.data)
      fetchData()
  }, []) */

  return (
    <div className="home">
      <div className="container">
        {players && (
          <div className="flex flex-col">
            {players.map((player) => (
              <div className="col-lg-5" key={player.id}>
                <p>{player.firstName}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Players
