import { RxCross2 } from "react-icons/rx";
import { useContext } from "react";
import {ModalContext, SearchContext} from "../pages/Home.tsx";

const SortModal = () => {
    const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
    const { searchData, handleChange } = useContext(SearchContext);

    // @ts-expect-error Parameter 'e' implicitly has an 'any' type.
    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-20" onClick={() => setIsModalOpen(false)}>
            <div className="bg-white dark:bg-d-gray-bg py-6 px-4 w-[373px] rounded-xl" onClick={handleModalClick}>
                <div className="flex justify-center items-center gap-2 relative">
                    <p className="text-xl font-semibold text-text dark:text-d-text">
                        Сортировка
                    </p>
                    <button
                        className={"absolute right-2"}
                        onClick={() => setIsModalOpen(!isModalOpen)}
                    >
                        <RxCross2
                            className=" text-2xl font-bold text-light-gray bg-light-gray-bg dark:bg-[#656565] dark:text-d-light-gray p-[0.3rem] rounded-full cursor-pointer"
                        />
                    </button>
                </div>
                <div className={"flex flex-col mt-6 gap-8"}>
                    <div className={"flex gap-4 items-center"}>
                        <input
                            id={"byAlphabet"}
                            name={"sortType"}
                            type={"radio"}
                            checked={searchData.sortBy === "byAlphabet"}
                            onChange={(e) => {
                                handleChange(e)
                            }}
                            value={"byAlphabet"}
                        />
                        <label htmlFor={"byAlphabet"} className={"text-text dark:text-d-text"}>
                            По алфавиту
                        </label>
                    </div>
                    <div className={"flex gap-4 items-center"}>
                        <input
                            id={"byBirthday"}
                            name={"sortType"}
                            type={"radio"}
                            checked={searchData.sortBy === "byBirthday"}
                            onChange={(e) => {
                                handleChange(e)
                            }}
                            value={"byBirthday"}
                        />
                        <label htmlFor={"byBirthday"} className={"text-text dark:text-d-text"}>
                            По дню рождения
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortModal;