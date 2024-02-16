import supabase from "./supabase";

export async function getCabins() {
  try {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) throw new error(`Cabins could not be loaded`);

    return data;
  } catch (err) {
    console.err(err);
  }
}
