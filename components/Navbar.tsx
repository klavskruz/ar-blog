import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { auth, googleAuthProvider } from "../lib/firebase";

// Top navbar
export default function Navbar(){
    const {user, username} = useContext(UserContext);

    function SignInButton(){
        const signInWithGoogle = async () => {
            await auth.signInWithPopup(googleAuthProvider);
        }
        return (
            <button className="btn-google" onClick={signInWithGoogle}>
                Sign In With Google
            </button>
        )

    }
    function SignOutButton(){
        return <button onClick={() => auth.signOut()} >Sign Out</button> 
    }

    return(
        <nav className="navbar">
            <ul>
                <li className="push-left">
                    <Link href="/">
                        <button className="btn-logo">FEED</button>
                    </Link>
                </li>
                {username && (
                    <>
                    <li>
                    <Link href="/admin">
                        <button className="btn-blue">Write Posts</button>
                    </Link>
                    </li>
                    <li className="push-left">
                    <Link href={`/${username}`}>
                        <img src={user?.photoURL}/>
                    </Link>
                    </li>
                    <li>
                    <SignOutButton />
                    </li>
                    </>
                )}

                {!username && (
                    <li>
                        <SignInButton />
                    </li>
                )}
            </ul>
        </nav>
    )
}