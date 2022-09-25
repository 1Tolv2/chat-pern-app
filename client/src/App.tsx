import './index.css'
import Layout from './components/Layout/index'
import MessageBoard from './components/organisms/MessageBoard';
import Header from './components/Layout/Header';

function App() {
  return (
    <Layout>
      <div style={{backgroundColor: "#2f3136"}}>hej</div>
      <div>
        <Header/>
      <MessageBoard/>
      </div>
    </Layout>
  );
}

export default App;
