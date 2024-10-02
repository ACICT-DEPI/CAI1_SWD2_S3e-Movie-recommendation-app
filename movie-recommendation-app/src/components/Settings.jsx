import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useAuth } from "./authContext";

function Settings() {
  const { currentUser } = useAuth();  
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser?.uid) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log("No user document found!");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  return (
    <div className="ml-[340px] mt-24 text-white p-10 flex-row">
      <table className="bg-zinc-800 rounded-xl w-[65vw] shadow-md shadow-slate-300">
        <h2 className="text-3xl mb-10 shadow-md rounded-xl p-4 bg-black shadow-gray-700">
          Profile
        </h2>
        {userData && (
          <tr className="flex flex-col mt-8 ml-8 w-[62vw] break-words text-wrap">
            <td className="text-3xl mb-5">Name:</td>
            <td className="text-2xl ml-8 mb-8">{userData.username}</td>

            <td className="text-3xl mb-5">Email:</td>
            <td className="text-2xl ml-8 mb-9">{userData.email}</td>
          </tr>
        )}
      </table>
    </div>
  );
}

export default Settings;
