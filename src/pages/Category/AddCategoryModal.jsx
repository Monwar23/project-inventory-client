import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useCategory from '../../hooks/useCategory';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const AddCategoryModal = ({ show, handleClose }) => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [ , refetch] = useCategory();
    const axiosSecure = useAxiosSecure();
    const [startDate, setStartDate] = useState(new Date());

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosSecure.post('/category', {
                name: categoryName,
                image_url: categoryImage,
                start_date: startDate
            });

            if (response.data.insertedId) {
                toast.success('Category Added Successfully');
                handleClose();
                refetch();
                setCategoryName('');
                setCategoryImage('');
                setStartDate(new Date());
            } else {
                toast.error('Failed to add category');
            }
        } catch (error) {
            toast.error('An error occurred');
            console.error(error);
        }
    };

    return (
        <div className={`fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 ${show ? 'flex' : 'hidden'}`}>
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-semibold mb-6 text-center">Add Category</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="categoryName" className="block text-gray-700 font-bold mb-2">Category Name</label>
                            <input
                                type="text"
                                id="categoryName"
                                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter category name"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="categoryImage" className="block text-gray-700 font-bold mb-2">Category Image URL</label>
                            <input
                                type="text"
                                id="categoryImage"
                                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter category image URL"
                                value={categoryImage}
                                onChange={(e) => setCategoryImage(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="startDate" className="block text-gray-700 font-bold mb-2">Start Date</label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <button type="submit" className="w-full border-b-4 text-violet-500 mb-6 hover:text-white hover:bg-violet-500 px-3 py-2 rounded-lg border-violet-500 border-t-2">Add Category</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCategoryModal;
