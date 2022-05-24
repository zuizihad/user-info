import { getSession } from "next-auth/react";
import { useEffect } from "react";
import { useStore } from "../../client/context";
import { authConstants } from "../../client/context/constants";
import { getValue } from "../../utils/common";
import Header from "../Header"

export const Layout = ({ children }) => {
    const [state, dispatch] = useStore();

    const myFunction = async () => {
        const authenticated = getValue(state, ['user', 'authenticated'], false);
        if (!authenticated) {
            dispatch({ type: authConstants.LOGIN_REQUEST });
            const session = await getSession();
            if (session) {
                dispatch({ type: authConstants.LOGIN_SUCCESS, payload: session });
            } else {
                dispatch({ type: authConstants.LOGIN_FAILURE, payload: session })
            }
        }
    }

    useEffect(() => {
        myFunction();
    }, []);

    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default Layout;
