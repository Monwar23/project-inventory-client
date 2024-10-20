import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useSales = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: sales = [] } = useQuery({
        queryKey: ['sales'],
        queryFn: async () => {
            const res = await axiosSecure.get('/sales')
            return res.data
        }
    })
    return [sales, refetch]
};

export default useSales;