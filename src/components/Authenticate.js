import React from 'react';
import useStateContext from "../hooks/useStateContext";
import {Navigate, Outlet} from "react-router";

export default function Authenticate(props) {
    const { context } = useStateContext();
    return (
        context.userId == null ?
            <Navigate to="/login" /> :
            <Outlet />
    );
}