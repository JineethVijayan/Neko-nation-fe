import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          fontSize: "18px",
          padding: "16px",
          maxWidth: "400px",
          backgroundColor: "#333",
          color: "#fff",
        },
        success: {
          style: {
            backgroundColor: "#4CAF50", // Green for success
            color: "#fff",
          },
        },
        error: {
          style: {
            backgroundColor: "#F44336", // Red for error
            color: "#fff",
          },
        },
      }}
    />
  );
};

export default ToastProvider;
