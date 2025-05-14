// import { useAuth } from "../context/AuthContext"; // adjust path if needed
// import { useNavigate } from "react-router-dom";
// import { Pencil, LogOut } from "lucide-react";

// const UserProfile = () => {
//   const { user, logout } = useAuth();
//   console.log(user)
//   const navigate = useNavigate();

//   if (!user) return <div className="text-center mt-10 text-lg">Loading Profile...</div>;

//   return (
//     <div
//       className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
//       style={{ backgroundImage: `url('/your-background-image-path.jpg')` }}
//     >
//       <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-4xl w-full mx-4 flex flex-col items-center relative">
        
//         {/* Edit and Logout Buttons */}
//         <div className="absolute top-4 right-4 flex gap-2">
//           <button
//             onClick={() => navigate("/edit-profile")}
//             className="bg-purple-700 hover:bg-purple-800 text-white py-1 px-4 rounded flex items-center gap-2"
//           >
//             <Pencil size={16} /> Edit Profile
//           </button>
//           <button
//             onClick={logout}
//             className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded flex items-center gap-2"
//           >
//             <LogOut size={16} /> Logout
//           </button>
//         </div>

//         {/* Profile Picture */}
//         <div className="relative">
//           <img
//             src={user.avatar || "/default-avatar.png"}
//             alt="Profile"
//             className="w-32 h-32 rounded-full object-cover border-4 border-purple-700"
//           />
//         </div>

//         {/* Profile Information */}
//         <div className="mt-6 text-center space-y-2">
//           <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
//             <span className="text-purple-700">👤</span> {user.username}
//           </h2>
//           <p className="flex items-center justify-center gap-2">
//             <span className="text-pink-600">📍</span> Address: {user.address || "Not specified"}
//           </p>
//           <p className="flex items-center justify-center gap-2">
//             <span className="text-blue-600">📖</span> Bio: {user.bio || "No bio available..."}
//           </p>
//           <p className="flex items-center justify-center gap-2">
//             <span className="text-yellow-500">⭐</span> Credit Score: {user.creditScore ?? "Not given"}
//           </p>
//           <p className="flex items-center justify-center gap-2">
//             <span className="text-amber-600">💼</span> Occupation: {user.occupation || "Unknown"}
//           </p>
//         </div>

//         {/* Links */}
//         <div className="flex gap-6 mt-6">
//           <a href="/exchange-requests" className="flex items-center gap-1 text-blue-600 hover:underline">
//             📄 Exchange Requests
//           </a>
//           <a href="/wishlist" className="flex items-center gap-1 text-blue-600 hover:underline">
//             📚 Wish List
//           </a>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default UserProfile;


import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaEdit, FaSignOutAlt } from "react-icons/fa";
import { MdLocationOn, MdWork } from "react-icons/md";
import { BsBook, BsStarFill } from "react-icons/bs";

const UserProfile = () => {
  const { user, logout } = useAuth();

  if (!user) return null; // If no user, render nothing

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative p-8 rounded-3xl shadow-lg bg-white/70 backdrop-blur-md max-w-3xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <span>👤</span> {user.username}
          </h2>
          <div className="flex gap-2">
            <Link to="/edit-profile" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full flex items-center gap-2">
              <FaEdit /> Edit Profile
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-2"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={user.profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-purple-600 object-cover"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 space-y-4">
            <p className="flex items-center gap-2">
              <MdLocationOn className="text-pink-500" /> Address: User's Location (static for now)
            </p>
            <p className="flex items-center gap-2">
              <BsBook className="text-blue-500" /> Bio: A short description about {user.firstName} goes here...
            </p>
            <p className="flex items-center gap-2">
              <BsStarFill className="text-yellow-400" /> Credit Score: 85 (static)
            </p>
            <p className="flex items-center gap-2">
              <MdWork className="text-orange-500" /> Occupation: Developer (static)
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <Link to="/exchange-requests" className="flex items-center gap-2 text-blue-600 underline">
                📤 Exchange Requests
              </Link>
              <Link to="/wishlist" className="flex items-center gap-2 text-blue-600 underline">
                📚 Wish List
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 border-t pt-4 space-y-2 text-sm">
          <p><strong>Full Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.mobileNumber}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
