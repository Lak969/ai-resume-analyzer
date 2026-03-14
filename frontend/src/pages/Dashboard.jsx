// import { useEffect, useState } from "react";
// import axios from "axios";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// function Dashboard() {
//   const [resumes, setResumes] = useState([]);

//   useEffect(() => {
//     const fetchResumes = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const response = await axios.get(
//           "http://127.0.0.1:8000/api/my-resumes/",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setResumes(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchResumes();
//   }, []);

//   return (
//     <div className="flex justify-center mt-10">
//       <Card className="w-[700px]">
//         <CardHeader>
//           <CardTitle>My Resumes</CardTitle>
//         </CardHeader>

//         <CardContent>
//           {resumes.length === 0 ? (
//             <p>No resumes uploaded yet</p>
//           ) : (
//             resumes.map((resume, index) => (
//               <div key={index} className="border p-3 mb-2 rounded">
//                 <p><strong>Name:</strong> {resume.name}</p>
//               </div>
//             ))
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default Dashboard;
import { useEffect, useState } from "react";
import axios from "axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Dashboard() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://127.0.0.1:8000/api/my-resumes/",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setResumes(response.data);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch resumes");
      }
    };

    fetchResumes();
  }, []);

  return (
    <div className="flex justify-center items-center mt-10">
      <Card className="w-[700px]">
        <CardHeader>
          <CardTitle>My Uploaded Resumes</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {resumes.length === 0 ? (
            <p>No resumes uploaded yet.</p>
          ) : (
            resumes.map((resume) => (
              <div
                key={resume.id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <p>{resume.name}</p>
                <a
                  href={`http://127.0.0.1:8000${resume.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">View / Download</Button>
                </a>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;