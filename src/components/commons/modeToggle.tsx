import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "@/contexts/theme-context"

export default function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const isDark = theme === "dark"
    return (
        <div
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative flex items-center justify-between px-1 py-0.5 border rounded-full cursor-pointer select-none w-[127px]"
        >
            <motion.div
                animate={{ x: isDark ? 76 : 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                className="absolute w-10 h-8 rounded-full bg-primary left-1"
            />
            <div className="relative z-10 flex w-10 h-8 items-center justify-center">
                <Sun className={`h-4 w-4 transition-colors ${!isDark ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
            </div>
            <div className="relative z-10 flex w-10 h-8 items-center justify-center">
                <Moon className={`h-4 w-4 transition-colors ${isDark ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
            </div>
        </div>
    )
}