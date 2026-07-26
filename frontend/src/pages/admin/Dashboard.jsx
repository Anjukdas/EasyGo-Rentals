import {
useEffect,
useState,
} from "react";

import axios from "axios";



import StatsCard
from "../../components/StatsCard";

const Dashboard = () => {

const [stats,setStats]=
useState(null);

useEffect(() => {

const fetchStats =
async () => {

try {

const token =
localStorage.getItem(
"token"
);

const res =
await axios.get(
`${import.meta.env.VITE_API_URL}/api/admin/stats`,
{
headers:{
Authorization:
`Bearer ${token}`,
},
}
);

setStats(
res.data
);

} catch(err){

console.log(err);

}

};

fetchStats();

}, []);

if(!stats){
return (
<p className="p-10">
Loading...
</p>
);
}

return (

<div>


<div>

<h1
className="text-3xl font-bold mb-8"
>
Admin Dashboard
</h1>

<div
className="grid grid-cols-4 gap-5"
>

<StatsCard
title="Cars"
value={stats.totalCars}
color="blue"
/>

<StatsCard
title="Bookings"
value={stats.totalBookings}
color="green"
/>

<StatsCard
title="Users"
value={stats.totalUsers}
color="yellow"
/>

<StatsCard
title="Revenue"
value={`₹ ${stats.revenue}`}
color="red"
/>

</div>

</div>

</div>

);

};

export default Dashboard;