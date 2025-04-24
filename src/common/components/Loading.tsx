import { ScaleLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex w-full h-full bg-white/40 center">
      <ScaleLoader color="#4854a2" />
    </div>
  );
}
