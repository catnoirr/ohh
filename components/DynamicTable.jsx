import React from "react";
import { IoEye } from "react-icons/io5";

const DynamicTable = ({
  headings = ["Name", "ID", "Phone Number", "Date", "Number of Campaigns"],
  data,
  functionn,
  view,
}) => {

  // Get the data to display for the current page
  const paginatedData = [...data] // Create a shallow copy of the data
    .reverse(); // Reverse the copied array

  return (
    <div className="w-full rounded-2xl p-2">
      {/* Table Headings */}
      <div className="flex bg-oohpoint-grey-100 text-black rounded-lg text-sm uppercase font-semibold">
        {headings.map((heading, index) => (
          <div key={index} className="flex-1 py-2 px-1 text-center my-auto text-[0.6rem]">
            {heading}
          </div>
        ))}
      </div>

      {/* Table Rows */}
      <div className=" text-[0.6rem]">
        {paginatedData.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex border-t px-4 border-gray-200 hover:shadow-lg hover:scale-[1.02] rounded-2xl transition-all ${
              rowIndex % 2 === 0
                ? "bg-oohpoint-grey-200 shadow-[-4px_0_4px_-5px_rgba(0,0,0,0.3),4px_0_4px_-5px_rgba(0,0,0,0.3)]"
                : "bg-white"
            }`}
          >
            {Object.values(row).map((value, valueIndex) => (
              <div
                key={valueIndex}
                className="flex-1 py-2 px-1 text-center font-thin text-gray-800 my-auto "
              >
                {typeof value === "string" &&
                (value.includes("Know more") ||
                  value.includes("Assign") ||
                  value.includes("Insights") ||
                  value === "Reopen") ? (
                  <button
                    onClick={() => functionn(row.id)}
                    className=" bg-oohpoint-grey-300 text-oohpoint-primary-2 py-1 px-4 rounded-full text-[0.6rem] my-auto"
                  >
                    {value}
                  </button>
                ) : typeof value === "string" && value.includes("https") ? (
                  <QRCodeGenerator value={value} />
                ) : typeof value === "string" && value.includes("View") ? (
                  <div className=" cursor-pointer" onClick={() => view(row.id)}>
                    <IoEye className=" text-xl" />
                  </div>
                ) : typeof value === "string" && value.includes("Coupons") ? (
                  <button
                    onClick={() => view(row.id)}
                    className=" bg-oohpoint-grey-300 text-oohpoint-primary-2 py-1 px-4 rounded-full text-[0.6rem] my-auto"
                  >
                    {value}
                  </button>
                ) : (
                  value
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicTable;
