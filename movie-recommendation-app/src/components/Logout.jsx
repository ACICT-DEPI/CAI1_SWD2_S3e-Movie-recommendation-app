import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

function Logout() {

  return (
    <div className=" ml-[340px] mt-24 text-white p-10 flex-row ">
      <form onSubmit={()=>{Swal.fire({
					icon: "success",
					title: "Bye Bye!",
					text: "You are successfully logged out.",
				}); } }>
        <table
          className=" bg-zinc-800 rounded-xl w-[65vw] 
          shadow-md shadow-slate-300 "
        >
          <h2 className="text-3xl mb-10 shadow-md rounded-xl p-4 bg-black shadow-gray-700">
            Log Out
          </h2>
          <tr className=" flex flex-col mt-8 ml-8">
            <td className=" text-3xl mb-9 ">
              Are you sure that you want to log out?
            </td>
            <Link to="/">
              <button
                type="button"
                className=" bg-red-600 text-2xl rounded-xl w-[60vw] 
          shadow-md shadow-slate-300 p-3 mb-9"
              >
                Yes, Log Out
              </button>
            </Link>
          </tr>
        </table>
      </form>
    </div>
  );
}
export default Logout;
