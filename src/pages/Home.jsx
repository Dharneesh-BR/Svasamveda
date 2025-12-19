import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import UpcomingEvents from '../components/UpcomingEvents';

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-pink-50">
      <Navbar />
      <Hero />
      <UpcomingEvents />
    </div>
  );
}
