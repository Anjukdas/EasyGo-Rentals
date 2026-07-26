import { useEffect, useState } from "react";
import axios from "axios";


const AdminBookings = () => {

  const [bookings, setBookings] = useState([]);

  const token = localStorage.getItem("token");


  const fetchBookings = async () => {

    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/bookings/admin/all`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      setBookings(res.data);


    } catch(error){

      console.log(error);

    }

  };


  useEffect(()=>{

    fetchBookings();

  },[]);



  const updateStatus = async(id,status)=>{

    try{

      await axios.put(

        `${import.meta.env.VITE_API_URL}/api/bookings/admin/${id}/status`,

        {
          status
        },

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );


      fetchBookings();


    }catch(error){

      console.log(error);

    }

  };



  const deleteBooking = async(id)=>{


    if(!window.confirm("Delete this booking?"))
      return;


    try{


      await axios.delete(

        `${import.meta.env.VITE_API_URL}/api/bookings/admin/${id}`,

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );


      fetchBookings();


    }catch(error){

      console.log(error);

    }


  };



  return (

    <div>


      <h1 className="text-3xl font-bold mb-6">
        Manage Bookings
      </h1>



      <div className="overflow-x-auto">


      <table className="w-full border">


        <thead className="bg-slate-200">


          <tr>

            <th className="p-3">
              User
            </th>

            <th>
              Car
            </th>

            <th>
              Dates
            </th>

            <th>
              Price
            </th>

            <th>
              Payment
            </th>

            <th>
              Status
            </th>

            <th>
              Action
            </th>


          </tr>


        </thead>



        <tbody>


        {
          bookings.map((booking)=>(


            <tr 
              key={booking._id}
              className="border-t text-center"
            >


              <td className="p-3">

                <p>
                {booking.user?.name}
                </p>

                <small>
                {booking.user?.email}
                </small>

              </td>



              <td>

                {booking.car?.brand} {booking.car?.name}

              </td>



              <td>

                {new Date(
                  booking.pickupDate
                ).toLocaleDateString()}

                <br/>

                to

                <br/>

                {new Date(
                  booking.dropDate
                ).toLocaleDateString()}


              </td>



              <td>

                AED {booking.totalPrice}

              </td>



              <td>

                <span className={
                  booking.paymentStatus==="Paid"
                  ?
                  "text-green-600"
                  :
                  "text-red-600"
                }>

                {booking.paymentStatus}

                </span>


              </td>




              <td>


                <select

                  value={
                    booking.bookingStatus
                  }

                  onChange={(e)=>
                    updateStatus(
                      booking._id,
                      e.target.value
                    )
                  }

                  className="border p-2 rounded"

                >

                  <option>
                    Pending
                  </option>

                  <option>
                    Confirmed
                  </option>

                  <option>
                    Completed
                  </option>

                  <option>
                    Cancelled
                  </option>


                </select>


              </td>




              <td>


                <button

                onClick={()=>
                  deleteBooking(
                    booking._id
                  )
                }

                className="bg-red-600 text-white px-3 py-1 rounded"

                >

                Delete

                </button>


              </td>



            </tr>


          ))
        }


        </tbody>


      </table>


      </div>


    </div>

  );

};


export default AdminBookings;