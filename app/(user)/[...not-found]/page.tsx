import Link from "next/link";
import { Paintbrush, Sparkles, Settings, FileEdit } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background px-4 text-center">
            <div className="mx-auto max-w-3xl space-y-8">
                <div className="space-y-2">
                    <div className="flex justify-center">
                        <Sparkles className="h-12 w-12 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                        Welcome to Your New Page!
                    </h1>
                    <p className="text-muted-foreground md:text-xl/relaxed">
                        Congratulations on creating your new web page. It's
                        ready for you to customize and make your own.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="rounded-lg border bg-card p-6 shadow-sm">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                            <Paintbrush className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">
                            Start Customizing
                        </h2>
                        <p className="text-sm text-muted-foreground mb-4">
                            Add your content, images, and personal touch to make
                            this page uniquely yours.
                        </p>
                    </div>

                    <div className="rounded-lg border bg-card p-6 shadow-sm">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                            <Settings className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">
                            Configure Settings
                        </h2>
                        <p className="text-sm text-muted-foreground mb-4">
                            Adjust layouts, colors, and functionality to suit
                            your specific needs.
                        </p>
                    </div>
                </div>

                <div className="rounded-lg border bg-muted/50 p-6">
                    <div className="flex items-center gap-2 mb-2">
                        <FileEdit className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Quick Tip</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Need help getting started? Check out our documentation
                        for templates, examples, and best practices to make the
                        most of your new page.
                    </p>
                </div>
            </div>
        </div>
    );
}
