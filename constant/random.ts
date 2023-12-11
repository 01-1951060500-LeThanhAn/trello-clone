export default function getSessionId() {
  let sessionId = localStorage.getItem("sessionId");

  // Kiểm tra xem nếu chưa có sessionId trong localStorage thì tạo mới
  if (!sessionId) {
    sessionId = generateUniqueId(); // Tạo một định danh duy nhất
    localStorage.setItem("sessionId", sessionId);
  }

  return sessionId;
}

function generateUniqueId() {
  // Tạo một định danh duy nhất, có thể sử dụng thư viện như uuid hoặc tạo theo cách của riêng bạn
  // Đây là một ví dụ đơn giản:
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
