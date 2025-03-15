import { useContext } from "react";
import FiltersInfo from "../constants/FiltersInfo.tsx";
import {SearchContext} from "../pages/Home.tsx";
import {LanguageContext} from "../App.tsx";

const Filter = ( {className=""}) => {
    const { searchData, handleChange } = useContext(SearchContext);
    const {language} = useContext(LanguageContext);
    console.log("classname", className)

    return (
        <nav className={className}>
            <ul className="flex items-center flex-wrap">
                {FiltersInfo.map((filter) => (
                    <li key={filter.id}>
                        <button
                            className={`text-[1rem] font-semibold px-3 py-2
                                ${searchData['filterBy'] === filter.id ? 'text-text dark:text-d-text border-b-2 border-b-purple dark:border-b-d-purple' : 'text-dark-gray dark:text-d-dark-gray'}`}
                            // @ts-expect-error Parameter 'e' implicitly has an 'any' type.
                            onClick={(e) =>  handleChange(e)}
                            id={filter.id}
                            name={"filterButton"}
                        >
                            {language == "ru" ? filter.nameRu : filter.nameEn}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Filter;
