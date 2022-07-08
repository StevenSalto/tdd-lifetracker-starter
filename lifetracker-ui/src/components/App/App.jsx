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
import Create from "../Create/Create"
import axios from "axios"


export default function App() {
  const [user, setUser] = React.useState({})
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [posts, setPosts] = React.useState({})
  const [error, setError] = React.useState({})
  const [isFetching, setIsFetching] = React.useState(false)

  const toggleLoginStatus = () => {
    console.log(isLoggedIn, " curr")
    setIsLoggedIn((prevIsLoggedIn) => (!prevIsLoggedIn))
  }
  // React.useEffect(() => {
  //   const fetchPosts = async () => {
  //     setIsFetching(true)
// 
  //     try {
  //       const res = await axios.get("http://localhost:3001/posts")
  //       if (res?.data?.posts) {
  //         setError(null)
  //         setPosts(res.data.posts)
  //       }
  //     } catch(error) {
  //       console.log(error)
  //       const message = err?.response?.data?.message
  //       setError(message ?? String(error))
  //     } finally {
  //       setIsFetching(false)
  //     }
  //   }
  //   fetchPosts()
  // }, [])

  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <Navbar isLoggedIn={isLoggedIn} toggleLoginStatus={toggleLoginStatus}/>
          <Routes>
            <Route path="/" element={<LandingPage />}/>
            <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} toggleLoginStatus={toggleLoginStatus} user={user} setUser={setUser}/>}/>
            <Route path="/register" element={<RegistrationPage isLoggedIn={isLoggedIn} toggleLoginStatus={toggleLoginStatus} user={user} setUser={setUser}/>}/>
            <Route path="/activity" element={<ActivityPage isLoggedIn={isLoggedIn}/>}/>
            <Route path="/nutrition" element={<NutritionPage isLoggedIn={isLoggedIn} user={user}/>}/>
            <Route path='*' element={<NotFound />}/>
            <Route path="/create" element={<Create />}/>
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}
