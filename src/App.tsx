import "./App.css";
import Home from "./pages/Home";
import React, { useState, useEffect, useMemo, FormEvent } from "react";
import TerminalMobile from "./components/TerminalMobile";
import { useLockBodyScroll, useToggle } from "react-use";
import { EyeClosedIcon, EyeIcon } from "@primer/octicons-react";

interface ModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  password: string,
  username: string,
}

const Modal = (props: ModalProps): JSX.Element => {
  
  const { 
    setIsModalOpen, 
    password, 
    username 
  } = props

  const [inputValue, setinputValue] = useState("");
  const [isPassWordCorrect, setIsPasswordCorrect] = useState(true);
  const [locked, setLocked] = useToggle(false);
  const [isFormShaking, setIsFormShaking] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inputValue !== password) {
      setIsPasswordCorrect(false);
      setIsFormShaking(true);
    } else {
      setIsPasswordCorrect(true);
      setIsModalOpen(false);
      setLocked(false);
    }
  };

  useLockBodyScroll(locked);

  useEffect(() => {
    setTimeout(() => {
      setIsFormShaking(false);
    }, 300);
  }, [isFormShaking]);

  return (
    <>
      <div className="modalback">
        <div className="modal">
          <p>password for 'https://{username}@github.com':</p>
          <p className="graypass">
            I knew you wouldn't remember it: <strong>{password}</strong>
          </p>
          <form className={isFormShaking ? "shake" : undefined} id="formid">
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="gitpass"
              onChange={(e) => {
                setinputValue(e.target.value);
              }}
              placeholder="Enter your password"
            />
            <button
              className="btn"
              onClick={handleSubmit}
              disabled={inputValue === "" ? true : undefined}
            >
              OK
            </button>
            <div
              onClick={() => {
                setIsPasswordVisible(!isPasswordVisible);
              }}
              className="eyecon"
            >
              {!isPasswordVisible ? (
                <EyeClosedIcon size={16} />
              ) : (
                <EyeIcon size={16} />
              )}
            </div>
          </form>
          {!isPassWordCorrect ? (
            <p className="redpass">Uh-oh! Wrong password.</p>
          ) : null}
        </div>
      </div>
    </>
  );
};

function App(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const appCallback = (homePushedValue: boolean) => {
    setIsModalOpen(homePushedValue);
  };

  const userPass = useMemo(
    () => [
      ["bingChandler", "tripleNipple"],
      ["williamButcher", "thisIsDiabolical"],
      ["scottMichael", "littleKidLover"],
      ["tribbianiJoey", "howYouDoin"],
      ["schruteDwight", "bearsEatBeets"],
      ["homelander", "theRealHeroes"],
      ["snowJon", "iDunWannit"],
    ],
    []
  );

  const getUserPass = (arr: string[][]) => {
    let random = Math.floor(Math.random() * arr.length);
    return arr[random];
  };

  useEffect(() => {
    let array = getUserPass(userPass);
    setUsername(array[0]);
    setPassword(array[1]);
  }, [userPass]);

  return (
    <div className="App">
      {isModalOpen ? (
        <Modal
          setIsModalOpen={setIsModalOpen}
          password={password}
          username={username}
        />
      ) : null}
      <p className="para">
        Hey, buddy! Are you trying to access this website on a phone? How many
        times have you seen an actual dev using git on their phone? Please, open
        it on a desktop. But hey, I'm generous, and I didn't want the phone
        dwellers to go away with nothing. So, go ahead and run{" "}
        <code style={{ color: "green" }}>gg.resources</code> for some amazing
        git resources.
      </p>
      <TerminalMobile className="termapp" />
      <Home
        className="homeApp"
        appCallback={appCallback}
        setIsModalOpen={setIsModalOpen}
        password={password}
        username={username}
      />
    </div>
  );
}

export default App;
