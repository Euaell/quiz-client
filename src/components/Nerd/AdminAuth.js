import React from 'react';
import useStateContext from "../../hooks/useStateContext";
import {Navigate, Outlet} from "react-router";

export default function AdminAuth(props) {
    const { context } = useStateContext();
    return (
        context.IsAdmin === "true" ?
            <Outlet /> :
            <Navigate to="/item" />
    );
}