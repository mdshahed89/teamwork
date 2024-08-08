import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import BkashLogo from "../../assets/BkashLogo.png";
import NagadLogo from "../../assets/Nagadlogo.png";
import { IoCopyOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { updateUserFailure, updateUserStart, updateUserSuccess } from "../../redux/user/userSlice";
import config from "../config";

export default function Payment({ title, typ }) {

  const {currentUser} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const backendUrl = config.backendUrl
  const token = sessionStorage.getItem('access_token')

  const [openModal, setOpenModal] = useState(false);
  const [activeMethod, setActiveMethod] = useState("bkash");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({})
  const [balanceData, setBalanceData] = useState({
    balance: currentUser.balance
  })

  formData.userId = currentUser._id
  formData.type = typ
  formData.method = activeMethod

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      balanceData.balance = (balanceData.balance - formData.amount)
            if(balanceData.balance <0 && typ === 'withdraw') {
              return console.log("you haven't required amount")
            }
      
      
      const res = await fetch(`${backendUrl}/api/payment/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        console.log("Payment unsuccessfull");
        return;
      }
      console.log("Payment Successfull");


      if(typ === 'withdraw'){

        const handleBalanceSubmit = async () => {
          
          try {

            
            
            
            dispatch(updateUserStart());
            const res = await fetch(`${backendUrl}/api/user/update/${currentUser._id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
              },
              credentials: 'include',
              body: JSON.stringify(balanceData),
            });
            const data = await res.json();
            console.log(data);
            if (data.success === false) {
              console.log("Balance updated unsuccessfully");
              dispatch(updateUserFailure(data));
              return;
            }
            console.log("Balance Updated Successfully");
            // currentUser.balance = (balanceData.balance)
            dispatch(updateUserSuccess(data));
            // setUpdateSuccess(true);
          } catch (error) {
            console.log("Balance updated unsuccessfully");
            // dispatch(updateUserFailure(error));
          }
        };

        handleBalanceSubmit()

      }


    } catch (error) {
      console.log("Error when tying to payment");
    }
  };

  // console.log(balanceData);

  return (
    <div className="mx-auto w-fit">
      <div onClick={() => setOpenModal(true)} className="">
        {title}
      </div>
      <div
        onClick={() => setOpenModal(false)}
        className={`fixed z-[10000] w-screen ${
          openModal ? "visible opacity-100" : "invisible opacity-0"
        } inset-0 grid place-items-center bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
      >
        <div
          onClick={(e_) => e_.stopPropagation()}
          className={`absolute max-w-[450px] rounded-lg bg-gradient-to-b from-[#bacaff] to-[#ffffff] p-6 drop-shadow-lg  dark:text-black ${
            openModal
              ? "opacity-1 duration-300"
              : "scale-110 opacity-0 duration-150"
          }`}
        >
          <div className=" flex justify-end absolute right-3 top-3 ">
            <FaXmark onClick={() => setOpenModal(false)} className="  " />
          </div>
          <div className=" w-full ">
            <div className=" flex flex-col items-center gap-3 ">
              <p className=" text-base ">{title}</p>
              <HiMiniQuestionMarkCircle className=" text-[3rem] " />
            </div>
            <div className=" flex flex-col gap-4 mt-4 ">
              <p className=" text-[1.1rem] ">
                প্রথমে পেমেন্ট পদ্ধতি নির্বাচন করুন
              </p>
              <div className=" flex justify-center items-center gap-5 ">
                <div onClick={() => setActiveMethod("bkash")}>
                  <img
                    src={BkashLogo}
                    alt=""
                    className=" h-[6rem] object-cover bg-white py-2 px-8 rounded-md "
                  />
                </div>
                <div onClick={() => setActiveMethod("nagad")}>
                  <img
                    src={NagadLogo}
                    alt=""
                    className=" h-[6rem] object-cover bg-white py-2 px-8 rounded-md  "
                  />
                </div>
              </div>
            </div>
            <div className=" my-8 ">
              <p className=" text-[1rem] text-[#464646] ">
                নীচে বিকাশ নম্বর কপি করুন এবং আপনার বিকাশ <br /> অ্যাপ থেকে ৫০০
                টাকা পেমেন্ট করুন
              </p>
            </div>
            <div className=" flex flex-col gap-4 ">
              <div
                className={` bg-[#fff] flex items-center justify-center py-2 border-b-[2rem] ${
                  activeMethod === "bkash"
                    ? "border-pink-600"
                    : "border-yellow-500"
                } rounded-md `}
              >
                <img
                  src={activeMethod === "bkash" ? BkashLogo : NagadLogo}
                  alt=""
                  className=" h-[6rem] object-cover "
                />
              </div>
              {
                typ !== "withdraw" ? <div className=" flex items-center justify-center gap-2 bg-slate-700 rounded-md py-2 text-[#fff] ">
                <p>01814840833</p>
                <IoCopyOutline />
              </div> : null
              }
              <div className=" text-base  text-[#464646]   ">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Temporibus ut, cum voluptates magnam accusantium facere ipsa,
                  pariatur voluptatem, similique corporis ullam officiis. Itaque
                  beatae{" "}
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className=" flex flex-col gap-2 mt-5 ">
              <div className=" flex justify-start flex-col gap-1 ">
                <label htmlFor="" className=" text-left font-normal ">
                  number
                </label>
                <input
                  type="text"
                  name=""
                  id="number"
                  required
                  className=" outline-none py-1 px-3 bg-slate-300 rounded-md "
                  onChange={handleChange}
                />
              </div>
              <div className=" flex justify-start flex-col gap-1 ">
                <label htmlFor="" className=" text-left font-normal ">
                  Amount
                </label>
                <input
                  type="number"
                  name=""
                  id="amount"
                  required
                  className=" outline-none py-1 px-3 bg-slate-300 rounded-md "
                  onChange={handleChange}
                />
              </div>
              {
                typ!=="withdraw" ? <div className=" flex justify-start flex-col gap-1 ">
                <label htmlFor="" className=" text-left font-normal ">
                  Transection number
                </label>
                <input
                  type="text"
                  name=""
                  id="trNumber"
                  required
                  className=" outline-none py-1 px-3 bg-slate-300 rounded-md "
                  onChange={handleChange}
                />
              </div> : null
              }
              <div>
                <button className=" bg-blue-600 py-2 text-center rounded-md w-full text-[#fff] mt-4 ">
                  Verify Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
