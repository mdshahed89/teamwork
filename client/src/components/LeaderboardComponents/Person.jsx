import React from 'react'

function Person({rank, amount, name}) {
  return (
    <div className={` ${name ? null : 'hidden'} flex items-center justify-between bg-blue-400 rounded-md py-2 text-[#fff] px-3 `}>
        <div className=' flex items-center gap-8 ' >
        <h3 className=' text-[2.5rem] leading-tight font-bold text-yellow-400 '>{rank}</h3>
        <div className=' flex flex-col '>
            <h3 className=' text-[1.5rem] leading-tight font-semibold '>{name}</h3>
            <p className=' text-[1.2rem] '>Earned: 100 tk</p>
        </div>
        </div>
        <div className=' text-yellow-500 bg-yellow-100/30 px-5 py-2 rounded-lg text-[1.5rem] font-bold '>
            <h3>{amount} tk</h3>
        </div>
    </div>
  )
}

export default Person