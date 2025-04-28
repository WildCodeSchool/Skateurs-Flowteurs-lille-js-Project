import { createContext, useContext, useState, ReactNode } from 'react';



type User = {
    name: string;
    email: string;
    picture: string;
};

type UserContextType = {
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | undefined>();

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

