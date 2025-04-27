 import React, { Children } from "react";
 import { useState,useEffect,useContext } from "react";

 const authContext = React.createContext() // crea un nuevo objeto de contexto 

 export function AuthProvider(props){
        const[authUser,setAuthUser]=useState(null)
        const[IsLoggedIn,setIslogedIn]=useState(null)


    const value={
        authUser,
        setAuthUser,
        IsLoggedIn,
        setIslogedIn
    }

    return 
    <authContext.Provider value={value}>{props.Children}</authContext.Provider>
 }