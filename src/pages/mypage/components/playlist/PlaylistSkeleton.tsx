const SkeletonItem = () => {
  return (
    <div className="flex flex-col w-full border rounded-md cursor-pointer border-gray-border hover:text-black">
      <div className="relative flex w-full bg-cover bg-gray-border aspect-square animate-pulse"></div>
      <div className="flex flex-col gap-1 px-3 py-2">
        <div className="w-24 h-5 rounded-md bg-gray-dark animate-pulse"></div>
        <div className="w-16 h-4 rounded-md bg-gray-light animate-pulse"></div>
      </div>
    </div>
  );
};

export default function PlaylistSkeleton() {
  return (
    <>
      {[1, 2, 3, 4].map((key) => (
        <SkeletonItem key={key} />
      ))}
    </>
  );
}
