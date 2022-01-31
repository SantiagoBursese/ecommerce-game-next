import React, {useMemo, useEffect, useState} from "react"
import {ToastContainer} from "react-toastify"
import AuthContext from "../context/AuthContext";
import jwtDecode from "jwt-decode";
import { setToken, getToken, removeToken} from "../api/token";
import { useRouter } from "next/router";

import "../scss/global.scss"
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }) {

  const [auth, setauth] = useState(undefined)
  const [realoadUser, setrealoadUser] = useState(false)
  const router = useRouter()

  useEffect(() => {  
    const token = getToken()
    if(token){
      setauth({
        token,
        idUser: jwtDecode(token).id
      })
    }else{
      setauth(null)
    }
    setrealoadUser(false)
  }, [realoadUser])

  const login =(token) => {
    setToken(token)
    setauth({
      token,
      idUser: jwtDecode(token).id
    })

  }

  const logout = () =>{
    if(auth){
      removeToken()
      setauth(null)
      router.push("/")
    }
  }
  
  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setrealoadUser,
    }),
    [auth]
  )

  if(auth == undefined) return null
  return (
    <AuthContext.Provider value={authData}>
      <Component {...pageProps}  />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover></ToastContainer>  
    </AuthContext.Provider>)
}

