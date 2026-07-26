import { useEffect, useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/get_profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        console.log(data);

        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-start pt-28 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32 relative">
          <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2">
            <img
              src={
                user.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Content */}
        <div className="pt-16 pb-8 px-6">
          <h2 className="text-2xl font-bold text-center text-slate-800">
            {user.name}
          </h2>

          <p className="text-center text-slate-500 mb-6">
            Car Rental Customer
          </p>

          <div className="space-y-4">

            <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-3">
              <FaEnvelope className="text-blue-600" />
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-3">
              <FaPhone className="text-green-600" />
              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p className="font-medium">
                  {user.phone || "Not Added"}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-3">
              <FaMapMarkerAlt className="text-blue-600 text-xl" />

              <div>
                <p className="text-sm text-slate-500">Address</p>
                <p className="font-medium">
                  {user.address || "Not Added"}
                </p>
              </div>
            </div>

          </div>

          <button
  onClick={() => navigate("/edit-profile")}
  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
>
  Edit Profile
</button>
        </div>
      </div>
    </div>
  );

};

export default Profile;