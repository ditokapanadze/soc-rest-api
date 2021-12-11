import Topbar from "../../components/topbar/Tobar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import { Rightbar } from "../../components/rightbar/Rightbar";
import { useParams } from "react-router-dom";
import "./home.css";

export default function Home() {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      {id ? "" : <Topbar />}
      <div className={`homeContainer ${id ? "black" : ""} `}>
        {id ? "" : <Sidebar />}
        <Feed />
        {id ? "" : <Rightbar />}
      </div>
    </>
  );
}
