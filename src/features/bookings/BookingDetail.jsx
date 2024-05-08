import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import BookingDataBox from "./BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import useDeleteBooking from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading, booking = {} } = useBooking();
  const { isLoading: isDeleting, deleteBooking } = useDeleteBooking();

  const { checkout } = useCheckout();

  const navigate = useNavigate();

  const { status, id: bookingId } = booking;
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Modal>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(bookingId)}
            disable={isLoading}
          >
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger" icon={<HiTrash />}>
              Delete Booking
            </Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSettled: () => navigate(-1),
                })
              }
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </Modal>
  );
}

export default BookingDetail;
