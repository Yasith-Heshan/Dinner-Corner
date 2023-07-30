import {useContext, createContext, useState, useEffect} from "react";
import {signInWithPopup,signInWithRedirect,  signOut, onAuthStateChanged, GoogleAuthProvider} from 'firebase/auth'
import {auth} from '../firebase';


const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const [user, setUser] = useState(null);

    const googleSignIn = async () =>{
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    }

    const googleSignInWithRedirect = async ()=>{
        try {
            const provider = new GoogleAuthProvider();
            await signInWithRedirect(auth, provider);
        }catch (error){
        }

    }

    const logout = async ()=>{
        await signOut(auth);
    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
        return () => unsubscribe();

    }, [user]);


    return (
        <AuthContext.Provider value={{user,googleSignIn,googleSignInWithRedirect,logout}}>{children}</AuthContext.Provider>
    );
}

export const UserAuth = () =>{
    return useContext(AuthContext);
}