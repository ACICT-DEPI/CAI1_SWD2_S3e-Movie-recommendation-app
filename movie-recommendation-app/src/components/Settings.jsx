import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

function Settings() {
  return (
    <div className=" ml-[340px] mt-24 text-white p-10 flex-row ">
      <table
        className=" bg-zinc-800 rounded-xl w-[65vw] 
          shadow-md shadow-slate-300 "
      >
        <h2 className="text-3xl mb-10 shadow-md rounded-xl p-4  bg-black shadow-gray-700">
          Profile
        </h2>
        <tr className=" flex flex-col mt-8 ml-8  w-[62vw] break-words text-wrap ">
          <td className=" text-3xl mb-5 ">Name:</td>
          <td className=" text-2xl ml-8  mb-8">Lojy</td>

          <td className=" text-3xl mb-5">Email:</td>
          <td className=" text-2xl ml-8 mb-9">lojy@gmail.com</td>
        </tr>
      </table>
    </div>
  );
}
export default Settings;
