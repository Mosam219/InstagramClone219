import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import M from 'materialize-css';
import '../css/createPost.css'
const CreatePost = () => {
    const history = useHistory()
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (url) {
            fetch("/createpost", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title,
                    body,
                    pic: url,
                })
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.error) {
                        M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                    }
                    else {
                        M.toast({ html: "created post successfully", classes: "#388e3c green darken-2" })
                        history.push('/')
                    }
                }).catch(err => {
                    console.log(err)
                })
        }
    }, [url])

    const postDetails = () => {
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
                setUrl(data.url)
            })
            .catch(err => { console.log(err) })

    }
    return (
        <div className="card input-field card1">
            <h5>Create Post</h5>
            <input type="text" placeholder="title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
            <input type="text" placeholder="about Post" value={body} onChange={(e) => { setBody(e.target.value) }} />
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-2">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect #64b5f6 blue darken-2" onClick={postDetails}>
                Submit Post
            </button>
        </div>
    )
}

export default CreatePost;
