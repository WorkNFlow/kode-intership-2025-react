import TopBar from "../components/TopBar.tsx";
import {useState, createContext, useEffect} from "react";
import SortModal from "../components/SortModal.tsx";
import Users from "../components/Users.tsx";


interface SearchData {
    searchText: string;
    sortBy: string;
    filterBy: string;
}

export const SearchContext = createContext<{
    searchData: SearchData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}>({
    searchData: {searchText: "", sortBy: "byAlphabet", filterBy: "all"},
    handleChange: () => {},
});

export const ModalContext = createContext<{
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
}>({
    isModalOpen: false,
    setIsModalOpen: () => {},
});

// Имя ключа для хранения в localStorage
const FILTERS_STORAGE_KEY = "userFiltersData";

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Значения по умолчанию для фильтров
    const defaultSearchData = {
        searchText: "",
        sortBy: "byAlphabet",
        filterBy: "all"
    };

    // Инициализация состояния с проверкой localStorage
    const [searchData, setSearchData] = useState<SearchData>(() => {
        // Пробуем получить сохраненные фильтры из localStorage
        const savedFilters = localStorage.getItem(FILTERS_STORAGE_KEY);

        // Если данные есть, парсим и возвращаем их
        if (savedFilters) {
            try {
                return JSON.parse(savedFilters);
            } catch (error) {
                console.error("Ошибка при парсинге данных из localStorage:", error);
                return defaultSearchData;
            }
        }

        // Если данных нет, возвращаем значения по умолчанию
        return defaultSearchData;
    });

    // Сохраняем данные в localStorage при изменении searchData
    useEffect(() => {
        localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(searchData));
    }, [searchData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, id, value } = e.target;

        if (name === "filterButton") {
            setSearchData({
                ...searchData,
                filterBy: id
            });
        } else if (name === "sortType") {
            setSearchData({
                ...searchData,
                sortBy: value
            });
        } else {
            setSearchData({
                ...searchData,
                [name]: value
            });
        }
        console.log(searchData);
    };


    return (
        <ModalContext.Provider value={{isModalOpen, setIsModalOpen}}>
            <SearchContext.Provider value={{searchData, handleChange}}>
                <main className={"w-screen h-screen relative flex flex-col"}>
                    <TopBar/>
                    <Users />
                    {isModalOpen && (
                        <>
                            <div className="fixed inset-0 bg-black dark:bg-[#252525] opacity-50 z-10" onClick={() => setIsModalOpen(false)}></div>
                            <SortModal/>
                        </>
                    )}
                </main>
            </SearchContext.Provider>
        </ModalContext.Provider>
    );
};

export default Home;