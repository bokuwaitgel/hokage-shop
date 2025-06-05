import { cn } from '@/lib/utils';

interface PageHeroProps {
  title: string;
  description?: string;
  className?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}

export function PageHero({
  title,
  description,
  className,
  backgroundImage,
  children,
}: PageHeroProps) {
  return (
    <div
      className={cn(
        "relative py-16 md:py-24 w-full bg-gradient-to-r from-primary/10 to-primary/5",
        className
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      <div className="container relative z-10 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{title}</h1>
        {description && (
          <p className="max-w-2xl mx-auto text-muted-foreground md:text-lg">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );
}