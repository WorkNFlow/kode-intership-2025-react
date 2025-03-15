import { FiSearch } from "react-icons/fi";
import { TbListTree } from "react-icons/tb";
import { useContext, useState } from "react";
import Filter from "./Filter.tsx";
import { ModalContext, SearchContext } from "../pages/Home.tsx";
import { NetworkContext } from "../App.tsx";

const TopBar = () => {
    const [isFocused, setIsFocused] = useState(false);
    const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
    const { searchData, handleChange } = useContext(SearchContext);
    const { isOnline, isLoading } = useContext(NetworkContext);

    if (isLoading) {
        return (
            <section className="w-full px-6 pt-4 pb-8 bg-purple">
                <h2 className="text-[1.5rem] font-bold text-white mb-5">
                    Поиск
                </h2>
                <p className="text-white text-[0.81rem]">
                    Секундочку, гружусь...
                </p>
            </section>
        );
    }

    if (!isOnline) {
        return (
            <section className="w-full px-6 pt-4 pb-8 bg-[#F44336]">
                <h2 className="text-[1.5rem] font-bold text-white mb-5">
                    Поиск
                </h2>
                <p className="text-white text-[0.81rem]">
                    Не могу обновить данные. Проверь соединение с интернетом.
                </p>
            </section>
        );
    }

    return (
        <section className="w-full px-4 pt-4 border-b-1 border-b-light-gray dark:bg-d-bg dark:border-b-d-gray-bg">
            <h2 className="text-[1.5rem] font-bold ml-2 text-text dark:text-d-text">
                Поиск
            </h2>
            <div className="relative">
                <FiSearch
                    className={`mt-2 text-xl absolute left-3 top-1/2 transform -translate-y-1/2
                        ${isFocused ? 'text-text dark:text-d-text' : 'text-light-gray dark:text-d-dark-gray'}`}
                />
                <input
                    className="w-full rounded-[1rem] pl-10 pr-3 py-2 bg-light-gray-bg placeholder-light-gray dark:placeholder-d-dark-gray dark:bg-d-gray-bg mt-[1.12rem] focus:outline-none text-text dark:text-d-text"
                    placeholder="Введите имя, тег, почту..."
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