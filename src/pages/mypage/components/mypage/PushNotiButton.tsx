import { useState } from "react";

export default function PushNotiButton() {
  const [isPushAllowed, setIsPushAllowed] = useState(false);

  return (
    <button
      onClick={() => setIsPushAllowed(!isPushAllowed)}
      className={`justify-start transition-all p-1 duration-300 flex items-center w-10 border-none rounded-2xl h-1/2 hover:text-inherit ${
        isPushAllowed ? "bg-primary-main pl-5" : "bg-gray-light"
      }`}
    >
      <div className="h-full bg-white rounded-full aspect-square shrink-0"></div>
    </button>
  );
}
