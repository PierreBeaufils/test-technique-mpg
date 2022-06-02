import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import displayPosition from "../utils/displayPosition"

function Players() {
  const [players, setPlayers] = useState<Array<any>>([])
  const [teams, setTeams] = useState<any>({})
  const [activeColumn, setActiveColumn] = useState<string>("")
  const [nameOrder, setNameOrder] = useState<"asc" | "desc">("desc")
  const [positionOrder, setPositionOrder] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await fetch(
        "https://api.mpg.football/api/data/championship-players-pool/1"
      )
        .then((response) => response.json())
        .catch((error) => console.error("error fetching data: ", error))

      setPlayers(response.poolPlayers)
    }

    const fetchTeams = async () => {
      const response = await fetch(
        "https://api.mpg.football/api/data/championship-clubs"
      )
        .then((response) => response.json())
        .catch((error) => console.error("error fetching data: ", error))

      setTeams(response.championshipClubs)
    }

    fetchPlayers()
    fetchTeams()
  }, [])

  const filterByName = () => {
    setActiveColumn("name")
    if (nameOrder === "desc") {
      const filteredPlayers = players.sort((a, b) => {
        return a.lastName.localeCompare(b.lastName)
      })
      setPlayers(filteredPlayers)
      setNameOrder("asc")
    } else {
      const filteredPlayers = players.sort((a, b) => {
        return b.lastName.localeCompare(a.lastName)
      })
      setPlayers(filteredPlayers)
      setNameOrder("desc")
    }
  }

  const filterByPosition = () => {
    setActiveColumn("position")
    if (positionOrder === "desc") {
      const filteredPlayers = players.sort(
        (a, b) => a.ultraPosition - b.ultraPosition
      )
      setPlayers(filteredPlayers)
      setPositionOrder("asc")
    } else {
      const filteredPlayers = players.sort(
        (a, b) => b.ultraPosition - a.ultraPosition
      )
      setPlayers(filteredPlayers)
      setPositionOrder("desc")
    }
  }

  const findJersey = (player: any): string => {
    console.log(teams)

    const team = teams[player.clubId]
    return team.defaultJerseyUrl
  }

  return (
    <div className="">
      <div className="max-w-2xl mx-auto mt-20">
        {players && teams && (
          <div className="mx-auto">
            <div className="flex flex-row border-b text-center font-semibold">
              <div
                onClick={() => filterByName()}
                className={`w-full lg:w-80 py-2 px-2 cursor-pointer ${
                  activeColumn === "name" ? "text-blue-500" : "text-black"
                }`}
              >
                Joueurs
              </div>
              <div className="w-20 py-2 px-2">Cote</div>
              <div className="w-20 py-2 px-2">Note</div>
              <div className="w-20 py-2 px-2">Buts</div>
              <div
                onClick={() => filterByPosition()}
                className={`w-20 py-2 px-2 cursor-pointer ${
                  activeColumn === "position" ? "text-blue-500" : "text-black"
                }`}
              >
                Poste
              </div>
            </div>
            <div className="flex flex-col">
              {players.map((player) => (
                <Link to={`/players/${player.id}`} key={player.id}>
                  <div className="border-b hover:bg-gray-100 cursor-pointer flex flex-row">
                    <div className="w-full lg:w-80 py-2 px-2 flex flex-row gap-2 items-center">
                      <span className="">
                        <img
                          src={findJersey(player)}
                          alt="team jersey"
                          width={27}
                          height={27}
                        />
                      </span>
                      <span>
                        {player.firstName} {player.lastName}
                      </span>
                    </div>
                    <div className="w-20 py-2 px-2 text-center">
                      {player.quotation}
                    </div>
                    <div className="w-20 py-2 px-2 text-center">
                      {/* Note mise à 0 par défault si averageRating est null/undefined */}
                      {player.stats.averageRating
                        ? player.stats.averageRating.toFixed(1)
                        : "5.0"}
                    </div>
                    <div className="w-20 py-2 px-2 text-center">
                      {/* Buts mise à 0 par défault si totalGoals est null/undefined */}
                      {player.stats.totalGoals ? player.stats.totalGoals : "0"}
                    </div>
                    <div className="w-20 py-2 px-2 text-center">
                      {displayPosition(player.ultraPosition)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Players
