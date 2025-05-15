import { createContext, ReactNode, useContext, useState } from "react";

export type ProfilePicture = {
  img: string | null;
  class: string | null;
};

export type User = {
  id: number;
  name: string;
  email: string;
  defaultPicture: string;
  profilePicture: ProfilePicture;
  isConnected: boolean;
  xp: number;
};

type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

const emptyUser: User = {
  id: 0,
  name: "",
  email: "",
  defaultPicture:
    "https://static.vecteezy.com/system/resources/previews/020/911/740/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png",
  profilePicture: {
    img: "",
    class: "noBackgroundSelected",
  },
  isConnected: false,
  xp: 0,
};

const UserContext = createContext<UserContextType>({
  user: emptyUser,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(emptyUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  return context;
};
