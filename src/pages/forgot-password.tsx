import React, { useState } from "react";
import {
  Alert,
  Typography,
  TextField,
  Grid,
  Container,
  CardContent,
  Card,
  Box,
  Button,
  Divider,
} from "@mui/material";
import axios from "axios";
import Head from "next/head";
import styled, { StyledComponent } from "@emotion/styled";
import { Theme } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { config } from "../config/config";

const ForgotPasswordWrapper = styled(Box)((theme: any) => {
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
      margin: theme.spacing(3),
    },
    "& .submit": {
      margin: theme.spacing(3, 0, 2),
      background: "linear-gradient(#007dc1,#0073b2)",
      borderColor: "#004b75 #004b75 #00456a",
      boxShadow: "0 1px 0 rgba(0,0,0,.15),inset 0 1px 0 0 hsla(0,0%,100%,.1)",
      height: "50px",
      textTransform: "capitalize",
    },
  };
});
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const isEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
    if (email === "") {
      setErrors("This field cannot be left blank");
      return;
    }
    if (!isEmail.test(email)) {
      setErrors("Please enter valid email");
      return;
    }
    // const isGuardant = email.includes('guardant');
    const isGuardant = true;
    if (isGuardant) {
      try {
        const url = config.forgot_password_endpoint;
        const { data } = await axios(
          `https://guardant.oktapreview.com/api/v1/authn/recovery/password`,
          {
            method: "POST",
            data: {
              username: email,
              factorType: "EMAIL",
            },
            headers: {
              accept: "application/json",
            },
          }
        );
        if (data) {
          router.push("/recovery-emailed");
        }
      } catch (e) {
        setErrorMsg(
          "We found some errors. Please review the form and make corrections."
        );
      }
    } else {
      setErrorMsg(
        "We found some errors. Please review the form and make corrections."
      );
    }
  };
  return (
    <ForgotPasswordWrapper>
      <Container className="root" component="main" maxWidth="xs">
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
              <Typography variant="subtitle1">Reset Password</Typography>
              {errorMsg && (
                <Alert
                  variant="outlined"
                  severity="error"
                  className="errorAlert"
                >
                  {errorMsg}
                </Alert>
              )}
              <form
                className="form"
                noValidate
                onSubmit={(e) => handleResetPassword(e)}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Email"
                  error={errors !== ""}
                  helperText={errors}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors("");
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                >
                  Reset via Email
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/login">
                      <a> Back to Sign In</a>
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </CardContent>
        </Card>
      </Container>
    </ForgotPasswordWrapper>
  );
};
export default ForgotPassword;
