import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App'
import { useParams, useHistory } from 'react-router-dom'
import '../css/Profile.css'
const Profile = () => {
    const [userProfile, setUserProfile] = useState(null)

    const { state, dispatch } = useContext(UserContext)
    const { userid } = useParams()
    const [showfollow, setshowfollow] = useState(state ? (!state.following.includes(userid)) : true)
    // const history = useHistory()
    // const user = JSON.parse(localStorage.getItem("user"))
    // const jwt = JSON.parse(localStorage.getItem("jwt"))
    // if (user == null && jwt == null) {
    //     history.push('/login')
    // }
    // dispatch({ type: "USER", payload: user })
    useEffect(() => {
        fetch(`/user/${userid}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setUserProfile(result)
            })
    }, [])
    const followUser = () => {
        fetch('/follow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                followId: userid
            })
        }).then(res => res.json())
            .then(data => {
                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                localStorage.setItem("user", JSON.stringify(data))
                setUserProfile((prevState) => {
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: [...prevState.user.followers, data._id]
                        }
                    }
                })
                setshowfollow(false)
            })
    }
    const unfollowUser = () => {
        fetch('/unfollow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                unfollowId: userid
            })
        }).then(res => res.json())
            .then(data => {
                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                localStorage.setItem("user", JSON.stringify(data))
                setUserProfile((prevState) => {
                    const newFollower = prevState.user.followers.filter(item => item != data._id)
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: newFollower
                        }
                    }
                })
                setshowfollow(true);
            })
    }
    return (
        <div className="profile">
            {userProfile ?
                <div style={{ maxWidth: "650px", margin: "0px auto" }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around",
                        margin: "18px 0px",
                        borderBottom: "1px solid grey"
                    }}>
                        <div>
                            <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                                src={userProfile.user.pic}
                            />
                        </div>
                        <div>
                            <h4>{userProfile.user.name}</h4>
                            <h4>{userProfile.user.email}</h4>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "110%" }}>
                                <h6>{userProfile.posts.length} posts</h6>
                                <h6>{userProfile.user.followers.length} followers</h6>
                                <h6>{userProfile.user.following.length} following</h6>
                            </div>
                            {
                                showfollow ? <button style={{ margin: "10px" }} className="btn waves-effect #64b5f6 blue darken-2" onClick={followUser}>
                                    Follow
                                </button> :
                                    <button style={{ margin: "10px" }} className="btn waves-effect #64b5f6 blue darken-2" onClick={unfollowUser}>
                                        Unfollow
                                    </button>
                            }

                        </div>
                    </div>
                    <div className="gallery">
                        {
                            userProfile.posts.map(pic => {
                                return (<img className="item" key={pic._id} src={pic.photo} key={pic.title} />)
                            })
                        }
                    </div>
                </div>
                :
                <h2>loading...</h2>
            }
        </div>
    )
}

export default Profile