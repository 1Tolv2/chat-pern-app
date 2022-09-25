import './index.css'
import Layout from './components/Layout/index'
import Header from './components/Layout/Header';
import ChannelContent from './components/organisms/ChannelContent';

function App() {
  return (
    <Layout>
      <div style={{backgroundColor: "#2f3136"}}>hej</div>
      <div>
        <Header/>
        <ChannelContent/>
      </div>
    </Layout>
  );
}

export default App;
