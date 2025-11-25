export const isUserLoggedIn = () : boolean => {
    const user = localStorage.getItem("user")
    return !!user
}