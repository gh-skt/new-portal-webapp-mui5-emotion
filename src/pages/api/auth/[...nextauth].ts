import axios from "axios";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.Credentials({
      name: "Okta-credentials",
      id: "okta",
      // @ts-ignore
      async authorize({ email, password }) {
        try {
          const { data } = await axios(
            "https://guardant.oktapreview.com/api/v1/authn",
            {
              method: "POST",
              data: {
                username: email,
                password,
                options: {
                  multiOptionalFactorEnroll: true,
                  warnBeforePasswordExpired: true,
                },
              },
              headers: {
                accept: "application/json",
              },
            }
          );
          const user = data._embedded.user.profile;
          if (user) {
            return {
              id: data._embedded.user.id,
              sessionToken: data.sessionToken,
              email: user.login,
              name: user.firstName + user.lastName,
            };
          }
        } catch (e) {
          const errorMessage = e.response.data.errorSummary;
          throw new Error(errorMessage);
        }
      },
    }),
    Providers.Credentials({
      name: "credentials",
      id: "custom-credentials",
      async authorize(credentials: Record<never, string>) {
        // @ts-ignore
        const { password, email } = credentials;
        // @ts-ignore
        const fetchUser = await axios.post("https://reqres.in/api/login", {
          email: "eve.holt@reqres.in",
          password: "cityslicka",
        });
        // const {
        //       accessToken,
        //       emailId,
        //       id,
        //       userName,
        // } = fetchUser;
        if (!fetchUser) {
          throw new Error("User Unauthorized!");
        }
        return {
          email: "eve.holt@reqres.in",
          name: "user",
          // id: id,
          // userName: userName,
          // emailId: emailId,
          // accessToken: accessToken
        };
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  pages: {
    error: "/login",
  },
  protection: "pkce",
  callbacks: {
    async signIn(user, account, profile) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      }
      return false;
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (user) {
        token.sessionToken = user.sessionToken;
        token.id = user.id;
      }
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session(session, token) {
      session.sessionToken = token.sessionToken;
      session.id = token.id;
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
export default (req, res) => NextAuth(req, res, options);
