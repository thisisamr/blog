import useSWR from "swr";
import fetcher from "../utils/fetcher";

const usePost = (): {
  data: any;
  isLoading: boolean;
  isError: any;
} => {
  const { data, error } = useSWR<any[], any>("blog", fetcher);

  return {
    data: data,
    isLoading: !data && !error,
    isError: error,
  };
};
export default usePost;
