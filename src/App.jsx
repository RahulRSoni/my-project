import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(
    function () {
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if (charAllowed) str += "!@#$%^&*";
      if (numberAllowed) str += "0123456789";
      for (let i = 1; i < length; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char);
      }
      setPassword(pass);
    },
    [length, numberAllowed, charAllowed, setPassword]
  );
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyText = useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,25)
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-10 py-2 text-orange-500 bg-gray-700">
        <h1 className="text-center text-white py-2">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden md-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />

          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-gray-400" onClick={copyText}>
            Copy
          </button>
        </div>
        <div className="flex shadow rounded-lg overflow-hidden md-4 my-2 gap-2">
          <input
            type="range"
            min={8}
            max={25}
            value={length}
            className="curser-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length">Langth:{length}</label>
          <input
            type="checkBox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="number">Number</label>
          <input
            type="checkBox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="character">Character</label>
        </div>
      </div>
    </>
  );
}

export default App;
