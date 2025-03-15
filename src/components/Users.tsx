import {useContext, useState, useEffect, createContext} from "react";
import {SearchContext} from "../pages/Home.tsx";
import {AllUsersContext} from "../App.tsx";
import getFilteredSortedUsers from "../utils/getUsers.tsx";
import SkeletonLoader from "./SkeletonLoader";
import UsersError from "./UsersError.tsx";
import {Link} from "react-router-dom";
import UsersNotFound from "./UsersNotFound.tsx";
import { User } from "../App.tsx"

export const UsersContext = createContext({
    fetchUsers: async () => {
    }
});

const MonthsRu = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];

const Users = () => {
    const {searchData} = useContext(SearchContext);
    const {allUsers, setAllUsers} = useContext(AllUsersContext);
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const [groupedUsers, setGroupedUsers] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    // Define the fetchUsers function
    const fetchUsers = async () => {
        setIsLoading(true);
        setHasError(false);

        try {
            const users = await getFilteredSortedUsers(
                searchData.searchText,
                searchData.filterBy,
                searchData.sortBy,
                allUsers
            );

            setDisplayedUsers(users);
            if (allUsers.length === 0) {
                setAllUsers(users);
            }

            // Group users by upcoming birthday year if sorting by birthday
            if (searchData.sortBy === "byBirthday") {
                const grouped = groupUsersByUpcomingBirthday(users);
                setGroupedUsers(grouped);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    };

    // Create context value
    const usersContextValue = {
        fetchUsers
    };

    useEffect(() => {
        fetchUsers();
    }, [searchData]);



    // Function to group users by upcoming birthday year (this year or next year)
    const groupUsersByUpcomingBirthday = (users) => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const nextYear = currentYear + 1;

        const result = {
            [currentYear]: [],
            [nextYear]: []
        };

        users.forEach((user: User) => {
            const birthDate = new Date(user.birthday);
            const birthMonth = birthDate.getMonth();
            const birthDay = birthDate.getDate();

            const todayMonth = today.getMonth();
            const todayDay = today.getDate();

            // Determine if the birthday is in current year or next year
            const isBirthdayThisYear =
                birthMonth > todayMonth ||
                (birthMonth === todayMonth && birthDay >= todayDay);

            if (isBirthdayThisYear) {
                result[currentYear].push(user);
            } else {
                result[nextYear].push(user);
            }
        });

        return result;
    };

    // Get sorted years for rendering
    const sortedYears = Object.keys(groupedUsers).sort((a, b) => a - b);

    // Render logic based on loading and error states
    if (isLoading) {
        return <SkeletonLoader/>;
    }

    if (hasError) {
        return (
            <UsersContext.Provider value={usersContextValue}>
                <UsersError/>
            </UsersContext.Provider>
        );
    }

    if (displayedUsers.length === 0) {
        return (
            <UsersNotFound />
        );
    }

    return (
        <UsersContext.Provider value={usersContextValue}>
            <section className="w-full px-4 py-6 dark:bg-d-bg">
                <div className="flex flex-col">
                    {searchData.sortBy === "byBirthday" ? (
                        sortedYears.map((year, yearIndex) => (
                            <div key={year} className="w-full">
                                {/* Only render the year group if it has users */}
                                {groupedUsers[year].length > 0 && (
                                    <>
                                        {/* Users in this year group */}
                                        {groupedUsers[year].map((user) => (
                                            <Link to={`/${user.id}`} key={user.id}
                                                  className="flex items-center gap-4 py-1.5 w-full">
                                                <img
                                                    src={user.avatarUrl}
                                                    alt={user.userTag}
                                                    className="rounded-full w-18 h-18"
                                                />
                                                <div className="flex flex-col">
                                                    <div className="flex text-text dark:text-d-text gap-1 items-center">
                                                        <p>{user.firstName} {user.lastName}</p>
                                                        <p className="text-dark-gray dark:text-d-dark-gray text-[0.88rem]">{user.userTag}</p>
                                                    </div>
                                                    <p className="text-[#55555C] dark:text-d-light-gray text-[0.81rem]">{user.department}</p>
                                                </div>
                                                <p className="text-[0.94rem] text-[#55555C] dark:text-d-light-gray ml-auto">
                                                    {new Date(user.birthday).getDate()} {MonthsRu[new Date(user.birthday).getMonth()]}
                                                </p>
                                            </Link>
                                        ))}

                                        {yearIndex < sortedYears.length - 1 && groupedUsers[sortedYears[yearIndex + 1]].length > 0 && (
                                            <div className="relative flex items-center my-4">
                                                <div className="flex-grow border-t border-gray-300"></div>
                                                <span className="flex-shrink mx-16 text-gray-400">{sortedYears[yearIndex + 1]}</span>
                                                <div className="flex-grow border-t border-gray-300"></div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        displayedUsers.map((user: User) => (
                            <Link to={`/${user.id}`} key={user.id} className="flex items-center gap-4 py-1.5 w-full">
                                <img
                                    src={user.avatarUrl}
                                    alt={user.userTag}
                                    className="rounded-full w-18 h-18"
                                />
                                <div className="flex flex-col">
                                    <div className="flex text-text dark:text-d-text gap-1">
                                        <p>{user.firstName} {user.lastName}</p>
                                        <p className="text-dark-gray dark:text-dark-gray text-[0.88rem]">{user.userTag}</p>
                                    </div>
                                    <p className="text-[#55555C] dark:text-light-gray text-[0.81rem]">{user.department}</p>
                                </div>
                                <p className="text-[0.94rem] text-[#55555C] dark:text-light-gray ml-auto">
                                    {new Date(user.birthday).getDate()} {MonthsRu[new Date(user.birthday).getMonth()]}
                                </p>
                            </Link>
                        ))
                    )}
                </div>
            </section>
        </UsersContext.Provider>
    );
};

export default Users;