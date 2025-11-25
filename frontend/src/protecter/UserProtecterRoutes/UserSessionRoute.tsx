import {Navigate} from 'react-router-dom'
import { type ProtectedRouteProps } from '../../protecter/interface/sessionRouter'

const UserSessionRoute:React.FC<ProtectedRouteProps> = ({children}) => {
    const user = JSON.parse(localStorage.getItem('user') || 'null')

    if(user){
        return <Navigate to='/' replace />
    }

    return children
}

export default UserSessionRoute