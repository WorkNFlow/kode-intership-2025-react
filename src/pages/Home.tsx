import TopBar from "../components/TopBar.tsx";
import {useState, createContext} from "react";
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

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [searchData, setSearchData] = useState({
        searchText: "",
        sortBy: "byAlphabet",
        filterBy: "all"
    });

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
        console.log(searchData)
    };


    return (
        <ModalContext.Provider value={{isModalOpen, setIsModalOpen}}>
            <SearchContext.Provider value={{searchData, handleChange}}>
            <main className={"w-screen h-screen relative flex flex-col"}>
                <TopBar/>
                <Users />
                {isModalOpen && (
                    <>
                        <div className="fixed inset-0 bg-black opacity-50 z-10" onClick={() => setIsModalOpen(false)}></div>
                        <SortModal/>
                    </>
                )}
            </main>
            </SearchContext.Provider>
        </ModalContext.Provider>
    );
};

export default Home;