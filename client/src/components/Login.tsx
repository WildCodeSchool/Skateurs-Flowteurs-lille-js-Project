import { useGoogleLogin } from "@react-oauth/google";
import { useUser } from "../context/UserInfoContext";
import styles from "./Login.module.css";

function Login() {
  const { setUser } = useUser();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );
        const userInfo = await response.json();
        setUser({
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
          xp: userInfo.xp | 0,
          validatedTricks: [],
        });
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <button onClick={() => login()} className={styles.googleButton}>
      <img
        src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
        alt="google logo"
      />
    </button>
  );
}

export default Login;
