import { useEffect, useState } from "react";
import { NavBar, Card, FilterOption } from "./components";

const time = 3000;

const laundromat = [
  {
    id: 1,
    status: "available",
    remaining: time,
  },
  {
    id: 2,
    status: "available",
    remaining: time,
  },
  {
    id: 3,
    status: "available",
    remaining: time,
  },
  {
    id: 4,
    status: "available",
    remaining: time,
  },
  {
    id: 5,
    status: "available",
    remaining: time,
  },
];

function App() {
  const [machine, setMachine] = useState(laundromat);
  const [filteredMachine, setFilteredMachine] = useState(laundromat);
  const [options, setOptions] = useState("all");

  const changeFilterOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions(e.target.value);
    const filtered = machine.filter((obj) => {
      if (e.target.value === "all") {
        return obj;
      } else {
        return obj.status === e.target.value;
      }
    });
    setFilteredMachine(filtered);
  };

  useEffect(() => {
    // filter everytime machine change
    const filtered = machine.filter((obj) => {
      if (options === "all") {
        return obj;
      } else {
        return obj.status === options;
      }
    });
    setFilteredMachine(filtered);
  }, [machine]);

  return (
    <>
      <NavBar />
      <main className="mt-14  flex min-h-screen flex-col">
        <FilterOption
          options={options}
          changeFilterOptions={changeFilterOptions}
        />

        <div className="grid grid-cols-1 place-items-center gap-2 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredMachine.map((item) => (
            <Card
              key={item.id}
              item={item}
              setMachine={setMachine}
              setFilteredMachine={setFilteredMachine}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
