import Link from 'next/link'
import { Book, LayoutDashboard, LineChart, Settings } from 'lucide-react'

const navItems = [
    { href: '/', label: 'Home', icon: LayoutDashboard },
    { href: '/study', label: 'Study', icon: Book },
    { href: '/progress', label: 'Progress', icon: LineChart },
    { href: '/settings', label: 'Settings', icon: Settings },
]

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
            {/* Mobile Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-lg border-t border-white/10 flex items-center justify-around z-50">
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
                        <item.icon size={20} />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 flex-col gap-8 p-6 bg-card/30 backdrop-blur-md border-r border-white/5 min-h-screen sticky top-0">
                <h1 className="text-2xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent px-2">
                    LingoLearn
                </h1>
                <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
                        >
                            <item.icon size={20} className="group-hover:text-primary transition-colors" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-10 pb-24 md:pb-10 max-w-7xl mx-auto w-full">
                {children}
            </main>
        </div>
    )
}
