import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        {
          username: username,
          password: password
        }
      );

      localStorage.setItem("token", response.data.access);
      localStorage.setItem("username", username);

      alert("Login successful");

      navigate("/upload");

    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">

      <Card className="w-[400px]">

        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">

          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button onClick={handleLogin}>
            Login
          </Button>
          {/* Signup link */}
          <p className="text-sm text-center mt-2">
            New User?{" "}
            <Link to="/signup" className="text-blue-600 font-semibold underline">
              Sign Up
            </Link>
          </p>

        </CardContent>

      </Card>

    </div>
  );
}

export default Login;