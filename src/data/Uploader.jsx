import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import { isEmpty } from "lodash";

import { subtractDates } from "../utils/helpers";
import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";
import { useQueryClient } from "@tanstack/react-query";

import { deleteAllData } from "../services/apiCabins";
import { deleteBookings } from "../services/apiBookings";
import { useGetBookings } from "../bookings/useGetBookings";
import useGetCabins from "../features/cabins/useGetCabins";

import useDeleteAllDataHook from "./useDeleteAllDataHook";

import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import Modal from "../ui/Modal";
import Confirm from "../ui/Confirm";
import Error from "../ui/Error";
import { HiInformationCircle } from "react-icons/hi";
import styled from "styled-components";
import ToolTip from "../ui/ToolTip";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

const TestDataContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
  background-color: #e0e7ff;
  padding: 8px;
  border-radius: var(--border-radius-lg);
  text-align: center;
`;

const ToolTipContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

const TestDataTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.log(error.message);
}

async function createBookings() {
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: guestsIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const allGuestIds = guestsIds.map((cabin) => cabin.id);

  const { data: cabinsIds } = await supabase
    .from("cabins")
    .select("id")
    .order("id");
  const allCabinIds = cabinsIds.map((cabin) => cabin.id);

  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);

    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);

    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0; // hardcoded breakfast price

    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = "checked-in";

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      cabinId: allCabinIds.at(booking.cabinId - 1),
      status,
    };
  });

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

function Uploader() {
  const queryClient = useQueryClient();
  const { mutateDeleteAll, mutateDeleteAllStatus } = useDeleteAllDataHook();
  const { cabins } = useGetCabins();
  const { bookings } = useGetBookings();

  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);

    // Bookings need to be deleted FIRST
    await deleteAllData();
    // Bookings need to be created LAST
    await createGuests();
    await createCabins();
    await createBookings();

    queryClient.invalidateQueries(["cabins"]);

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  function handleDeleteAllData(onCloseModal) {
    mutateDeleteAll(null, {
      onSuccess: () => onCloseModal(),
    });
  }

  if (isLoading || mutateDeleteAllStatus === "pending") return <Spinner />;
  return (
    <TestDataContainer>
      <TestDataTitle>
        <h3>TEST DATA</h3>
        <ToolTipContainer>
          <ToolTip>
            <ToolTip.ToggleIcon>
              <HiInformationCircle />
            </ToolTip.ToggleIcon>

            <ToolTip.Window
              text="Here you can upload bookings, guests and cabins in one click"
              positionY={3}
            />
          </ToolTip>
        </ToolTipContainer>
      </TestDataTitle>
      <span>&darr;</span>
      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>
      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
      <Modal>
        <Modal.Open opens="deleteAllData">
          <Button variation="danger">Delete All Data</Button>
        </Modal.Open>

        <Modal.Window name="deleteAllData">
          <Confirm
            resourceName="data"
            onConfirm={handleDeleteAllData}
            disabled={isLoading}
            onCloseModal
            action="delete"
            renderError={
              isEmpty(cabins || bookings) ? (
                <Error>There is no data do delete</Error>
              ) : null
            }
          />
        </Modal.Window>
      </Modal>
    </TestDataContainer>
  );
}

export default Uploader;
