export const showAlert = (message, type = "danger") => {
    const alertBox = document.getElementById("alertBox");
    if (!alertBox) return;
    alertBox.textContent = message;
    alertBox.className = `alert alert-${type}`;
    alertBox.classList.remove("d-none");

    setTimeout(() => {
        alertBox.classList.add("d-none");
    }, 5000);
};