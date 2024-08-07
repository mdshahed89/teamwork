import React, { useEffect, useState } from 'react'
import ProfileImg from "../../assets/ProfileImg.jpg"
import Person from './Person'
import { useSelector } from 'react-redux'

function AfterJoin() {

  const {currentUser} = useSelector(state => state.user)
  const defaultImg = "https://i.imghippo.com/files/Cs0om1722879424.jpg"

  const [datas, setDatas] = useState({})

  const [topMembers, setTopMembers] = useState({})

  datas.userId = currentUser?._id
  datas.referrelId = currentUser?.phoneNo
  console.log(datas);


 useEffect(()=> {

  const handleTopMember = async () => {

    try {
      const res = await fetch("/api/leaderboard/top", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datas),
      })
      const data = await res.json()
      console.log(data);
      if(data.success === false){
        console.log("error of fetching data of top members in leaderboard");
      }
      setTopMembers(data)
      console.log("top leaderboard member data fetched successfully");
    } catch (error) {
      console.log("error when fetching data of top members in leaderboard");
    }


  }
  handleTopMember()

 }, [currentUser._id])

  return (
    <div>
        <div className='  max-w-[450px] px-[2%] py-6 bg-gradient-to-b from-blue-600 to-white drop-shadow-lg mt-6 rounded-md text-center  '>
        <div className=' flex items-center justify-center gap-5 mt-10 '>
            <div>
                <img src={topMembers[1]?.profilePicture ? topMembers[1].profilePicture : defaultImg} alt="" className=' w-[8rem] h-[8rem] object-cover rounded-full ' />
                <div>
                <p className=' text-[1.3rem] font-semibold text-[#fff] '>{topMembers[1]?.name}</p>
                <p className=' text-[1.1rem] text-yellow-300 font-semibold '>Earned: 3000 tk</p>
                </div>
            </div>
            <div>
                <img src={topMembers[0]?.profilePicture} alt="" className=' w-[8rem] h-[8rem] object-cover -mt-[80%] rounded-full ' />
                <div>
                <p className=' text-[1.3rem] font-semibold text-[#fff] '>{topMembers[0]?.name}</p>
                <p className=' text-[1.1rem] text-yellow-300 font-semibold '>Earned: 5000 tk</p>
                </div>
            </div>
            <div>
                <img src={topMembers[2]?.profilePicture ? topMembers[2].profilePicture : defaultImg} alt="" className=' w-[8rem] h-[8rem] object-cover rounded-full ' />
                <div>
                <p className=' text-[1.3rem] font-semibold text-[#fff] '>{topMembers[2]?.name}</p>
                <p className=' text-[1.1rem] text-yellow-300 font-semibold '>Earned: 2000 tk</p>
                </div>
            </div>
        </div>
        <div className="  mt-10 mb-5 ">
          <h3 className=' text-[1.3rem] font-semibold '>17D:05H:52M:44S</h3>
          <p className=' text-[1.1rem] mt-3 '>You have earned 0 tk in this round and your ranking is 11th </p>
        </div>
    </div>
    <div className=' flex flex-col gap-4 max-w-[450px] px-[2%] py-6 bg-gradient-to-b from-blue-600 to-white drop-shadow-lg mt-3 rounded-md '>
        <Person rank="04" amount="1500" name={topMembers[3]?.name} />
        <Person rank="05" amount="1000" name={topMembers[4]?.name} />
        <Person rank="06" amount="800" name={topMembers[5]?.name} />
        <Person rank="07" amount="600" name={topMembers[6]?.name} />
        <Person rank="08" amount="400" name={topMembers[7]?.name} />
        <Person rank="09" amount="200" name={topMembers[8]?.name} />
        <Person rank="10" amount="100" name={topMembers[9]?.name} />
    </div>
    </div>
  )
}

export default AfterJoin