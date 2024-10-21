import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {FaEye, FaEyeSlash } from "react-icons/fa"
import Swal from "sweetalert2";


const SignIn = () => {
    const {signIn,user,loading}=UseAuth()
  
    const navigate = useNavigate(); 
    useEffect(()=>{
        if(user){
            navigate('/dashboard')
        }
    },[navigate,user])
    const [showPassword, setShowPassword] = useState(false)


    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const { email, password } = data;

        signIn(email, password)
            .then(result => {
                console.log(result.user);
                Swal.fire("Success", "Login successfully", "success");

                setTimeout(()=>{
                    navigate('/dashboard')
                },3000)

            })
            .catch(error => {
                console.log(error);
                Swal.fire("Error", "Email or Password not found", "error");
            })
    }
    if(user || loading) return
    return (
        <div>
      
      <div className="min-h-screen flex items-center justify-center p-8">
    <div className="p-8 rounded-lg shadow-lg w-full max-w-lg ">
        <h2 className="text-violet-500 font-bold text-center text-3xl mb-6">Login Now !</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label className="block text-violet-500 font-semibold">Email</label>
                <input 
                    type="email" 
                    placeholder="Email" 
                    className="mt-2 block w-full px-4 py-2 bg-transparent border border-violet-500  rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" 
                    {...register("email", { required: true })} 
                />
                {errors.email && <span className='text-red-500'>This field is required</span>}
            </div>

            <div className="relative">
                <label className="block text-violet-500 font-semibold">Password</label>
                <input 
                    type={showPassword ? "text" : "password"} 
                    name="password" 
                    placeholder="Password" 
                    className="mt-2 block w-full px-4 py-2 bg-transparent border border-violet-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" 
                    {...register("password", { required: true })} 
                />
                <span 
                    className="absolute inset-y-0 right-0 top-7 flex items-center pr-3 cursor-pointer" 
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <FaEyeSlash className="text-black" /> : <FaEye className="text-black" />}
                </span>
                {errors.password && <span className='text-red-500'>This field is required</span>}
            </div>

            <div>
                <button className="w-full py-2 px-4 border font-semibold border-violet-500 text-violet-500 rounded-lg hover:text-white hover:bg-violet-500 transition">
                    Login
                </button>
            </div>
        </form>

        <p className="text-center mt-4">
            Do not have an account? 
            <Link className="font-bold text-violet-500 hover:underline" to='/register'> Register</Link>
        </p>  
    </div>
</div>

       </div>

    );
};

export default SignIn;
