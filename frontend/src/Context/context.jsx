import { createContext,useState } from "react";

const AppContext = createContext();

export const AppProvider = ({children})=>{
    const [user,setUser] = useState(null);
    const [logged,setLogged] = useState(false);
    return (
        <AppContext.Provider value = {{user,setUser,logged,setLogged}}>
            {children}
        </AppContext.Provider>
    )
}
export default AppContext;