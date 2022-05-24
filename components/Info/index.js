import React from 'react'
import styles from './style.module.css'
// import styles from '../../../styles/Home.module.css'
const Info = ({ currentItems }) => {
    return (
        <div style={{ marginTop: '20px' }}>
            <div classNameName="row">
                <div classNameName={`container ${styles['cards-list']}`}>
                    {
                        currentItems && currentItems.map(item => (
                            <div className={styles['card']}>
                                <h4>Full Name: {item.full_name}</h4>
                                <h5>Email: {item.email}</h5>
                                <h5>Phone: {item.phone}</h5>
                                <h6>Address: {item.address}</h6>
                                <h6>Date of birth: {item.date_of_birth}</h6>
                                <span>Profession: {item.profession}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Info