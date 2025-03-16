import { useContext, useState, useEffect, createContext } from "react";
import { SearchContext } from "../pages/Home.tsx";
import { LanguageContext } from "../App.tsx";
import getFilteredSortedUsers from "../utils/getUsers.tsx";
import SkeletonLoader from "./SkeletonLoader";
import UsersError from "./UsersError.tsx";
import { Link } from "react-router-dom";
import UsersNotFound from "./UsersNotFound.tsx";
import { User } from "../App.tsx";

interface UsersContextType {
    fetchUsers: () => Promise<void>;
}

export const UsersContext = createContext<UsersContextType>({
    fetchUsers: async () => {}
});

// Явно определяем тип объекта с индексной сигнатурой
interface GroupedUsers {
    [key: string]: User[];
}

const MonthsRu = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
const MonthsEn = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

const Users = () => {
    const { searchData } = useContext(SearchContext);
    const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
    const [groupedUsers, setGroupedUsers] = useState<GroupedUsers>({});
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const { language } = useContext(LanguageContext);

    const fetchUsers = async () => {
        setIsLoading(true);
        setHasError(false);

        try {
            const users = await getFilteredSortedUsers(
                searchData.searchText,
                searchData.filterBy,
                searchData.sortBy,
            );

            if (users === "error") {
                setHasError(true);
                return;
            }

            setDisplayedUsers(users);

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

    const groupUsersByUpcomingBirthday = (users: User[]): GroupedUsers => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const nextYear = currentYear + 1;

        const result: GroupedUsers = {
            [currentYear.toString()]: [],
            [nextYear.toString()]: []
        };

        users.forEach((user: User) => {
            const birthDate = new Date(user.birthday);
            const birthMonth = birthDate.getMonth();
            const birthDay = birthDate.getDate();

            const todayMonth = today.getMonth();
            const todayDay = today.getDate();

            const isBirthdayThisYear =
                birthMonth > todayMonth ||
                (birthMonth === todayMonth && birthDay >= todayDay);

            if (isBirthdayThisYear) {
                result[currentYear.toString()].push(user);
            } else {
                result[nextYear.toString()].push(user);
            }
        });

        return result;
    };

    useEffect(() => {
        fetchUsers();
    }, [searchData]);

    const usersContextValue: UsersContextType = {
        fetchUsers
    };

    const sortedYears = Object.keys(groupedUsers).sort((a, b) => Number(a) - Number(b));

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
                                {groupedUsers[year] && groupedUsers[year].length > 0 && (
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
                                                    {new Date(user.birthday).getDate()} {language == "ru" ? MonthsRu[new Date(user.birthday).getMonth()] : MonthsEn[new Date(user.birthday).getMonth()]}
                                                </p>
                                            </Link>
                                        ))}

                                        {yearIndex < sortedYears.length - 1 &&
                                            groupedUsers[sortedYears[yearIndex + 1]] &&
                                            groupedUsers[sortedYears[yearIndex + 1]].length > 0 && (
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
                                    <div className="flex items-center text-text dark:text-d-text gap-1">
                                        <p>{user.firstName} {user.lastName}</p>
                                        <p className="text-dark-gray dark:text-dark-gray text-[0.88rem]">{user.userTag}</p>
                                    </div>
                                    <p className="text-[#55555C] dark:text-light-gray text-[0.81rem]">{user.department}</p>
                                </div>
                                {/*<p className="text-[0.94rem] text-[#55555C] dark:text-light-gray ml-auto">*/}
                                {/*    {new Date(user.birthday).getDate()} {language == "ru" ? MonthsRu[new Date(user.birthday).getMonth()] : MonthsEn[new Date(user.birthday).getMonth()]}*/}
                                {/*</p>*/}
                            </Link>
                        ))
                    )}
                </div>
            </section>
        </UsersContext.Provider>
    );
};

export default Users;