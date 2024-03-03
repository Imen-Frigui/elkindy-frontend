const StatCard = ({ title, total, breakdown }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <div className="text-2xl font-bold">{total}</div>
            <div className="text-lg">{title}</div>
            <div className="w-full mt-2">
                {breakdown.map((item, index) => (
                    <div key={index} className="flex justify-between">
                        <span className="text-sm text-gray-600">{item.label}</span>
                        <span className="text-sm font-semibold">{item.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default StatCard;