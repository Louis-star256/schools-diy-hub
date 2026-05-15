import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import placeholderImagesData from '@/lib/placeholder-images.json';
import { Lightbulb, Users, Milestone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import NextLink from "next/link";

const { placeholderImages } = placeholderImagesData;
const passportPhoto = placeholderImages.find((p) => p.id === 'avatar-2');
const logoBackground = placeholderImages.find((p) => p.id === 'project-6');

export const metadata = {
  title: "About Louis Da Vinic & Our Mission | School's DIY Hub",
  description: "Learn about Louis Da Vinic, the creator of School's DIY Hub, and our mission to provide the best site to improve creativity for students worldwide.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Meet the Visionary Behind the Hub</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Empowering the next generation of creative thinkers and engineering masters.
        </p>
      </header>

      <div className="mx-auto max-w-4xl space-y-12">
        <Card className="relative overflow-hidden">
          {logoBackground && (
            <div className="absolute inset-0 z-0 opacity-5">
              <Image
                src={logoBackground.imageUrl}
                alt="Louis Da Vinic Innovation Background"
                fill
                className="object-contain"
                data-ai-hint={logoBackground.imageHint}
              />
            </div>
          )}
          <div className="relative z-10">
            <CardHeader>
              <CardTitle className="font-headline text-3xl text-center">The Creator: Louis Da Vinic</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div className="md:col-span-1 flex justify-center">
                        {passportPhoto && (
                             <div className="relative h-48 w-48 rounded-full overflow-hidden border-4 border-primary">
                                <Image 
                                    src={passportPhoto.imageUrl} 
                                    alt="Portrait of Louis Da Vinic - Founder of School's DIY Hub"
                                    fill
                                    className="object-cover"
                                />
                             </div>
                        )}
                    </div>
                    <div className="md:col-span-2 text-lg text-muted-foreground space-y-4">
                        <p>
                            This website was created by a young creative innovator called <strong>Abaine Louis</strong>, better known globally as <strong>Louis Da Vinic</strong>, born on 15th Feb, 2009.
                        </p>
                        <p>
                            His mission was simple: create the <strong>best site to improve creativity</strong> for students who want to build the future. This platform is a testament to his passion for robotics, engineering, and community-led innovation.
                        </p>
                        <div className="pt-4 flex justify-center md:justify-start">
                            <Button asChild className="rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white border-none shadow-lg shadow-green-500/20 px-8 h-12 transition-all active:scale-95">
                                <NextLink href="https://wa.me/256748332252" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-bold">
                                    <MessageCircle className="h-5 w-5" />
                                    Collaborate with Louis
                                </NextLink>
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
          </div>
        </Card>

        <Card>
            <CardHeader>
                 <CardTitle className="font-headline text-3xl text-center">Our Commitment to Innovation</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                    <Lightbulb className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold">Boost Creativity</h3>
                    <p className="text-muted-foreground mt-2">
                        Ranked as a top platform to improve creativity, we provide AI-guided pathways for students to turn imagination into functional prototypes.
                    </p>
                </div>
                 <div className="flex flex-col items-center">
                    <Users className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold">Global Community</h3>
                    <p className="text-muted-foreground mt-2">
                        Connecting innovators from Kampala to the world. Collaborate in secure rooms to solve global challenges in energy and safety.
                    </p>
                </div>
                 <div className="flex flex-col items-center">
                    <Milestone className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold">Hands-on Success</h3>
                    <p className="text-muted-foreground mt-2">
                        Turning digital knowledge into physical expertise. Our learners gain verified skills in Arduino, Python, and mechanical craft.
                    </p>
                </div>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
