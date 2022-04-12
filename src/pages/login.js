import { useState } from "react";
import {
  Divider,
  Avatar,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Switch,
  Box,
  Alert,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PersonIcon from "@mui/icons-material/Person";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const LoginWrapper = styled(Box)((props) => {
  const { theme } = props;
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
    "& .submit": {
      margin: theme.spacing(3, 0, 2),
      background: "linear-gradient(#007dc1,#0073b2)",
      borderColor: "#004b75 #004b75 #00456a",
      boxShadow: "0 1px 0 rgba(0,0,0,.15),inset 0 1px 0 0 hsla(0,0%,100%,.1)",
      height: "50px",
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

const Login = ({ toggleTheme, themeMode }) => {
  console.log("$$$$$$$$toggleTheme,themeMode**********");
  console.log(toggleTheme, themeMode);
  const [themeSwitch, setThemeSwitch] = useState(themeMode === "dark");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [logInErrorMessage, setLogInErrorMessage] = useState("");
  const [remember, setRemember] = useState(false);
  const [startSignIn, setStartSignIn] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    router.push({
      pathname: '/dashboard',
      query: {status: 'warning'}
    })
  };

  const handleToggle = (e) => {
    setThemeSwitch(e.target.checked);
    toggleTheme();
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
              <span>Hello world</span>
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={startSignIn}
                  className="submit"
                >
                  Sign In
                </Button>
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
