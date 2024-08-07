import { useState } from 'react';
import { FaXmark } from "react-icons/fa6";
import Recharge from './Recharge';
import Packs from './Packs';
import DataPacks from './DataPacks';
import MinutePacks from './MinutePacks';
import BundlePacks from './BundlePacks';

export default function Offers({operator}) {
    const [openModal, setOpenModal] = useState(false);
    const [packs, setPacks] = useState("topup")
    return (
        <div className="mx-auto w-fit">
            <button onClick={() => setOpenModal(true)} className="rounded-md border absolute w-full h-full top-0 left-0   text-zinc-500 ">
                
            </button>
            <div onClick={() => setOpenModal(false)} className={`fixed z-[100] w-screen ${openModal ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 grid place-items-center  bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}>
                <div onClick={(e_) => e_.stopPropagation()} className={`absolute max-w-[550px] rounded-lg bg-white  drop-shadow-lg  dark:text-black ${openModal ? 'opacity-1 duration-300' : 'scale-110 opacity-0 duration-150'}`}>
                    <div className=' flex items-center rounded-t-md bg-blue-600 text-[#fff] pl-4 '>
                        <div className=' flex items-center '>
                            <h3 onClick={()=> setPacks("topup")} className=' px-3 py-2 text-[1.2rem] hover:bg-blue-400 '>Top Up</h3>
                            <h3 onClick={()=> setPacks("datapack")} className=' px-3 py-2 text-[1.2rem] hover:bg-blue-400 '>Data Pack</h3>
                            <h3 onClick={()=> setPacks("minutepack")} className=' px-3 py-2 text-[1.2rem] hover:bg-blue-400 '>Minute Pack</h3>
                            <h3 onClick={()=> setPacks("bundlepack")} className=' px-3 py-2 text-[1.2rem] hover:bg-blue-400 '>Bundle Pack</h3>
                        </div>
                    <div onClick={()=>setOpenModal(false)} className=' px-2 rounded-tr-md py-3 h-full text-[1.5rem] bg-slate-700 hover:bg-red-500 text-[#fff]   '>
                        <FaXmark />
                    </div>
                    </div>

                    <div>
                        {
                            packs==="topup" ? <Recharge operator={operator} /> : packs==="datapack" ? <DataPacks operator={operator} packTitle="datapack" /> : packs==="minutepack" ? <MinutePacks operator={operator} packTitle="minutepack"/> : <BundlePacks operator={operator} packTitle="bundlepack" />
                        }
                    </div>
                    
                </div>
            </div>
        </div>
  );
}