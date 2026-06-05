import { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (!user) {
    return <p className="text-center mt-10">No user found</p>;
  }

  return (
    <div className="flex justify-center mt-20">
      <div className="bg-white shadow-lg p-6 rounded-xl w-96">

        <h2 className="text-2xl font-bold mb-4">
          Edit Profile
        </h2>

        <p className="mb-2">
          <b>Name:</b> {user.name}
        </p>

        <p className="mb-2">
          <b>Email:</b> {user.email}
        </p>

        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg">
          Update Profile (Coming Soon)
        </button>

      </div>
    </div>
  );
};

export default Profile;