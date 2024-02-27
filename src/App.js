import './App.css';
import Appbar from './components/Appbar';
import UserForm from './components/UserForm';

function App() {
  return (
    <div className="App">
      <div>
        <Appbar/>
      </div>
      <div  style={{marginTop: 30, marginBottom: 30}}>
        <UserForm/>
      </div>
    </div>
  );
}

export default App;
