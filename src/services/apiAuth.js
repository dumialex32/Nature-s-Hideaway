import supabase from "./supabase";

export async function login({ username, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: username,
    password: password,
  });

  if (error) {
    console.error(error);
    throw new Error("Login failed, please try again");
  }

  return data;
}
