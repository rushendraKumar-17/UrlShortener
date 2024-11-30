import { createContext,useState } from "react";

const AppContext = createContext();

export const AppProvider = ({children})=>{
    const [user,setUser] = useState(null);
    return (
        <AppContext.Provider value = {{user,setUser}}>
            {children}
        </AppContext.Provider>
    )
}
export default AppContext;