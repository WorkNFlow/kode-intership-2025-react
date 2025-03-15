import {useContext} from "react";
import {UsersContext} from "./Users.tsx";
import {Link} from "react-router-dom";
import {LanguageContext} from "../App.tsx";

const UsersError = ({inDetails = false}) => {
    const {fetchUsers} = useContext(UsersContext);
    const {language} = useContext(LanguageContext);

    return (
        <section
            className={`w-full ${inDetails ? "h-screen" : "flex-1"} flex items-center justify-center dark:bg-d-bg`}>
            <div className={"flex flex-col items-center gap-3"}>
                <p className={"text-[3.5rem] -mb-4"}>
                    🛸
                </p>
                <p className={"text-text dark:text-d-text text-[1.06rem] font-semibold"}>
                    {language == "ru" ?
                        "Какой-то сверхразум все сломал" :
                        "Some supermind broke everything"
                    }
                </p>
                <p className={"text-dark-gray dark:text-d-light-gray font-normal"}>
                    {language == "ru" ?
                        "Постараемся быстро починить" :
                        "We'll try to fix it quickly"
                    }
                </p>
                {inDetails ? (
                    <Link
                        to={"/"}
                        className={"font-semibold text-purple dark:text-d-purple cursor-pointer"}>
                        {language == "ru" ? "Вернуться на главную" : "Go back to main page"}
                    </Link>
                ) : (
                    <button
                        onClick={fetchUsers}
                        className={"font-semibold text-purple dark:text-d-purple cursor-pointer"}
                    >
                        {language == "ru" ? "Попробовать снова" : "Try again"}
                    </button>
                )}
            </div>
        </section>
    );
};

export default UsersError;
