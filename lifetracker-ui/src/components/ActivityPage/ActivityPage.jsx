import axios from "axios"
import * as React from "react"
import {Link} from "react-router-dom"
import Card from "../Card/Card"
import AccessForbidden from "../AccessForbidden/AccessForbidden";
export default function ActivityPage({isLoggedIn}) {
    const [averageCalories, setAverageCalories] = React.useState(0);

    const handleSetAverageCalories = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/register/nutrition-list`)
            setAverageCalories(3000)
        } catch(error) {
            console.log(error)
        }
    }

    let content = isLoggedIn ? (
        <>
            <div>
                <Link to="/create">Add Exercise</Link>
                <button>Add Sleep</button>
                <button>Add Calories</button>
            </div>
            <Card caption={"Total Exercise Minutes: "} value={averageCalories}/>
            <Card caption={"Average Sleep Hours: "} value={0}/>
            <Card caption={"Average Daily Calories: "} value={0}/>
        </>
    ) : (<AccessForbidden/>)



    return (
        <div className="activity-page">
            {content}
        </div>
    )
}
