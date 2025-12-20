import { useState } from "react";

function App() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });

      const data = await res.json();

      if (data.error) {
        setReply("AI error occurred");
      } else {
        setReply(data.reply);
      }
    } catch (err) {
      console.error(err);
      setReply("AI error occurred");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI Chat</h2>

      <input
        type="text"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Ask something..."
      />

      <button onClick={sendMessage}>Ask AI</button>

      <p><strong>AI:</strong> {reply}</p>
    </div>
  );
}

export default App;
