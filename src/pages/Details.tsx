import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../App.tsx";
import { IoIosArrowBack } from "react-icons/io";
import { User } from "../App.tsx";
import UsersError from "../components/UsersError.tsx";
import { FaRegStar } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import getFilteredSortedUsers from "../utils/getUsers.tsx";
import DetailsSkeletonLoader from "../components/DetailsSkeletonLoader.tsx";

const FullMonthsRu = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
const FullMonthsEn = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const YearsRu = ["год", "года", "лет"];

const Details = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const { language } = useContext(LanguageContext);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const users = await getFilteredSortedUsers();
                if (users === "error" || !Array.isArray(users)) {
                    setUser(undefined);
                    return;
                }
                const foundUser = users.find((user: User) => user.id.toString() === id);
                setUser(foundUser);
            } catch (error) {
                console.error("Error fetching user:", error);
                setUser(undefined);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (isLoading) {
        return <DetailsSkeletonLoader />;
    }

    if (!user) {
        return <UsersError inDetails={true} />;
    }

    const birthday = new Date(user.birthday);
    const formattedBirthday = `${birthday.getDate()} ${language === "ru" ? FullMonthsRu[birthday.getMonth()] : FullMonthsEn[birthday.getMonth()]} ${birthday.getFullYear()}`;
    const age = new Date().getFullYear() - birthday.getFullYear();
    let formattedAge: string = "";

    if (language === "en") {
        formattedAge = `${age} years old`;
    } else {
        if (age % 10 === 1) {
            formattedAge = `${age} ${YearsRu[0]}`;
        } else if (age % 10 > 1 && age % 10 < 5) {
            formattedAge = `${age} ${YearsRu[1]}`;
        } else {
            formattedAge = `${age} ${YearsRu[2]}`;
        }
    }

    return (
        <main className={"w-screen"}>
            <section
                className={"w-full bg-light-gray-bg dark:bg-d-gray-bg flex flex-col items-center px-9 py-7"}
            >
                <div className={"w-full"}>
                    <Link to={"/"} className={"dark:text-d-text p-3 flex items-center w-min"}>
                        <IoIosArrowBack/>
                    </Link>
                </div>
                <div
                    className={"flex flex-col items-center"}
                >
                    <img
                        src={user.avatarUrl}
                        alt={user.userTag}
                        className={"rounded-full w-[6.5rem] h-[6.5rem] mb-6"}
                    />
                    <p className={"text-text dark:text-d-text text-2xl font-bold"}>
                        {user.firstName} {user.lastName} <span
                        className={"text-[1.06rem] text-dark-gray dark:text-d-dark-gray font-normal"}>{user.userTag}</span>
                    </p>
                    <p className={"text-[0.81rem] text-[#55555C] dark:text-d-light-gray mt-3"}>{user.department}</p>

                </div>
            </section>

            <section
                className={"w-full px-5"}
            >
                <div className={"w-full flex justify-between items-center py-7 border-b-1 border-b-light-gray-bg dark:border-b-d-gray-bg"}>
                    <div className={"flex gap-4 items-center"}>
                        <FaRegStar
                            className={"text-xl text-text dark:text-d-text"}
                        />
                        <p className={"text-text dark:text-d-text"}>
                            {formattedBirthday}
                        </p>
                    </div>
                    <p className={"dark:text-d-text"}>{formattedAge}</p>
                </div>

                <button
                    className={"flex items-center gap-4 py-7 cursor-pointer"}
                    onClick={() => {
                        window.open(`tel:${user.phone}`)
                    }}
                >
                    <BsTelephone
                        className={"text-xl text-text dark:text-d-text"}
                    />
                    <p className={"text-text dark:text-d-text"}>
                        {user.phone}
                    </p>
                </button>
            </section>
        </main>
    );
};

export default Details;