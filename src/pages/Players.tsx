import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import displayPosition from "../utils/displayPosition"

function Players() {
  const [players, setPlayers] = useState<Array<any>>([])
  const [activeColumn, setActiveColumn] = useState<string>("")
  const [nameOrder, setNameOrder] = useState<string>("")

  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await fetch(
        "https://api.mpg.football/api/data/championship-players-pool/1"
      )
        .then((response) => response.json())
        .catch((error) => console.error("error fetching data: ", error))

      setPlayers(response.poolPlayers)
    }

    fetchPlayers()
  }, [])

  const filterByName = () => {
    setActiveColumn("name")
    if (nameOrder === "asc") {
      const filteredPlayers = players.sort((a, b) => {
        return a.lastName.localeCompare(b.lastName)
      })
      setPlayers(filteredPlayers)
      setNameOrder("desc")
    } else {
      const filteredPlayers = players.sort((a, b) => {
        return b.lastName.localeCompare(a.lastName)
      })
      setPlayers(filteredPlayers)
      setNameOrder("asc")
    }
  }

  return (
    <div className="">
      <div className="max-w-2xl mx-auto mt-20">
        {players && (
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
              <div className="w-20 py-2 px-2">Poste</div>
            </div>
            <div className="flex flex-col">
              {players.map((player) => (
                <Link to={`/players/${player.id}`} key={player.id}>
                  <div className="border-b hover:bg-gray-100 cursor-pointer flex flex-row">
                    <div className="w-full lg:w-80 py-2 px-2">
                      {player.firstName} {player.lastName}
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
