import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  try {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) throw new error(`Cabins could not be loaded`);

    return data;
  } catch (err) {
    console.err(err);
    throw err;
  }
}

export async function deleteCabin({ cabinId, cabinImgName }) {
  try {
    const { error: cabinDeleteError } = await supabase
      .from("cabins")
      .delete()
      .eq("id", cabinId);

    if (cabinDeleteError) throw new Error("This cabin could not be deleted");

    const { error: deleteBucketError } = await supabase.storage
      .from("cabin-images")
      .remove([cabinImgName]);

    if (deleteBucketError)
      throw new Error("There was a problem deleting the image from bucket");
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function createEditCabin({ newCabin, editId }) {
  console.log(newCabin, editId);
  try {
    const hasImagePath =
      newCabin.image instanceof String &&
      newCabin.image.startsWith(supabaseUrl);
    console.log(hasImagePath);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
      "/",
      ""
    );

    const imagePath = hasImagePath
      ? newCabin.image
      : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    console.log(imagePath);
    //1. Create/edit cabin builder object
    let query = supabase.from("cabins");

    // A) Create
    if (!editId)
      query = await query.insert([{ ...newCabin, image: imagePath }]).select();
    const { data, error } = await query;

    // B) Edit
    if (editId)
      await query.update({ ...newCabin, image: imagePath }).eq("id", editId);

    if (error)
      throw new Error("The cabin could not be added. Please try again");

    //2. Upload image
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    // If upload fails delete the entire newly created cabin
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      throw new Error("There was a problem uploading the cabin image");
    }
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// The create cabin function
/* export async function createEditCabin(newCabin) {
  try {
    console.log(newCabin);

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
      "/",
      ""
    );

    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    //1. Create cabin
    const { data, error } = await supabase
      .from("cabins")
      .insert([{ ...newCabin, image: imagePath }])
      .select();

    if (error)
      throw new Error("The cabin could not be added. Please try again");

    //2. Upload image
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    // If upload fails delete the entire newly created cabin
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      throw new Error("There was a problem uploading the cabin image");
    }
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
  */
