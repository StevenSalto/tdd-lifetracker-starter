import axios from "axios";
import AccessForbidden from "../AccessForbidden/AccessForbidden";

export default function NutritionPage({isLoggedIn, user}) {
    console.log(user)

    const content = isLoggedIn ? (
        <>
            <div>Nothing Yet</div>
            <button>Add a Nutrition Card</button>
        </>
    ) : (<AccessForbidden/>)

    return (
        <div className="activity-page">
            {content}
        </div>
    )
}