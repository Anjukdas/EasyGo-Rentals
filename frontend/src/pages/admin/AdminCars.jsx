import { useEffect, useState } from "react";
import axios from "axios";
import EditCarModal from "../../components/EditCarModal.jsx";


const AdminCars = () => {
    const [cars, setCars] = useState([]);

    const [form, setForm] = useState({
        name: "",
        brand: "",
        category: "",
        pricePerDay: "",
        image: "",
    });

    // 👉 Modal states
    const [selectedCar, setSelectedCar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const token = localStorage.getItem("token");

    const fetchCars = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars`);
            setCars(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddCar = async (e) => {
        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("name", form.name);
            formData.append("brand", form.brand);
            formData.append("category", form.category);
            formData.append("pricePerDay", form.pricePerDay);
            formData.append("image", form.image); // file

            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/cars`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            fetchCars();

            setForm({
                name: "",
                brand: "",
                category: "",
                pricePerDay: "",
                image: "",
            });
        } catch (err) {
            alert("Add failed");
        }
    };

    const deleteCar = async (id) => {
        if (!window.confirm("Delete car?")) return;

        try {
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/cars/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchCars();
        } catch (err) {
            alert("Delete failed");
        }
    };

    // 👉 OPEN EDIT MODAL
    const handleEdit = (car) => {
        setSelectedCar(car);
        setIsModalOpen(true);
    };

    return (
         <div className="flex">

       

        <div className="flex-1 p-8">

            <h1 className="text-3xl font-bold mb-6">
                Manage Cars 🚗
            </h1>

            {/* ADD CAR FORM */}
            <form
                onSubmit={handleAddCar}
                className="grid grid-cols-2 gap-3 bg-white p-5 rounded shadow"
            >
                <input
                    name="name"
                    placeholder="Car Name"
                    value={form.name}
                    onChange={handleChange}
                    className="border p-2"
                />

                <input
                    name="brand"
                    placeholder="Brand"
                    value={form.brand}
                    onChange={handleChange}
                    className="border p-2"
                />

                <input
                    name="category"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                    className="border p-2"
                />

                <input
                    name="pricePerDay"
                    placeholder="Price"
                    value={form.pricePerDay}
                    onChange={handleChange}
                    className="border p-2"
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setForm({ ...form, image: e.target.files[0] })
                    }
                    className="border p-2"
                />

                <button className="bg-blue-600 text-white p-2 rounded">
                    Add Car
                </button>
            </form>

            {/* TABLE */}
            <div className="mt-8">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cars.map((car) => (
                            <tr key={car._id} className="border-b">
                                <td>{car.name}</td>
                                <td>{car.brand}</td>
                                <td>₹{car.pricePerDay}</td>

                                <td className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(car)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteCar(car._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* EDIT MODAL */}
            {isModalOpen && selectedCar && (
                <EditCarModal
                    car={selectedCar}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedCar(null);
                    }}
                    onUpdated={() => {
                        fetchCars();
                        setIsModalOpen(false);
                        setSelectedCar(null);
                    }}
                />
            )}
        </div>
        </div>
        
    );
    
};

export default AdminCars;