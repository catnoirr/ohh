import React, { useState } from 'react';
// import Right from "../../../public/assets/Right"

// Sample data for campaigns
const campaignData = [
    { id: 'ABCGDYHJB', name: 'ABCGDYHJB', impressions: 163, date: '12-03-2024' },
    // Add more rows of data
    // Repeat or generate more dummy data as needed
];

// Define items per page
const itemsPerPage = 5;

const VendorsCard3 = () => {
    const [currentPage, setCurrentPage] = useState(1);

    // Get current data to display based on pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = campaignData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(campaignData.length / itemsPerPage);

    // Pagination click handler
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-sm font-semibold mb-4 text-gray-700">List of Campaigns Participated</h2>
            <table className="w-full text-left border-collapse text-sm">
                <thead>
                    <tr className="text-oohpoint-tertiary-1 font-medium text-[14px]">
                        <th className="px-4 py-2">Campaign ID</th>
                        <th className="px-4 py-2">Campaign Name</th>
                        <th className="px-4 py-2">Impressions</th>
                        <th className="px-4 py-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((campaign, index) => (
                        <tr key={index} className="hover:bg-gray-100 text-oohpoint-primary-2 text-[12px] font-normal">
                            <td className="px-4 py-1">{campaign.id}</td>
                            <td className="px-4 py-1">{campaign.name}</td>
                            <td className="px-4 py-1">{campaign.impressions}</td>
                            <td className="px-4 py-1">{campaign.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-end items-center mt-4 space-x-2">
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={`px-3 py-1 rounded ${
                            currentPage === i + 1
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-purple-300'
                        } text-sm`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-purple-300 text-sm"
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default VendorsCard3;
