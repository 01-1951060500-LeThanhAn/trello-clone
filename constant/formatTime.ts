export default function formatTime(strNgay: Date) {
  const ngay = new Date(strNgay);
  const ngayOfMonth = ngay.getDate();
  const thang = ngay.toLocaleString("en", { month: "short" });
  const year = ngay.getFullYear();
  return `${ngayOfMonth} ${thang} ${year}`;
}
