import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";

function Logout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      Swal.fire({
        icon: "success",
        title: "Bye Bye!",
        text: "You are successfully logged out.",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className=" ml-[340px] mt-24 text-white p-10 flex-row ">
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
          <button
            type="button"
            onClick={handleLogout} // Call the logout function on button click
            className=" bg-red-600 text-2xl rounded-xl w-[60vw] 
            shadow-md shadow-slate-300 p-3 mb-9"
          >
            Yes, Log Out
          </button>
        </tr>
      </table>
    </div>
  );
}

export default Logout;
