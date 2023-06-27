import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  "https://wjeinffbnzrudlwfidau.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqZWluZmZibnpydWRsd2ZpZGF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc2NzY2MjYsImV4cCI6MjAwMzI1MjYyNn0.j8EuDJhCKt0OJeWtKf_0Nh3M9tmZLi1Luy3FLApIFDY"
);

function LoginPage() {
  const navigate = useNavigate();

  supabase.auth.onAuthStateChange(async (event) => {
    if (event == "SIGNED_IN") {
      navigate("/success");
    }
  });

  return (
    <div className="container log">
      <div style={{ textAlign: "center" }}>
        <img src="/Schosearch.png" alt="logo" style={{ width: "190px" }} />
      </div>
      <div className="flex">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google"]}
        />
      </div>
    </div>
  );
}

export default LoginPage;
