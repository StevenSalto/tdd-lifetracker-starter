import axios from "axios";
import * as React from "react"
import {Link} from "react-router-dom"
import AccessForbidden from "../AccessForbidden/AccessForbidden"
import Card from "../Card/Card"

export default function NutritionPage({isLoggedIn, user}) {
    //console.log(user)
    const payload = {}
    const [nutritionArray, setNutritionArray] = React.useState([])

    const getNutritionData= async() => {
        const res= await axios.get("http://localhost:3001/register/nutrition-list")
        setNutritionArray(res.data.nutritionList)
    }


    React.useEffect(() => {
        getNutritionData()
    }, [])


    const content = isLoggedIn ? (
        true ? (<>
        <Link to="/create">Add a Nutrition Card</Link>
            {nutritionArray.map((obj) => (<Card caption={obj.category} value={obj.calories}/>))}
        </>) : (
            <>
            <div>Nothing Yet</div>
            <Link to="/create">Add a Nutrition Card</Link>
            </>)
    ) : (<AccessForbidden/>)

    console.log("aray", nutritionArray)
    return (
        <div className="activity-page">
            {content}
        </div>
    )
}