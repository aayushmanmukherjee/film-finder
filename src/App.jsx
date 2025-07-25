import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import List from "./pages/List"
import Search from "./pages/Search"
import Director from "./pages/Director"
import Movie from "./pages/Movie"
import Actor from "./pages/Actor"
import Notfound from "./pages/Notfound"


function App() {

  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/list" element={<List/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/director/:id" element={<Director />} />
        <Route path="/movie" element={<Movie/>}/>
        <Route path="/actor/:id" element={<Actor />} />
        <Route path="*" element={<Notfound/>}/>
      </Routes>
    </div>
  )
}

export default App
