import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePurchase = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: purchase = [] } = useQuery({
        queryKey: ['purchase'],
        queryFn: async () => {
            const res = await axiosSecure.get('/purchase')
            return res.data
        }
    })
    return [purchase, refetch]
};

export default usePurchase;