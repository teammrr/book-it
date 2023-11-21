import { Fragment, useState, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const rooms: any[] = [];
for (let i = 9; i <= 19; i += 1) {
  const hours = Math.floor(i);
  const minutes = (i - hours) * 60;
  const time = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
  rooms.push({ id: rooms.length + 1, time: time, unavailable: false });
}

function SelectStartTime({ setUserStartTime }: any) {
  const [startTime, setStartTime] = useState(rooms[0]);
  const [query, setQuery] = useState("");

  const filteredRoom =
    query === ""
      ? rooms
      : rooms.filter((room) => {
          return room.time.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    // This code will run whenever startTime changes
    // console.log("Selected start time:", startTime.time);
    setUserStartTime(startTime.time);
  }, [startTime, setUserStartTime]);

  return (
    <div className="flex">
      <Combobox value={startTime} onChange={setStartTime}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(room: { time: string }) => room.time}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredRoom.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredRoom.map((room) => (
                  <Combobox.Option
                    key={room.id}
                    disabled={room.unavailable}
                    value={room}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-blue-800 text-white" : "text-gray-900"
                      }`
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {room.time}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-blue-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

export default SelectStartTime;
