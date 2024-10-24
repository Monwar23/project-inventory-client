

import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {

    const { createUser, user, loading } = UseAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/dashboard')
        }
    }, [navigate, user])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [showPassword, setShowPassword] = useState(false)

    const onSubmit = data => {
        const { email, password } = data;

        // create user
        createUser(email, password)
            .then(result => {
                console.log(result.user);

                Swal.fire("Success", "Registration successfully", "success");

                setTimeout(() => {
                    navigate('/just')
                }, 3000)


            })
            .catch(error => {
                console.log(error);
                Swal.fire("Error", "Registration failed", "error");
            })

    }
    if (user || loading) return
    return (
        <div>

            <div className="min-h-screen flex items-center justify-center p-8">
                <div className="p-8 rounded-lg shadow-lg w-full max-w-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center z-0"></div>
                    <div className="relative z-10">
                        <h2 className="text-violet-500 font-bold text-center text-3xl mb-6">Register Now !</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label className="block text-violet-500 font-semibold">Name</label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="mt-2 block w-full px-4 py-2 bg-transparent border border-violet-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    {...register("Name", { required: true })}
                                />
                                {errors.Name && <span className="text-red-500">This field is required</span>}
                            </div>

                            <div>
                                <label className="block text-violet-500 font-semibold">Email</label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="mt-2 block w-full px-4 py-2 bg-transparent border border-violet-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <span className="text-red-500">This field is required</span>}
                            </div>

                            <div className="relative">
                                <label className="block text-violet-500 font-semibold">Password</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="mt-2 block w-full px-4 py-2 bg-transparent border border-violet-500  rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    {...register("password", { required: true })}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-12 right-0 flex items-center pr-3 focus:outline-none"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash className="text-black" /> : <FaEye className="text-black" />}
                                </button>
                                {errors.password && <span className="text-red-500">This field is required</span>}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full py-2 font-semibold px-4 border border-violet-500 text-violet-500 rounded-lg hover:bg-violet-500 transition hover:text-white"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                        <p className="text-center mt-6">
                            Already have an account? <Link to='/' className="text-violet-500 font-bold hover:underline">Login</Link>
                        </p>

                    </div>
                </div>
            </div>

        </div>

    );
};

export default Register;
