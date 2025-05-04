import { toast } from "react-toastify";

export async function request(apiCall, options = {}) {
  const { isToast = false } = options;
  try {
    const response = await apiCall();
     // Show success toast
    if (isToast) {
      toast.success(options.successMessage || "Success!"); 
    }
    // Return response only if data exists to avoid unnecessary renders
    return { data: response.data || response || null, error: null };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Unknown error";
    // Show error toast
    if (isToast) {
      toast.error(`Error: ${message}`);
    }
    return { data: null, error: message };
  }
}
