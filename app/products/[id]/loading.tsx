import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6 max-w-6xl">
      <div className="grid md:grid-cols-2 gap-12 pt-12 pb-12">
        <Skeleton className="h-[400px] md:h-[500px] rounded-2xl" />
        <div className="space-y-6 p-8 md:p-12">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-32" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
          </div>
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}
