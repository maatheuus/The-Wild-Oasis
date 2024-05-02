import supabase from "./supabase";

export async function signUp(email, password, fullName) {
  const { data: savedSessionData } = await supabase.auth.getSession();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  // If there was a previously authenticated user, restore their session
  if (savedSessionData) {
    // Restore the session in local storage
    localStorage.setItem("supabase.auth.token", savedSessionData);

    // Refresh the Supabase client's authentication state
    await supabase.auth.setSession(savedSessionData.session);
  }

  if (error) {
    if (error.message.includes("unique")) {
      throw new Error("User with this email already exists");
    }
    throw new Error(error.message);
  }

  return data;
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
