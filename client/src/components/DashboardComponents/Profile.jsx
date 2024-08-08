import React, { useRef, useState } from 'react'
import ProfileImg from "../../assets/ProfileImg.jpg"
import { useDispatch, useSelector } from 'react-redux'
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../../redux/user/userSlice.js'
import config from '../config.js'

function Profile() {

  const {currentUser} = useSelector(state => state.user)
  const backendUrl = config.backendUrl
  const dispatch = useDispatch()
  const fileRef = useRef(null)
  // const [file,  setFile] = useState(null)
  console.log(currentUser);

  // const [formData, setFormData] = useState({
  //   file: null
  // })
  const [file, setFile] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [updateSuccess, setUpdateSuccess] = useState(false);



  const formData = new FormData();
    formData.append('file', file);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('password', password);
  // forData.firstName = currentUser.firstName
  // forData.lastName = currentUser.lastName
  // const [firstName, setFirstName] = useState(forData.firstName)

  // const handleChange = (e) => {
    
  //   setFormData({ ...formData, [e.target.id]: e.target.value })
  // }

  // const handleFileChange = (e) => {
  //   // setFile(e.target.files[0])
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     file: e.target.files[0].name,
  //   }));
  // }
  // formData.file = file
  console.log(formData);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(password !== confirmPassword){
        console.log("password and confirm password should be same");
        return;
      }
      dispatch(updateUserStart());
      const res = await fetch(`${backendUrl}/api/user/update/${currentUser._id}`, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        // body: JSON.stringify(formData),
        credentials: 'include',
        body: formData
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  console.log(formData);

  // for (const [key, value] of formData.entries()) {
  //   console.log(`${key}: ${value}`);
  // }


  return (
    <div>
      <div className=' flex flex-col items-center gap-5   '>
        <img src={currentUser?.profilePicture} alt="" className=' w-[11rem] h-[11rem] object-cover ' />
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden name="" id="" />
        <button  onClick={()=>fileRef.current.click()} className=' bg-blue-600 px-10 py-2 text-[#fff] text-[1.2rem] rounded-md font-semibold '>ছবি আপলোড করুন</button>
      </div>
      <div>
        <div className=' mb-10 mt-20 border-l-4 border-[#333] pl-4 '>
          <h3 className=' text-[1.5rem] font-semibold '>Profile Information</h3>
          <p className=' text-[1.2rem] text-[#3d3d3d] ' >Update your account's profile information and Password</p>
        </div>
        <form onSubmit={handleSubmit} className=' text-[1.3rem] flex flex-col gap-3 '>
          <div className=' flex gap-5 '>
          <div className=' flex-1 flex flex-col gap-1 text-[#585858] '>
            <label htmlFor="">First Name</label>
            <input onChange={(e)=>setFirstName(e.target.value)}  type="text" id='firstName' defaultValue={currentUser?.firstName} placeholder='First Name' className=' font-semibold outline-none py-2 px-3 w-full border rounded-md bg-blue-500/20 text-[#2e2e2e] placeholder:text-[#686868] ' />
          </div>
          <div className=' flex-1 flex-col flex gap-1 text-[#585858] '>
            <label htmlFor="">Last Name</label>
            <input onChange={(e)=>setLastName(e.target.value)} type="text" id='lastName' defaultValue={currentUser?.lastName} placeholder='Last Name' className=' font-semibold outline-none py-2 px-3 w-full border rounded-md bg-blue-500/20 text-[#2e2e2e] placeholder:text-[#686868] ' />
          </div>
          </div>
          {/* <div className=' flex flex-col gap-1 text-[#585858] '>
            <label htmlFor="">First Name</label>
            <input type="text" placeholder='First Name' className=' outline-none py-2 px-3 w-full border rounded-md bg-blue-500/20 text-[#2e2e2e] placeholder:text-[#2e2e2e] ' />
          </div> */}
          <div className=' flex flex-col gap-1 text-[#585858] '>
            <label htmlFor="">Phone No.</label>
            <input type="text" readOnly id='phoneNo' value={currentUser?.phoneNo} placeholder='Phone No.' className=' font-semibold outline-none py-2 px-3 w-full border rounded-md bg-blue-500/20 text-[#2e2e2e] placeholder:text-[#686868] ' />
          </div>
          <div className=' flex flex-col gap-1 text-[#585858] '>
            <label htmlFor="">Email</label>
            <input type="email" readOnly id='email' value={currentUser?.email} placeholder='Email' className=' font-semibold outline-none py-2 px-3 w-full border rounded-md bg-blue-500/20 text-[#2e2e2e] placeholder:text-[#686868] ' />
          </div>
          {/* <div className=' flex flex-col gap-1 text-[#585858] '>
            <label htmlFor="">Password</label>
            <input onChange={handleChange} id='password' type="password" placeholder='Password' className=' font-semibold outline-none py-2 px-3 w-full border rounded-md bg-blue-500/20 text-[#2e2e2e] placeholder:text-[#686868] ' />
          </div> */}
     
          <div className=' flex flex-col gap-1 text-[#585858] '>
            <label htmlFor="">New Password</label>
            <input onChange={(e)=>setPassword(e.target.value)} id='password' type="password" placeholder='New Password' className=' font-semibold outline-none py-2 px-3 w-full border rounded-md bg-blue-500/20 text-[#2e2e2e] placeholder:text-[#686868] ' />
          </div>
          <div className=' flex flex-col gap-1 text-[#585858] '>
            <label htmlFor="">Confirm Password</label>
            <input onChange={(e)=> setConfirmPassword(e.target.value)} type="password" placeholder='Confirm Password' className=' font-semibold outline-none py-2 px-3 w-full border rounded-md bg-blue-500/20 text-[#2e2e2e] placeholder:text-[#686868] ' />
          </div>
          <div>
            <button className=' bg-blue-500/70 text-[#fff] font-semibold text-[1.5rem] py-2 w-full mt-5 rounded-md '>Save</button>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default Profile