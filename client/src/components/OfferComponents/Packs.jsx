import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { updateUserFailure, updateUserStart, updateUserSuccess } from "../../redux/user/userSlice";

function Packs({operator, packTitle, quantity, time, amount}) {

  const {currentUser} = useSelector(state => state.user)
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    operator: operator,
    packTitle: packTitle,
    packName: `${quantity} ${time}`,
    amount: amount,
    type: "pack",
    userId: currentUser._id
  })

  const [balanceData, setBalanceData] = useState({
    balance: currentUser.balance
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      
      const res = await fetch(`/api/buypacks/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        console.log("buy pack unsuccessfull");
        return;
      }
      console.log("pack buyed Successfull");



        const handleBalanceSubmit = async () => {
          
          try {

            balanceData.balance = (balanceData.balance - formData.amount)
            
            
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
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

      



    } catch (error) {
      console.log("Error when tying to buy packs");
    }
  };


  console.log(formData);

  


  return (
    <div>
      <div
        onClick={() => setOpenModal(true)}
        className=" bg-slate-100 flex flex-col rounded-md "
      >
        <div className=" pt-3 pl-3 ">
          <h3 className=" text-[1.2rem] font-semibold text-[#4b4b4b] ">
            {quantity}
          </h3>
          <h3 className=" text-[1.2rem] font-semibold text-[#4b4b4b] ">
            {time}
          </h3>
        </div>
        <div className=" flex justify-end  text-[1.3rem] font-semibold leading-none ">
          <p className=" bg-slate-200 p-2 rounded-tl-md ">{amount} tk</p>
        </div>
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
              <div className=" flex flex-col gap-1 ">
                <label className=" text-[1.2rem] text-[#575757] ">
                  Number*
                </label>
                <input
                  type="text"
                  id="number"
                  onChange={handleChange}
                  className=" w-full outline-none bg-[#fff] text-[1.3rem] font-semibold px-3 py-2 rounded-md "
                />
              </div>
            </div>
            <div className=" flex items-center justify-center mt-6 gap-5 ">
              <button onClick={handleSubmit} className=" text-[1.2rem] font-semibold text-[#fff] bg-blue-500 px-10 py-1 rounded-md ">
                Pay
              </button>
              <button
                onClick={() => setOpenModal(false)}
                className=" text-[1.2rem] font-semibold text-[#fff] bg-blue-500 px-10 py-1 rounded-md "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Packs;
