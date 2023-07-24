"use client";
import { Toaster } from "react-hot-toast";

const NotificationProvider = () => {
  return (
    <Toaster
      toastOptions={{
        duration: 3000,
        style: {
          background: "#363636",
          color: "#fff",
          padding: "20px",
          minWidth: "300px",
          fontSize: "20px",
        },
      }}
    />
  );
};

export default NotificationProvider;
