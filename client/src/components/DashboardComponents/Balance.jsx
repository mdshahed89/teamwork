import React, { useState } from 'react'
import Payment from '../BalanceComponents/Payment.jsx'
import { useSelector } from 'react-redux'

function Balance() {

  const [activeAccount, setActiveAccount] = useState(true)
  const {currentUser} = useSelector(state => state.user)
  const [historyOpen, setHistoryOpen] = useState(false)


  return (
    <div className='  '>
      <div className=' max-w-[500px] bg-gradient-to-b from-blue-600 to-white rounded-md p-[1%] shadow-xl '>
        <h3 className=' text-[#fff] text-[2rem] font-bold mb-4 '>My Wallet</h3>
        {
          activeAccount ? 
          <div>
            <h3 className='  text-[2rem] font-semibold text-black '>BDT: {currentUser?.balance}</h3>
            <p className=' text-[#7a7a7a] '>Available Balance</p>
            <div className=' flex items-center gap-5 mt-5 '>
              <div>
                <div className=' text-[1.3rem] px-8 font-semibold py-2 rounded-md bg-slate-700 text-[#fff] '><Payment title="Withdraw" typ="withdraw" /></div>
              </div>
              <div>
              <div className=' text-[1.3rem] px-8 font-semibold py-2 rounded-md bg-blue-700 text-[#fff] '><Payment title="Deposit" typ="deposit" /></div>
              </div>
              <div>
              <div onClick={()=>setHistoryOpen(!historyOpen)} className=' text-[1.3rem] px-8 font-semibold py-2 rounded-md bg-slate-700 text-[#fff] '>Transaction History</div>
              </div>
            </div>
          </div> : 
          
          <div className=' text-[1.5rem] font-semibold text-red-500 '>
               <h3>আপনার একাউন্ট টি এই মুহূর্তে ইনাক্টিভ অবস্থায় আছে! আপনি যদি আপনার ব্যালান্স উত্তোলন করতে চান তবে একাউন্ট টি একটিভ করুন</h3>
          </div>
        }
      </div>

      {
        historyOpen && <div className=' max-w-[500px] bg-gradient-to-b from-blue-600 to-white rounded-md p-[1%] shadow-xl  '>
          <h3 className=' text-[1.4rem] font-semibold '>History: </h3>
        </div>
      }

    </div>
  )
}

export default Balance