import { useState, useEffect, useCallback } from "react";
import type {
  HttpHookProps,
  GenericApiResponse,
  OrderRequest,
} from "../util/data-types.ts";

const sendHttpRequest = async <T>(
  url: string,
  config?: RequestInit
): Promise<T> => {
  const response = await fetch(url, config);
  const resData = await response.json();
  if (!response.ok) {
    const error = resData as GenericApiResponse;
    throw new Error(
      error.message || "Something went wrong, fail to send request."
    );
  }
  return resData as T;
};

export const useHttp = <T>(
  url: string,
  defaultValue: T,
  config?: RequestInit
): HttpHookProps<T> => {
  const [data, setData] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const clearData = () => setData(defaultValue);
  const sendRequest = useCallback(
    async (data?: OrderRequest): Promise<void> => {
      setIsLoading(true);
      try {
        const resData: T = await sendHttpRequest(url, {
          ...config,
          body: JSON.stringify(data),
        });
        setData(resData);
      } catch (error) {
        const defaultErrorMessage = "Something went wrong!";
        if (error instanceof Error) {
          setError(error.message || defaultErrorMessage);
        } else {
          setError(defaultErrorMessage);
        }
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    const executeApi = async (body?: OrderRequest) => await sendRequest(body);
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      executeApi();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
};
