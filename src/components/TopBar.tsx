import {FiSearch} from "react-icons/fi";
import {TbListTree} from "react-icons/tb";
import {useContext, useState} from "react";
import Filter from "./Filter.tsx";
import {ModalContext, SearchContext} from "../pages/Home.tsx";
import {LanguageContext, NetworkContext, ThemeContext} from "../App.tsx";
import {IoMoon} from "react-icons/io5";
import {LuSunMedium, LuLanguages} from "react-icons/lu";

const TopBar = () => {
    const [isFocused, setIsFocused] = useState(false);
    const {isModalOpen, setIsModalOpen} = useContext(ModalContext);
    const {searchData, handleChange} = useContext(SearchContext);
    const {isOnline, isLoading} = useContext(NetworkContext);
    const {language, toggleLanguage} = useContext(LanguageContext);
    const {isDarkMode, toggleTheme} = useContext(ThemeContext);

    if (isLoading) {
        return (
            <section className="w-full border-b-1 border-b-light-gray dark:border-b-d-gray-bg">
                <div className={"bg-purple px-6 pt-4 pb-6"}>
                    <h2 className="text-[1.5rem] font-bold text-white mb-5">
                        {language == "ru" ? "Поиск" : "Search"}
                    </h2>
                    <p className="text-white text-[0.81rem]">
                        {language == "ru" ?
                            "Секундочку, гружусь..." :
                            "One moment, loading..."
                        }
                    </p>
                </div>
                <Filter className={"ml-4"}/>
            </section>
        );
    }

    if (!isOnline) {
        return (
            <section className="w-full border-b-1 border-b-light-gray dark:border-b-d-gray-bg">
                <div className={"bg-[#F44336] px-6 pt-4 pb-8"}>
                    <h2 className="text-[1.5rem] font-bold text-white mb-5">
                        {language == "ru" ? "Поиск" : "Search"}
                    </h2>
                    <p className="text-white text-[0.81rem]">
                        {language == "ru" ?
                            "Не могу обновить данные. Проверь соединение с интернетом." :
                            "Can't update data. Check your internet connection."
                        }
                    </p>
                </div>
                <Filter className={"ml-4"}/>
            </section>
        );
    }

    return (
        <section className="w-full px-4 pt-4 border-b-1 border-b-light-gray dark:bg-d-bg dark:border-b-d-gray-bg">
            <div className={"flex items-center justify-between"}>
                <h2 className="text-[1.5rem] font-bold ml-2 text-text dark:text-d-text">
                    {language == "ru" ? "Поиск" : "Search"}
                </h2>
                <div className={"flex gap-4"}>
                    {isDarkMode ?
                        <button className={"cursor-pointer p-2 rounded-lg dark:bg-d-gray-bg"} onClick={toggleTheme}>
                            <IoMoon
                                className={"text-d-light-gray text-xl"}
                            />
                        </button> :
                        <button className={"cursor-pointer p-2 rounded-lg bg-light-gray-bg"} onClick={toggleTheme}>
                            <LuSunMedium
                                className={"text-dark-gray text-xl"}
                            />
                        </button>}
                    <button
                        className={`cursor-pointer p-2 rounded-lg bg-light-gray-bg dark:bg-d-gray-bg`}
                        onClick={toggleLanguage}>
                        <LuLanguages
                            className={`text-xl text-dark-gray dark:text-d-light-gray`}
                        />
                    </button>
                </div>

            </div>
            <div className="relative mb-3">
                <FiSearch
                    className={`mt-2 text-xl absolute left-3 top-1/2 transform -translate-y-1/2
                        ${isFocused ? 'text-text dark:text-d-text' : 'text-light-gray dark:text-d-dark-gray'}`}
                />
                <input
                    className="w-full rounded-[1rem] pl-10 pr-3 py-2 bg-light-gray-bg placeholder-light-gray dark:placeholder-d-dark-gray dark:bg-d-gray-bg mt-[1.12rem] focus:outline-none text-text dark:text-d-text"
                    placeholder={language == "ru" ?
                        "Введите имя, тег, почту..." :
                        "Enter name, tag, email..."
                    }
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    name="searchText"
                    value={searchData.searchText}
                    onChange={handleChange}
                />
                <button
                    className="cursor-pointer"
                    onClick={() => setIsModalOpen(!isModalOpen)}
                >
                    <TbListTree
                        className="mt-2 text-xl absolute right-3 top-1/2 transform -translate-y-1/2 text-light-gray"
                    />
                </button>
            </div>
            <Filter/>
        </section>
    );
};

export default TopBar;