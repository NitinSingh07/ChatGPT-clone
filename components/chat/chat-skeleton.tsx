export function ChatSkeleton() {
  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 border-r border-border animate-pulse">
        <div className="h-16 border-b border-border flex items-center justify-center">
          <div className="h-8 w-32 bg-muted rounded" />
        </div>
        <div className="p-4 space-y-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-10 bg-muted rounded" />
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="h-16 border-b border-border animate-pulse" />
        <div className="flex-1 p-4 space-y-4 animate-pulse">
          <div className="h-20 bg-muted rounded max-w-xl" />
          <div className="h-32 bg-muted rounded max-w-2xl ml-auto" />
          <div className="h-16 bg-muted rounded max-w-md" />
        </div>
      </div>
    </div>
  );
}
