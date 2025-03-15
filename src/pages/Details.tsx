import {Link, useParams} from "react-router-dom";
import {useContext} from "react";
import {AllUsersContext} from "../App.tsx";
import {IoIosArrowBack} from "react-icons/io";
import {User} from "../App.tsx";
import UsersError from "../components/UsersError.tsx";
import { FaRegStar } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";

const FullMonthsRu = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
const YearsRu = ["год", "года", "лет"];

const Details = () => {
    const {id} = useParams<{ id: string }>();
    const {allUsers} = useContext(AllUsersContext);
    const user: User | undefined= allUsers.find((user) => user.id === id);

    if (user === undefined) {
        console.log("In Details")
        return <UsersError inDetails={true} />
    }

    const birthday = new Date(user.birthday);
    const formattedBirthday = `${birthday.getDate()} ${FullMonthsRu[birthday.getMonth()]} ${birthday.getFullYear()}`;
    const age = new Date().getFullYear() - birthday.getFullYear();
    let formattedAge: string = "";
    if (age % 10 == 1) {
        formattedAge = `${age} ${YearsRu[0]}`;
    } else if (age % 10 > 1 && age % 10 < 5) {
        formattedAge = `${age} ${YearsRu[1]}`;
    } else {
        formattedAge = `${age} ${YearsRu[2]}`;
    }

    return (
        <main className={"w-screen"}>
            <section
                className={"w-full bg-light-gray-bg flex flex-col items-center px-9 py-7"}
            >
                <div
                    className={"w-full"}
                >
                    <Link to={"/"}>
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
                    <p className={"text-text text-2xl font-bold"}>
                        {user.firstName} {user.lastName} <span className={"text-[1.06rem] text-dark-gray font-normal"}>{user.userTag}</span>
                    </p>
                    <p className={"text-[0.81rem] text-[#55555C] mt-3"}>{user.department}</p>

                </div>
            </section>

            <section
                className={"w-full px-5"}
            >
                <div className={"w-full flex justify-between items-center py-7 border-b-1 border-b-light-gray-bg"}>
                    <div className={"flex gap-4 items-center"}>
                        <FaRegStar
                            className={"text-xl text-text"}
                        />
                        <p className={"text-text"}>
                            {formattedBirthday}
                        </p>
                    </div>
                    <p>{formattedAge}</p>
                </div>

                <button
                    className={"flex items-center gap-4 py-7 cursor-pointer"}
                    onClick={() => {
                        window.open(`tel:${user.phone}`)
                    }}
                >
                    <BsTelephone
                        className={"text-xl text-text"}
                    />
                    <p className={"text-text"}>
                        {user.phone}
                    </p>
                </button>
            </section>
        </main>
    );
};

export default Details;