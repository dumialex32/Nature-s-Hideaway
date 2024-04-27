import { getToday, hasNullProperty } from "../utils/helpers";
import { PAGE_SIZE } from "../utils/variables";
import supabase from "./supabase";

export async function getBookings({ filter, sort, page }) {
  let query = supabase
    .from("bookings")
    .select(
      `id,totalPrice, status, hasBreakfast, startDate, endDate,observation, guests(fullName,email), cabins(name)`,
      { count: "exact" }
    );

  // Filter

  if (filter)
    query = query[filter.method || "eq"](filter.field, filter.filterValue);

  // Sort
  if (sort) query = query.order(sort.sortBy, { ascending: sort.direction });

  // Pagination

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) throw new Error("No bookings could be found");

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error(`The booking with id: ${id} could not be found`);
  }
  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase.from("bookings").select("*");
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking({ bookingId, obj }) {
  console.log(bookingId, obj);

  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  console.log(data);
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

export async function deleteGuests() {
  try {
    const { error } = await supabase.from("guests").delete().gt("id", 0);

    if (error) {
      throw new Error("Guests could not have been deleted");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function deleteBookings() {
  try {
    const { error } = await supabase.from("bookings").delete().gt("id", 0);
    if (error) {
      throw new Error("Bookings could not been deleted");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// export async function getBookingsAfterDate(date) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .select("created_at, totalPrice, extrasPrice")
//     .gte("created_at", date)
//     .lte("created_at", getToday({ end: true }));

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }

//   return data;
// }
