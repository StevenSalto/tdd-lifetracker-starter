import * as React from "react"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import LandingPage from "../LandingPage/LandingPage"
import LoginPage from "../LoginPage/LoginPage"
import RegistrationPage from "../RegistrationPage/RegistrationPage"
import ActivityPage from "../ActivityPage/ActivityPage"
import NutritionPage from "../NutritionPage/NutritionPage"
import NotFound from "../NotFound/NotFound"
import axios from "axios"


export default function App() {
  const [user, setUser] = React.useState({})
  const [posts, setPosts] = React.useState({})
  const [error, setError] = React.useState({})
  const [isFetching, setIsFetching] = React.useState(false)

  React.useEffect(() => {
    const fetchPosts = async () => {
      setIsFetching(true)

      try {
        const res = await axios.get("http://localhost:3001/posts")
        if (res?.data?.posts) {
          setError(null)
          setPosts(res.data.posts)
        }
      } catch(error) {
        console.log(error)
        const message = err?.response?.data?.message
        setError(message ?? String(error))
      } finally {
        setIsFetching(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/register" element={<RegistrationPage />}/>
            <Route path="/activity" element={<ActivityPage />}/>
            <Route path="/nutrition" element={<NutritionPage />}/>
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}
