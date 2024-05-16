import { ProcessedResult } from "../page";
import ResultsItem from "./results-item";

interface ResultsContainerProps {
  results: ProcessedResult[];
}

const ResultsContainer = ({ results }: ResultsContainerProps) => {
  return (
    <div className="px-32">
      {results.map((result) => (
        <ResultsItem key={result.block_id} result={result} />
      ))}
    </div>
  );
};

export default ResultsContainer;
