import { useRouter } from 'next/router';
import { useState } from 'react';
import { createPost } from '../../../client/request';
import styles from './style.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../../components/Loader';
import { getValue } from '../../../utils/common';
import { useStore } from "../../../client/context";
const PostCreatePage = () => {
    const router = useRouter();
    const [full_name, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [date_of_birth, setDob] = useState('');
    const [profession, setProfession] = useState('');
    const [state,] = useStore();
    const user = getValue(state, ["user"], null);

    const handleFormData = async (e) => {
        e.preventDefault();
        const input = {
            full_name, email, phone, address, date_of_birth, profession
        }
        const result = await createPost(input);
        if (!result.hasError) {
            toast.error(`Created`);
            router.replace(`/`);
            return null;
        }
        if (result.hasError) {
            toast.error(result.errorMessage);
        }
    }

    if (user && user.authenticating) {
        return <Loader />
    }
    if (!user.authenticated) {
        router.replace(`/login`)
        return null;
    }
    return (
        <div className={`container ${styles['post-create']}`}>
            <div className="row">
                <div className="col">
                    <h2>Create Customer Contact Information</h2>
                </div>
            </div>
            <form onSubmit={handleFormData}>
                <div className='row'>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingPoint"
                            placeholder="Enter Full Name"
                            value={full_name}
                            onChange={e => { setFullName(e.target.value) }}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingPoint"
                            placeholder="Enter Email"
                            value={email}
                            onChange={e => { setEmail(e.target.value) }}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingPoint"
                            placeholder="Enter Phone"
                            value={phone}
                            onChange={e => { setPhone(e.target.value) }}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingPoint"
                            placeholder="Enter Address"
                            value={address}
                            onChange={e => { setAddress(e.target.value) }}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <input
                            type="date"
                            className="form-control"
                            id="floatingPoint"
                            placeholder="Enter Date of birth"
                            value={date_of_birth}
                            onChange={e => { setDob(e.target.value) }}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingPoint"
                            placeholder="Enter Profession"
                            value={profession}
                            onChange={e => { setProfession(e.target.value) }}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <button>submit</button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default PostCreatePage;