import React from 'react'
import DashboardImg from "../../assets/DashboardImg.png"
import { FaTelegram } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Overview() {
  return (
    <div>
      <div className=' w-[90%] mx-auto '>
        <img src={DashboardImg} alt="" className=' w-full mx-auto object-cover ' />
      </div>
      <div>
        <p className=' text-base md:text-[1.3rem] md:text-left text-center leading-8 md:leading-10 '>আসসালামুয়ালাইকুম/আদাব, প্রিয় গ্রাহক teamworkme.com একটি Macro Job ও SMM পরিষেবা প্রদানকারী নেটওয়ার্ক। এখানে আপনি ছোট ছোট টাস্কের কাজ করে ও রেফার করে দিনে হাজার হাজার টাকা ইনকাম করতে পারবেন। আমাদের নেটওয়ার্কের ১ম থেকে ৩য় প্রজন্ম পর্যন্ত রেফার কমিশন দেওয়া হয়: প্রথম জেনারেশন রেফার কমিশন ৳২৫ টাকা, দ্বিতীয় জেনারেশন রেফার কমিশন ৳১৩ টাকা, তৃতীয় জেনারেশন রেফার কমিশন ৳৭ টাকা। teamworkme.com নেটওয়ার্কে কাজের শুরুতে এক্টিভেশন ফি- হিসেবে 500 টাকা প্রদান করে একাউন্ট এক্টিভ করে কাজ শুরু করতে হয়, এই অর্থ শুধু মাত্র ওয়েবসাইটের প্রশাসনিক খরচ নিরাপত্তা ও অখন্ডতা নিশ্চিত করতে ও গরীব অসহায়দের মাঝে ব্যবহৃত হয়। যেমন, এই এক্টিভেশন চার্জ একবার দেওয়া হয়ে গেলে আমরা ফেরত দিতে অক্ষম। #প্রশ্ন হচ্ছে : আমরা কেন আপনাদের কাছ থেকে কাজ করিয়ে নিয়ে টাকা দেই? এবং আমরা আপনাদের টাস্কের কাজ গুলো কোথায় পাই? #উত্তর : আমাদের নিজস্ব বিজ্ঞাপনদাতা রয়েছে, তারা বিভিন্ন প্লাটফর্ম থেকে ছোট ছোট কাজ গুলো সংগ্রহ করে আমাদের দিয়ে থাকে এবং সেই কাজ গুলো নিখুঁত ভাবে আপনাদের কাছ থেকে করিয়ে নিয়ে থাকি এবং সেই কাজের বিনিময়ে আমরা ১০০% পেমেন্ট পাই, যা থেকে আপনাদের 70% ইনকাম দেওয়া হয়, বাকি ৩০% আমাদের নেটওয়ার্কের লাভের অংশ। নতুন নতুন আপডেট সবার আগে পেতে নিচের টেলিগ্রাম আইকন এ ক্লিক করে, আমাদের অফিশিয়াল টেলিগ্রাম চ্যানেল Subscribe করুন।</p>
        <div className=' flex flex-col justify-center w-full items-center mt-9 '>
        <Link to={"https://t.me/team_work_official"} target='_blank'>
        <FaTelegram className=' text-blue-400 text-[4rem] ' />
        </Link>
        <p className=' text-center text-[1.6rem] mt-3 '>Stay updated with the latest news and discussions in our Telegram channel.</p>
        <p className=' text-center text-[2.5rem] leading-tight '>Join our Team Work official telegram channel</p>
        </div>
        <div className=' text-[2rem] bg-blue-500 py-1 rounded-md text-[#fff] text-center my-5 '>
          <Link to={"https://t.me/team_work_official"} className='' target='_blank'>Join Now</Link>
        </div>
      </div>
    </div>
  )
}

export default Overview