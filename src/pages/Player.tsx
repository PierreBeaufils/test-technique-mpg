import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router"

function Player() {
  let { playerId } = useParams()

  const [player, setPlayer] = useState<any | null>(null)

  useEffect(() => {
    const fetchPlayer = async () => {
      const response = await fetch(
        `https://api.mpg.football/api/data/championship-player-stats/${playerId}/2021`
      )
        .then((response) => response.json())
        .catch((error) => console.error("error fetching data: ", error))

      setPlayer(response)
      console.log(response)
    }

    fetchPlayer()
  }, [playerId])

  return (
    <div className="home">
      <div className="container">
        {player && (
          <p>
            {player.firstName} {player.lastName}
          </p>
        )}
      </div>
    </div>
  )
}

export default Player
