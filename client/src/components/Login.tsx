import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { ProfilePicture, User, useUser } from "../context/UserInfoContext";
import { ColorData } from "../data/Color";
import { profileData } from "../data/Picture";
import styles from "./Login.module.css";
import { ProgressBar } from "./ProgressBar";

const rootUrl = import.meta.env.VITE_ROOT_URL;

function Login() {
    const { setUser, user } = useUser();
    const [isVisible, setIsVisible] = useState(false);
    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    const handleClickValidate = () => {
        setIsVisible(!isVisible)

        const profilePictureIdRow = fetch(`${rootUrl}/api/profilePictures/:id`)

         fetch(`${rootUrl}/api/profilePictures`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user.id,
                img: user.profilePicture.img,
                class: user.profilePicture.class,
                id: profilePictureIdRow,
            }),
         });
    }

    const setUserBackgroundColor = (element: string) => {
        setUser({
            ...user,
            profilePicture: {
                ...user.profilePicture,
                class: element,
            },
        } as User);
    };

  const setUserProfilePicture = (element: string) => {
    setUser({
      ...user,
      profilePicture: {
        ...user?.profilePicture,
        img: element,
      },
    } as User);
  };

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const response = await fetch(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${tokenResponse.access_token}`,
                        },
                    }
                );

                const userInfo = await response.json();
                const userEmail = userInfo.email;

                const checkUser = await fetch(`${rootUrl}/api/users/${userEmail}`);

                let userData: User=user;
                userData.name = userInfo.name
                userData.email = userEmail
                userData.defaultPicture = userInfo.picture
                userData.xp = 0
                

        if (checkUser.status === 404) {
          const newUserId = await fetch(`${rootUrl}/api/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: userInfo.name,
              email: userInfo.email,
              xp: 0,
            }),
          });
            const userDataId = await newUserId.json();
            const profilePic: ProfilePicture = {
                img: null,
                class: null
            }
          const newProfilePicture = await fetch(
            `${rootUrl}/api/profilePictures`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  img: profilePic.img,
                  class: profilePic.class,
                user_id: userDataId.insertId,
              }),
            }
          );
            const response = await newProfilePicture.json();
            userData.id = userDataId.insertId
            userData.profilePicture = profilePic
            console.log("user data :", userData)
        } else {
            const retrieveUser = await checkUser.json();
            userData.id = retrieveUser.id
            userData.profilePicture.class = retrieveUser.class
            userData.profilePicture.img = retrieveUser.img
            userData.xp = retrieveUser.xp
        }

                setUser({
                    ...userData,
                    isConnected: true,
                    defaultPicture: userInfo.picture,
                });
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        },
        onError: (error) => console.log("Login Failed:", error),
    });
    console.log("user: ",user);
    if (!user.isConnected) {
        return (
            <div
                className={
                    user.isConnected
                        ? styles.connectedContainer
                        : styles.notConnectedContainer
                }
            >
                <h3>Se connecter via Google</h3>
                <button onClick={() => login()} className={styles.googleButton}>
                    <img
                        src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                        alt="google logo"
                    />
                </button>
            </div>
        );
    } else {
        return (
            <>
                {!isVisible ? (
                    <div>
                        <div className={styles.connectedProfileContainer}>
                            <h2>Mon Profil</h2>
                            <div className={styles.profileContainer}>
                                <img
                                    src={
                                        user?.profilePicture?.img
                                            ? user.profilePicture.img
                                            : user.defaultPicture
                                    }
                                    alt="default profile picture silhouette"
                                    className={user.profilePicture?.class as string}
                                />
                                <button className={styles.validateButton} onClick={handleClick}>
                                    Crée ton avatar
                                </button>
                            </div>
                            <ProgressBar />
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className={styles.avatarSelectionContainer}>
                            <h2>Séléction de votre avatar</h2>
                            <div className={styles.selectorListContainer}>
                                <img
                                    src={
                                        user.profilePicture?.img
                                            ? user.profilePicture.img
                                            : user.defaultPicture
                                    }
                                    className={user.profilePicture?.class as string}
                                />
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
                                    {ColorData.map((color) => (
                                        <li
                                            key={color.id}
                                            onClick={() => setUserBackgroundColor(color.class)}
                                        >
                                            {color.name}
                                        </li>
                                    ))}
                                </ul>
                                <button className={styles.validateButton} onClick={handleClickValidate}>
                                    Valider
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
}

export default Login;
