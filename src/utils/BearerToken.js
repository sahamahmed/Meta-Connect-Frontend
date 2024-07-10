export const TokenFunction = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const formattedToken = `Bearer ${token}`;
    return formattedToken
}


