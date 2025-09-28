import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Lock, X } from "lucide-react";
import { hideLoginModal } from "../redux/actions/authActions";

const LoginModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showLoginModal, loginModalData } = useSelector((state) => state.auth);

  const handleClose = () => {
    dispatch(hideLoginModal());
  };

  const handleSignIn = () => {
    dispatch(hideLoginModal());
    // Navigate to sign in page with the intended destination
    const redirectPath = loginModalData?.redirectPath || "/";
    navigate("/signin", { state: { from: { pathname: redirectPath } } });
  };

  if (!showLoginModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md mx-4 shadow-2xl relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Login Required
          </h3>
          <p className="text-gray-600 mb-6">
            {loginModalData?.message ||
              "You need to sign in to your account to continue. Please log in to access this feature."}
          </p>

          <div className="flex space-x-3">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSignIn}
              className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
