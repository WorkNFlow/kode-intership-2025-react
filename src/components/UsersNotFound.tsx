import {useContext} from "react";
import {LanguageContext} from "../App.tsx";

const UsersNotFound = () => {
    const {language} = useContext(LanguageContext);

    return (
        <section className={`w-full flex-1 flex items-center justify-center`}>
            <div className={"flex flex-col items-center gap-3"}>
                <p className={"text-[3.5rem] -mb-4"}>
                    🔍
                </p>
                <p className={"text-text dark:text-d-text text-[1.06rem] font-semibold"}>
                    {language == "ru" ? "Мы никого не нашли" : "We found no one"}
                </p>
                <p className={"text-dark-gray dark:text-d-light-gray font-normal"}>
                    {language == "ru" ? "Попробуй скорректировать запрос" : "Try to adjust your search"}
                </p>
            </div>
        </section>
    );
};

export default UsersNotFound;
