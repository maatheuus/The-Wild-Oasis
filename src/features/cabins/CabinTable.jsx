import { useCabins } from "./useCabins";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resource="cabins" />;

  // 1) FILTER
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;

  if (filterValue === "no-discount")
    filteredCabins = cabins.filter(
      (cabin) => cabin.discount === 0 || cabin.discount === null
    );
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2) SORT BY
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  function compareText(a, b) {
    const lowerA = a[field]?.toLowerCase();
    const lowerB = b[field]?.toLowerCase();
    if (lowerA < lowerB) {
      return -1 * modifier;
    }
    if (lowerA > lowerB) {
      return 1 * modifier;
    }
    return 0;
  }
  function compareNumbers(a, b) {
    return (a[field] - b[field]) * modifier;
  }
  const sortedCabins =
    typeof cabins[0][field] === "number"
      ? filteredCabins.sort(compareNumbers)
      : filteredCabins.sort(compareText);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabins={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
