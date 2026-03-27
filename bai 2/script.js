const toastDuration = 5000; // 5 giây
const MAX_TOASTS = 5; // GIỚI HẠN TỐI ĐA 5 THÔNG BÁO

function createToast(type, title, message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  // --- CHỐNG SPAM: Kiểm tra số lượng toast hiện có ---
  const currentToasts = container.querySelectorAll(".toast");
  if (currentToasts.length >= MAX_TOASTS) {
    // Xóa thông báo cũ nhất ngay lập tức để nhường chỗ
    removeToastElement(currentToasts[0], true);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  let iconClass = "";
  switch (type) {
    case "success":
      iconClass = "fas fa-check-circle";
      break;
    case "error":
      iconClass = "fas fa-times-circle";
      break;
    case "info":
      iconClass = "fas fa-info-circle";
      break;
    case "warning":
      iconClass = "fas fa-exclamation-triangle";
      break;
  }

  toast.innerHTML = `
        <div class="toast-icon"><i class="${iconClass}"></i></div>
        <div class="toast-body">
            <h3 class="toast-title">${title}</h3>
            <p class="toast-msg">${message}</p>
        </div>
        <div class="toast-close" onclick="closeToast(this)"><i class="fas fa-times"></i></div>
        <div class="toast-progress"></div>
    `;

  container.appendChild(toast);

  // Tự động xóa sau khi hết thời gian
  const autoHideTimeout = setTimeout(() => {
    removeToastElement(toast);
  }, toastDuration);

  toast.dataset.timeoutId = autoHideTimeout;
}

function closeToast(closeButtonElement) {
  const toast = closeButtonElement.closest(".toast");
  if (toast) {
    clearTimeout(toast.dataset.timeoutId);
    removeToastElement(toast);
  }
}

/**
 * Hàm xóa toast
 * @param {HTMLElement} toastElement
 * @param {boolean} immediate - Nếu true, xóa ngay lập tức không chờ animation (dùng khi quá giới hạn)
 */
function removeToastElement(toastElement, immediate = false) {
  if (immediate) {
    toastElement.remove();
    return;
  }

  if (toastElement.classList.contains("hide")) return; // Tránh xóa 2 lần

  toastElement.classList.add("hide");
  toastElement.addEventListener("animationend", (e) => {
    if (e.animationName === "slideOutRight") {
      toastElement.remove();
    }
  });
}

// Các hàm gọi nhanh (Giữ nguyên như cũ)
function showSuccessToast() {
  createToast("success", "Thành công!", "Dữ liệu đã được lưu.");
}
function showErrorToast() {
  createToast("error", "Lỗi kết nối", "Vui lòng kiểm tra mạng.");
}
function showInfoToast() {
  createToast("info", "Thông báo", "Hệ thống đang bảo trì.");
}
function showWarningToast() {
  createToast("warning", "Cảnh báo", "Sắp hết phiên làm việc.");
}
