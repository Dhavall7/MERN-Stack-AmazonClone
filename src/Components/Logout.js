import React from 'react'
import {
    useHistory
} from "react-router-dom";
import { useStateValue } from './StateProvider'

function Logout() {
    const [{ username }, dispatch] = useStateValue();
    var txt;
    if (confirm("Are You Sure you want to logout?")) {
        txt = "YES";
    } else {
        txt = "NO";
    }
    let history = useHistory();

    if (txt === "YES") {
        dispatch({
            type: 'REMOVE_NAME',
            name: username.name
        })

        dispatch({
            type: 'Logout_BasketValue',
        })

        localStorage.clear();
    }  
    return (
        <div>
            {history.push("/")}
        </div>
    )
}

export default Logout
