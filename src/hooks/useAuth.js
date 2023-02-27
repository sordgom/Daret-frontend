import { useContext, useDebugValue } from "react";
import UserContext from "../context/UserContext";

const useAuth = () => {
    const { auth } = useContext(UserContext);
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    return useContext(UserContext);
}

export default useAuth;