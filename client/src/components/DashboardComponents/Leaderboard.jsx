import React, { useEffect, useState } from "react";
import { MdLeaderboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"

import BeforeJoin from "../LeaderboardComponents/BeforeJoin";
import AfterJoin from "../LeaderboardComponents/AfterJoin";

function Leaderboard() {

  const {currentUser} = useSelector(state => state.user)

  const [joined, setJoined] = useState(currentUser.joined)

  useEffect(()=> {
    setJoined(currentUser.joined)
  }, [currentUser.joined])
  // console.log(joined);

  return (
    <div>
      <div className=" max-w-[450px] bg-gradient-to-b from-blue-600 to-blue-300 rounded-md px-[2%] py-[2%] shadow-xl flex flex-col gap-3  ">
        <div className=" flex items-center gap-2 text-[#fff] text-[1.4rem] font-semibold ">
          <MdLeaderboard />
          <p>Number of Awards: 0</p>
        </div>
        <div className=" flex items-center gap-2 text-[#fff] text-[1.4rem] font-semibold ">
          <MdLeaderboard />
          <p>Total prizes: $0</p>
        </div>
      </div>

      {
        joined ? <AfterJoin /> : <BeforeJoin setJoined={setJoined} />
      }
      
    </div>
  );
}

export default Leaderboard;
