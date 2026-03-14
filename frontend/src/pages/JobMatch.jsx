// import { useState } from "react";
// import axios from "axios";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// function JobMatch() {
//   const [jobDescription, setJobDescription] = useState("");
//   const [result, setResult] = useState(null);

//   const handleMatch = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/job-match/",
//         {
//           job_description: jobDescription,
//         },
//         {
//            headers: {
//                     Authorization: `Bearer ${token}`
//                     }
//        }
//        );

//       setResult(response.data);
//     } catch (error) {
//       console.error(error);
//       alert("Job matching failed");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <Card className="w-[700px]">
//         <CardHeader>
//           <CardTitle>Job Description Match</CardTitle>
//         </CardHeader>

//         <CardContent className="flex flex-col gap-4">
//           <textarea
//             className="border p-2 h-40"
//             placeholder="Paste Job Description Here..."
//             value={jobDescription}
//             onChange={(e) => setJobDescription(e.target.value)}
//           />

//           <Button onClick={handleMatch}>
//             Analyze Match
//           </Button>

//           {result && (
//             <div className="mt-4 space-y-2">
//               <p><strong>Match Score:</strong> {result.match_score}%</p>
//               <p><strong>Missing Skills:</strong> {result.missing_skills}</p>
//               <p><strong>Suggestions:</strong> {result.suggestions}</p>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default JobMatch;

import { useState, useEffect } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function JobMatch() {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    if (!jobDescription) {
      alert("Please enter a job description.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/job-match/",
        { job_description: jobDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setResult(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Job matching failed");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[700px]">
        <CardHeader>
          <CardTitle>Job Description Match</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <textarea
            className="border p-2 h-40"
            placeholder="Paste Job Description Here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <Button onClick={handleMatch} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Match"}
          </Button>

          {result && (
            <div className="mt-4 space-y-2">
              <p><strong>Match Score:</strong> {result.match_score}%</p>
              <p><strong>Matched Skills:</strong> {result.matched_skills.join(", ")}</p>
              <p><strong>Missing Skills:</strong> {result.missing_skills.join(", ")}</p>
              <p><strong>Recommendations:</strong> {result.recommendations.join(", ")}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default JobMatch;