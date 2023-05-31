interface Props {
  options: string;
  changeFilterOptions: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterOption = ({ options, changeFilterOptions }: Props) => {
  return (
    <div className="my-3 flex items-center justify-center gap-3">
      <div className="">
        <input
          type="radio"
          id="radioSelect1"
          name="all"
          value="all"
          onChange={changeFilterOptions}
          checked={options === "all"}
        />
        <label htmlFor="all">All</label>
      </div>
      <div className="">
        <input
          type="radio"
          id="radioSelect2"
          name="available"
          value="available"
          onChange={changeFilterOptions}
          checked={options === "available"}
        />
        <label htmlFor="available">Available</label>
      </div>
      <div className="">
        <input
          type="radio"
          id="radioSelect3"
          name="unavailable"
          value="unavailable"
          onChange={changeFilterOptions}
          checked={options === "unavailable"}
        />
        <label htmlFor="unavailable">Unavailable</label>
      </div>
    </div>
  );
};

export default FilterOption;
