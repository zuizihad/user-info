import Link from 'next/link';
import Head from 'next/head';
import { useStore } from '../../client/context';
import { getValue } from '../../utils/common';
import { signOut, getSession } from "next-auth/react"
import { authConstants } from '../../client/context/constants';

const Header = () => {

    const [state, dispatch] = useStore();
    console.log({ state })
    const user = getValue(state, ['user'], null);
    const authenticated = getValue(state, ['user', 'authenticated'], false);
    return (
        <>
            <Head>
                {/* <!-- Bootstrap core CSS --> */}
                <link href="https://getbootstrap.com/docs/5.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />

                {/* <!-- Custom styles for this template --> */}
                <link href="https://fonts.googleapis.com/css?family=Playfair&#43;Display:700,900&amp;display=swap" rel="stylesheet" />
            </Head>
            <div>
                <header className="container blog-header py-3">
                    <div className="row flex-nowrap justify-content-between align-items-center">
                        <div className="col-4 pt-1">
                            {
                                authenticated ? (
                                    <Link href={`/profile`}>
                                        <a className="link-secondary">Welcome {user.name}</a>
                                    </Link>
                                ) : (
                                    <Link href={`/`}>
                                        <a className="link-secondary">Welcome Guest</a>
                                    </Link>
                                )

                            }
                        </div>
                        <div className="col-4 text-center">
                            <Link href={`/`}>
                                <a className="blog-header-logo text-dark" href="#">CIS-TECH</a>
                            </Link>
                        </div>
                        <div className="col-4 d-flex justify-content-end align-items-center">
                            <a className="link-secondary" href="#" aria-label="Search">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="mx-3" role="img" viewBox="0 0 24 24"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5" /><path d="M21 21l-5.2-5.2" /></svg>
                            </a>
                            {
                                authenticated ? (
                                    <>
                                        <Link href={`/post/create`}>
                                            <a className="btn btn-sm btn-outline-secondary user-login-btn">Create</a>
                                        </Link>
                                        <a onClick={() => signOut({
                                            redirect: false,
                                        }).then(result => {
                                            dispatch({ type: authConstants.LOGIN_FAILURE })
                                        })}
                                            className="btn btn-sm btn-outline-secondary"
                                            href="#">Logout
                                        </a>

                                    </>
                                ) : (
                                    <>
                                        <Link href={`/signup`}>
                                            <a className="btn btn-sm btn-outline-secondary user-login-btn" href="#">Sign up</a>
                                        </Link>
                                        <Link href={`/login`}>
                                            <a className="btn btn-sm btn-outline-secondary user-login-btn" href="#">Sign in</a>
                                        </Link>
                                    </>
                                )
                            }

                        </div>
                    </div>

                    {/* styled components */}
                    <style jsx>
                        {`
                    .bd-placeholder-img {
                        font-size: 1.125rem;
                        text-anchor: middle;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        user-select: none;
                    }
                    .user-login-btn{
                        margin: 0 5px;
                    }

                    @media (min-width: 768px) {
                        .bd-placeholder-img-lg {
                        font-size: 3.5rem;
                    `}
                    </style>
                </header>
            </div>
        </>
    )
}

export default Header;