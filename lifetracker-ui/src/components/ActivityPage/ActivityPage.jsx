import AccessForbidden from "../AccessForbidden/AccessForbidden";
export default function ActivityPage() {
    var userAccess = false;
    
    let content = userAccess ? "u got access" : <AccessForbidden/>

    return (
        <div className="activity-page">
            {content}
        </div>
    )
}
