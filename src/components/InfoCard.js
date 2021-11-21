import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from "react-loader-spinner";
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom';

const InfoCard = () => {
    const params = useParams()
    const id = parseInt(params.id)
    const [profile, setProfile] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getProfiles = async () => {
            const info = await axios.get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json')
            const profiles = info.data

            let profileInfo = ''
            for (let i = 0; i < profiles.length; i++) {
                let userId = parseInt(profiles[i].id)
                if (userId === id) {
                    profileInfo = profiles[i]
                    break
                }
            }

            setProfile(profileInfo)
            setLoading(false)
        }
        getProfiles()
    }, [id])

    const shortList = (profile) => {
        let userId = profile.id
        const data = localStorage.getItem('shortlisted')
        if (data === null) {
            localStorage.setItem('shortlisted', JSON.stringify([]))
        }

        let profiles = JSON.parse(localStorage.getItem('shortlisted'))

        let found = profiles.find(profile => profile.id === userId)

        if (!found) {
            profiles.push(profile)
            localStorage.setItem('shortlisted', JSON.stringify(profiles))
        }
    }

    const reject = (profile) => {
        let userId = profile.id
        const data = localStorage.getItem('rejected')
        if (data === null) {
            localStorage.setItem('rejected', JSON.stringify([]))
        }

        let profiles = JSON.parse(localStorage.getItem('rejected'))

        let found = profiles.find(profile => profile.id === userId)

        if (!found) {
            profiles.push(profile)
            localStorage.setItem('rejected', JSON.stringify(profiles))
        }
    }

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
                </div> :
                <div>
                    <nav>
                        <Link to="/">
                            <h1>Job Portal</h1>
                        </Link>
                    </nav>
                    <div className="profile-container">
                        <div className="profile-info">
                            <img src={profile.Image} alt="img" />
                            <div className="details">
                                <h3>Name : {profile.name}</h3>
                            </div>
                        </div>
                        <div className="selection-btn">
                            <Link to="/">
                                <button className="profile-btn" >&#8656; Back</button>
                            </Link>
                            <Link to="/">
                                <button
                                    onClick={() => shortList(profile)}
                                    className="nav-btn btn1">
                                    Short List
                                </button>
                            </Link>
                            <Link to="/">
                                <button
                                    onClick={() => reject(profile)}
                                    className="nav-btn btn2">
                                    Reject
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default InfoCard
