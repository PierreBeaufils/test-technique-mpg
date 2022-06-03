import { FC } from "react";

interface Props {
  playerStats: any;
}

const Defender: FC<Props> = ({ playerStats }) => {
  return (
    <div className="border rounded-md mt-10 p-4">
      <p className="text-center text-xl">Résumé stats</p>
      <div className="flex flex-row gap-2 items-center py-1">
        <p className="w-28">Note</p>
        <span className="bg-green-500 text-white rounded-md px-4 py-1 w-16 text-center">
          {playerStats.championships["1"].keySeasonStats.averageRating.toFixed(
            1
          )}
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
            playerStats.championships["1"].keySeasonStats.percentageStarter
          )}
        </span>
      </div>
      <div className="flex flex-row gap-2 items-center py-1">
        <p className="w-28">% clean sheet</p>
        <span className="bg-green-500 text-white rounded-md px-4 py-1 w-16 text-center">
          {playerStats.championships[
            "1"
          ].keySeasonStats.percentageCleanSheet.toFixed(2)}
        </span>
      </div>
      <div className="flex flex-row gap-2 items-center py-1">
        <p className="w-28">Buts pris / M.</p>
        <span className="bg-green-500 text-white rounded-md px-4 py-1 w-16 text-center">
          {playerStats.championships[
            "1"
          ].keySeasonStats.ratioGoalsConceded.toFixed(2)}
        </span>
      </div>
      <div className="flex flex-row gap-2 items-center py-1">
        <p className="w-28">Interceptions / M.</p>
        <span className="bg-green-500 text-white rounded-md px-4 py-1 w-16 text-center">
          {playerStats.championships[
            "1"
          ].keySeasonStats.ratioInterceptions.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default Defender;
