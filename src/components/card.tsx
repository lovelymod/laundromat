import laundromat from "../assets/laundromat.jpg";
import { useState } from "react";

interface Props {
  item: { id: number; status: string };
  setMachine: React.Dispatch<React.SetStateAction<any>>;
  setFilteredMachine: React.Dispatch<React.SetStateAction<any>>;
}

interface Prev {
  id: number;
  status: string;
  remaining: number;
}

const Card = ({ item, setMachine, setFilteredMachine }: Props) => {
  const [timeleft, setTimeleft] = useState(1000 * 30);

  const updateStatus = () => {
    setMachine((prev: Prev[]) => {
      const newStatus = prev.map((obj) => {
        if (obj.id === item.id) {
          return {
            ...obj,
            status: obj.status === "available" ? "unavailable" : "available",
          };
        }

        return obj;
      });

      return newStatus;
    });
    setFilteredMachine((prev: Prev[]) => {
      const newStatus = prev.map((obj) => {
        if (obj.id === item.id) {
          return {
            ...obj,
            status: obj.status === "available" ? "unavailable" : "available",
          };
        }

        return obj;
      });

      return newStatus;
    });
  };

  const startTimer = () => {
    if (item.status === "available") {
      let timeLeftCopy = timeleft;
      updateStatus();
      const myinterval = setInterval(() => {
        timeLeftCopy -= 1000;
        setTimeleft((prev) => prev - 1000);
        if (timeLeftCopy < 0) {
          updateStatus();
          setTimeleft(1000 * 30);
          clearInterval(myinterval);
        }
      }, 1000);
    } else {
      alert("This machine is not available");
    }
  };

  return (
    <div
      className="flex h-[250px] w-full flex-col justify-center gap-2 rounded-lg bg-white p-2 drop-shadow-lg "
      onClick={startTimer}
    >
      <p className="text-center font-medium">Machine ID: {item.id}</p>
      <div
        className={`relative h-[175px] w-full ${
          item.status !== "available" ? "animate-wiggle" : ""
        }`}
      >
        <img
          src={laundromat}
          alt="laundromat"
          className="absolute h-full w-full object-contain"
        />
      </div>
      <div className="font-medium">
        <p className="">Status: {item.status}</p>
        <p className="">
          Timer: {Math.floor(timeleft / 1000 / 60)}:
          {Math.floor(timeleft / 1000) % 60} s.
        </p>
      </div>
    </div>
  );
};

export default Card;
