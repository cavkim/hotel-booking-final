import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner"; // or react-hot-toast
import { useAuth } from "./auth-provider";
import { postLogin } from "@/api";
// ✅ named import

const useLogin = () => {
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      // Save token and user info
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Update context
      setUser(data.user);

      toast.success(`Welcome, ${data.user.name}!`);
      window.location.href = "/dashboard"; // navigate after login
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your email or password.");
    },
  });
};

export default useLogin;
