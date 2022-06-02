import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function Players() {
  const [players, setPlayers] = useState<Array<any> | null>(null)

  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await fetch(
        "https://api.mpg.football/api/data/championship-players-pool/1"
      )
        .then((response) => response.json())
        .catch((error) => console.error("error fetching data: ", error))

      setPlayers(response.poolPlayers)
      console.log(response)
    }

    fetchPlayers()
  }, [])

  return (
    <div className="home">
      <div className="max-w-3xl mx-auto mt-20">
        {players && (
          <table>
            <tr>
              <th>Joueur</th>
              <th>Cote</th>
              <th>Note</th>
              <th>Buts</th>
              <th>Poste</th>
            </tr>
            {players.map((player) => (
              <tr className="col-lg-5" key={player.id}>
                <td>
                  {player.firstName} {player.lastName}
                </td>
                <td>{player.quotation}</td>
                <td>{player.stats.averageRating}</td>
                <td>{player.stats.totalGoals}</td>
                <td>{player.ultraPosition}</td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </div>
  )
}

export default Players
