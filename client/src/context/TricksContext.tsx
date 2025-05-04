import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { TricksFetch } from "../data/TricksFetch";

export type Trick = {
  id: number;
  name: string;
  video: string;
  level: string;
  xp: number;
  isValidated: boolean;
};

type TricksContextType = {
  tricks: Trick[];
  setTricks: React.Dispatch<React.SetStateAction<Trick[]>>;
};

const emptyTrick: Trick = {
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
  const [tricks, setTricks] = useState<Trick[]>([emptyTrick]);

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
