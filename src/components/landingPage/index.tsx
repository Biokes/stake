import { Button } from "../ui/button";
import { motion } from "framer-motion";
import ContactUs from "./contactUs";
import Navbar from "../commons/navbar";
import Footer from "../commons/footer";
import SupportedNetworks from "./supportedNetworks";

export default function LandingPage() {
    const statsCard: { texts: string; numerics: string }[] = [
        { texts: "Total value locked", numerics: "$1.2B" },
        { texts: "Total Rewards paid", numerics: "$1.2B" },
        { texts: "Total Stakers", numerics: "$1.2B" },
        { texts: "Total trade-able assets ", numerics: "$50M+" },
    ]
    return (
        <div>
            <Navbar />
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
            <div className="flex flex-col justify-center w-full text-center pt-12 mb-8">
                <section className="statsCard">
                    {
                        statsCard.map((card, index) => (
                            <motion.div key={index}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 3, ease: "easeOut" }}
                                className="w-[40%] sm:w-[18%] py-4 rounded-2 text-center flex flex-col items-center transition-all transform duration-400 gap-2 rounded hover:scale-105 backdrop-2xl bg-primary/50"
                            >
                                <p className="text-white">{card.texts}</p>
                                <h2 className="text-white">{card.numerics}</h2>
                            </motion.div>
                        ))
                    }
                </section>
                <SupportedNetworks />
            </div>
                <section className="about">
                    <p className="text-xl p-1 rounded-md text-nowrap bg-primary text-background font-bold w-[150px] text-center">About Us</p>
                    <div >
                        <div className='text-white/70 md:leading-snug text-center items-center flex w-full h-full  p-2 text-sm md:text-lg'>
                            Staketh makes advanced DeFi accessible to everyone. Whether you're staking for passive income,
                            exploring flash-loan arbitrage opportunities, or minting NFTs with exclusive rewards,
                            our platform guides you every step of the way. With our non-custodial architecture,
                            your assets remain under your control at all times. We're committed to transparency,
                            security, and empowering users to unlock the full potential of decentralized finance
                            across all supported networks.
                        </div>
                        <div className="w-full h-full rounded overflow-hidden border-[1px]">
                            <img src="/about.jpeg" alt="about us" loading="lazy" className="w-full h-full object-cover object-contain" />
                        </div>
                    </div>
                </section>
            <ContactUs />
            <Footer />
        </div>
    )
}