import {useContext} from "react";
import {UsersContext} from "./Users.tsx";
import {Link} from "react-router-dom";

const UsersError = ({inDetails=false}) => {
    const { fetchUsers } = useContext(UsersContext);

    return (
        <section className={`w-full ${inDetails ? "h-screen" : "flex-1"} flex items-center justify-center`}>
            <div className={"flex flex-col items-center gap-3"}>
                <p className={"text-[3.5rem] -mb-4"}>
                    🛸
                </p>
                <p className={"text-text text-[1.06rem] font-semibold"}>
                    Какой-то сверхразум все сломал
                </p>
                <p className={"text-dark-gray font-normal"}>
                    Постараемся быстро починить
                </p>
                {inDetails ? (
                    <Link
                        to={"/"}
                        className={"font-semibold text-purple cursor-pointer"}>
                        Вернуться на главную
                    </Link>
                    ) : (
                    <button
                        onClick={fetchUsers}
                        className={"font-semibold text-purple cursor-pointer"}
                    >
                        Попробовать снова
                    </button>
                )}
            </div>
        </section>
    );
};

export default UsersError;
