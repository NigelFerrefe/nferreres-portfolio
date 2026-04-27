export default function ProjectDetailSkeleton() {
  return (
    <div className="flex flex-col items-center pt-4 px-4 md:px-6">
      <div className="w-full md:max-w-2xl lg:max-w-4xl flex justify-center">
        <div className="h-6 w-40 bg-muted rounded animate-pulse" />
      </div>

      <div className="w-full mt-6 max-w-lg md:max-w-2xl lg:max-w-4xl rounded-lg border border-border bg-card p-6 space-y-6">
        
        {/* title */}
        <div className="h-8 w-2/3 bg-muted rounded animate-pulse" />

        {/* description */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
          <div className="h-4 w-4/6 bg-muted rounded animate-pulse" />
        </div>

        {/* impact */}
        <div className="space-y-2">
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
          <div className="h-3 w-full bg-muted rounded animate-pulse" />
          <div className="h-3 w-5/6 bg-muted rounded animate-pulse" />
        </div>

        {/* tech */}
        <div className="flex gap-3">
          {[new Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-8 w-8 rounded bg-muted animate-pulse"
            />
          ))}
        </div>

        {/* buttons */}
        <div className="flex gap-3">
          <div className="h-9 w-28 bg-muted rounded animate-pulse" />
          <div className="h-9 w-28 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}