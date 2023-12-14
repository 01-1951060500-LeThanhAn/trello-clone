export default function getSessionId() {
  let sessionId = localStorage.getItem("sessionId");

  if (!sessionId) {
    sessionId = generateUniqueId(); // Tạo một định danh duy nhất
    localStorage.setItem("sessionId", sessionId);
  }

  return sessionId;
}

function generateUniqueId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
