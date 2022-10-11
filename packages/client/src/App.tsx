import "./index.css";
import Layout from "./components/Layout/index";
import Header from "./components/Layout/Header";
import ChannelContent from "./components/organisms/ChannelContent";
import ServerList from "./components/organisms/ServerList";
import ChannelList from "./components/organisms/ChannelList";
import { useEffect, useState, useContext } from "react";
import {UserContext} from "./components/Layout";
import { ChannelItem } from "@chat-app-typescript/shared";

function App() {
  const [activeChannel, setActiveChannel] = useState<ChannelItem | null>(null);
  const [activeServer, setActiveServer] = useState<number>(1);
  const {user} = useContext(UserContext)

  return (
    <Layout>
      {/* <ServerList states={{activeServer, setActiveServer}}/> */}
      <ChannelList states={{activeChannel, setActiveChannel}} />
      <div style={{ height: "100%" }}>
        <Header activeChannel={activeChannel}/>
        <ChannelContent activeChannel={activeChannel}/>
      </div>
    </Layout>
  );
}

export default App;
