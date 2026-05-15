
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { User, School, Building2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SignUpSelectionPage() {
    return (
        <div className="container mx-auto max-w-5xl px-4">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold font-headline tracking-tight">Join School's DIY Hub</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Choose the account type that best describes your role.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Individual Card */}
                <Card className="flex flex-col text-center hover:border-primary transition-colors">
                    <CardHeader>
                        <div className="mx-auto rounded-full bg-primary/10 p-4 mb-4">
                            <User className="h-10 w-10 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-headline">Individual</CardTitle>
                        <CardDescription>Solo makers & personal accounts.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <ul className="text-xs text-muted-foreground space-y-2 mb-6">
                            <li>Post DIY projects directly</li>
                            <li>Receive direct sponsorship</li>
                            <li>Full access to all tools</li>
                        </ul>
                    </CardContent>
                    <div className="p-6 pt-0">
                        <Button asChild className="w-full">
                            <Link href="/signup/individual">Register Personal</Link>
                        </Button>
                    </div>
                </Card>

                {/* Supervisor Card */}
                <Card className="flex flex-col text-center hover:border-primary transition-colors">
                    <CardHeader>
                        <div className="mx-auto rounded-full bg-accent/10 p-4 mb-4">
                            <ShieldCheck className="h-10 w-10 text-accent" />
                        </div>
                        <CardTitle className="text-2xl font-headline">Supervisor</CardTitle>
                        <CardDescription>For teachers, patrons, & guides.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <ul className="text-xs text-muted-foreground space-y-2 mb-6">
                            <li>Manage & register pupils</li>
                            <li>Oversee student innovations</li>
                            <li>Link to your institution</li>
                        </ul>
                    </CardContent>
                    <div className="p-6 pt-0">
                        <Button asChild className="w-full" variant="secondary">
                            <Link href="/signup/supervisor">Register as Patron</Link>
                        </Button>
                    </div>
                </Card>

                {/* Institution Card */}
                <Card className="flex flex-col text-center hover:border-primary transition-colors">
                    <CardHeader>
                        <div className="mx-auto rounded-full bg-primary/10 p-4 mb-4">
                            <School className="h-10 w-10 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-headline">Institution</CardTitle>
                        <CardDescription>Primary, Secondary, or Tertiary heads.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <ul className="text-xs text-muted-foreground space-y-2 mb-6">
                            <li>Register your entire school</li>
                            <li>Manage staff & students</li>
                            <li>Verified school profile</li>
                        </ul>
                    </CardContent>
                    <div className="p-6 pt-0">
                        <Button asChild className="w-full" variant="outline">
                            <Link href="/signup/school">Register Institution</Link>
                        </Button>
                    </div>
                </Card>

                {/* Organisation Card */}
                <Card className="flex flex-col text-center hover:border-primary transition-colors">
                    <CardHeader>
                        <div className="mx-auto rounded-full bg-primary/10 p-4 mb-4">
                            <Building2 className="h-10 w-10 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-headline">Organisation</CardTitle>
                        <CardDescription>For NGOs, clubs, & groups.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <ul className="text-xs text-muted-foreground space-y-2 mb-6">
                            <li>Sponsor student projects</li>
                            <li>Post community updates</li>
                            <li>Corporate collaboration</li>
                        </ul>
                    </CardContent>
                    <div className="p-6 pt-0">
                        <Button asChild className="w-full" variant="ghost">
                            <Link href="/signup/organisation">Register Org</Link>
                        </Button>
                    </div>
                </Card>
            </div>

            <div className="mt-12 text-center">
                <p className="text-sm text-muted-foreground">
                    Looking for Student registration? <span className="font-semibold text-foreground">Students must be registered by their Supervisor.</span>
                </p>
                <div className="mt-4">
                    Already have an account?{" "}
                    <Link href="/login" className="underline text-primary">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}
