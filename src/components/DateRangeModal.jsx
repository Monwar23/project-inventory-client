import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangeModal = ({ show, handleClose, handleDownload }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSubmit = () => {
    handleDownload(startDate, endDate);
    handleClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Select Date Range</h2>
        <div className="flex flex-col gap-4">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
            className="border px-3 py-2 rounded-lg"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            placeholderText="End Date"
            className="border px-3 py-2 rounded-lg"
          />
          <button
            onClick={handleSubmit}
            className="bg-violet-500 text-white px-4 py-2 rounded-lg mt-4"
          >
            Download PDF
          </button>
          <button
            onClick={handleClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mt-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateRangeModal;
