const userAuthenticationRoutes = {
    userSignUp : "/api/user/signUp",
    userResendOtp:"/api/user/resendOtp",
    userVerifyOtp:"/api/user/createUser",
    userLogin:"/api/user/login",
    userLogout:"/api/user/logout",
    userVerifyEmail:"/api/user/verifyEmail",
    userVerifyResetOtp:"/api/user/verifyResetOtp",
    userForgotResendOtp:"/api/user/forgotResendOtp",
    userResetPassword:"/api/user/resetPassword",
    userGoogleLogin:'/api/user/googleLogin',
}




const movieRoutes = {
    getAllMovies : "/api/movies/search",
    getPopularMovies: '/api/movies/popular',
    getFavouriteMovies : "/api/movies/favourites",
    toggleFavouriteMovie : "/api/movies/toggleFavourite",
}
export default {
    userAuthenticationRoutes,
    movieRoutes
};