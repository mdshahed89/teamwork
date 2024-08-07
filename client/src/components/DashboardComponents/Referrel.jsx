import React, { useEffect, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

function Referrel() {

  const {currentUser} = useSelector(state => state.user)
  const [referrelData, setReferrelData] =useState({})
  const [data, setData] = useState({})

  referrelData.referrelId = currentUser.phoneNo

  console.log(data);



    useEffect(()=> {

      const handleReferrelSubmit = async () => {
     
        try {
  
          const res = await fetch("/api/referrel/details", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(referrelData),
          });
          const datas = await res.json();
          console.log(datas);
          if (datas.success === false) {
            console.log("does not get any referrel details");
            return;
          }
          setData(datas)
          console.log("referrel details get successfully");
  
        } catch (error) {
  
          console.log(error);
  
        }
       };
  
      handleReferrelSubmit()

    }, [currentUser.phoneNo])
    

  return (
    <div className=" flex flex-col gap-5 ">
      <div>
        <h3 className=" text-[1.6rem] font-semibold ">My Referrel Code</h3>
        <div className=" relative ">
          <input
            type="text"
            name=""
            id=""
            value={currentUser?.referrelId}
            readOnly
            className=" text-[1.3rem] bg-slate-200 py-2 w-full rounded-md px-3 outline-none "
          />
          
          <div className=" text-[#fff] absolute top-0 right-0 rounded-r-md cursor-pointer bg-slate-500 h-full flex items-center ">
            <IoCopyOutline className=" text-[2.5rem] bg-slate-500 px-2 " />
          </div>
        </div>
        <p className=" text-[1.2rem] text-[#3d3d3d] ">Share this code with your friends</p>
      </div>
      <div>
        <h3 className=" text-[1.6rem] font-semibold ">My Referrel Link</h3>
        <div className=" relative ">
          <input
            type="text"
            name=""
            id=""
            value={"http://localhost:5173/dashboard/refferel"}
            readOnly
            className=" text-[1.3rem] bg-slate-200 py-2 w-full rounded-md px-3 outline-none "
          />
          <div className=" text-[#fff] absolute top-0 right-0 rounded-r-md cursor-pointer bg-slate-500 h-full flex items-center ">
            <IoCopyOutline className=" text-[2.5rem] bg-slate-500 px-2 " />
          </div>
        </div>
        <p className=" text-[1.2rem] text-[#3d3d3d] ">Share this link with your friends</p>
      </div>

      <div className=" mt-6 ">
        <h3 className=" text-[2.2rem] font-semibold ">Generation referrel counts</h3>
        <div className=" flex flex-col gap-5 mt-5 ">
        <div>
          <h3 className=" text-[1.7rem] font-semibold mb-3 ">1st Generation</h3>
          <div className=" grid grid-cols-2 gap-4 ">
            <div className=" flex flex-col items-center text-[1.5rem] font-semibold rounded-md bg-slate-300 py-5 ">
              <p>Active</p>
              <p>{data.firstGenActive}</p>
            </div>
            <div className=" flex flex-col items-center text-[1.5rem] font-semibold rounded-md bg-slate-300 py-5 ">
              <p>Inactive</p>
              <p>{data.firstGeninActive}</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className=" text-[1.7rem] font-semibold mb-3 ">2nd Generation</h3>
          <div className=" grid grid-cols-2 gap-4 ">
            <div className=" flex flex-col items-center text-[1.5rem] font-semibold rounded-md bg-slate-300 py-5 ">
              <p>Active</p>
              <p>{data.secondGenActive}</p>
            </div>
            <div className=" flex flex-col items-center text-[1.5rem] font-semibold rounded-md bg-slate-300 py-5 ">
              <p>Inactive</p>
              <p>{data.secondGeninActive}</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className=" text-[1.7rem] font-semibold mb-3 ">3rd Generation</h3>
          <div className=" grid grid-cols-2 gap-4 ">
            <div className=" flex flex-col items-center text-[1.5rem] font-semibold rounded-md bg-slate-300 py-5 ">
              <p>Active</p>
              <p>{data.thirdGenActive}</p>
            </div>
            <div className=" flex flex-col items-center text-[1.5rem] font-semibold rounded-md bg-slate-300 py-5 ">
              <p>Inactive</p>
              <p>{data.thirdGeninActive}</p>
            </div>
          </div>
        </div>
        </div>
      </div>

    </div>
  );
}

export default Referrel;
