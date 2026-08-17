let hideTimeout;

export const showToast = (message) => {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => toast.classList.remove("visible"), 2500);
};