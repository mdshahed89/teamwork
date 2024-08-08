import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../../redux/user/userSlice'
import config from '../config'

function Recharge({operator}) {

    const {currentUser} = useSelector(state => state.user)
    const backendUrl = config.backendUrl

    const [amount, setAmount] = useState(0)
    const [formData, setFormData] = useState({})
    const [balanceData, setBalanceData] = useState({
      balance: currentUser.balance
    })
    const dispatch = useDispatch()

    formData.operator=operator
    formData.type = "recharge"
    formData.userId = currentUser._id
    

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          
          
          const res = await fetch(`${backendUrl}/api/buypacks/pay`, {
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
            console.log("buy pack unsuccessfull");
            return;
          }
          console.log("pack buyed Successfull");


          const handleBalanceSubmit = async () => {
          
            try {
  
              balanceData.balance = (balanceData.balance - formData.amount)
              
              
              dispatch(updateUserStart());
              const res = await fetch(`${backendUrl}/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
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
          


        } catch (error) {
          console.log("Error when tying to buy packs");
        }
      };

    console.log(formData);

  return (
    <form onSubmit={handleSubmit} className=' flex flex-col gap-3 px-5 mt-8 pb-7 '>
        <div className=' flex flex-col gap-1 '>
            <label className=' text-[#4b4b4b] ' htmlFor="">Mobile No*</label>
            <input type="text" name="" id="number" onChange={handleChange} className=' w-full outline-none rounded-md px-3 py-2 bg-slate-300 text-[1.2rem] ' />
        </div>
        <div className=' flex flex-col gap-1 '>
            <label className=' text-[#4b4b4b] ' htmlFor="">Amount*</label>
            <input type="number" name="" id="amount" onChange={handleChange} className=' w-full rounded-md outline-none px-3 py-2 bg-slate-300 text-[1.2rem] ' />
        </div>
        <div className=' grid grid-cols-4 gap-1 '>
            <div onClick={()=>setAmount(20)} className=' bg-blue-400 py-2 text-center text-[1.2rem] font-semibold text-[#fff] rounded-md '>
                <p>20</p>
            </div>
            <div onClick={()=>setAmount(50)} className=' bg-blue-400 py-2 text-center text-[1.2rem] font-semibold text-[#fff] rounded-md '>
                <p>50</p>
            </div>
            <div onClick={()=>setAmount(100)} className=' bg-blue-400 py-2 text-center text-[1.2rem] font-semibold text-[#fff] rounded-md '>
                <p>100</p>
            </div>
            <div onClick={()=>setAmount(150)} className=' bg-blue-400 py-2 text-center text-[1.2rem] font-semibold text-[#fff] rounded-md '>
                <p>150</p>
            </div>
        </div>
        <div className=' mt-7 '>
            <button className=' text-[#fff] bg-slate-700 py-2 rounded-md text-center w-full text-[1.3rem] font-semibold '>Recharge</button>
        </div>
    </form>
  )
}

export default Recharge