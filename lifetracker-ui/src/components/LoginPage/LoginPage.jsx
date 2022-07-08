import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import * as React from 'react'
export default function LoginPage({isLoggedIn, toggleLoginStatus, setUser}) {
    console.log(isLoggedIn)
    const [form, setForm] = React.useState({
        email: "",
        password: ""
      })

    const handleOnChange = (eve) => {
        let targetName = eve.target.name;
        let targetValue = eve.target.value;

        setForm((prevForm) => ({...prevForm, [targetName]: targetValue}))
    }

    const handleOnClick = async () => {
        try {const res = await axios.post(`http://localhost:3001/register/login`, form)
            console.log(res)
            setUser(res)
            toggleLoginStatus()
            navigate('/activity');
        } catch(error) {
            console.log(error)
        }
    }
    const navigate = useNavigate()
    React.useEffect(() => {
        if(isLoggedIn) {
            navigate('/activity');
        }},[]
    )

    return(
        <div className="login-page">
            Login
            <input type="text" name="email" placeholder='email' value={form.email} onChange={handleOnChange}/>
            <input type="text" name='password' placeholder="password" value={form.password} onChange={handleOnChange}/>
            <input type="button" name='login' value="Login" onClick={handleOnClick}/>
        </div>
    )
}