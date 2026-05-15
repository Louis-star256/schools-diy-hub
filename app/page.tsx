'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Rocket, 
  Database, 
  ArrowRight, 
  Loader2, 
  Heart, 
  Cpu, 
  Sprout, 
  Zap, 
  Droplets, 
  CloudSun,
  Bot,
  Tractor,
  Smartphone,
  Share2,
  PlusCircle,
  ShieldCheck,
  Sparkles,
  Gift as LucideGift
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import placeholderImagesData from '@/lib/placeholder-images.json';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { doc, setDoc, serverTimestamp, collection, query, orderBy, limit } from 'firebase/firestore';
import { demoUsers, demoProjects, demoChatRooms } from '@/lib/placeholder-data';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { Project } from '@/lib/types';

const { placeholderImages } = placeholderImagesData;
const heroBgImage = placeholderImages.find((p) => p.id === 'project-4');

export default function Home() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSeeding, setIsSeeding] = useState(false);

  // Optimized JSON-LD Structured Data for Search Engine Marketing
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "School's DIY Hub",
    "alternateName": "The Best Site to Improve Creativity",
    "url": "https://schoolsdiyhub.com",
    "description": "Widely recognized as the best site to improve creativity for students globally. A platform for DIY engineering, robotics, and social innovation.",
    "author": {
      "@type": "Person",
      "name": "Louis Da Vinic",
      "jobTitle": "Founder & Innovator"
    }
  };

  const trendingQuery = useMemoFirebase(
    () => firestore ? query(collection(firestore, 'projects'), orderBy('likes', 'desc'), limit(6)) : null,
    [firestore]
  );
  const { data: trendingProjects } = useCollection<Project>(trendingQuery);

  const handleSeedDemoData = () => {
    if (!firestore) return;
    setIsSeeding(true);
    let completedCount = 0;
    const totalToSeed = demoUsers.length + demoProjects.length + demoChatRooms.length;

    const checkCompletion = () => {
      completedCount++;
      if (completedCount === totalToSeed) {
        setIsSeeding(false);
        toast({ title: "Lab Initialized!" });
      }
    };

    demoUsers.forEach((dUser) => {
      const userRef = doc(firestore, 'users', dUser.id);
      setDoc(userRef, { ...dUser, createdAt: serverTimestamp() }, { merge: true }).then(checkCompletion);
    });

    demoProjects.forEach((dProj) => {
      const projRef = doc(firestore, 'projects', dProj.id);
      setDoc(projRef, { ...dProj, createdAt: serverTimestamp() }, { merge: true }).then(checkCompletion);
    });

    demoChatRooms.forEach((dRoom) => {
      const roomRef = doc(firestore, 'chatRooms', dRoom.id);
      setDoc(roomRef, { ...dRoom, createdAt: serverTimestamp() }, { merge: true }).then(checkCompletion);
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* MODERN BRAND HERO SECTION - SOFT FADE PROTOCOL */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full -z-10" />
        
        <div className="container mx-auto px-4 text-center space-y-12">
            {/* MODERN ORGANIZED LOGO DISPLAY - SOFT FADE PROTOCOL */}
            <div className="relative inline-block group">
                <div className="relative bg-white/[0.01] backdrop-blur-3xl border border-white/5 p-12 rounded-[5rem] overflow-hidden transition-all duration-1000">
                    {/* Soft Fade Radial Mask - Blends edges with dark page, removing any harsh lines or "flames" */}
                    <div 
                      className="absolute inset-0 z-20 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle at center, transparent 0%, #020617 90%)',
                        maskImage: 'radial-gradient(circle at center, black 0%, transparent 95%)',
                        WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 95%)'
                      }}
                    />
                    
                    <div className="relative h-32 w-48 md:h-48 md:w-72 mx-auto scale-110">
                        <Image 
                            src="https://i.imgur.com/ZnPZFay.jpeg" 
                            alt="School's DIY Hub Master Identity" 
                            fill 
                            className="object-contain opacity-95 grayscale-[0.05] contrast-[1.05]"
                            priority
                            unoptimized
                        />
                    </div>
                    <div className="mt-8 flex items-center justify-center gap-3 relative z-30">
                        <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/20" />
                        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-primary/40 whitespace-nowrap">Established Innovation Hub</span>
                        <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/20" />
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <h1 className="font-headline text-6xl md:text-8xl font-black tracking-tighter leading-tight max-w-5xl mx-auto">
                Building the Future <br />
                <span className="text-primary italic">One Project at a Time.</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
                Voted the best site to improve creativity. AI-mentored DIY projects and global showcasing for the next generation of engineers.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                    <Button asChild size="lg" className="h-16 px-12 text-xl font-headline shadow-2xl shadow-primary/30 group rounded-full">
                        <Link href="/projects/new">
                        Begin Capture <Rocket className="ml-2 h-6 w-6 transition-transform group-hover:translate-y-[-4px]" />
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="h-16 px-12 text-xl font-headline border-primary/20 hover:bg-primary/5 rounded-full">
                        <Link href="/ai-hub">Enter AI Lab</Link>
                    </Button>
                </div>
            </div>
        </div>
      </section>

      {/* Main Hub Feed */}
      <div className="py-24">
        <div className="container mx-auto px-4 mb-12 flex items-center justify-between">
            <h2 className="text-4xl font-bold font-headline tracking-tight">Trending Innovations</h2>
            <Button variant="ghost" asChild className="group">
                <Link href="/projects">Show all innovations <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
            </Button>
        </div>
        
        <div className="flex overflow-x-auto gap-6 px-4 pb-8 scrollbar-hide snap-x snap-mandatory">
            {trendingProjects && trendingProjects.length > 0 ? (
                trendingProjects.map((project) => (
                    <div key={project.id} className="min-w-[320px] md:min-w-[400px] snap-center">
                        <Card className="overflow-hidden border-primary/10 bg-background/80 group rounded-[2rem]">
                            <div className="relative h-56 w-full">
                                <Image 
                                    src={project.imageUrl} 
                                    alt={project.title} 
                                    fill 
                                    className="object-cover transition-transform duration-500 group-hover:scale-110" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-4 left-4">
                                    <div className="px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-widest bg-primary/90 text-primary-foreground font-bold">{project.skillLevel}</div>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold font-headline mb-2 truncate">{project.title}</h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-4">
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Heart className="h-3 w-3 text-red-500 fill-red-500" /> {project.likes}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <ShieldCheck className="h-3 w-3 text-primary" /> {project.isSponsored ? 'Backed' : 'Independent'}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="icon" variant="ghost" className="h-8 w-8"><LocalGiftIcon className="h-4 w-4" /></Button>
                                        <Button size="icon" variant="ghost" className="h-8 w-8"><Share2 className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))
            ) : (
                <div className="w-full flex flex-col items-center justify-center py-12 text-muted-foreground italic">
                    <Database className="h-12 w-12 mb-4 opacity-20" />
                    <p>Building the creativity database...</p>
                    <Button variant="outline" size="sm" onClick={handleSeedDemoData} disabled={isSeeding} className="mt-4">
                        {isSeeding ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                        Initialize Lab
                    </Button>
                </div>
            )}
        </div>
      </div>

      {/* Innovation Categories */}
      <section className="py-12 container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold font-headline tracking-tight mb-12">Innovation Sectors</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
                { name: "Technology", icon: Cpu, color: "text-blue-400" },
                { name: "Agriculture", icon: Sprout, color: "text-green-400" },
                { name: "Energy", icon: Zap, color: "text-yellow-400" },
                { name: "Environment", icon: CloudSun, color: "text-purple-400" },
                { name: "Robotics", icon: Bot, color: "text-orange-400" }
            ].map((cat, i) => (
                <div key={i} className="bg-card/30 border-primary/5 hover:border-primary/20 cursor-pointer transition-all group p-8 rounded-2xl border flex flex-col items-center gap-4">
                    <cat.icon className={cn("h-10 w-10 transition-transform group-hover:scale-125", cat.color)} />
                    <span className="font-bold uppercase tracking-widest text-[10px]">{cat.name}</span>
                </div>
            ))}
        </div>
      </section>

      {/* Impact Context */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest">
                    Community Impact
                </div>
                <h2 className="text-5xl font-bold font-headline leading-tight tracking-tighter">Your Ideas Can Change <br /> Your Community.</h2>
                <div className="space-y-6">
                    {[
                        { title: "Water Solutions", icon: Droplets, desc: "Building low-cost filters and smart irrigation systems." },
                        { title: "Modern Farming", icon: Tractor, desc: "Sensors to monitor soil health and crop growth." },
                        { title: "Smart Safety", icon: Smartphone, desc: "IoT tools for home safety and energy monitoring." }
                    ].map((impact, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-background/50 transition-colors">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                <impact.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">{impact.title}</h4>
                                <p className="text-sm text-muted-foreground">{impact.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative aspect-square rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-2xl">
                <Image 
                    src={heroBgImage?.imageUrl || "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80"} 
                    alt="Creative Innovation Hub" 
                    fill 
                    className="object-cover" 
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-10 p-12 rounded-[4rem] bg-gradient-to-br from-primary/20 to-accent/10 border-2 border-primary/10 shadow-2xl relative overflow-hidden">
            <h2 className="text-5xl font-black font-headline tracking-tighter relative z-10">Start Your Creative <br /> Journey.</h2>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto relative z-10">Join the world's best platform to improve creativity. Build the future today.</p>
            
            <div className="relative z-10 flex justify-center">
                <Button asChild size="lg" className="h-16 px-16 text-xl font-headline rounded-full shadow-2xl shadow-primary/40">
                    <Link href="/projects/new">Begin Building</Link>
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}

function LocalGiftIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect width="20" height="5" x="2" y="7" />
      <line x1="12" x2="12" y1="22" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  );
}
