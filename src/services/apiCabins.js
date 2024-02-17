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

export async function deleteCabins(cabinId) {
  try {
    const { error } = await supabase.from("cabins").delete().eq("id", cabinId);

    if (error) throw new Error("Cabin could not be deleted");
  } catch (err) {
    console.error(err);
    throw err;
  }
}
