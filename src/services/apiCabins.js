import supabase from "./supabase.js";

export async function getCabins() {
  try {
    let { data, error } = await supabase.from("cabins").select("*");

    if (error) throw new Error("No cabins has been found");

    return data;
  } catch (err) {
    console.error(err);
  }
}
