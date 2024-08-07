import React, { useState } from "react";
import NagadLogo from "../../assets/NagadLogo.png";
import { FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { updateUserFailure, updateUserStart, updateUserSuccess } from "../../redux/user/userSlice.js";

function BeforeJoin({setJoined}) {

  const {currentUser} = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [openModal, setOpenModal] = useState(false);
  const [lmData, setlmData] = useState({
    name: `${currentUser?.firstName} ${currentUser.lastName}`,
    referrelId: currentUser.phoneNo,
    userId: currentUser._id
  })

  // console.log(lmData);

  const [formData, setFormData] = useState({
    joined: true,
    balance: currentUser?.balance - 1000
  })

  console.log(formData);

  const handleJoinButton = async () => {


    try {
      
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      

      const handleMemberSave = async () => {

        try {
          const resp = await fetch("/api/leaderboard/join", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(lmData),
          })
          const datas = await resp.json()
          console.log(datas);
          if(datas.success === false){
            console.log("error of making leaderboard member");
          }
          console.log("leaderboard member made successfully");
        } catch (error) {
          console.log("when trying to make leaderboard member");
        }
  

      }
      handleMemberSave()

      dispatch(updateUserSuccess(data));
      // setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }


    // setJoined(true)
    setOpenModal(false)
  }

  return (
    <div>
      <div className=" max-w-[450px] px-[2%] py-6 bg-gradient-to-b from-blue-600 to-white drop-shadow-lg mt-6 rounded-md text-center ">
        <div>
          <img
            src={NagadLogo}
            alt=""
            className=" h-[10rem] object-cover mx-auto "
          />
        </div>
        <h3 className=" text-[1.8rem] text-[#fff] font-semibold mt-5  ">
          Offer Leaderboard
        </h3>
        <p className=" text-[1.1rem] my-10 text-[#fff] font-semibold ">
          Win Attractive Prizes With Your Network Marketing And Teamwork
          Experience
        </p>
        <div className=" flex items-center  justify-center pb-20 border-b border-[#b3b3b3] ">
          <div className=" flex gap-4 text-yellow-600 text-[1.2rem] font-semibold px-5 py-2 rounded-md bg-yellow-100/40 ">
            <h3>Your Ranking 11th</h3>
            <h3>Prizes: $0</h3>
          </div>
        </div>
        <div className=" text-[1.3rem] font-semibold mt-16 mb-5 ">
          <h3>17D:05H:52M:44S</h3>
        </div>
        <div>
          <button onClick={()=>setOpenModal(true)} className=" bg-blue-400 w-full py-2 text-[#fff] text-[1.2rem] font-semibold rounded-md ">
            Join Now
          </button>
        </div>
      </div>

      <div className="mx-auto w-fit">
      <div onClick={() => setOpenModal(false)} className={`fixed z-[10000] w-screen ${openModal ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 grid place-items-center bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}>
      <div onClick={(e_) => e_.stopPropagation()} className={`absolute max-w-[450px] rounded-lg bg-gradient-to-b from-[#bacaff] to-[#ffffff] p-6 drop-shadow-lg  dark:text-black ${openModal ? 'opacity-1 duration-300' : 'scale-110 opacity-0 duration-150'}`}>
        <div onClick={()=>setOpenModal(false)} className=" cursor-pointer text-[1.4rem] flex justify-end ">
            <FaXmark />
        </div>
        <div className=" text-[1.3rem] font-semibold text-center mt-7 ">
            <h3>You should have minimum  ৳1000 <br />in your account</h3>
        </div>
        <div className=" flex items-center justify-center mt-10 gap-5 ">
            <button onClick={handleJoinButton} className={`  ${currentUser?.balance < 1000 && "hidden"} text-[1.2rem] font-semibold text-[#fff] bg-blue-500 px-10 py-1 rounded-md `}>Yes</button>
            <button onClick={()=>setOpenModal(false)} className=" text-[1.2rem] font-semibold text-[#fff] bg-blue-500 px-10 py-1 rounded-md ">cancel</button>
        </div>
        </div>
        </div>
        </div>

    </div>
  );
}

export default BeforeJoin;
