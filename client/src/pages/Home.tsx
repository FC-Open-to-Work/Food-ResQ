import React from 'react';
import {useNavigate} from "react-router-dom";
import {api_url, axiosWithCookies} from "../utils/requestUtils";

function Home() {
    const navigate = useNavigate();

    const logout = () => {
        axiosWithCookies
            .post(api_url + "/auth/logout")
            .then(function () {
                localStorage.removeItem("FoodResQ_user");
                navigate("/login");
            })
            .catch(e => console.log(e));
    }

    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Home;