import {Link} from "react-router-dom";
import {IoIosArrowBack} from "react-icons/io";
import {FaRegStar} from "react-icons/fa";
import {BsTelephone} from "react-icons/bs";

const DetailsSkeletonLoader = () => {
    return (
        <main className={"w-screen"}>
            <section className={"w-full bg-light-gray-bg dark:bg-d-gray-bg flex flex-col items-center px-9 py-7"}>
                <div className={"w-full"}>
                    <Link to={"/"} className={"dark:text-d-text p-3 flex items-center w-min"}>
                        <IoIosArrowBack/>
                    </Link>
                </div>
                <div className={"flex flex-col items-center animate-pulse"}>
                    <div className={"w-[6.5rem] h-[6.5rem] mb-6 bg-[#F3F3F6] dark:bg-d-gray-bg rounded-full"} />
                    <div className={"h-6 w-48 bg-[#F3F3F6] dark:bg-d-gray-bg rounded-full"} />
                    <div className={"h-4 w-14 bg-[#F3F3F6] dark:bg-d-gray-bg rounded-full mt-4"} />

                </div>
            </section>

            <section className={"w-full px-5"}>
                <div className={"w-full flex justify-between items-center py-7 border-b-1 border-b-light-gray-bg dark:border-b-d-gray-bg animate-pulse"}>
                    <div className={"flex gap-4 items-center"}>
                        <FaRegStar
                            className={"text-xl text-[#F3F3F6] dark:text-d-gray-bg"}
                        />
                        <div className={"w-28 h-5 bg-[#F3F3F6] dark:bg-d-gray-bg rounded-full"}/>
                    </div>
                    <div className={"w-16 h-5 bg-[#F3F3F6] dark:bg-d-gray-bg rounded-full"} />
                </div>

                <div className={"flex items-center gap-4 py-7 animate-pulse"}>
                    <BsTelephone
                        className={"text-xl text-[#F3F3F6] dark:text-d-gray-bg"}
                    />
                    <div className={"w-40 h-5 bg-[#F3F3F6] dark:bg-d-gray-bg rounded-full"} />
                </div>
            </section>
        </main>
    );
};

export default DetailsSkeletonLoader;