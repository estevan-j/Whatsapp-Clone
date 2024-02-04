import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Arrow from "./icons/Arrow";
import Dots from "./icons/Dots";
import { getAvatar } from "../helpers/getAvatar";

const Header = () => {
  const [user, setUser] = useState("juana");
  const [open, setOpen] = useState(false);
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    window.location.reload();
  };
  const getSession = async () => {
    const data = await supabase.auth.getSection();
    setUser(data.session.user.email);
  };

  useEffect(() => {
    getSession();
  }, []);

  const handleDots = () => {
    setOpen(current => !current);
  }

  return (
    <header className="header">
      <div className="left">
        <p className="logout" onClick={handleLogout}>
          <Arrow />
        </p>
        <img src={`../assets/avatar/avatar-${getAvatar(user)}.jpg`} alt="avatar" />
        <p className="name">@{user.split('@')[0]}
            <span>online</span>
        </p>
      </div>
      <p className="dots" onClick={handleDots}>
        <Dots />
      </p>
      <div className={`float-out ${open ? 'open': ''}`}
        onClick={handleLogout}>
        LogOut
      </div>
    </header>
  );
};

export default Header;
