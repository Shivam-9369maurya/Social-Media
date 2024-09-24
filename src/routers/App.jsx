import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import CreatePost from "../components/CreatePost";
import Postlist from "../components/Postlist";
import { useState } from "react";
import PostListProvider from "../store/Post-list-store";
import { Outlet } from "react-router-dom";

function App() {
  const [selectedTab, SetselectedTab] = useState("Home");
  return (
    <PostListProvider>
      <div className="Container">
        <Sidebar
          selectedTab={selectedTab}
          SetselectedTab={SetselectedTab}
        ></Sidebar>
        <div className="content">
          <Header></Header>
          <Outlet />
          <Footer></Footer>
        </div>
      </div>
    </PostListProvider>
  );
}

export default App;
