import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
const SignUp = () => {
    const history = useHistory()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

    useEffect(() => {
        if (url) {
            uploadFields()
        }
    }, [url])

    const uploadProfilePic = () => {
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
    const uploadFields = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "enter valid email", classes: "#c62828 red darken-3" })
        }
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                password: password,
                email: email,
                pic: url
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    M.toast({ html: data.message, classes: "#388e3c green darken-2" })
                    history.push('/login')
                }
            }).catch(err => {
                console.log(err)
            })
    }
    const postData = () => {
        if (image) {
            uploadProfilePic()
        }
        else {
            uploadFields()
        }
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="file-field input-field">
                    <div className="btn #64b5f6 blue darken-2">
                        <span>Upload Image</span>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button className="btn waves-effect #64b5f6 blue darken-2" onClick={postData}>
                    signup
                </button>
                <h5><Link to="/login">Already have an account?</Link></h5>
            </div>
        </div >
    )
}

export default SignUp