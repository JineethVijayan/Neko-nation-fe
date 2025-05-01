import { toast } from "react-hot-toast";

const CustomToast = ({ message, onDone, onCancel }) => (
  <div className="flex flex-col items-center bg-white  p-4 shadow-lg rounded-lg w-72">
    <p className="text-gray-800 text-center ">{message}</p>
    <div className="flex  gap-2 mt-3">
      <button 
        onClick={() => {
          onDone();
          toast.dismiss();
        }} 
        className="bg-green-500 text-white px-3 py-1 rounded-md "
      >
        Done
      </button>
      <button 
        onClick={() => {
          onCancel();
          toast.dismiss();
        }} 
        className="bg-red-500 text-white px-3 py-1 rounded-md "
      >
        Cancel
      </button>
    </div>
  </div>
);

export default CustomToast;
