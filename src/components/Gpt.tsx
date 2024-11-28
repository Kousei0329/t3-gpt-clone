import { useState } from "react";
import type { Gpt } from "~/server/types";
import { api } from "~/trpc/react";

type GptProps = {
  gpt: Gpt;
};

export function Gpt({ gpt }:GptProps) {
    const { id, inputText,outputText } = gpt;
  
    const [inputGpt, setInputGpt] = useState(inputText);
    const [outputGpt, setOutputGpt] = useState(outputText);




    return (
      <div className="flex items-center justify-between rounded-md border-2 border-gray-one px-5 py-4">
        <div className="flex w-full items-center justify-start">

          <textarea
            className="ml-5 flex-1 text-ellipsis rounded-none border-x-0 border-t-0 border-b border-dashed border-b-gray-two bg-cream-four px-0 pb-1 text-base font-normal text-gray-three placeholder:text-gray-two focus:border-gray-three focus:outline-none focus:ring-0"
            id={`${gpt.id}-text`}
            placeholder="Enter a todo"
            value={inputGpt}
            readOnly
          />
           <textarea
            className="ml-5 flex-[3] text-ellipsis rounded-none border-x-0 border-t-0 border-b border-dashed border-b-gray-two bg-cream-four px-0 pb-1 text-base font-normal text-gray-three placeholder:text-gray-two focus:border-gray-three focus:outline-none focus:ring-0"
            id={`${gpt.id}-output-text`}
            placeholder="Enter a todo"
            value={outputGpt}
            rows={5}  // 初期の行数
            cols={500} // 初期の列数
            readOnly
               />
        </div>
      </div>
    );
  }