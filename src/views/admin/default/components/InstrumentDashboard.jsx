import React, { useState, useEffect } from 'react';
import Card from "components/card";

function InstrumentDashboard() {
    const [products, setProducts] = useState([]);
    const [averagePrice, setAveragePrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('guitar');

    useEffect(() => {
        fetchInstruments();
    }, []);

    const fetchInstruments = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/courses/instruments?searchTerm=${searchTerm}`);
            const data = await response.json();
            if (response.ok) {
                setProducts(data.products);
                setAveragePrice(data.averagePrice);
            } else {
                throw new Error(data.message || "Error fetching data");
            }
        } catch (error) {
            console.error("Failed to fetch instruments:", error);
        }
        setLoading(false);
    };

    return (
        <Card extra="flex mt-5 flex-col gap-4 p-4 bg-white shadow rounded-lg">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold text-navy-700 dark:text-white">Instrument Dashboard</h1>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search term..."
                        className="px-4 py-2 border rounded"
                    />
                    <button onClick={fetchInstruments} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300">
                        Search
                    </button>
                </div>
            </div>
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-semibold">Results for: {searchTerm}</h2>
                    <p className="font-medium">Average Price: ${averagePrice.toFixed(2)}</p>
                    <ul className="flex flex-col gap-2">
                        {products.map((product, index) => (
                            <li key={index} className="p-2 bg-lightPrimary rounded shadow">
                                {product.name} - ${product.price}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Card>
    );
}

export default InstrumentDashboard;
