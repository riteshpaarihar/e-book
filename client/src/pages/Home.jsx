import BookSection from "../components/BookSection";
import ChatBox from "../components/ChatBox";
import UpcomingEvents from "../components/UpcomingEvents";

const Home = () => {
  return (
    <div className="flex flex-col flex-1 p-4 md:p-8 gap-8 bg-[url('/background.jpg')] bg-cover bg-center min-h-screen overflow-y-auto">
      {/* Header */}
      <h1 className="text-3xl font-bold text-purple-900 text-center mb-4">X-Pedia</h1>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Section: Book Section */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <BookSection />
        </div>

        {/* Right Section: Events and Chat */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <UpcomingEvents />
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default Home;
