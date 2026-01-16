import { Navbar } from '@/components/common/Navbar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Custom Tailoring, <br className="hidden sm:inline" />
            <span className="text-primary">Powered by AI</span>
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Connect with professional tailors and get the perfect fit with our AI-powered sizing technology.
          </p>
          <div className="flex gap-4">
            <Link href="/register">
              <Button size="lg">Find a Tailor</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="lg">Become a Seller</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
