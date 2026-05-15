'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ProjectCard } from '@/components/projects/project-card';
import { Briefcase, PlusCircle, MessageSquare, Loader2, Users, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BackButton } from '@/components/back-button';
import { useUser, useFirestore, useCollection, useDoc, useMemoFirebase } from '@/firebase';
import { collection, query, where, doc } from 'firebase/firestore';
import type { Project, User } from '@/lib/types';
import Link from 'next/link';

export default function ProfilePage({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const { user: currentUser } = useUser();
  const firestore = useFirestore();

  const userRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'users', userId) : null),
    [firestore, userId]
  );
  const { data: user, isLoading: userLoading } = useDoc<User>(userRef);

  const projectsQuery = useMemoFirebase(
    () =>
      firestore
        ? query(collection(firestore, 'projects'), where('userId', '==', userId))
        : null,
    [firestore, userId]
  );
  const { data: userProjects, isLoading: projectsLoading } = useCollection<Project>(projectsQuery);

  const isLoading = userLoading || projectsLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!user) {
    notFound();
  }

  const isOwnProfile = currentUser?.uid === user.id;
  const isIndividual = user.institutionType === 'Individual';

  return (
    <div className="bg-primary/5">
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <BackButton />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="items-center text-center">
                <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-primary/50">
                  <Image src={user.profilePicture || `https://avatar.vercel.sh/${user.email}.png`} alt={user.fullName} fill className="object-cover" />
                </div>
                <h1 className="text-2xl font-bold font-headline mt-4">{user.fullName}</h1>
                
                {/* Individual Privacy: Only show email if it's their own profile */}
                {isOwnProfile ? (
                   <p className="text-muted-foreground">{user.email}</p>
                ) : (
                   <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Shield className="h-3 w-3" />
                      <span>Verified {isIndividual ? 'Solo' : 'Student'} Maker</span>
                   </div>
                )}

                {!isIndividual && (
                   <Badge variant="outline" className="mt-2 font-mono text-xs">
                    ID: {user.id}
                  </Badge>
                )}

                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-5 w-5" />
                    <span className="font-bold text-lg">{user.followers || 0}</span>
                  </div>
                  {user.institutionType && (
                    <Badge variant={isIndividual ? "default" : "secondary"}>
                      {isIndividual ? "Independent Innovator" : user.institutionType}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground border-t pt-4 italic">
                  {user.bio || "No biography provided."}
                </p>
                <div className="mt-6 flex justify-center gap-2">
                  <Button size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" /> Chat
                  </Button>
                  <Button size="sm" variant="outline">
                    Follow
                  </Button>
                </div>
                {isIndividual && (
                  <p className="text-[10px] text-muted-foreground mt-4 uppercase tracking-widest">
                    Standalone Account • Full Privacy Enabled
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold font-headline">Project Showcase</h2>
              {isOwnProfile && (
                <Button asChild>
                  <Link href="/projects/new">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Project
                  </Link>
                </Button>
              )}
            </div>
            {userProjects && userProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <Card className="flex flex-col items-center justify-center text-center h-96">
                <CardContent>
                  <Briefcase className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold">No Projects Yet</h3>
                  <p className="text-muted-foreground mt-2">
                    {isOwnProfile
                      ? "Time to start creating! Click 'Add Project' to showcase your work."
                      : `${user.fullName} hasn't posted any projects yet.`}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
