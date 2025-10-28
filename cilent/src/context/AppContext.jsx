import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();//create a context
export const AppContextProvider =({children})=>{ //provider function

    const navigate = useNavigate();
    const [user, setUser] = useState(false)// user state is taken from any component
    
    const value = {navigate,user,setUser}// value is taken from any component

    return <AppContext.Provider value={value}> 
        {children}
    </AppContext.Provider>

}

export const useAppContext = () => {
    return useContext(AppContext)
}