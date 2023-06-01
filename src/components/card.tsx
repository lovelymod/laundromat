import laundromatPic from "../assets/laundromat.jpg";
import axios from "axios";

interface Prev {
  id: number;
  status: string;
  remaining: number;
}

interface Props {
  item: Prev;
  setMachine: React.Dispatch<React.SetStateAction<Prev[]>>;
  setFilteredMachine: React.Dispatch<React.SetStateAction<Prev[]>>;
}

const Card = ({ item, setMachine, setFilteredMachine }: Props) => {
  let minutes = Math.floor(item.remaining / 1000 / 60);
  let second = `${Math.floor(item.remaining / 1000) % 60}`;

  const sendMessage = async () => {
    try {
      await axios.post("http://localhost:3333/sendmessage", { id: item.id });
    } catch (error) {
      console.log(error);
    }
  };

  // toggle status
  const updateStatus = (prev: Prev[]) => {
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
  };

  const startTimer = () => {
    if (item.status === "available") {
      //copy of the time remaining of item
      let timeRemaining = item.remaining;
      //set the status of machine to unavailable
      setMachine((prev: Prev[]) => updateStatus(prev));
      const myinterval = setInterval(() => {
        //decrement the time left by 1s
        timeRemaining -= 1000;
        if (timeRemaining > 0) {
          // send message to line group if time less than 1 min
          if (timeRemaining === 60000) sendMessage();
          // set the time remaining in the filtered machine
          setFilteredMachine((prev: Prev[]) => {
            const newRemaining = prev.map((obj) => {
              if (obj.id === item.id) {
                return {
                  ...obj,
                  remaining: timeRemaining,
                };
              }

              return obj;
            });

            return newRemaining;
          });
        } else {
          //set the status of machine to available
          setMachine((prev: Prev[]) => updateStatus(prev));
          // set filtered machine  time remaining to 90000
          setFilteredMachine((prev: Prev[]) => {
            return prev.map((obj) => {
              if (obj.id === item.id) {
                return {
                  ...obj,
                  remaining: 90000,
                };
              }

              return obj;
            });
          });
          // clear interval
          clearInterval(myinterval);
        }
      }, 1000);
    } else {
      alert("This machine is not available");
    }
  };

  return (
    <div
      className="flex h-64 w-64 cursor-pointer flex-col justify-center gap-2 rounded-lg bg-white p-2 drop-shadow-lg md:w-60"
      onClick={startTimer}
    >
      <p className="text-center font-medium">Machine ID: {item.id}</p>
      <div
        className={`relative h-44 w-full ${
          item.status !== "available" ? "animate-wiggle" : ""
        }`}
      >
        <img
          src={laundromatPic}
          alt="laundromat"
          className="absolute h-full w-full object-contain"
        />
      </div>
      <div className="font-medium">
        <p className="capitalize">Status: {item.status}</p>
        <p>
          Timer: {minutes}:{second.length === 1 ? `0${second}` : second} s.
        </p>
      </div>
    </div>
  );
};

export default Card;
