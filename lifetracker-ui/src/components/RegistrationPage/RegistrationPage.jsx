import axios from "axios";
import * as React from "react"
import {useNavigate} from 'react-router-dom'

export default function RegistrationPage({isLoggedIn, toggleLoginStatus, setUser}) {
    const [form, setForm] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: ""
      })

    const handleOnChange = (eve) => {
        let targetName = eve.target.name;
        let targetValue = eve.target.value;

        setForm((prevForm) => ({...prevForm, [targetName]: targetValue}))
    }
    const navigate = useNavigate()
    const handleOnSubmit = async () => {
        try {const res = await axios.post(`http://localhost:3001/register/user`, form)
            console.log(res)
            setUser(res)
            toggleLoginStatus()
            navigate('/activity');
        }
        catch(error) {
            console.log(error)
        }
    }

    return (
        <div>RegistrationPage
            <input type="text" name="firstName" placeholder="first_name" value={form.firstName} onChange={handleOnChange}/>
            <input type="text" name="lastName" placeholder="last_name" value={form.lastName} onChange={handleOnChange}/>
            <input type="text" name="email" placeholder="email" value={form.email} onChange={handleOnChange}/>
            <input type="text" name="username" placeholder="username" value={form.username} onChange={handleOnChange}/>
            <input type="text" name="password" placeholder="password" value={form.password} onChange={handleOnChange}/>
            <input type="button" name="submit" value="create account" onClick={handleOnSubmit}/>
        </div>
    )
}