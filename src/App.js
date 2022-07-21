import "./App.css";
import Home from "./pages/Home";
import { useState } from "react";

const Modal = ({ setIsModalOpen, password, username }) => {
  const [inputValue, setinputValue] = useState("");

  const [isPassWordCorrect, setIsPasswordCorrect] = useState(true);

  const handleSubmit = () => {
    if (inputValue !== password) {
      setIsPasswordCorrect(false);
    } else {
      setIsPasswordCorrect(true);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className="modalback">
        <div className="modal">
          <p>password for 'https://{username}@github.com':</p>
          <p className="graypass">
            I knew you wouldn't remember it: {password}
          </p>
          <div>
            <input
              type="password"
              name="gitpass"
              onChange={(e) => {
                setinputValue(e.target.value);
              }}
            />
            <button
              className="btn"
              onClick={handleSubmit}
              disabled={inputValue === "" ? "true" : ""}
            >
              OK
            </button>
          </div>
          {!isPassWordCorrect ? (
            <p className="redpass">Wrong password!</p>
          ) : null}
        </div>
      </div>
    </>
  );
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const appCallback = (homePushedValue) => {
    setIsModalOpen(homePushedValue);
  };

  const username = "griffinStewie69";
  const password = "loisMustDie";

  return (
    <div className="App">
      {isModalOpen ? (
        <Modal
          setIsModalOpen={setIsModalOpen}
          password={password}
          username={username}
        />
      ) : null}
      <Home
        appCallback={appCallback}
        setIsModalOpen={setIsModalOpen}
        password={password}
        username={username}
      />
    </div>
  );
}

export default App;
