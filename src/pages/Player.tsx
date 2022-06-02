import { useState, useEffect } from "react"
import { useParams } from "react-router"

function Player() {
  let { playerId } = useParams()

  const [player, setPlayer] = useState<any | null>(null)
  const [playerStats, setPlayerStats] = useState<Array<any> | null>(null)
  const [team, setTeam] = useState<any>({})

  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await fetch(
        "https://api.mpg.football/api/data/championship-players-pool/1"
      )
        .then((response) => response.json())
        .catch((error) => console.error("error fetching data: ", error))

      const currentPlayer = response.poolPlayers.find(
        (player: any) => player.id === playerId
      )
      setPlayer(currentPlayer)
      console.log(currentPlayer)

      fetchTeams(currentPlayer.clubId)
    }

    const fetchTeams = async (clubId: string) => {
      const response = await fetch(
        "https://api.mpg.football/api/data/championship-clubs"
      )
        .then((response) => response.json())
        .catch((error) => console.error("error fetching data: ", error))

      const currentTeam = response.championshipClubs[clubId]
      setTeam(currentTeam)
      fetchPlayerStats()
    }

    const fetchPlayerStats = async () => {
      const response = await fetch(
        `https://api.mpg.football/api/data/championship-player-stats/${playerId}/2021`
      )
        .then((response) => response.json())
        .catch((error) => console.error("error fetching data: ", error))

      setPlayerStats(response)
    }

    fetchPlayers()
  }, [playerId])

  return (
    <div className="max-w-2xl mx-auto mt-20">
      {playerStats && (
        <p>
          {player.firstName} {player.lastName}
        </p>
      )}
    </div>
  )
}

export default Player
