import { useState } from 'react';
import { useRouter } from 'next/router';
import { signup } from '../../client/request';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStore } from '../../client/context';
import { getValue } from '../../utils/common';
import Loader from '../../components/Loader';

const Signup = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const [state,] = useStore();
    const user = getValue(state, ['user'], null)

    const notify = () => toast("Wow so easy!");

    const signupHandler = async (e) => {
        e.preventDefault();
        const payload = { name, email, password };
        const result = await signup(payload);

        if (result?.hasError) {
            setError(result.errorMessage);
            toast.error(result.errorMessage)
        } else {
            setError(null);
            setName('');
            setEmail('');
            setPassword('');
            router.replace('/login')
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
                    onSubmit={signupHandler}
                    style={{ margin: '50px 0' }}
                >
                    {/* <img className="mb-4" src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" /> */}
                    <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

                    <div className="form-floating">
                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" id="floatingInput" placeholder="name" />
                        <label htmlFor="floatingInput">Name</label>
                    </div>
                    <div className="form-floating">
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                </form>
            </main>
            <ToastContainer />
        </>
    )
}

export default Signup;