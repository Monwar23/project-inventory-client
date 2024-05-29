import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useCategory from '../../hooks/useCategory';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddCategoryModal = ({ show, handleClose }) => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryFile, setCategoryFile] = useState(null);
    const [, refetch] = useCategory();
    const axiosSecure = useAxiosSecure();
    const [startDate, setStartDate] = useState(new Date());

    const handleFileChange = (e) => {
        setCategoryFile(e.target.files[0]);
    };

    const uploadImageToImgBB = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        const apiKey = import.meta.env.VITE_IMAGE_HOSTING_KEY; // Replace with your ImgBB API key
        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);

        return response.data.data.url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!categoryFile) {
            toast.error('Please select an image file');
            return;
        }

        let imageUrl;
        try {
            imageUrl = await uploadImageToImgBB(categoryFile);
        } catch (error) {
            toast.error('Failed to upload image');
            console.error(error);
            return;
        }

        try {
            const response = await axiosSecure.post('/category', {
                name: categoryName,
                image_url: imageUrl,
                start_date: startDate
            });

            if (response.data.insertedId) {
                toast.success('Category Added Successfully');
                handleClose();
                refetch();
                setCategoryName('');
                setCategoryFile(null);
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
                            <label htmlFor="categoryFile" className="block text-gray-700 font-bold mb-2">Category Image File</label>
                            <input
                                type="file"
                                id="categoryFile"
                                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={handleFileChange}
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
                        <div className="flex justify-end gap-3">
                            
                            <button type="submit" className="bg-violet-500 text-white px-4 py-2 rounded-lg">Add</button>
                            <button type="button" onClick={handleClose} className="border px-4 py-2 rounded-lg">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCategoryModal;
