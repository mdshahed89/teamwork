import React, { useRef } from 'react'
import BkashLogo from "../../assets/BkashLogo.png"
import Offers from '../OfferComponents/Offers'
import op1 from "../../assets/op1.png"
import op2 from "../../assets/op2.png"
import op3 from "../../assets/op3.png"
import op4 from "../../assets/op4.png"
import op5 from "../../assets/op5.png"
import op6 from "../../assets/op6.png"
import op7 from "../../assets/op7.png"

function Work() {

  const fileref = useRef(null)

  return (
    <div>
      <div className=' text-[2rem] leading-tight border-b-8 pb-3 md:text-left text-center border-r-blue-100 '>
      <h3>Operator</h3>
      </div>
      <div className=' max-w-[500px] grid grid-cols-4 gap-5 mt-8 '>
        <div className=' cursor-pointer relative '>
          <img src={op1} alt="" className=' w-[10rem] h-[5rem] object-contain p-4 bg-slate-200 rounded-md ' />
         <Offers operator="gp" />
        </div>
        <div className=' cursor-pointer relative'>
          <img src={op2} alt="" className=' w-[10rem] h-[5rem] object-contain p-4 bg-slate-200 rounded-md ' />
          <Offers operator="robi" />
        </div>
        <div className=' cursor-pointer relative'>
          <img src={op3} alt="" className=' w-[10rem] h-[5rem] object-contain p-4 bg-slate-200 rounded-md ' />
          <Offers operator="airtel" />
        </div>
        <div className=' cursor-pointer relative'>
          <img src={op4} alt="" className=' w-[10rem] h-[5rem] object-contain p-4 bg-slate-200 rounded-md ' />
          <Offers operator="banglalink" />
        </div>
        <div className=' cursor-pointer relative'>
          <img src={op5} alt="" className=' w-[10rem] h-[5rem] object-contain p-4 bg-slate-200 rounded-md ' />
          <Offers operator="brilliant" />
        </div>
        <div className=' cursor-pointer relative'>
          <img src={op6} alt="" className=' w-[10rem] h-[5rem] object-contain p-4 bg-slate-200 rounded-md ' />
          <Offers operator="teletalk" />
        </div>
        <div className=' cursor-pointer relative'>
          <img src={op7} alt="" className=' w-[10rem] h-[5rem] object-contain p-4 bg-slate-200 rounded-md ' />
          <Offers operator="skitto" />
        </div>
      </div>
    </div>
  )
}

export default Work