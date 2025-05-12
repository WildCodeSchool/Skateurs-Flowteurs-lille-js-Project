import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { TricksFetch } from "../data/TricksFetch";
import { TrickModel } from "../model/TrickModel";

type TricksContextType = {
  tricks: TrickModel[];
  setTricks: React.Dispatch<React.SetStateAction<TrickModel[]>>;
};

const emptyTrick: TrickModel = {
  id: 0,
  name: "",
  video: "",
  level: "",
  xp: 0,
  isValidated: false,
};

const TricksContext = createContext<TricksContextType>({
  tricks: [emptyTrick],
  setTricks: () => {},
});

export const TricksProvider = ({ children }: { children: ReactNode }) => {
  const [tricks, setTricks] = useState<TrickModel[]>([emptyTrick]);

  useEffect(() => {
    const getTricks = async () => {
      try {
        const fetchedTricks = await TricksFetch();
        setTricks(fetchedTricks);
      } catch (error) {
        console.error("Erreur lors du chargement des tricks :", error);
      }
    };
    getTricks();
  }, []);

  return (
    <TricksContext.Provider value={{ tricks, setTricks }}>
      {children}
    </TricksContext.Provider>
  );
};

export const useTricks = (): TricksContextType => {
  const context = useContext(TricksContext);
  return context;
};
