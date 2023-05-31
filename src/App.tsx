import { useState } from "react";
import { NavBar, Card, FilterOption } from "./components";

const time = 150000;

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
];

function App() {
  const [machine, setMachine] = useState(laundromat);
  const [filteredMachine, setFilteredMachine] = useState(laundromat);
  const [options, setOptions] = useState("all");

  const changeFilterOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions(e.target.value);
    const filtered = machine.filter((obj) => obj.status === e.target.value);
    setFilteredMachine(filtered);
  };

  const showAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions(e.target.value);
    const filtered = machine.filter((obj) => obj.status);
    setFilteredMachine(filtered);
  };
  return (
    <>
      <NavBar />
      <main className="mt-14  flex min-h-screen flex-col">
        <FilterOption
          options={options}
          showAll={showAll}
          changeFilterOptions={changeFilterOptions}
        />

        <div className="grid grid-cols-2 gap-2 p-2">
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

// const setTimer = (duration: number) => {
//   let minutes = (1000 * 60 * duration) / 60000;
//   const myinterval = setInterval(() => {
//     minutes--;
//     console.log(minutes);
//     if (minutes === 0) clearInterval(myinterval);
//     return `${minutes}`;
//   }, 3000);
// };
