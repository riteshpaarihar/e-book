import { FaBell } from "react-icons/fa";

const notifications = [
  {
    id: 1,
    title: "New Book Available",
    message: "“Harry Potter and the Goblet of Fire” was added to the library.",
    time: "Just now",
    isNew: true,
  },
  {
    id: 2,
    title: "Reminder: Return Due",
    message: "You need to return “The Alchemist” by April 10.",
    time: "2 hours ago",
    isNew: false,
  },
  {
    id: 3,
    title: "Book Request Approved",
    message: "Your request for “1984” has been approved.",
    time: "Yesterday",
    isNew: false,
  },
];

const Notifications = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100 p-4">
      <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-8 w-full max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <FaBell className="text-yellow-500 text-3xl" />
          <h2 className="text-2xl font-bold">Notifications</h2>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-xl p-4 border-l-4 ${
                notification.isNew ? "bg-blue-100 border-blue-500" : "bg-white border-gray-300"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{notification.title}</h3>
                  <p className="text-gray-700 mt-1">{notification.message}</p>
                </div>
                {notification.isNew && (
                  <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    New
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">{notification.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
