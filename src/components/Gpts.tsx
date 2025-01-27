import { api } from "~/trpc/react";
import { Gpt } from "./Gpt";

export function Gpts(){
    const { data: gpts=[], isLoading, isError } = api.gpt.all.useQuery();
  
    if (isLoading)
      return (
        <div className="flex items-center justify-center">
          <div
            style={{ borderTopColor: "transparent" }}
            className="border-blue-200 mt-32 h-10 w-10 animate-spin rounded-full border-4"
          />
          <p className="mt-32 ml-4 text-xl">loading...</p>
        </div>
      );
    if (isError)
      return (
        <div className="flex items-center justify-center">
          <p className="mt-10 ml-4 text-xl">Error fetching todos</p>
        </div>
      );
  
    return (
      <>
        {gpts.map((gpt) => {
          return (
            <section key={gpt.id} className="mt-8 space-y-4">
              <Gpt gpt={gpt} />
            </section>
          );
        })}
      </>
    );
  }