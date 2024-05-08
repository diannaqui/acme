// Streaming the page, allowes to break down a route into smaller chunks
// and progressively stream them from the server to the client

// skeleton is a placeholder to indicate to users 
// that the content is loading
import DashboardSkeleton from '@/app/ui/skeletons';

export default function Loading() {
    return <DashboardSkeleton />;
  }