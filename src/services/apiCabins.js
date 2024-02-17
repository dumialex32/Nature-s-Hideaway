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

export async function deleteCabin(id) {
  try {
    const { error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) throw new Error("This cabin could not be deleted");
  } catch (err) {
    console.error(err);
  }
}
