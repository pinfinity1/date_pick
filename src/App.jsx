import { useEffect, useState } from "react";
import data from "./data";
import { useDispatch, useSelector } from "react-redux";
import { choose, doneDate } from "../redux/dateSlice";

function App() {
  const [dates, setDates] = useState();
  const [datePicked, setDatePicked] = useState();
  const [checkDisable, setCheckDisable] = useState(false);
  const [show, setShow] = useState(false);

  const store = useSelector((store) => store.date);
  const dispath = useDispatch();

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    setDates(structuredClone(data));
  }, []);

  const handleShowDate = () => {
    const randomeDate = shuffle(dates);
    setDatePicked(randomeDate[0]);
    dispath(choose(randomeDate[0]));
    setCheckDisable(true);
  };

  const handleDoneCheckBox = (e) => {
    e.preventDefault();
    const index = dates.findIndex((item) => item.id == datePicked.id);
    dates.splice(index, 1);
    dispath(doneDate(datePicked));
    setDatePicked("");
    dates.length == 0 && setShow(true);
  };

  const submitFinish = (e) => {
    e.preventDefault();
    setShow(false);
    setDates(structuredClone(data));
  };

  return (
    <div
      dir="rtl"
      className=" w-screen lg:h-screen font-iransans"
      id="background"
    > 
      <div className="container mx-auto flex flex-col lg:flex-row justify-center items-center gap-4 w-full h-full px-5">
        <div className="w-full lg:w-1/3 flex flex-col md:flex-row lg:flex-col justify-between items-center md:pt-5 lg:pt-0">
          <div className="w-full sm:w-fit bg-gray-100 text-md rounded-md shadow-xl p-5 flex flex-col justify-center mt-8 mb-12 ">
            <p>خیلی ساده</p>
            <p className=" whitespace-nowrap mt-10 text-xl sm:text-2xl font-iransansb bg-gradient-to-l from-[#2f5793] via-[#c5a987] to-[#9a7125] text-transparent bg-clip-text animate-gradient">
              آبی با تمام وجود دوست دارم.
            </p>
          </div>
          <div className="w-full md:w-1/3 lg:w-full bg-gray-100 rounded-md shadow p-5 flex flex-col justify-center">
            <p className=" font-iransansb">راهنما :</p>
            <p className="text-justify mt-2">
              این چیزی که درست کردم و خیلی دوسش دارم راجبه اینه که ما میتونیم
              تعدادی دیت بریم که نمیدونیم چی هستن ولی شانسی انتخاب میکنیم ،
              انجامش میدیم و خب هر جایی که تونستیم یه عکس و یه نوشته ازش بجا
              میزاریم.
            </p>
            <p>انتخاب کنید</p>
          </div>
        </div>
        <div className="w-full md:w-2/3 flex flex-col justify-betweens mt-5">
          <div className="w-full flex justify-center ">
            <button
              disabled={datePicked?.status === "pending"}
              onClick={handleShowDate}
              className={`px-8 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-iransansl ${
                datePicked?.status === "pending" &&
                "bg-gray-700 hover:bg-gray-950 cursor-not-allowed"
              }`}
            >
              انتخاب کن
            </button>
          </div>
          {checkDisable ? (
            <div className="w-full md:w-[90%] lg:w-[80%] mx-auto h-full bg-blue-100 rounded-lg shadow mt-4 mb-12">
              <div className="w-full flex items-center justify-center gap-2 py-4 shadow-md border-b border-blue-400">
                <p>your date</p>
              </div>
              <div className="flex flex-col justify-center items-center px-7 py-5 text-justify">
                <p>{datePicked?.dateDetail}</p>
                {datePicked?.status !== "pending" && (
                  <div className="mt-3 bg-gray-300 rounded-full w-8 h-8 flex justify-center items-center">
                    <img src="/images/check.svg" alt="check" className="" />
                  </div>
                )}
                {datePicked?.status === "pending" && (
                  <div className="flex items-center mt-5">
                    <input
                      onChange={handleDoneCheckBox}
                      type="checkbox"
                      className="w-4 h-4 rounded cursor-pointer"
                    />
                    <label className="mr-2 text-sm font-medium ">
                      انجام شد ;)
                    </label>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full flex justify-center items-center bg-[#2f5793] py-2 text-sm text-[#c5a987]">
        <p>نوشته شده توسط فردی به اسم احسوون </p>
      </div>
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 p-5">
          <div className=" relative w-full h-full bg-blue-200 rounded-lg">
            <div className="p-8">
              <p className=" text-justify">
                سلام بچه ها
                <br />
                مرسی از اینکه همراهی کردین،
                <br />
                اگر این رو میخونید من تو شرایط خوبی این فکرو پیاده نکردم نمیدونم
                شاید فرصت نشد با‌آبی اینکاررو انجام بدم،
                <br />
                شاید دیگه کنارم نباشه
                <br /> کسی که میتونیم بگم با تمام وجودم دوسش دارم
                <br />
                کسی که میتونم بگم مهربون‌ترین آدمیه که میشناسم
                <br />
                کسی که میتونم بگم قشتگ‌ترین چشمای دنیارو داره
              </p>
              <p className="mt-4 leading-7 pr-4">
                باور کن تو را دوست دارم
                <br /> صدای مرا نقاشی کن
                <br /> دلتنگ توام اندوهِ مرا نقاشی کن
                <br /> به تو می اندیشم در غم دیگران
                <br /> پندارِ مرا نقاشی کن
                <br />
                گفتی در خلایی که هوا نیست نه من تو را می خوانم نه تو مرا می
                شناسی
                <br /> برایم چراغی بیاور بی نور چگونه نقاشی کنم ؟
              </p>
              <p className="pr-4 mt-2 font-semibold">محمدابراهیم جعفری</p>
            </div>
            <div className=" absolute bottom-5 w-full flex justify-center">
              <button
                onClick={submitFinish}
                className="px-8 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-iransansl"
              >
                تمام
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
