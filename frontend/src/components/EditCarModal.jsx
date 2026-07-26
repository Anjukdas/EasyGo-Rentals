import { useState, useEffect } from "react";

const EditCarModal = ({
  car,
  onClose,
  onUpdated,
}) => {
  const [form, setForm] =
    useState({
      name: "",
      brand: "",
      category: "",
      fuel: "",
      seats: "",
      pricePerDay: "",
      image: "",
    });

  useEffect(() => {
    if (car) {
      setForm({
        name: car.name || "",
        brand: car.brand || "",
        category: car.category || "",
        fuel: car.fuel || "",
        seats: car.seats || "",
        pricePerDay:
          car.pricePerDay || "",
        image: car.image || "",
      });
    }
  }, [car]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("brand", form.brand);
      formData.append("category", form.category);
      formData.append("fuel", form.fuel);
      formData.append("seats", form.seats);
      formData.append("pricePerDay", form.pricePerDay);

      // IMPORTANT: only append file if user selected new image
      if (form.image instanceof File) {
        formData.append("image", form.image);
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cars/${car._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Car updated successfully 🚗");

      onUpdated();
      onClose();

    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl p-6 w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-5">
          Edit Car
        </h2>

        <div className="space-y-3">

          <input
            name="name"
            value={form.name}
            onChange={
              handleChange
            }
            placeholder="Car Name"
            className="w-full border p-3 rounded"
          />

          <input
            name="brand"
            value={form.brand}
            onChange={
              handleChange
            }
            placeholder="Brand"
            className="w-full border p-3 rounded"
          />

          <input
            name="category"
            value={form.category}
            onChange={
              handleChange
            }
            placeholder="Category"
            className="w-full border p-3 rounded"
          />

          <input
            name="fuel"
            value={form.fuel}
            onChange={
              handleChange
            }
            placeholder="Fuel"
            className="w-full border p-3 rounded"
          />

          <input
            name="seats"
            value={form.seats}
            onChange={
              handleChange
            }
            placeholder="Seats"
            className="w-full border p-3 rounded"
          />

          <input
            name="pricePerDay"
            value={
              form.pricePerDay
            }
            onChange={
              handleChange
            }
            placeholder="Price"
            className="w-full border p-3 rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, image: e.target.files[0] })
            }
            className="w-full border p-3 rounded"
          />

        </div>

        <div className="flex gap-3 mt-6">

          <button
            onClick={
              onClose
            }
            className="flex-1 bg-gray-300 py-3 rounded"
          >
            Cancel
          </button>

          <button
            onClick={
              handleSave
            }
            className="flex-1 bg-blue-600 text-white py-3 rounded"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
};

export default EditCarModal;