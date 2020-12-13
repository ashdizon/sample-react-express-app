import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import { getAuth } from "../../services/AuthService";

export default function(props) {
    const jwt = getAuth();
    return jwt ? props.children : <Redirect to="/login"/>;
}