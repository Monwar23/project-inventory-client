import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateProduct = () => {
    const product = useLoaderData();
    const location = useLocation()
    const navigate = useNavigate()

    const {
        _id,
        product_name,
        image,
        quantity,
        supplier_name,
        purchase_price,
        sales_price,
        category } = product


        const handleUpdate = e => {
            e.preventDefault();
            const form = e.target;
            const product_name = form.product_name.value
            const image = form.image.value
            const quantity = form.quantity.value
            const supplier_name = form.supplier_name.value
            const purchase_price = form.purchase_price.value
            const sales_price = form.sales_price.value
            const category = form.category.value
    
            const foodData = {product_name, image, quantity,supplier_name,purchase_price,sales_price,category}
            // console.log(foodData);
    
            fetch(`http://localhost:8000/product/${_id}` ,{
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(foodData)
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.modifiedCount > 0) {
                        Swal.fire("Success", "Product item updated successfully", "success");
                        
                            navigate(location?.state ? location.state : '/product')
                    }
                })
        }   

      
    return (
        <div className="max-w-2xl mx-auto bg-gray-100 p-5 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-5 text-center">Update Product</h2>
            <form onSubmit={handleUpdate}>
            <div className="mb-3">
                <label htmlFor="product_name" className="block font-medium ">Product Name</label>
                <input type="text" id="product_name" name="product_name" defaultValue={product_name} placeholder="Product Name" required className="mt-1 block w-full rounded-md shadow-sm h-10 px-2 border border-violet-500" />
            </div>
            <div className="mb-3">
                <label htmlFor="image" className="block font-medium ">Product Image</label>
                <input type="url" id="image" defaultValue={image}  name="image" placeholder="Image" className="mt-1 block w-full rounded-md border border-violet-500 shadow-sm h-10 px-2" />
            </div>
           <div className="flex space-x-2">
           <div className="mb-3 flex-grow">
                <label htmlFor="quantity" className="block font-medium ">Quantity</label>
                <input type="text" id="quantity" defaultValue={quantity} min='1' name="quantity" placeholder="quantity" className="mt-1 block w-full rounded-md border border-violet-500 shadow-sm h-10 px-2" />
            </div>

            <div className="mb-3 flex-grow">
                <label htmlFor="supplier_name" className="block font-medium ">supplier_name</label>
                <input type="text" id="supplier_name" name="supplier_name" defaultValue={supplier_name} placeholder="supplier_name" step="0.1" className="mt-1 block w-full  rounded-md shadow-sm h-10 px-2 border border-violet-500" />
            </div>
           </div>

          <div className="flex space-x-2">
          <div className="mb-3 flex-grow">
                <label htmlFor="purchase_price" className="block font-medium ">Purchase Price</label>
                <input type="text" id="purchase_price" min='1' defaultValue={purchase_price} name="purchase_price" placeholder="purchase_price" className="mt-1 block w-full  rounded-md shadow-sm h-10 px-2 border border-violet-500" />
            </div>
            <div className="mb-3 flex-grow">
                <label htmlFor="sales_price" className="block font-medium ">Sales Price</label>
                <input id="sales_price" name="sales_price" defaultValue={sales_price} placeholder="sales_price" required rows="3" min='1' className="mt-1 block w-full  rounded-md shadow-sm h-10 px-2 border border-violet-500"></input>
            </div>
          </div>
            <div className="mb-3">
                <label htmlFor="category" className="block font-medium ">Category</label>
                <input id="category" name="category" defaultValue={category} placeholder="category" required rows="3" className="mt-1 block w-full  rounded-md shadow-sm h-10 px-2 border border-violet-500"></input>
            </div>
            <div className="modal-action">
                <button className="border-b-4 text-violet-500 hover:text-white hover:bg-violet-500 px-3 py-2 rounded-lg border-violet-500">Update</button>
            </div>
        </form>
        </div>
    );
};

export default UpdateProduct;
