import supabase, { supabaseUrl } from "./supabase";

import { isString } from "lodash";

// helper functions
const getCabinName = (cabinPath) => cabinPath.split("/").pop();

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
    console.log(cabinImgName);

    // check if there are multiple cabins with same photo
    const { data: curCabins } = await supabase.from("cabins").select("*");
    console.log(curCabins);

    const matchingImgCabins = curCabins.filter(
      (cab) => getCabinName(cab.image) === cabinImgName
    );
    console.log(matchingImgCabins.length);
    const { error: cabinDeleteError } = await supabase
      .from("cabins")
      .delete()
      .eq("id", cabinId);

    if (cabinDeleteError) throw new Error("This cabin could not be deleted");

    if (matchingImgCabins.length > 1) return;

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
  try {
    const hasImgPath =
      isString(newCabin.image) && newCabin.image.startsWith(supabaseUrl);
    if (hasImgPath) console.log(getCabinName(newCabin.image));
    let prevImg;

    if (editId && !hasImgPath) {
      const { data: imageData } = await supabase
        .from("cabins")
        .select("image")
        .eq("id", editId)
        .single();

      prevImg = getCabinName(imageData.image);
    }

    const imageName = hasImgPath
      ? getCabinName(newCabin.image)
      : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

    const imagePath = hasImgPath
      ? newCabin.image
      : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // Get the previous image

    let query = supabase.from("cabins");

    if (!editId) query = query.insert([{ ...newCabin, image: imagePath }]);

    if (editId)
      query = query.update({ ...newCabin, image: imagePath }).eq("id", editId);

    const { data, error } = await query.select().single();

    if (error) throw new Error("There was a problem creating the cabin");
    // Upload image
    // If cabin create is successfull, store image in bucket
    if (hasImgPath) return data; // do not upload a new image if hasImgPath

    // Before upload the new image, remove the prev one
    if (prevImg && hasImgPath)
      await supabase.storage.from("cabin-images").remove([prevImg]);

    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      await deleteCabin({ cabinId: data.id, cabinImgName: imageName });
      throw new Error("There was an error creating the image");
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
