import React from 'react'
import styles from './style.module.css'
// import styles from '../../../styles/Home.module.css'
const Info = ({ currentItems }) => {
    return (
        <div style={{ marginTop: '20px' }}>
            <div className="row">
                <div className={`container ${styles['cards-list']}`}>
                    {
                        currentItems && currentItems.map(item => (
                            <div className={styles['card']}>
                                <h5>Full Name: {item.full_name}</h5>
                                <h6>Email: {item.email}</h6>
                                <h6>Phone: {item.phone}</h6>
                                <h6>Address: {item.address}</h6>
                                <h6>Date of birth: {item.date_of_birth}</h6>
                                <span>Profession: {item.profession}</span>
                            </div>
                        ))
                    }
                    {
                        currentItems && currentItems.length === 0 &&
                        <h3>No Information Available</h3>
                    }
                </div>
            </div>
        </div>
    )
}

export default Info