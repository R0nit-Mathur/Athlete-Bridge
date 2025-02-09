import { cn } from "@/lib/utils";

export function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl mx-auto px-4 py-4 bg-background min-h-screen",
        className,
      )}
    >
      {children}
    </div>
  );
}
