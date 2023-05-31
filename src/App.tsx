import { useState } from "react";
import { NavBar, Card } from "./components";

const laundromat = [
  {
    id: 1,
    status: "available",
  },
  {
    id: 2,
    status: "available",
  },
  {
    id: 3,
    status: "available",
  },
  {
    id: 4,
    status: "available",
  },
];

function App() {
  const [machine, setMachine] = useState(laundromat);

  const checkAvailable = () => {
    const available = machine
      .filter((obj) => obj.status === "available")
      .map((obj) => obj.id);

    alert(`Machine ID: ${available} are available`);
  };

  return (
    <>
      <NavBar />
      <main className="mt-14  flex min-h-screen flex-col">
        <button
          type="button"
          className="mt-3 w-fit self-center rounded-md bg-green-400 p-2 text-white"
          onClick={checkAvailable}
        >
          Check Available
        </button>
        <div className="grid grid-cols-2 gap-2 p-2">
          {machine.map((item) => (
            <Card key={item.id} item={item} setMachine={setMachine} />
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
