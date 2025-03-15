
const UsersNotFound = () => {
    return (
        <section className={`w-full flex-1 flex items-center justify-center`}>
            <div className={"flex flex-col items-center gap-3"}>
                <p className={"text-[3.5rem] -mb-4"}>
                    🔍
                </p>
                <p className={"text-text text-[1.06rem] font-semibold"}>
                    Мы никого не нашли
                </p>
                <p className={"text-dark-gray font-normal"}>
                    Попробуй скорректировать запрос
                </p>
            </div>
        </section>
    );
};

export default UsersNotFound;
