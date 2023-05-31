import laundromat from "../assets/laundromat.jpg";
import { useState } from "react";

interface Props {
  item: { id: number; status: string };
  setMachine: React.Dispatch<React.SetStateAction<any>>;
}

const Card = ({ item, setMachine }: Props) => {
  const [timeleft, setTimeleft] = useState(5);

  const updateState = () => {
    setMachine((prev: { id: number; status: string }[]) => {
      const newState = prev.map((obj) => {
        if (obj.id === item.id) {
          return {
            ...obj,
            status: obj.status === "available" ? "unavailable" : "available",
          };
        }

        return obj;
      });

      return newState;
    });
  };

  const startTimer = () => {
    if (item.status === "available") {
      let duration = timeleft;
      updateState();
      const myinterval = setInterval(() => {
        setTimeleft(--duration);
        if (duration === -1) {
          setTimeleft(5);
          updateState();
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
        <p className="">Timer: {timeleft} s.</p>
      </div>
    </div>
  );
};

export default Card;
