import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Results() {
  const location = useLocation();
  const result = location.state?.result;
  console.log(result);
  const navigate = useNavigate();
  if (!result) {
    return <div className="text-center mt-10">No results available</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Resume Analysis</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          <div>
  <h2 className="font-bold">ATS Score</h2>
  <p>{result.score}</p>
</div>

<div>
  <h2 className="font-bold">Missing Skills</h2>
  <ul className="list-disc ml-6">
    {result.missing_skills?.map((skill, index) => (
      <li key={index}>{skill}</li>
    ))}
  </ul>
</div>

<div>
  <h2 className="font-bold">Suggestions</h2>
  <ul className="list-disc ml-6">
    {result.suggestions?.map((s, index) => (
      <li key={index}>{s}</li>
    ))}
  </ul>
</div>
<div className="pt-4">
  <button
    className="w-full bg-black text-white py-2 rounded-lg"
    onClick={() => navigate("/job-match")}
  >
    Compare with Job Description
  </button>
</div>

        </CardContent>
      </Card>
    </div>
  );
}

export default Results;