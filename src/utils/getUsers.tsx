import {User} from "../App.tsx";

const getAllUsers = async () => {
    const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };
    const filteredUsers = await fetch(
        `https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=all`,
        // "https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__code=500&__dynamic=true",
        options
    )
        .then((response) => response.json())
        .catch((err) => {
            console.error(err);
            return "error";
        });

    return filteredUsers.items;
};

const getFilteredSortedUsers = async (search: string, filter: string, sort: string, usersList: User[]) => {
    let filteredUsers = usersList.length === 0 ? await getAllUsers() : usersList;
    if (filteredUsers === "error") {
        return 'error';
    }

    if (search) {
        filteredUsers = filteredUsers.filter((user: User) => {
            return (
                user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                user.lastName.toLowerCase().includes(search.toLowerCase()) ||
                user.userTag.toLowerCase().includes(search.toLowerCase())
            );
        });
    }

    filteredUsers = filteredUsers.filter((user: User) => {
        return (user.department == filter || filter == "all");
    })

    if (sort === "byAlphabet") {
        filteredUsers.sort((a: User, b: User) => {
            return a.firstName.localeCompare(b.firstName);
        });
    } else if (sort === "byBirthday") {
        filteredUsers.sort((a: User, b: User) => {
            const dateA = new Date(a.birthday);
            const dateB = new Date(b.birthday);

            const monthDayA = dateA.getMonth() * 100 + dateA.getDate();
            const monthDayB = dateB.getMonth() * 100 + dateB.getDate();

            return monthDayA - monthDayB;
        });
    }

    console.log(filteredUsers.length);
    return filteredUsers;
};

export default getFilteredSortedUsers;