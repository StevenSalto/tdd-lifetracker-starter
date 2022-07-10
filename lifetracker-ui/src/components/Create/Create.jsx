import * as React from "react"
import axios from "axios"
import {useNavigate} from 'react-router-dom'

export default function Create() {
    const [form, setForm] = React.useState({
        user_id: "4",
        name: "",
        category: "",
        quantity: "",
        calories: "",
        image_url: ""
      })

    const handleOnChange = (eve) => {
        let targetName = eve.target.name;
        let targetValue = eve.target.value;

        setForm((prevForm) => ({...prevForm, [targetName]: targetValue}))

    }
    const navigate = useNavigate()
    const handleOnSubmit = async () => {
        try {
            const res = await axios.post(`http://localhost:3001/register/nutrition`, form)
            navigate('/nutrition')
        } catch(error) {
            console.log(error)
        }
    }

    const name = 
        <>
            <label htmlFor="name">Name</label>
            <br />
            <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleOnChange}/>
            <br />
        </>
    const category = 
        <>
            <label htmlFor="category">Category</label>
            <br />
            <input name="category" type="text" placeholder="Category"value={form.category} onChange={handleOnChange}/>
            <br />
        </>
    const quantity = 
        <>
            <label htmlFor="quantity">Quantity</label>
            <br />
            <input name="quantity" type="number" placeholder="Quantity" value={form.quantity}  onChange={handleOnChange}/>
            <br />
        </>
    const calories = 
        <>
            <label htmlFor="calories">Calories</label>
            <br />
            <input name="calories" type="number" placeholder="Calories" value={form.calories} onChange={handleOnChange}/>
            <br />
        </>
    const image_url = 
        <>
            <label htmlFor="image_url">Image Url</label>
            <br />
            <input name="image_url" type="text" placeholder="URL" value={form.image_url} onChange={handleOnChange}/>
            <br />
        </>

    const content = false
    return (
        <div>
            {name}
            {category}
            {quantity}
            {calories}
            {image_url}
            <input type="button" name="submit" value="create nut" onClick={handleOnSubmit}/>

        </div>

    )
}