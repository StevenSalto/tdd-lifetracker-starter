import "./LandingPage.css"
export default function LandingPage () {
    return (
        <div className="landing-page">
            <div className="hero">
                <img className="hero-img" src="http://codepath-lifetracker.surge.sh/static/media/smartwatch-screen-digital-device.e2983a85.svg"/>
                <h1 className="cta"> Life Tracker </h1>
                <p> Hello, I'm alive </p>
            </div>

            <div className="features">
                <div>Nutrition <img src="http://codepath-lifetracker.surge.sh/static/media/icons8-porridge-100.132d2715.svg"/></div>
            </div>
        </div>
    )
}