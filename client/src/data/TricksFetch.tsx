import { TrickModel } from "../model/TrickModel";

const rootUrl = import.meta.env.VITE_ROOT_URL;

export const TricksFetch = async (): Promise<TrickModel[]> => {
  const response = await fetch(`${rootUrl}/api/tricks`);
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
