const StatsCard = ({
title,
value,
color
}) => {
return (
<div
className={`bg-${color}-100 p-6 rounded-xl shadow`}
>

<h3 className="text-gray-500">
{title}
</h3>

<h1
className={`text-4xl font-bold text-${color}-600`}
>
{value}
</h1>

</div>
);
};

export default StatsCard;