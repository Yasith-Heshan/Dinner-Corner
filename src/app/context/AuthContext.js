import {useContext, createContext, useState, useEffect} from "react";
import {signInWithPopup,signInWithRedirect,  signOut, onAuthStateChanged, GoogleAuthProvider} from 'firebase/auth'
import {auth} from '../firebase';


const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const googleSignIn = async () =>{
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    }

    const googleSignInWithRedirect = async ()=>{
        try {
            const provider = new GoogleAuthProvider();
            await signInWithRedirect(auth, provider);
        }catch (error){
            console.error(error);
        }

    }

    const logout = async ()=>{
        localStorage.removeItem('user');
        await signOut(auth);
    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            localStorage.setItem("user",JSON.stringify(currentUser));
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