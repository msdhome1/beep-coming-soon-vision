import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
const Index = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);

    // Simulate API call - replace with actual backend integration
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Thanks for joining! We\'ll be in touch soon.');
      setEmail('');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {/* Replace the src with your .mov file path */}
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40">
          <source src="/path-to-your-video.mov" type="video/mp4" />
          {/* Fallback gradient if video doesn't load */}
          <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" />
        </video>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Logo */}
        <div className="mb-8 animate-pulse">
          <img src="/lovable-uploads/fc57d4ab-8146-43be-8a91-e5c01a93601b.png" alt="Beep" className="h-16 md:h-24 w-auto" />
        </div>

        {/* Coming Soon Text */}
        <div className="mb-12 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight lg:text-4xl">agentic payments</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{
          color: '#30b0fcff'
        }}>
            beep beep
          </p>
        </div>

        {/* Email Signup Form */}
        <div className="w-full max-w-md space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} className="flex-1 border-yellow-400 border-2 text-white !placeholder-white focus:border-yellow-300 backdrop-blur-sm bg-transparent" required />
              <Button type="submit" disabled={isSubmitting} className="text-white font-medium px-8 py-2 transition-colors" style={{
              backgroundColor: '#ce2af1ff'
            }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b525d9'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ce2af1ff'}>
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </Button>
            </div>
          </form>
        </div>

        {/* Social Proof / Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">Join thousands of vibe coders today</p>
        </div>
      </div>

      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 z-5" />
    </div>;
};
export default Index;