export const AuthErrorMsg = {
  INTERNAL_SERVER_ERROR: "internal server error",
  ACCOUNT_BLOCKED: "Account is blocked",
  USER_NOT_FOUND: "user is not found",
  INVALID_ROLE: "Invalid role",
  NO_ACCESS_TOKEN: "Unauthorized access. Please provide a valid token OR LOGIN",
  NO_REFRESH_TOKEN: "Unauthorized access. Session verification required.",
  INVALID_ACCESS_TOKEN: "Unauthorized access. Please authenticate again.",
  INVALID_REFRESH_TOKEN: "Session verification failed. Please log in again.",
  ACCESS_TOKEN_EXPIRED: "Session expired. Refreshing authentication...",
  REFRESH_TOKEN_EXPIRED: "Session expired. Please log in again.",
  AUTHENTICATION_FAILED: "Authentication failed. Please try again later.",
  PERMISSION_DENIED: "You do not have permission to perform this action.",
  ACCESS_FORBIDDEN: "You do not have permission to perform this action.",
  TOKEN_EXPIRED_NAME: "TokenExpiredError",
  TOKEN_VERIFICATION_ERROR: "Token is not valid.It is verification error",
};


export const SERVER_ERROR = {
  UNKNOWN_ERROR : "unknown error",
  INTERNAL_SERVER_ERROR: "internal server error",
};

export const MESSAGES = {
  SEARCH_QUERY_REQUIRED: 'Query parameter "q" is required and must be a string',
  INVALID_PAGE_NUMBER: 'Page must be a positive number',
  INVALID_IMDB_ID: 'Valid "imdbID" (e.g., tt3896198) is required in request body',

  // Success Messages
  MOVIES_FOUND: 'Movies retrieved successfully',
  FAVORITES_RETRIEVED: 'Favorites retrieved successfully',
  FAVORITE_ADDED: 'Movie added to favorites',
  FAVORITE_REMOVED: 'Movie removed from favorites',

  // Error Messages
  NO_MOVIES_FOUND: 'No movies found for the given query',
  SEARCH_FAILED: 'Failed to search movies',
  FETCH_FAVORITES_FAILED: 'Failed to fetch favorites',
  TOGGLE_FAVORITE_FAILED: 'Failed to toggle favorite',
  FAILED_TO_CREATE_USER:"Failed to create user",
  RESET_TOKEN_REQUIRED: "Reset token is required",
  // General Messages
  EMAIL_REQUIRED: "Email is required",
  PASSWORD_REQUIRED: "Password is required",
  USERNAME_REQUIRED: "Username is required",
  OTP_REQUIRED: "OTP is required",
  NAME_REQUIRED: "Name and email are required",

  // Success Messages
  SIGNUP_SUCCESS: "Signup successful",
  OTP_SENT: "OTP sent successfully",
  USER_CREATED: "User created successfully",
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logout successful",
  REDIERCTING_OTP_PAGE: "Redirecting to OTP page",
  REDIERCTING_PASSWORD_RESET_PAGE: "Redirecting to password reset page",
  PASSWORD_RESET: "Password reset successful",
  GOOGLE_LOGIN_SUCCESS: "Google login successful",

  // Error Messages
  USER_ALREADY_EXISTS: "User already exists",
  FAILED_TO_CREATE_OTP: "Failed to create OTP",
  INCORRECT_OTP: "Incorrect OTP",
  USER_NOT_EXIST_WITH_THIS_EMAIL: "user is not exist with this email",
  INVALID_PASSWORD:"Invalid password",
  INVALID_CREDENTIALS: "Invalid email or password",
  ACCOUNT_BLOCKED: "Account is blocked",
  USER_NOT_FOUND: "User not found",
  TOKEN_INVALID: "Invalid or missing token",
  NOT_FOUND_STUDENT: "Student not found",
  STATUS_CHECK_FAILED: "Status check failed",
  FAILED_TO_RESET_PASSWORD: "Failed to reset password",
};

export const JwtErrorMsg = {
  JWT_NOT_FOUND: "JWT not found in the cookies",
  INVALID_JWT: "Invalid JWT",
  JWT_EXPIRATION: "2h" as const,
  JWT_REFRESH_EXPIRATION: "6h" as const,
};

export const EnvErrorMsg = {
  CONST_ENV: "",
  JWT_NOT_FOUND: "JWT secret not found in the env",
  NOT_FOUND: "Env not found",
  ADMIN_NOT_FOUND: "Environment variables for admin credentials not found",
};

export const UserErrorMessages = {
  TOKEN_INVALID: "Invalid or expired token.",
  USER_NOT_FOUND: "No user found with this email.",
};