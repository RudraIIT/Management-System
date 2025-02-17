import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Code2, Trophy, FileText, Send, Menu, Users } from "lucide-react";
import { useAuth } from "./providers/AuthContextProvider";
import { useEffect } from "react";
import Cookies from "js-cookie";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: "Problems",
    href: "/problems",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    title: "Contests",
    href: "/contests",
    icon: <Trophy className="h-4 w-4" />,
  },
  {
    title: "Submissions",
    href: "/submissions",
    icon: <Send className="h-4 w-4" />,
  },
  {
    title: "Leaderboard",
    href: "/leaderboard",
    icon: <Users className="h-4 w-4" />,
  },
];

export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, setUser } = useAuth();

  useEffect(() => {
    if(!Cookies.get("token") || !Cookies.get("user")) {
      setUser(null)
    }
  },[user])

  const handleLogout = () => {
    Cookies.remove("token")
    Cookies.remove("user")
    setUser(null)
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Code2 className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">CodeArena</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center space-x-2 text-muted-foreground hover:text-foreground",
                  location.pathname === item.href && "text-foreground"
                )}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="mr-2 md:hidden">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 mt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-2 text-muted-foreground hover:text-foreground",
                    location.pathname === item.href && "text-foreground"
                  )}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {user ? (
              <Button variant="outline" className="mr-2" asChild onClick={handleLogout}>
                <Link to="/sign-in">Sign Out</Link>
              </Button>
            ) : (
              <Button variant="outline" className="mr-2" asChild>
                <Link to="/sign-in">Sign In</Link>
              </Button>
            )}
          </div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
