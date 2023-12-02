import React, {useEffect} from "react";

import { Navigate } from "react-router-dom";
import {api_url, axiosWithCookies} from "./requestUtils";

export default function DynamicRoute(props: {
    authenticated: boolean;
    element: any;
}) {
    const [returnElement, setReturnElement] = React.useState(props.element);

    useEffect(() => {
        axiosWithCookies
            .get(api_url + "/auth/is_authenticated")
            .then((res) => {
                const {is_authenticated} = res.data;
                console.log(is_authenticated);

                if (props.authenticated && !is_authenticated)
                    setReturnElement(<Navigate to="/login" />);
                else if (!props.authenticated && is_authenticated)
                    setReturnElement(<Navigate to="/" />);
                else setReturnElement(props.element);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [props.authenticated, props.element]);


    return returnElement;
}