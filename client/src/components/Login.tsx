import { useGoogleLogin } from '@react-oauth/google';
import { useUser } from '../context/UserInfoContext';
import styles from "./Login.module.css"
import { Link } from "react-router"
import { useState } from 'react';


function Login() {

    const { setUser, user } = useUser();
    const [isConnected, setIsConnected] = useState(false)
    const [isEmailVerified, setIsEmailVerified] = useState(false)
    const [profilePicture, setProfilePicture] = useState("https://static.vecteezy.com/system/resources/previews/020/911/740/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png");


    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            try {
                const response = await fetch(
                    'https://www.googleapis.com/oauth2/v3/userinfo',
                    { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
                );
                const userInfo = await response.json();
                setUser({
                    name: userInfo.name,
                    email: userInfo.email,
                    picture: userInfo.picture,
                });
                setIsEmailVerified(true)
                setIsConnected(true)
                setProfilePicture(userInfo.picture)
                console.log(userInfo)
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        },
        onError: error => console.log('Login Failed:', error),
    });

    if (!user) {
        return (
            <div className={isConnected ? styles.connectedContainer : styles.notConnectedContainer} >
                <h3>Se connecter via Google</h3>
                <button onClick={() => login()} className={styles.googleButton}>
                    <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="google logo" />
                </button>
            </div>
        );
    }
    else {

        return (
            <div className={styles.connectedProfileContainer}>
                <h2>Mon Profil</h2>
                <div className={styles.profileContainer}>
                    <img src={user?.picture ? user.picture : profilePicture} alt="default profile picture silhouette" />
                    <button>Crée ton avatar</button>
                </div>
            </div>
        )
    }
}

export default Login;