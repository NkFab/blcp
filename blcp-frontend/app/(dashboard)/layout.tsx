'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  ShieldCheckIcon,
  HouseIcon,
  FileTextIcon,
  UsersIcon,
  ClockCounterClockwiseIcon,
  SignOutIcon,
  UserIcon,
  PlusIcon,
  CaretDownIcon,
} from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  permission?: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, isAuthenticated, permissions, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const navItems: NavItem[] = [
    { label: 'Dashboard', href: '/dashboard', icon: <HouseIcon size={20} weight="duotone" /> },
    { label: 'Applications', href: '/applications', icon: <FileTextIcon size={20} weight="duotone" /> },
  ];

  // Add role-specific nav items
  if (permissions?.canManageUsers) {
    navItems.push({ 
      label: 'Users', 
      href: '/users', 
      icon: <UsersIcon size={20} weight="duotone" /> 
    });
  }

  if (permissions?.canViewAuditLog) {
    navItems.push({ 
      label: 'Audit Log', 
      href: '/audit-log', 
      icon: <ClockCounterClockwiseIcon size={20} weight="duotone" /> 
    });
  }

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'supervisor':
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'approver':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'reviewer':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 text-primary">
              <ShieldCheckIcon size={32} weight="duotone" />
              <div className="hidden flex-col sm:flex">
                <span className="text-sm font-bold leading-none">BNR Portal</span>
                <span className="text-xs text-muted-foreground">Licensing & Compliance</span>
              </div>
            </Link>

            <nav className="hidden md:flex md:items-center md:gap-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={pathname === item.href ? 'secondary' : 'ghost'}
                    size="sm"
                    className={cn(
                      'gap-2',
                      pathname === item.href && 'bg-secondary'
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {permissions?.canCreateApplication && (
              <Link href="/applications/new">
                <Button size="sm" className="gap-2">
                  <PlusIcon size={16} weight="bold" />
                  <span className="hidden sm:inline">New Application</span>
                </Button>
              </Link>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 pl-2 pr-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden flex-col items-start md:flex">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className={cn('text-xs px-1.5 py-0.5 rounded-full capitalize', getRoleBadgeColor(user.role))}>
                      {user.role}
                    </span>
                  </div>
                  <CaretDownIcon size={16} className="text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user.name}</span>
                    <span className="text-xs font-normal text-muted-foreground">{user.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                    <UserIcon size={16} />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive cursor-pointer">
                  <SignOutIcon size={16} className="mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile navigation */}
        <nav className="flex items-center gap-1 overflow-x-auto border-t px-4 py-2 md:hidden">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? 'secondary' : 'ghost'}
                size="sm"
                className={cn(
                  'gap-2 whitespace-nowrap',
                  pathname === item.href && 'bg-secondary'
                )}
              >
                {item.icon}
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </header>

      {/* Main content */}
      <main className="p-4 md:p-6">{children}</main>
    </div>
  );
}
