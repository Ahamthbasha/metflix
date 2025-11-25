export type Login = {
    email : string,
    password : string,
    role:string
}

export type signUp = {
    username : string,
    email : string,
    password : string,
    confirmPassword : string
}

export interface DecodedGoogleCredential {
  name: string;
  email: string;
  picture: string;
  role:string;
}

export interface userData{
    username : string,
    email:string,
    password : string
}