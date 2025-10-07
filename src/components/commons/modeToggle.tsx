import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "@/contexts/theme-context"

export default function ModeToggle() {
    const {theme, setTheme } = useTheme()
    const isDark = theme === "dark"

    return (
        <div onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative flex items-center gap-1 px-1 py-1 border rounded-full cursor-pointer select-none flex w-[60px]"
        >
            <motion.div
                animate={{ x: isDark ? 28 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute w-6 h-6 rounded-full bg-primary"
            />
            <div className="relative z-10 flex w-6 h-6 items-center justify-center">
                <Sun className="h-4 w-4" />
            </div>
            <div className="relative z-10 flex w-6 h-6 items-center justify-center">
                <Moon className="h-4 w-4" />
            </div>
        </div>
    )
}