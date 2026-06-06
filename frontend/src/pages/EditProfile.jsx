import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    profilePic: ""
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("name", user.name);
  formData.append("phone", user.phone);
  formData.append("address", user.address);

  if (user.profilePic instanceof File) {
    formData.append("profilePic", user.profilePic);
  }

  const token = localStorage.getItem("token");

  try {
    const res = await fetch(
      "http://localhost:5000/api/users/update_profile",
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Update failed");
      return;
    }

    // update localStorage
    localStorage.setItem("user", JSON.stringify(data));

    alert("Profile updated successfully");

    // go back to profile page
    navigate("/profile");

  } catch (error) {
    console.log(error);
  }
};
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          Edit Profile
        </h2>

        <input
          name="name"
          value={user.name}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          placeholder="Name"
        />

        <input
          name="email"
          value={user.email}
          disabled
          className="w-full border p-3 rounded-lg bg-gray-100"
        />

        <input
          name="phone"
          value={user.phone}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          placeholder="Phone"
        />

        <input
          name="address"
          value={user.address}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          placeholder="Address"
        />

        <input
  type="file"
  onChange={(e) =>
    setUser({
      ...user,
      profilePic: e.target.files[0]
    })
  }
  className="w-full border p-3 rounded-lg"
/>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;