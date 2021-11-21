import React, { useState, useEffect } from 'react'
import Loader from "react-loader-spinner";
import ProfileCard from '../components/ProfileCard'
import { Link } from 'react-router-dom'

const Rejected = () => {
    const [profiles, setProfiles] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getProfiles = () => {
            let info = JSON.parse(localStorage.getItem('rejected'))
            console.log(info)
            setProfiles(info)
            setLoading(false)
        }

        getProfiles()
    }, [])

    return (
        <>
            {loading ?
                <div className="loader">
                    <Loader
                        type="Bars"
                        color="#000000"
                        height={100}
                        width={100}
                    />
                </div>
                : <>
                    <nav>
                        <Link to="/">
                            <h1>Job Portal</h1>
                        </Link>
                        <h1>Rejected</h1>
                    </nav>
                    {profiles === null ?
                        <div className="empty">List is empty</div> :
                        <div className="card-container">
                            {profiles.map(profile => {
                                return <Link to={'/' + profile.id}
                                    key={profile.id}>
                                    <ProfileCard info={profile} />
                                </Link>
                            })}
                        </div>
                    }
                </>
            }
        </>
    )
}

export default Rejected
