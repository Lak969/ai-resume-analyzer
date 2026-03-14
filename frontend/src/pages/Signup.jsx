import { useState } from "react";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/signup/",
        {
          username: username,
          password: password,
        }
      );

      alert("Signup successful!");
      console.log(response.data);
    } catch (error) {
      alert("Signup failed");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Signup</h1>

      <input
        className="border p-2"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="border p-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-black text-white px-4 py-2 rounded"
        onClick={handleSignup}
      >
        Signup
      </button>
    </div>
  );
}

export default Signup;