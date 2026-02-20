import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6 space-y-8">
      <Skeleton className="h-[400px] w-full rounded-2xl" />
      <div className="grid md:grid-cols-2 gap-12 p-12">
        <Skeleton className="h-96" />
        <div className="space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-32" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}
