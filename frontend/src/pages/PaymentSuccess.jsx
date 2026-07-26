import {
useEffect
} from "react";

import {
useNavigate
}
from "react-router-dom";

const PaymentSuccess = () => {

const navigate =
useNavigate();

useEffect(() => {

const update =
async()=>{

try{

const params =
new URLSearchParams(
window.location.search
);

const bookingId =
params.get(
"bookingId"
);

const token =
localStorage.getItem(
"token"
);

if(
!bookingId
){
navigate("/");
return;
}

const res =
await fetch(
`${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}/pay`,
{
method:
"PUT",

headers:{
Authorization:
`Bearer ${token}`
}
}
);

const data =
await res.json();

alert(
`Payment Successful 🎉
Transaction ID:
${data.booking.transactionId}`
);

navigate(
"/my-bookings"
);

}
catch(err){

alert(
"Payment verification failed"
);

navigate(
"/"
);

}

};

update();

},[]);

return (
<div className="
h-screen
flex
justify-center
items-center
">

<h2 className="
text-2xl
font-bold
text-green-600
">
Processing Payment...
</h2>

</div>
);

};

export default PaymentSuccess;