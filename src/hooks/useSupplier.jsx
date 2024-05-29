import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSupplier = () => {
    const axiosSecure = useAxiosSecure();
        const { refetch, data: supplier = [] } = useQuery({
            queryKey: ['supplier'],
            queryFn: async () => {
                const res = await axiosSecure.get('/supplier')
                return res.data
            }
        })
        return [supplier, refetch]
};

export default useSupplier;