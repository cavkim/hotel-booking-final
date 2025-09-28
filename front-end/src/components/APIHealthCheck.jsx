import React, { useState, useEffect } from "react";
import apiClient from "../helpers/axioHelper";

const APIHealthCheck = () => {
  const [status, setStatus] = useState("checking");
  const [error, setError] = useState(null);
  const [apiUrl, setApiUrl] = useState("");

  useEffect(() => {
    checkAPIHealth();
  }, []);

  const checkAPIHealth = async () => {
    // try {
    //   setStatus("checking");
    //   setError(null);
    //   // Try to make a simple request to check if API is running
    //   // Use auth/login endpoint as it's more likely to exist
    //   await apiClient.post("/v1/auth/login", {
    //     email: "test@test.com",
    //     password: "test",
    //   });
    //   setStatus("online");
    //   setApiUrl(apiClient.defaults.baseURL);
    // } catch (error) {
    //   setStatus("offline");
    //   setApiUrl(apiClient.defaults.baseURL);
    //   if (
    //     error.code === "ECONNREFUSED" ||
    //     error.message.includes("Network Error")
    //   ) {
    //     setError(
    //       "Unable to connect to the API server. Please check your internet connection."
    //     );
    //   } else if (error.response?.status === 404) {
    //     setError(
    //       "API endpoint not found. Please check if the API is properly configured."
    //     );
    //   } else if (error.response?.status === 401) {
    //     // 401 means API is working but credentials are invalid - this is good!
    //     setStatus("online");
    //     setError("API is online and responding correctly.");
    //   } else if (error.response?.status >= 500) {
    //     setError("API server error. Please try again later.");
    //   } else {
    //     setError(`API Error: ${error.message}`);
    //   }
    // }
  };

  const getStatusColor = () => {
    switch (status) {
      case "online":
        return "text-green-600 bg-green-100";
      case "offline":
        return "text-red-600 bg-red-100";
      case "checking":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className={`p-3 rounded-lg border ${getStatusColor()}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">API Status</div>
            <div className="text-sm">{status.toUpperCase()}</div>
            <div className="text-xs mt-1">{apiUrl}</div>
          </div>
          <button
            onClick={checkAPIHealth}
            className="ml-2 px-2 py-1 bg-white bg-opacity-50 rounded text-xs hover:bg-opacity-75"
          >
            Refresh
          </button>
        </div>
        {error && <div className="mt-2 text-xs">{error}</div>}
      </div>
    </div>
  );
};

export default APIHealthCheck;
