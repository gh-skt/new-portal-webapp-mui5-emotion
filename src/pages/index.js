import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  typeof window !== "undefined" && router.push("./login");
  return <div></div>;
};

export default Home;
