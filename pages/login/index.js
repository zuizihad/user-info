import { signIn, getSession } from "next-auth/react"
import { useState } from 'react';
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStore } from "../../client/context";
import { authConstants } from "../../client/context/constants";
import { getValue } from "../../utils/common";
import Loader from "../../components/Loader";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [state, dispatch] = useStore();
    const user = getValue(state, ['user'], null);


    const loginHandler = async (e) => {
        e.preventDefault();
        const payload = { email, password };
        dispatch({ type: authConstants.LOGIN_REQUEST });
        const result = await signIn("credentials", { ...payload, redirect: false });
        console.log("result", result);
        if (!result.error) {
            const session = await getSession();
            console.log("session login", session)
            dispatch({ type: authConstants.LOGIN_SUCCESS, payload: session });
            router.replace(`/`);
        } else {
            dispatch({ type: authConstants.LOGIN_FAILURE, payload: result.error });
            toast.error(result.error);
            setError(result.error);
        }
    }

    if (user && user.authenticating) {
        return <Loader />
    }

    if (user && user.authenticated) {
        router.replace(`/`);
        return null;
    }
    return (
        <>
            <main className="form-signin">
                <form
                    style={{ margin: '50px 0' }}
                    onSubmit={loginHandler}
                >
                    {/* <img className="mb-4" src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" /> */}
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                </form>
            </main>
            <ToastContainer />
        </>
    )
}

export default Login;