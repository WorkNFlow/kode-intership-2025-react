import { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";

export interface User {
    id: number;
    avatarUrl: string;
    firstName: string;
    lastName: string;
    userTag: string;
    department: string;
    birthday: string;
    phone: string;
}

export const AllUsersContext = createContext<{
    allUsers: User[];
    setAllUsers: (users: User[]) => void;
}>({
    allUsers: [],
    setAllUsers: () => {},
});

export const NetworkContext = createContext<{
    isOnline: boolean;
    isLoading: boolean;
}>({
    isOnline: true,
    isLoading: true
});

const App = () => {
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [isOnline, setOnline] = useState<boolean>(true);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const updateNetworkStatus = () => {
            setOnline(navigator.onLine);
        };

        const handleLoad = () => {
            setLoading(false);
        };

        window.addEventListener("load", updateNetworkStatus);
        window.addEventListener("online", updateNetworkStatus);
        window.addEventListener("offline", updateNetworkStatus);

        const timer = setTimeout(handleLoad, 1000);

        return () => {
            window.removeEventListener("load", updateNetworkStatus);
            window.removeEventListener("online", updateNetworkStatus);
            window.removeEventListener("offline", updateNetworkStatus);
            clearTimeout(timer);
        };
    }, []);

    return (
        <NetworkContext.Provider value={{ isOnline, isLoading }}>
            <AllUsersContext.Provider value={{ allUsers, setAllUsers }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:id" element={<Details />} />
                </Routes>
            </AllUsersContext.Provider>
        </NetworkContext.Provider>
    );
};

export default App;