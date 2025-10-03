import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "./auth-provider";
import { api } from "@/config"; // Import api instance
import { postLogin } from "@/api";

const useLogin = () => {
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: (response) => {
      console.log("Full response:", response);

      const actualData = response.data.data;

      if (!actualData || !actualData.token || !actualData.user) {
        console.error("Invalid response structure:", response);
        toast.error("Login failed. Invalid response from server.");
        return;
      }

      const { token, refreshToken, user } = actualData;

      localStorage.setItem("authToken", token);
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);

      const userName = user.firstname || user.username || "User";
      toast.success(`Welcome back, ${userName}!`);

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
    },
    onError: (error) => {
      console.error("Login error:", error);
      const message =
        error?.response?.data?.message ||
        "Login failed. Please check your credentials.";
      toast.error(message);
    },
  });
};

export default useLogin;
