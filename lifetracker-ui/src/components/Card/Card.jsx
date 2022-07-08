import "./Card.css"

export default function Card({ caption, value }) {
    return (
        <div className="card">
            <div>{caption}</div>
            <div>{value}</div>
        </div>
    )
}