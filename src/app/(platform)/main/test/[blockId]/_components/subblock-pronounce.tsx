"use client";

import { SubblockOrderData } from "@/app/(platform)/main/block/[blockId]/page";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { toast } from "sonner";

type wordScoreItem = {
  word: string;
  quality_score: number;
};

interface ResultI {
  wordScoreList: wordScoreItem[];
  cefrScore: { pronunciation: string };
}

const SubblockPronounce = ({ subblock }: { subblock: SubblockOrderData }) => {
  const subblockPronounce = subblock.subblock_pronounce;
  const recorderControls = useAudioRecorder();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ResultI | null>(null);

  const handleSending = async () => {
    if (!recorderControls.recordingBlob) {
      toast.error("Нет голосовой записи");
      return;
    }

    const formData = new FormData();
    formData.append("audio", recorderControls.recordingBlob, "recording.wav");
    formData.append("word", subblockPronounce!.value);

    const response = await fetch("http://localhost:3000/api/pr", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.status !== "success") {
      toast.error("Произошла ошибка");
      return;
    }
    const result = {
      wordScoreList: data.text_score.word_score_list,
      cefrScore: data.text_score.cefr_score,
    };
    setIsLoading(false);
    setResult(result);
  };
  return (
    <div>
      {subblockPronounce?.name && (
        <p className="font-semibold text-xl">{subblockPronounce?.name}</p>
      )}
      <p>
        <span className="font-semibold text-lg">Фраза/слово:</span>
        {subblockPronounce?.value}
      </p>
      {isLoading && (
        <div>
          <Skeleton className="h-6 w-full max-w-[250px] bg-gray-400 mb-1" />
          <Skeleton className="h-6 w-full max-w-[250px] bg-gray-400" />
        </div>
      )}
      {result && !isLoading && (
        <div>
          <span>Общая оценка: {result.cefrScore.pronunciation}</span>
          <div>
            {result.wordScoreList.map((w) => (
              <span
                title={"Баллы: " + String(w.quality_score)}
                key={w.quality_score}
                className={cn(
                  "w-[250px] mr-1 ",
                  w.quality_score < 60 ? "text-red-500" : "",
                  w.quality_score >= 60 && w.quality_score < 80
                    ? "text-yellow-500"
                    : "",
                  w.quality_score >= 80 ? "text-green-500" : ""
                )}
              >
                {w.word}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="flex gap-4 my-4">
        <AudioRecorder
          showVisualizer={true}
          onRecordingComplete={() => {
            setIsLoading(true);
            handleSending();
          }}
          recorderControls={recorderControls}
        />
      </div>
    </div>
  );
};

export default SubblockPronounce;
