import { createContext,useState } from "react";
import { getme } from "./services/auth.api.js";

export const AuthContext=createContext()

export const Authprovider=({children})=>{

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    
    

    return(
        <AuthContext.Provider value={{user,setUser,loading,setLoading}}>

        {children}
        </AuthContext.Provider>
    )
}