import { useEffect } from "react";
import { supabase } from "../supabaseClient"
import { useState } from "react";
import Message from "./Message";
import Header from "./Header";
import SendMessage from "./SendMessage";

const Messages = () => {
    const[messages, setMessages] = useState([]);
    const scroll = useRef();

    const callSupabase = async() => {
        const {data} = await supabase.from('Message').select('*'); 
        setMessages(data);
    }

    useEffect(() => {
        callSupabase();
    }, [])

    useEffect(() => {
        const chanel = supabase.channel('*')
            .on('postgres_changes', {event: 'INSERT', schema: 'public', tabla: 'Message'}, 
            (payload) => {
                const newMessage = payload.new;
                setMessages(messages => [...messages, newMessage]);
            })
        return () => {
            supabase.removeChannel(chanel);
        }
    }, [])

    return (
    <section className="message">  
        <Header />
        <div className="content">
            {
                messages && 
                messages.map((message, index) => {
                    <Message 
                        key={index}
                        message={message.content}
                        date={message.created_at}
                        email={message.email}
                    />
                })
            }
        </div>
        <SendMessage scroll={scroll} />
        <span ref={scroll}></span>
    </section>
  )
}

export default Messages
