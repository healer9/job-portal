import React from 'react'

const ProfileCard = (props) => {
    const { Image, name } = props.info
    return (
        <div className="card">
            <img src={Image} alt="img" />
            <h3>{name}</h3>
            <button className="profile-btn">View Profile</button>
        </div>
    )
}

export default ProfileCard
