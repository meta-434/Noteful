import React from "react";
import { useHistory } from 'react-router-dom';

export default function Header({clearSelectedFolder}) {

    const history = useHistory();

    const handleClick = () => {
        clearSelectedFolder();
        history.push("/");
    };

    return(
            <h1 onClick={handleClick}>Noteful</h1>
        );
}