import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import OAuth from "../components/OAuth";
import Logo from "../assets/Logo.png";
import { useSelector } from "react-redux";

export default function SignUp() {

  // const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    referrelId: "01814840833"
  });

  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [referrelData, setReferrelData] = useState({})

  referrelData.referrelId = formData.referrelId


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };



  // console.log(formData);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.password !== confirmPassword) return;
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }



      const handleReferrelSubmit = async () => {
          
        try {

          const resp = await fetch(`/api/referrel/update/inactive`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(referrelData),
          });
          const datas = await resp.json();
          console.log(datas);
          if (datas.success === false) {
            console.log("inactive referrel unsuccessfull");
            return;
          }
          console.log("inactive referreled Successfully");

        } catch (error) {

          console.log("inactive referrel unsuccessfull");

        }
      };

      handleReferrelSubmit()
      




      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  console.log(referrelData);
  return (
    <div className=" bg-gradient-to-b from-[#bacaff] to-[#ffffff] ">
      <div className="max-w-[400px]  min-h-[100vh] flex items-center justify-center   mx-auto">
        <div className=" w-full  bg-gradient-to-b from-white to-blue-600 px-[4%] py-[5%] shadow-2xl rounded-md ">
          <div className=" flex justify-center mb-8 ">
            <img src={Logo} alt="" className=" w-[20rem] object-cover " />
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 text-[1.4rem] "
          >
            <div className=" flex flex-col gap-1 text-[#262626] ">
              <label className=" text-[#474747] " htmlFor="">Referrel Id*</label>
              <input
                type="text"
                placeholder="Referrel Id"
                id="referrelId"
                className="bg-slate-100 p-3 rounded-lg outline-none"
                defaultValue={"01814840833"}
                onChange={handleChange}
              />
            </div>
            <div className=" flex items-center gap-2 w-full ">
              <div className=" flex flex-col gap-1 text-[#262626] ">
              <label className=" text-[#474747] " htmlFor="">First Name*</label>
              <input
                type="text"
                placeholder="First Name"
                id="firstName"
                className="bg-slate-100 p-3 w-full  rounded-lg outline-none"
                onChange={handleChange}
              />
              </div>
              <div className=" flex flex-col gap-1 text-[#262626] ">
              <label className=" text-[#474747] " htmlFor="">Last Name*</label>
              <input
                type="text"
                placeholder="Last Name"
                id="lastName"
                className="bg-slate-100 p-3 w-full rounded-lg outline-none"
                onChange={handleChange}
              />
              </div>
            </div>
            <div className=" flex flex-col gap-1 text-[#262626] ">
              <label className=" text-[#474747] " htmlFor="">Phone No*</label>
              <input
                type="text"
                placeholder="Phone No"
                id="phoneNo"
                className="bg-slate-100 p-3 rounded-lg outline-none"
                onChange={handleChange}
              />
            </div>
            <div className=" flex flex-col gap-1 text-[#262626] ">
              <label className=" text-[#474747] " htmlFor="">Email*</label>
              <input
                type="text"
                placeholder="Email"
                id="email"
                className="bg-slate-100 p-3 rounded-lg outline-none"
                onChange={handleChange}
              />
            </div>
            <div className=" flex flex-col gap-1 text-[#262626] ">
              <label className=" text-[#474747] " htmlFor="">Password*</label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="bg-slate-100 p-3 rounded-lg outline-none"
                onChange={handleChange}
              />
            </div>
            <div className=" flex flex-col gap-1 text-[#262626] ">
              <label className=" text-[#474747] " htmlFor="">Confirm Password*</label>
              <input
                type="password"
                placeholder="Confirm Passord"
                id="password"
                className="bg-slate-100 p-3 rounded-lg outline-none"
                onChange={(e)=>setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              disabled={loading}
              className="bg-slate-700 font-semibold text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 mt-5 "
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
            {/* <OAuth /> */}
          </form>
          <div className="flex justify-between text-[1.4rem] gap-2 mt-5 text-[#fff] ">
            <p>Have an account?</p>
            <Link to="/signin">
              <span className="text-[#fff] bg-slate-700 px-6 text-xl rounded-md py-1 hover:text-blue-300 ">
                Sign in
              </span>
            </Link>
          </div>
          <p className="text-red-700 mt-5">
            {error && "Something went wrong!"}
          </p>
        </div>
      </div>
    </div>
  );
}
