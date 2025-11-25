import {Routes,Route} from 'react-router-dom'
import UserSessionRoute from '../protecter/UserProtecterRoutes/UserSessionRoute'
import SignUp from '../pages/user/Auth/SignUp'
import LoginPage from '../pages/user/Auth/Login'
import OTPVerification from '../pages/user/Auth/OTPVerfication'
import ForgotPassword from '../pages/user/Auth/ForgotPassword'
import ResetVerificationOTP from '../pages/user/Auth/ResetVerificationOtp'
import ResetPassword from '../pages/user/Auth/ResetPassword'
import UserLayout from '../layouts/UserLayout'
import Home from '../pages/user/Home/Home'

const UserRouter = () => {
  return (
    <Routes>
      <Route element={<UserLayout/>}>
        <Route path='/' element={<Home/>}/>
        <Route path="/user/signUp" element={<UserSessionRoute><SignUp/></UserSessionRoute>}/>
        <Route path='/user/login' element={<UserSessionRoute><LoginPage/></UserSessionRoute>}/>
        <Route path="/user/verifyOtp" element={<UserSessionRoute><OTPVerification/></UserSessionRoute>}/>

        <Route path='/user/verifyEmail' element={<ForgotPassword/>} />
        <Route path='/user/forgotPasswordOtp' element={<ResetVerificationOTP/>}/>
        <Route path='/user/resetPassword' element={<ResetPassword/>}/>
      </Route>
    </Routes>
  )
}

export default UserRouter
