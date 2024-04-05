import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../API";
import { useNavigate } from "react-router-dom";

export default function useIsAuth({ path }) {
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const isAuth = () => {
            axios.get(`${API_URL}/api/user/authChecker`, { withCredentials: true }).then((res) => {
                if (res.status === 200) {
                    setAuth(true);
                    if(path) {
                        navigate(path);
                    }
                }
            }).catch((error) => {
                setAuth(false);
                navigate("/login");
                console.error(error.response.data);
            })
        }

        isAuth();
    }, [path, auth]);

    return { auth };
}