import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCategory = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: category = [] } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await axiosSecure.get('/category')
            return res.data
        }
    })
    return [category, refetch]
};

export default useCategory;