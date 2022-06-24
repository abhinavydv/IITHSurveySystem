import { useState } from "react";

const LoginPage = () => {
    const [uid, setUid] = useState("");
    const [passwd, setPassword] = useState("");
    const login = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/login',{
            uid: uid,
            passwd: passwd
        });
        history("/")
    }

    return (
        <div>
            <form onSubmit={login}>

            </form>
        </div>
    )
}