import './App.css';
import Appbar from './components/Appbar';
import Survey from './components/Survey';

function App() {
  return (
    <div className="App">
      <div>
        <Appbar/>
      </div>
      <div  style={{marginTop: 30, marginBottom: 30}}>
        <Survey/>
      </div>
    </div>
  );
}

export default App;
