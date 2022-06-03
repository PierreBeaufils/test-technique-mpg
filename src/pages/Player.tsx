import { useState, useEffect } from "react";
import { useParams } from "react-router";
import displayPosition from "../utils/displayPosition";
import formatDate from "../utils/formatDate";

function Player() {
  let { playerId } = useParams();

  const [player, setPlayer] = useState<any | null>(null);
  const [playerStats, setPlayerStats] = useState<any | null>(null);
  const [team, setTeam] = useState<any>({});

  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await fetch(
        "https://api.mpg.football/api/data/championship-players-pool/1"
      )
        .then((response) => response.json())
        .catch((error) => console.error("error fetching data: ", error));

      const currentPlayer = response.poolPlayers.find(
        (player: any) => player.id === playerId
      );
      setPlayer(currentPlayer);
      console.log(currentPlayer);

      fetchTeams(currentPlayer.clubId);
    };

    const fetchTeams = async (clubId: string) => {
      const response = await fetch(
        "https://api.mpg.football/api/data/championship-clubs"
      )
        .then((response) => response.json())
        .catch((error) => console.error("error fetching data: ", error));

      const currentTeam = response.championshipClubs[clubId];
      setTeam(currentTeam);
      console.log(currentTeam);

      fetchPlayerStats();
    };

    const fetchPlayerStats = async () => {
      const response = await fetch(
        `https://api.mpg.football/api/data/championship-player-stats/${playerId}/2021`
      )
        .then((response) => response.json())
        .catch((error) => console.error("error fetching data: ", error));

      setPlayerStats(response);
      console.log(response);
    };

    fetchPlayers();
  }, [playerId]);

  return (
    <div className="max-w-2xl mx-auto mt-20">
      {playerStats && (
        <div>
          <div className="mx-auto text-center">
            <img
              src={team.defaultJerseyUrl}
              alt="team jersey"
              width={50}
              height={50}
              className="mx-auto"
            />
            <p>
              {player.firstName} {player.lastName}
            </p>
            <div>
              <span>{team.name["fr-FR"]} - </span>
              <span>{displayPosition(player.ultraPosition)}</span>
            </div>
          </div>

          {/* Résumé Stats */}
          <div className="border rounded-md mt-10 p-4">
            <p className="text-center text-xl">Résumé stats</p>
            <div className="flex flex-row gap-2 items-center py-1">
              <p className="w-28">Note</p>
              <span className="bg-green-500 text-white rounded-md px-4 py-1 w-16 text-center">
                {playerStats.championships[
                  "1"
                ].keySeasonStats.averageRating.toFixed(1)}
              </span>
            </div>
            <div className="flex flex-row gap-2 items-center py-1">
              <p className="w-28">Cote</p>
              <span className="bg-green-500 text-white rounded-md px-4 py-1 w-16 text-center">
                {playerStats.championships["1"].keySeasonStats.quotation}
              </span>
            </div>
            <div className="flex flex-row gap-2 items-center py-1">
              <p className="w-28">% Titu</p>
              <span className="bg-green-500 text-white rounded-md px-4 py-1 w-16 text-center">
                {Math.round(
                  playerStats.championships["1"].keySeasonStats
                    .percentageStarter
                )}
              </span>
            </div>
            <div className="flex flex-row gap-2 items-center py-1">
              <p className="w-28">Buts / M.</p>
              <span className="bg-green-500 text-white rounded-md px-4 py-1 w-16 text-center">
                {playerStats.championships[
                  "1"
                ].keySeasonStats.ratioGoals.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-row gap-2 items-center py-1">
              <p className="w-28">Occas. / M.</p>
              <span className="bg-green-500 text-white rounded-md px-4 py-1 w-16 text-center">
                {playerStats.championships[
                  "1"
                ].keySeasonStats.ratioBigChanceCreated.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-row gap-2 items-center py-1">
              <p className="w-28">Tirs. / M.</p>
              <span className="bg-green-500 text-white rounded-md px-4 py-1 w-16 text-center">
                {playerStats.championships[
                  "1"
                ].keySeasonStats.ratioScoringAtt.toFixed(2)}
              </span>
            </div>
          </div>

          {/* En forme */}
          <div className="border rounded-md mt-10 p-4">
            <p className="text-center text-xl">En forme ?</p>
            <div className="flex flex-row gap-3 overflow-x-auto pb-5 pt-5">
              {playerStats.championships["1"].total.matches.map(
                (match: any) => (
                  <div
                    key={match.matchId}
                    className="flex flex-col gap-1 items-center justify-center shrink-0 grow-0"
                  >
                    <p className="rounded-full bg-green-400 text-white flex items-center justify-center w-10 h-10">
                      {match.playerPerformance.rating ?? "-"}
                    </p>
                    <p className="text-xs text-gray-500">
                      J. {match.gameWeekNumber}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Historique des cotes */}
          <div className="border rounded-md mt-10 p-4">
            <p className="text-center text-xl">Historique des cotes</p>
            <div className="flex flex-row gap-3 overflow-x-auto pb-5 pt-5">
              {playerStats.championships["1"].total.quotations.map(
                (cote: any) => (
                  <div
                    key={cote.coteId}
                    className="flex flex-col gap-1 items-center justify-center shrink-0 grow-0"
                  >
                    <p className="rounded-md border border-green-400 text-green-400 flex items-center justify-center w-10 h-10">
                      {cote.quotation}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(cote.date)}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Player;
