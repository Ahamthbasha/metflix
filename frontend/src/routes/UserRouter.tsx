import {Routes,Route} from 'react-router-dom'
import UserLayout from '../layouts/UserLayout'
import Home from '../pages/user/Home/Home'
import Favourites from '../pages/user/Favourites/Favourites'

const UserRouter = () => {
  return (
    <Routes>
      <Route element={<UserLayout/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/user/favourites' element={<Favourites/>}/>
      </Route>
    </Routes>
  )
}

export default UserRouter
