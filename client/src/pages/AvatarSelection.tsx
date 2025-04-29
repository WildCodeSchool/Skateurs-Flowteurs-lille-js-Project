import styles from "./AvatarSelection.module.css"
import { useState } from "react";
import Login from "../components/Login"


export const Avatar = () => {
    const [profilePicture, setProfilePicture] = useState("https://static.vecteezy.com/system/resources/previews/020/911/740/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png");
    
    <Login />
    return (
        <>
            <h2>Séléction de votre avatar</h2>
            <div className={styles.selectorsListContainer}>
                <img src={profilePicture} />
                <ul>
                    <li><img src="./public/avatar1" /></li>
                    <li><img src="./public/avatar2" /></li>
                    <li><img src="./public/avatar3" /></li>
                    <li><img src="./public/avatar4" /></li>
                    <li><img src="./public/avatar5" /></li>
                    <li><img src="./public/avatar6" /></li>
                    <li><img src="./public/avatar7" /></li>
                    <li><img src="./public/avatar8" /></li>
                </ul>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <button>Valider</button>
            </div>
        </>
    )
}