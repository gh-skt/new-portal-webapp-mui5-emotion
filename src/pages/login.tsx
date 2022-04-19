import { useState } from "react";
import {
  Divider,
  Avatar,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Box,
  Typography,
  Switch,
  Alert,
} from "@mui/material";
import GHButton from "../components/common/UI/GHButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PersonIcon from "@mui/icons-material/Person";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/client";
import Cookies from "js-cookie";
import { config } from "../config/config";

const LoginWrapper = styled(Box)(({ theme }: any) => {
  return {
    "& .root": {
      marginTop: theme.spacing(10),
    },
    "& .paper": {
      marginTop: theme.spacing(3),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    "& .avatar": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      backgroundColor: theme.palette.error.main,
    },
    "& .form": {
      width: "100%",
      marginTop: theme.spacing(1),
    },
    "& .errorAlert": {
      width: "100%",
      margin: theme.spacing(3),
    },
    "& .divider": {
      width: "100%",
      height: "0.1rem",
      margin: theme.spacing(1),
    },
  };
});

const Login = (props) => {
  console.log("Login props****", props);
  const { toggleTheme, themeMode } = props;
  const [themeSwitch, setThemeSwitch] = useState(themeMode === "dark");
  const userName = Cookies.get("user") || "";
  const [email, setEmail] = useState(userName);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [logInErrorMessage, setLogInErrorMessage] = useState("");
  const [remember, setRemember] = useState(false);
  const [startSignIn, setStartSignIn] = useState(false);
  const router = useRouter();

  const handleToggle = (e) => {
    setThemeSwitch(e.target.checked);
    toggleTheme();
  };

  const generateRandomString = () => {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    for (let i = 0; i < 28; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("i am clicked ****** ❤️❤️❤️❤️❤️❤️ handleLogin");
    setStartSignIn(true);
    if (remember) {
      Cookies.set("user", email, { expires: 1 });
    } else {
      Cookies.remove("user");
    }
    console.log("step 6 ****** ❤️❤️❤️❤️❤️❤️ handleLogin");
    const isEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
    console.log("email", email);
    if (email === "" || !isEmail.test(email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Please enter valid username",
      }));
      setStartSignIn(false);
      return;
    }
    console.log("step 5 ****** ❤️❤️❤️❤️❤️❤️ handleLogin");
    if (password === "") {
      setErrors((prevState) => ({
        ...prevState,
        password: "Please enter password",
      }));
      setStartSignIn(false);
      return;
    }
    // we will remove below comment after backend implementation done for external users
    // const isGuardant = email.includes('guardant');
    const isGuardant = true;
    console.log("step 1 ****** ❤️❤️❤️❤️❤️❤️ handleLogin");
    let result: any;
    if (isGuardant) {
      result = await signIn("okta", {
        email,
        password,
        callbackUrl: window.location.origin,
        redirect: false,
      });
    } else {
      result = await signIn("custom-credentials", {
        email,
        password,
        callbackUrl: window.location.origin,
        redirect: false,
      });
    }
    console.log("step 2 ****** ❤️❤️❤️❤️❤️❤️ handleLogin");
    if (result?.error) {
      setStartSignIn(false);
      setLogInErrorMessage("Unable to sign in");
    }
    if (result.url) {
      console.log("url ****** ❤️❤️❤️❤️❤️❤️ handleLogin");
      if (isGuardant) {
        const session = await getSession().then(
          (session) => session,
          (err) => console.log(err)
        );
        if (session) {
          const sessionToken = session && session.sessionToken;
          const state = generateRandomString();
          const query: URLSearchParams = new URLSearchParams();
          query.set("client_id", encodeURIComponent(config.client_id));
          query.set("response_type", "code");
          query.set("state", encodeURIComponent(state));
          // @ts-ignore
          query.set("sessionToken", sessionToken);
          const authURL = `${config.authorization_endpoint}?redirect_uri=${
            config.redirect_uri
          }&scope=${config.requested_scopes}&${query.toString()}`;
          await router.push(authURL);
        }
      } else {
        await router.push(result.url);
      }
    }
  };

  return (
    <LoginWrapper>
      <Container component="main" maxWidth="xs" className="root">
        <Head>
          <title>Guardant Health</title>
          <link
            rel="icon"
            href="https://portal-sqa.guardanthealth.com/assets/favicon-204343dd7dfea0d717bb78198114a04d3083d814c5ba2ba70463bbb60e016c1d.ico"
          />
        </Head>
        <Card>
          <CardContent>
            <div className="paper">
              <Image
                src="/guardant-logo-with-text-564a398b2f545f7fb2a1c9e82542da7704e6d255991469e9806fb7147aa34ce6.svg"
                alt="Guardant Logo"
                width={200}
                height={40}
              />
              <Divider variant="fullWidth" className="divider" />
              <Avatar className="avatar">
                <PersonIcon />
              </Avatar>
              <Typography variant="button">Sign In</Typography>
              {logInErrorMessage && (
                <Alert
                  variant="outlined"
                  severity="error"
                  className="errorAlert"
                >
                  {logInErrorMessage}
                </Alert>
              )}

              <form
                className="form"
                noValidate
                onSubmit={(e) => handleLogin(e)}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  data-testid="username"
                  label="Username"
                  defaultValue={email}
                  autoComplete="email"
                  error={errors.email !== ""}
                  helperText={errors.email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prevState) => ({
                      ...prevState,
                      email: "",
                    }));
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  data-testid="password"
                  helperText={errors.password}
                  error={errors.password !== ""}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prevState) => ({
                      ...prevState,
                      password: "",
                    }));
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      onChange={() => setRemember(!remember)}
                    />
                  }
                  label="Remember me"
                />
                <GHButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  data-testid="signIn"
                  disabled={startSignIn}
                  height="50px"
                >
                  {" "}
                  Sign In
                </GHButton>
                <Grid container>
                  <Grid item xs>
                    <Link href="/forgot-password">
                      <a href="#"> Forgot password?</a>
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <FormControlLabel
              control={
                <Switch
                  checked={themeSwitch}
                  onChange={handleToggle}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={
                themeMode === "dark" ? <DarkModeIcon /> : <LightModeIcon />
              }
            />
          </CardContent>
        </Card>
      </Container>
    </LoginWrapper>
  );
};
export default Login;
