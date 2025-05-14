const ChatBox = () => {
    return (
      <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-lg flex flex-col gap-4">
        <h2 className="text-xl font-bold text-purple-900 mb-2">Chat</h2>
        <div className="flex flex-col gap-2">
          <div className="bg-white p-2 rounded-md">User1: Hello everyone!</div>
          <div className="bg-white p-2 rounded-md">User2: Hi! Anyone read the new release?</div>
        </div>
        <div className="flex mt-2">
          <input 
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 rounded-l-md border-t border-b border-l border-gray-300"
          />
          <button className="bg-purple-500 text-white px-4 rounded-r-md">Send</button>
        </div>
      </div>
    );
  };
  
  export default ChatBox;
  