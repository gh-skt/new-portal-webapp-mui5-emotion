// import { useRouter } from "next/router";

// const Home = () => {
//   const router = useRouter();
//   typeof window !== "undefined" && router.push("./login");
//   return <div></div>;
// };

// export default Home;
import { useEffect } from "react";
import axios from "axios";
import { getSession } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "../components/common/auth/context/AuthContext";
import { routes } from "../components/common/routes/RoutesConfig";

const Home = (props) => {
  const router = useRouter();
  const { logIn } = useAuth();
  useEffect(() => {
    if (props.session != null && props.userAccessData != null) {
      logIn(props.session.user.email, props.userAccessData.data);
      const featureClaims = Object.keys(
        props.userAccessData.data?.authorities?.featureClaims || {
          NoRuleContext: "NoRuleContext",
        }
      )?.flatMap((x) => x.split(" ").join("").toLowerCase()) || [
        "norulecontext",
      ];
      let route = [
        ...routes,
        ...routes.find((x) => x.label === "administrator").routes,
      ];
      let authRoutes = featureClaims.filter((x) =>
        route.find((r) => r.path.endsWith(x))
      );
      router.push(
        `${router.locale !== "en-US" ? `/${router.locale}` : ""}${
          featureClaims.includes("dashboard")
            ? "/dashboard"
            : route.find((r) => r.path.endsWith(authRoutes[0]))?.path ||
              "norulecontext"
        }`
      );
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <Head>
      <title>Guardant Health</title>
      <link
        rel="icon"
        href="https://portal-sqa.guardanthealth.com/assets/favicon-204343dd7dfea0d717bb78198114a04d3083d814c5ba2ba70463bbb60e016c1d.ico"
      />
    </Head>
  );
};
export default Home;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  let userAccessData = null;
  const accessToken = context.req.cookies.access_token;

  try {
    if (session) {
      const { data } = await axios.get(
        "https://rmy2npd63l.execute-api.us-west-2.amazonaws.com/dev/api/v1/users/me",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      userAccessData = data;
    }
  } catch (error) {
    userAccessData = {};
  }
  return {
    props: { session, userAccessData },
  };
}
