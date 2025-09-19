import "./App.css";
import Tasks from "./components/Tasks";
import { Auth } from "./components/Auth";
import { useEffect, useState } from "react";
import { supabase } from "./supabase-client";

function App() {
  const [session, setSession] = useState(null);

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    setSession(currentSession.data.session);
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      {session ? (
        <>
          <button onClick={logout} className="bg-red-700 text-white">
            Log Out
          </button>
          <Tasks />
        </>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;
