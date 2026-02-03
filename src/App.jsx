import React, { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const passwordentery = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";

    if (charAllowed) str += "!@#$%^&*-_+=[]{}~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [numberAllowed, passwordGenerator, charAllowed, length]);

  const handlecopy = useCallback(() => {
    passwordentery.current.select();

    // if i have to add select range
    passwordentery.current.setSelectionRange(0,101)

    window.navigator.clipboard.writeText(password);

  }, [password]);

  return (
    <div className="p-5 text-white bg-black w-screen h-screen">
      <div className="m-8 w-full max-w-md border-2  rounded-lg p-3 text-center text-2xl bg-gray-700">
        <h1>Password Generator</h1>

        <div className="flex shadow-2xl rounded-lg justify-center items-center">
          <input
            className="bg-white text-black rounded-lg w-full px-3 py-1 mt-2"
            placeholder="Password"
            value={password}
            type="text"
            readOnly
            ref={passwordentery}
          />
          <button
            onClick={() => {
              handlecopy();
            }}
            className=" px-2 py-1 active:scale-95 bg-green-400 rounded-md ml-2"
          >
            copy
          </button>
        </div>
        <div className="flex mt-5 gap-x-2 items-center text-xs">
          <input
            min={8}
            max={100}
            value={length}
            className="cursor-pointer"
            type="range"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />

          <label>Length: {length}</label>
          <div className="flex items-center gap-x-1">
            Number:
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed(!numberAllowed);
              }}
            />
            Char:
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed(!charAllowed);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
