import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="container max-w-xl text-center">
        <p className="text-sm text-muted-foreground mb-2">404</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Page not found
        </h1>
        <p className="text-muted-foreground mb-8">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link to="/" className="cosmic-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
