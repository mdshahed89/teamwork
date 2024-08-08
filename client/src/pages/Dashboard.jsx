import React, { useState } from "react";
import Left from "../components/DashboardComponents/Left";
import Right from "../components/DashboardComponents/Right";
import { GiTargetPrize } from "react-icons/gi";
import { FaXmark } from "react-icons/fa6";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { HiBars2 } from "react-icons/hi2";
import Payment from "../components/BalanceComponents/Payment";
import { useDispatch, useSelector } from "react-redux";
import { updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/user/userSlice.js";
import config from "../components/config.js";

function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const backendUrl = config.backendUrl;
  console.log(backendUrl);
  
  const dispatch = useDispatch()

  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    activated: true,
    balance: currentUser.balance - 500
  })

  const [referrelData, setReferrelData] = useState({})

  referrelData.referrelId = currentUser?.referrelId

  const [bar, setBar] = useState(false);

  const location = useLocation();

  // console.log(referrelData);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`${backendUrl}/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));



      const handleReferrelSubmit = async () => {
          
        try {

          const resp = await fetch(`${backendUrl}/api/referrel/update`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(referrelData),
          });
          const datas = await resp.json();
          console.log(datas);
          if (datas.success === false) {
            console.log("referrel unsuccessfull");
            return;
          }
          console.log("referreled Successfully");

        } catch (error) {

          console.log("referrel unsuccessfull");

        }
      };

      handleReferrelSubmit()



      // setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
    setOpenModal(false)
  };



  return (
    <div className=" px-1 lg:px-[2%] pt-3  bg-gradient-to-b from-[#bacaff] to-[#ffffff] ">
      {!currentUser?.activated && (
        <div className=" mb-4 flex items-center justify-between bg-gradient-to-r from-blue-600 to-white py-2 px-5 text-[#fff] gap-4 rounded-md ">
          <div className=" flex items-center gap-4 ">
            <div className=" bg-blue-200/50 text-[1.4rem] p-2 rounded-full ">
              <GiTargetPrize className=" text-[#fff] " />
            </div>
            <div>
              <h3 className=" text-[1.4rem] md:text-[1.8rem] ">
                {`${currentUser?.firstName} ${currentUser?.lastName}`}, আপনার একাউন্ট অ্যাক্টিভ নয়।
              </h3>
              <p className=" text-[1.1rem] md:text-[1.5rem] ">
                একাউন্ট অ্যাক্টিভ করতে বাটনে ক্লিক করুন ।
              </p>
            </div>
          </div>
          <div>
            <div onClick={()=> setOpenModal(true)} className=" bg-blue-700 text-[#fff] cursor-pointer px-5 text-[1.2rem] md:text-[1.5rem] font-semibold  py-2 rounded-md ">
              <div>Active Account</div>
            </div>

            <div className="mx-auto w-fit">
              <div
                onClick={() => setOpenModal(false)}
                className={`fixed z-[10000] flex justify-center items-center w-screen ${
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
                  <div
                    onClick={() => setOpenModal(false)}
                    className=" cursor-pointer text-[1.4rem] flex justify-end "
                  >
                    <FaXmark />
                  </div>
                  <div>
                    {
                      currentUser?.balance >=500 ? <p className=" text-xl my-10 text-center text-[#3b3b3b] font-semibold px-8 ">if you click on activate 500 tk would be dedicated to your account</p> : <p className=" text-xl my-10 text-center text-[#3b3b3b] font-semibold px-8 ">for activate account your balance have to minimum 500 tk</p>
                    }
                  </div>
                  <div className=" flex items-center justify-center mt-6 gap-5 ">
                    {
                      currentUser?.balance >=500 && <div
                      onClick={handleSubmit}
                      className=" text-[1.2rem] font-semibold text-[#fff] bg-blue-500 px-10 py-1 rounded-md "
                    >
                      Activate
                    </div>
                    }
                    <div
                      onClick={() => setOpenModal(false)}
                      className=" text-[1.2rem] font-semibold text-[#fff] bg-blue-500 px-10 py-1 rounded-md "
                    >
                      Cancel
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      )}
      <div className=" flex gap-[1%] ">
        <div
          className={` ${
            bar ? "w-[20rem]" : "w-[5rem]"
          }  lg:w-[25%] z-[100] lg:relative fixed rounded-md `}
        >
          <Left bar={bar} setBar={setBar} />
        </div>
        <div
          className={` ${bar ? "" : " lg:ml-0 ml-[6rem] "}  w-full lg:w-[74%] `}
        >
          <div className=" bg-[#fff] mb-5 text-[1.5rem] font-semibold py-3 px-[3%] rounded-md flex items-center justify-between ">
            <h3>
              {location.pathname === "/dashboard/"
                ? "Dashboard"
                : location.pathname === "/dashboard/profile"
                ? "My Profile"
                : location.pathname === "/dashboard/balance"
                ? "My Balance"
                : location.pathname === "/dashboard/work"
                ? "My Offers"
                : location.pathname === "/dashboard/refferel"
                ? "My Referrel"
                : location.pathname === "/dashboard/faq"
                ? "Faq"
                : "Leaderboard"}
            </h3>
            <FaUserAlt className=" text-[3rem] text-blue-600 " />
          </div>
          <div className=" bg-[#fff]  rounded-md p-[2%] min-h-[90vh] ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
