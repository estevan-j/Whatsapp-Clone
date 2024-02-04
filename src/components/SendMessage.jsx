import { useEffect, useState } from "react";
import Send from "./icons/Send";
import { supabase } from "../supabaseClient";

const SendMessage = ({scroll}) => {
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState();

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage !== "") {
      const insert = await supabase.from("Message").insert({
        Content: newMessage,
        email: user,
      });
      setNewMessage('');
    }
    scroll.current.scrollIntoView({Behavior: 'smooth'});
  };
  const getSession = async () => {
    const data = await supabase.auth.getSection();
    setUser(data.session.user.email);
  };

  useEffect(() => {
    getSession();
  }, []);

  return (
    <section className="send-message">
      <form onSubmit={sendMessage}>
        <input
          type="text"
          name="message"
          placeholder="Write your message"
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">
          <Send />
        </button>
      </form>
    </section>
  );
};

export default SendMessage;
