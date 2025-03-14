
import useOnline from "../utils/useOnline";

const About = () => {
  const online = useOnline();

  // Directly return the JSX based on the online status
  if (!online) {
    return <h1 className="text-center mt-4 font-bold text-zinc-400  text-2xl">Please Check Your Internet Connection</h1>;
  }

  return (
    <h1 className="text-center mt-4 font-bold text-orange-500 text-2xl">This is About Page</h1>
  );
};

export default About;
