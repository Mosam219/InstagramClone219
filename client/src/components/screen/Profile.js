import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App'
const Profile = () => {
    const [myPic, setMyPic] = useState([])
    const [image, setImage] = useState("")
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        fetch('/mypost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setMyPic(result.mypost)
            })
    }, [])
    useEffect(() => {
        if (image) {
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", "instagramClone")
            data.append("cloud_name", "mosam219")
            fetch("https://api.cloudinary.com/v1_1/mosam219/image/upload", {
                method: "post",
                body: data
            })
                .then(res => res.json())
                .then(data => {
                    fetch('/updatepic', {
                        method: "put",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("jwt")
                        },
                        body: JSON.stringify({
                            pic: data.url
                        })
                    }).then(res => res.json())
                        .then(result => {
                            console.log(result)
                            localStorage.setItem("user", JSON.stringify({ ...state, pic: result.pic }))
                            dispatch({ type: "UPDATEPIC", payload: result.pic })
                        })
                })
                .catch(err => { console.log(err) })
        }
    }, [image])
    const UpdateProfilePic = (file) => {
        setImage(file)
    }
    return (
        <div style={{ maxWidth: "650px", margin: "0px auto" }}>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px",
                borderBottom: "1px solid grey"
            }}>
                <div>
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px", display: "block" }}
                        src={state ? state.pic : "loading"}
                    />
                    <div className="file-field input-field">
                        <div className="btn #64b5f6 blue darken-2">
                            <span>Upload Image</span>
                            <input type="file" onChange={(e) => UpdateProfilePic(e.target.files[0])} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                </div>
                <div>
                    <h4>{state ? state.name : "loading"}</h4>
                    <h5>{state ? state.email : "loading"}</h5>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "110%" }}>
                        <h6>{myPic.length} posts</h6>
                        <h6>{state ? state.followers.length : "0"} followers</h6>
                        <h6>{state ? state.following.length : "0"} following</h6>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                    myPic.map(pic => {
                        return (<img className="item" key={pic._id} src={pic.photo} />)
                    })
                }
            </div>
        </div>
    )
}

export default Profile