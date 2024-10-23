import { createContext, useEffect, useState } from "react";
import {  createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from "./firebase.config";
import useAxiosSecure from "../hooks/useAxiosSecure";





export const AuthContext=createContext(null)
const auth=getAuth(app)


const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const axiosSecure=useAxiosSecure()

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

const logOut = async() => {
    setLoading(true)
    // await axios.get(`/logout`,{
    //   withCredentials:true
    // })
    return signOut(auth)
}

const updateUserProfile = (name, photo) => {
  return updateProfile(auth.currentUser, {
    displayName: name,
    photoURL: photo,
  })
}


  // save user
  const saveUser = async user => {
    const currentUser = {
      email: user?.email,
      name:user?.displayName,
      role: 'user',
    }
    const { data } = await axiosSecure.put('/users',
      currentUser
    )
    return data
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      if (currentUser) {
        // getToken(currentUser.email)
        saveUser(currentUser)
      }
      setLoading(false)
    })
    return () => {
      return unsubscribe()
    }
  }, [])

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    
  }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;