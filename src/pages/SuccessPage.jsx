import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Apps from "../Apps";

const supabase = createClient(
  "https://wjeinffbnzrudlwfidau.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqZWluZmZibnpydWRsd2ZpZGF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc2NzY2MjYsImV4cCI6MjAwMzI1MjYyNn0.j8EuDJhCKt0OJeWtKf_0Nh3M9tmZLi1Luy3FLApIFDY"
);

function SuccessPage() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function getUsersData() {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log(error);
      } else if (data?.user) {
        console.log(data.user);
        setUser(data.user);
      }
    }
    getUsersData();
  }, []);

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      navigate("/");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {Object.keys(user).length !== 0 ? (
          <div>
            <div>
              <h1>Success</h1>
              <button onClick={signOutUser}>Logout</button>
            </div>
            <Apps />
          </div>
        ) : (
          <>
            <h1>User is not logged in</h1>
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              Go back home
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default SuccessPage;
