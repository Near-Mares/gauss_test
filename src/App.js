import './App.css';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Main from './components/main/Main';

function App() {
  return (
    <div className="App">
      <div className="leftContainer">
        <Sidebar />
      </div>

      <div className="rightContainer">
        <Header />
        <Main />
      </div>
    </div>
  );
}

export default App;
