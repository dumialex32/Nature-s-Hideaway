import supabase from "./supabase";

export async function signup({ fullName, email, password }) {
  console.log(fullName, email, password);
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    data: {
      fullName: fullName,
      avatar: "",
    },
  });

  if (error)
    throw new Error(`Signup failed. ${`${error?.message} (${error?.status})`}`);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(`Login failed. ${error?.message}`);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  console.log(data.user);

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
