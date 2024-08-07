import { useState } from "react";

export default function Faq() {
  // add your array of object data
  const dataArr = [
    {
      title: "Team Work কী ?",
      description:
        'Team Work একটি সহজতম আয় করার প্লাটফর্ম ।',
    },
    {
      title: "Team Work একাউন্ট সক্রিয় করার জন্য ৫০০ টাকা কেনো নেওয়া হয় ?",
      description:
        "নিবন্ধন করার পর অ্যাকাউন্ট অ্যাক্টিভ করতে ৫০০ টাকা ফেরতযোগ্য সাবস্ক্রিপশন ফি প্রয়োজন। আমাদের প্ল্যাটফর্মের নিরাপত্তা নিশ্চিত করতে ও আপলাইন রেফারদের মাঝে ব্যবহৃত হয়। যেমন, এই সাবস্ক্রিপশন ফি একবার দেওয়া হয়ে গেলে আমরা ফেরত দিতে অক্ষম ।",
    },
    {
      title: "Team Work থেকে কি ভাবে আয় করা যায় ?",
      description:
        "Team Work ওয়েবসাইটে একটা একাউন্ট খোলার পর নির্দিষ্ট একটি এমাউন্ট প্রদান করে একাউন্ট এক্টিভ করলে। মোবাইল রিছার্জ, রেফার ও লিডার-বোডের মাধ্যমে দিনে হাজার হাজার টাকা আয় করতে পারবেন।",
    },
    {
      title: "Team Work কেন আপনাদের অর্থ প্রদান করে?",
      description:
        "আমাদের কাছে বিভিন্ন বিজ্ঞাপনদাতা রয়েছে। যারা অর্থের বিনিময়ে তাদের সোশ্যাল মিডিয়া পরিশেবাগুলি আমাদের প্রমোট করে। এই সমস্ত কাজের জন্য বিজ্ঞাপনদাতারা আমাদের চার্জ হিসেবে তারা নির্দিষ্ট এমাউন্টের টাকা প্রদান করেন। তারপর তাদের টার্গেট অনুযায়ী আপনাদের দারা কাজ সম্পন্ন করার পর আমাদের কিছু % লাভ রেখে বাকি % আপনাদের মজুরি হিসেবে দেওয়া হয়।",
    },
    {
      title: "Team Work এর রেফারেল সিস্টেম ব্যবহার করে কী ভাবে আয় করা যায় ?",
      description:
        'Team Work এ একাউন্ট খুলে, একাউন্ট এক্টিভ করে আপনি যদি আপনার রেফারেল লিংক কাউকে শেয়ার করেন, এবং সে যদি একাউন্ট খুলে একাউন্ট এক্টিভ করে তাহলে সাথে সাথে ১৫০ টাকা রেফার কমিশন পাবেন। এবং এই ভাবে ঠিক তৃতীয় জেনারেশন পর্যন্ত কমিশন পাবেন। প্রথম জেনারেশন ১৫০ টাকা, ২য় জেনারেশন ৮০ টাকা, ৩য় জেনারেশন ৫০ টাকা।',
    },
    {
      title: "আপনি কোন সমস্যার সম্মুখীন হলে কী করবেন ",
      description:
        'একাউন্ট এক্টিভেশন, Withdraw, Deposit এবং যে কোন সমস্যায়- আমাদের টেলিগ্রাম চ্যানেল সাথে যোগাযোগ করুন।',
    },
    {
      title: "Team Work থেকে কি ভাবে টাকা উত্তোলন করা যায় ?",
      description:
        'Team Work থেকে বিকাশ অথবা নগদ এর মাধ্যমে আপনার টাকা উত্তোলন করতে পারবেন, এবং প্রতি উত্তোলনে ৫ থেকে-১০ টাকা চার্জ টাকা হয়। ',
    }
  ];

  // toggle state and function
  const [isOpen, setIsOpen] = useState(null);
  const handleToggle = (idx) => {
    setIsOpen((prevIdx) => (prevIdx === idx ? null : idx));
  };

  return (
    <div className="flex w-full">
      <div className=" max-w-[550px] cursor-pointer space-y-6">
        {/* mapping each accordion  */}
        {dataArr.map((data, idx) => (
          <div
            key={idx}
            onClick={() => handleToggle(idx)}
            className="flex items-center"
          >
            {/* the index div  */}
            <div className="flex size-16 select-none items-center justify-center rounded-md bg-blue-500 px-4 py-3 text-2xl font-semibold text-white">
              <span>0{idx + 1}</span>
            </div>

            <div className="relative h-[2px] w-10 bg-blue-500">
              <span className="absolute -left-2 -top-[5px] z-40 h-3 w-3 rounded-full border-2 border-blue-500 bg-white"></span>
              <span className="h-1 w-10 bg-blue-500"></span>
              <span
                className={`absolute -right-2 -top-[5px] z-40 h-3 w-3 rounded-full border-2 ${
                  isOpen === idx
                    ? "border-blue-500 bg-white delay-100"
                    : "border-transparent"
                }`}
              ></span>
            </div>

            {/* main accordion div  */}
            <div className="text-center w-full ">
              <div className="relative max-w-[450px] border-t-[12px] border-blue-500 bg-sky-50 p-3 shadow-md ">
                <span className="absolute right-0 top-0 h-0 w-0 border-b-[40px] border-r-[40px] border-b-transparent border-r-blue-500"></span>
                <h1 className="select-none text-xl font-semibold text-zinc-700">
                  {data.title}
                </h1>
              </div>
              <div
                className={`grid overflow-hidden text-slate-600 transition-all duration-300 ease-in-out ${
                  isOpen === idx
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="max-w-[450px] bg-blue-500 p-6 text-xl text-white">
                    {data.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
