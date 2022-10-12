import "./index.css";
import Layout from "./components/Layout/index";
import UserModal from "./components/organisms/UserModal";
import MainContent from "./components/organisms/MainContent";

function App() {

  return (
    <>
      <Layout>
        <UserModal />
        <MainContent />
      </Layout>
    </>
  );
}

export default App;
