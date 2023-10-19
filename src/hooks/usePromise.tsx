import { useState } from "react";

type StatusT = "idle" | "loading" | "success" | "error";

type PromiseT = {
  status: StatusT;
  response?: any;
  error?: any;
};

type PromisesT = {
  [key: string]: PromiseT;
};

function usePromise(initialPromises: PromisesT) {
  const [promises, setPromises] =
    useState<Omit<PromisesT, "response">>(initialPromises);

  async function Exec(
    promise: Promise<unknown>,
    key: string
  ): Promise<PromiseT> {
    if (promises[key]?.status != "loading") {
      setPromises((prevPromises) => ({
        ...prevPromises,
        [key]: { status: "loading", error: undefined },
      }));

      return await promise
        .then((response) => {
          setPromises((prevPromises) => ({
            ...prevPromises,
            [key]: { status: "success", error: undefined },
          }));
          return { status: "success" as "success", response, error: undefined };
        })
        .catch((error) => {
          console.error(error)
          setPromises((prevPromises) => ({
            ...prevPromises,
            [key]: { status: "error", error },
          }));
          return { status: "error" as "error", response: undefined, error: error.response?.data?.errors?.message?.replaceAll("Validation error", "\nValidation") ?? error };
        });
    }

    return {
      status: promises[key]?.status as StatusT,
      response: undefined,
      error: Error("Promise-already-loading"),
    };
  }

  return [promises, Exec] as const;
}

export default usePromise;
