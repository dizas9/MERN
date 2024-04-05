// import { useNavigate } from "react-router-dom";
import useIsAuth from "../hooks/AuthCheck";



export default function Home() {
  const { auth } = useIsAuth(" ");

  // const navigate = useNavigate();

  return (
    <>
      {auth && <div>
        <h1>Hello DashBoard</h1>
      </div>}
    </>
  );
}