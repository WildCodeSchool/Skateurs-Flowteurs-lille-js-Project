import { TrickModel } from "../model/TrickModel";

export const TricksFetch = async (): Promise<TrickModel[]> => {
  const response = await fetch("http://localhost:3310/api/tricks");
  if (!response.ok) {
    throw new Error("Erreur lors du chargement des tricks");
  }
  const data = await response.json();
  const tricks = data.map(
    (trick: TrickModel) =>
      new TrickModel(
        trick.id,
        trick.name,
        trick.video,
        trick.level,
        trick.xp,
        trick.isValidated
      )
  );
  return tricks;
};
