
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <p className="text-2xl font-medium text-gray-700 mt-4 mb-8">
          Page Not Found
        </p>
        <p className="text-center text-gray-600 max-w-md mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Button asChild size="lg">
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
