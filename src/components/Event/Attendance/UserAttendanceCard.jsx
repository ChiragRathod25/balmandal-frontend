function UserAttendanceCard({ attendance }) {
  // Function to calculate percentage safely
  const getPercentage = (total, present) => {
    return total > 0 ? ((present / total) * 100).toFixed(2) : 0;
  };

  if (!attendance) {
    return <div className="text-gray-500 text-center py-4">No Attendance Data Available</div>;
  }

  const attendancePercentage = getPercentage(attendance.total, attendance.present);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg border border-gray-200 w-full">
      {/* Event Type */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{attendance.eventType}</h2>

      {/* Attendance Details */}
      <div className="text-sm text-gray-600 space-y-1">
        <p>Total Events: <span className="font-medium">{attendance.total}</span></p>
        <p>Present: <span className="font-medium text-green-600">{attendance.present}</span></p>
        <p>Absent: <span className="font-medium text-red-600">{attendance.absent}</span></p>
        <p>Attendance: <span className="font-medium">{attendancePercentage}%</span></p>
      </div>

      {/* Attendance Percentage Bar */}
      <div className="w-full bg-gray-300 rounded-full h-4 mt-3 overflow-hidden">
        <div 
          className="h-full bg-green-500 transition-all"
          style={{ width: `${attendancePercentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default UserAttendanceCard;
