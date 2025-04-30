import { useGoogleLogin } from '@react-oauth/google';
import { User, useUser } from '../context/UserInfoContext';
import styles from "./Login.module.css"
import { useState } from 'react';
import { profileData } from '../data/Picture';


function Login() {

    const { setUser, user } = useUser();
    const [isConnected, setIsConnected] = useState(false)
    const [isVisible, setIsVisible] = useState(false);
    const handleClick = () => {
        setIsVisible(!isVisible);
    };


    const setUserBackgroundColor = (element: string) => {
        setUser({
            ...user,
            profilePicture: {
                ...user.profilePicture,
                class: element,
            },
        } as User);
    }

    const setUserProfilePicture = (element: string) => {
        setUser({
            ...user,
            profilePicture: {
                ...user?.profilePicture,
                img: element,
            },
        } as User);

    }



    console.log(user)
    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            try {
                const response = await fetch(
                    'https://www.googleapis.com/oauth2/v3/userinfo',
                    { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
                );
                const userInfo = await response.json();
                setUser({
                    ...user,
                    name: userInfo.name,
                    email: userInfo.email,
                    defaultPicture: userInfo.picture,
                    isConnected: true,
                } as User);
                setIsConnected(true)
                console.log(userInfo)
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        },
        onError: error => console.log('Login Failed:', error),
    });

    if (!user.isConnected) {
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
            <>
                {!isVisible ?
                    <div>
                        <div className={styles.connectedProfileContainer}>
                            <h2>Mon Profil</h2>
                            <div className={styles.profileContainer}>
                                <img src={user?.profilePicture?.img ? user.profilePicture.img : user.defaultPicture} alt="default profile picture silhouette" className={user.profilePicture.class } />
                                <button className={styles.validateButton} onClick={handleClick}>Crée ton avatar</button>
                            </div>
                        </div>
                    </div> :

                    <div>
                        <div className={styles.avatarSelectionContainer}>
                            <h2>Séléction de votre avatar</h2>
                            <div className={styles.selectorListContainer}>
                                <img src={user.profilePicture.img ? user.profilePicture.img : user.defaultPicture} className={user.profilePicture.class} />
                                <ul className={styles.avatarList}>
                                    {profileData.map((profile) => (
                                        <li key={profile.id}>
                                            <img
                                                src={profile.name}
                                                onClick={() => setUserProfilePicture(profile.name)}
                                                alt={`Avatar ${profile.id}`}
                                            />
                                        </li>
                                    ))}
                                </ul>
                                <ul className={styles.colorList}>
                                    <li onClick={() => setUserBackgroundColor("backgroundRed")}>Rouge</li>
                                    <li onClick={() => setUserBackgroundColor("backgroundBlue")}>Bleu</li>
                                    <li onClick={() => setUserBackgroundColor("backgroundGreen")}>Vert</li>
                                    <li onClick={() => setUserBackgroundColor("backgroundYellow")}>Jaune</li>
                                </ul>
                                <button className={styles.validateButton} onClick={handleClick}>Valider</button>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }
}

export default Login;