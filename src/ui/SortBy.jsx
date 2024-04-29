import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy");

  function handleChange({ target }) {
    searchParams.set("sortBy", target.value);
    setSearchParams(searchParams);
  }

  return (
    <div>
      <Select
        options={options}
        type="white"
        value={sortBy}
        onChange={handleChange}
      />
    </div>
  );
}

export default SortBy;
