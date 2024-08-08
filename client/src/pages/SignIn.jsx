import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
import Logo from "../assets/Logo.png";
import config from "../components/config.js";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const backendUrl = config.backendUrl
  console.log(backendUrl);
  

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`${backendUrl}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/dashboard/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className=" bg-gradient-to-b from-[#bacaff] to-[#ffffff] ">
      <div className="max-w-[400px]  min-h-[100vh] flex items-center justify-center   mx-auto">
        <div className=" w-full  bg-gradient-to-b from-white to-blue-600 p-[5%] shadow-2xl rounded-md ">
          <div className=" flex justify-center mb-8 ">
            <img src={Logo} alt="" className=" w-[20rem] object-cover " />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-[1.5rem] ">
            <div className=" flex flex-col gap-1 ">
              <label htmlFor="">Email*</label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              className="bg-slate-100 p-3 rounded-lg outline-none "
              onChange={handleChange}
            />
            </div>
            <div className=" flex flex-col gap-1 ">
              <label htmlFor="">Password*</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="bg-slate-100 p-3 rounded-lg outline-none "
              onChange={handleChange}
            />
            </div>
            <div className=" flex items-center justify-between  mt-5 text-[#fff]   ">
              <span className=" flex items-center gap-2 ">
                <input type="checkbox" name="rememberme" id="rememberme" />
                <label htmlFor="rememberme" className=" cursor-pointer ">Remember me</label>
              </span>
              <div>
                <p className=" text-black cursor-pointer ">Forgot password</p>
              </div>
            </div>
            <button
              disabled={loading}
              className="bg-slate-700 text-white p-3 font-semibold text-center rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
            {/* <OAuth /> */}
          </form>
          <div className="flex justify-between gap-2 text-[#fff] mt-5 text-[1.4rem] ">
            <p>Dont Have an account?</p>
            <Link to="/signup">
              <span className="text-[#fff] bg-slate-700 px-6 text-xl rounded-md py-1 hover:text-blue-300 ">
                Sign up
              </span>
            </Link>
          </div>
          <p className="text-red-700 text-[1.4rem] ">
            {error ? error.message || "Something went wrong!" : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
