import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from "react-loader-spinner";
import ProfileCard from '../components/ProfileCard'
import { Link } from 'react-router-dom';

const Home = () => {
    const [filter, setFilter] = useState('')
    const [profiles, setProfiles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getProfiles = async () => {
            const info = await axios.get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json')
            setProfiles(info.data)
            setLoading(false)
        }
        getProfiles()
    }, [])

    const searchProfiles = (event) => {
        setFilter(event.target.value)
    }

    let profileData = profiles.filter(profile => {
        return Object.keys(profile).some(key =>
            profile[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
        )
    })

    return (
        <>
            {loading ?
                <div className="loader">
                    <Loader
                        type="Bars"
                        color="#AA14F0"
                        height={100}
                        width={100}
                    />
                    <p>Loading ...</p>
                </div> :
                <div>
                    <nav>
                        <Link to="/">
                            <h1>Job Portal</h1>
                        </Link>
                        <div className="nav-btn-container">
                            <Link to="/shortlisted">
                                <button className="nav-btn btn1">Short Listed</button>
                            </Link>
                            <Link to="/rejected">
                                <button className="nav-btn btn2">Rejected</button>
                            </Link>
                        </div>
                    </nav>
                    <div className="search">
                        <input
                            type="search"
                            placeholder="Search"
                            value={filter}
                            onChange={searchProfiles}
                        />
                    </div>
                    <div className="card-container">
                        {profileData.map(profile => {
                            return <Link to={profile.id}
                                key={profile.id}>
                                <ProfileCard info={profile} />
                            </Link>
                        })}
                    </div>
                </div>}
        </>
    )
}

export default Home
