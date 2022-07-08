import axios from "axios";
import AccessForbidden from "../AccessForbidden/AccessForbidden";
export default function ActivityPage({isLoggedIn}) {
    
    let content = isLoggedIn ? (
        <>
            <button>Add Exercise</button>
            <button>Add Sleep</button>
            <button>Add Calories</button>
            <div>Total Exercise Minutes <span>0</span></div>
            <div>Avg Sleep Hours <span>0</span></div>
            <div>Avg Daily Calories <span>0</span></div>
        </>
    ) : (<AccessForbidden/>)


    return (
        <div className="activity-page">
            {content}
        </div>
    )
}
