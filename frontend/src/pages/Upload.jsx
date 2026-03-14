import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Upload() {

  const [file, setFile] = useState(null);
  const navigate = useNavigate();   // ✅ moved here

  const handleUpload = async () => {

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);
    

    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      alert("Resume uploaded successfully!");

      navigate("/results", { state: { result: response.data } });

    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  const username = localStorage.getItem("username");

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[400px]">

        <CardHeader>
          <CardTitle>Hello {username} 👋</CardTitle>
          <p className="text-sm text-gray-500">
            Welcome back! Upload your resume here for AI analysis.
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">

          <Input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <Button onClick={handleUpload}>
            Upload Resume
          </Button>
           <Button
  variant="outline"
  onClick={() => navigate("/dashboard")}
>
  View My Resumes
        </Button>
        </CardContent>

      </Card>
    </div>
  );
}

export default Upload;