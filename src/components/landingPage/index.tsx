import { Button } from "../ui/button";
import { motion } from "framer-motion";
import ContactUs from "./contactUs";
import Navbar from "../commons/navbar";
import Footer from "../commons/footer";
import SupportedNetworks from "./supportedNetworks";

export default function LandingPage() {
    return (
        <div>
            <Navbar/>
            <main className="hero">
                <section className="flex flex-col items-center justify-center text-center w-full p-2">
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold mb-8 gap-2 text-center items-center"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <span className="text-white">Decentralized</span> <br />
                        <span className="text-primary shadow-white">Staking</span><br />
                        <span className="text-white">for the future</span>
                    </motion.h1>
                    <motion.p
                        className="md:text-[1.3rem] text-[1rem] text-white md:mb-12 max-w-2xl md:mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    >
                        Securely stake your digital assets and earn rewards with our non-custodial platform
                    </motion.p>
                    <Button className=" transition-transform transform duration-400 ease-in-out hover:scale-108 my-2">Get Started</Button>
                </section>
            </main>
            <SupportedNetworks/>
            <ContactUs />
            <Footer/>
        </div>
    )
}