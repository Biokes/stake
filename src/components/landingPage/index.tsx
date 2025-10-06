import { Button } from "../ui/button";
import { motion } from "framer-motion";
import ContactUs from "./contactUs";
import Navbar from "../commons/navbar";
import Footer from "../commons/footer";
import SupportedNetworks from "./supportedNetworks";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { GiShieldEchoes } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { FaLink } from "react-icons/fa6";


import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import type { IconType } from "react-icons/lib";


type CardProps = {
    header: string,
    body: string
}

type WorkingProps = {
    icon: IconType,
    texts: CardProps
}


export default function LandingPage() {
    const statsCard: { texts: string; numerics: string }[] = [
        { texts: "Total value locked", numerics: "$1.2B" },
        { texts: "Total Rewards paid", numerics: "$1.2B" },
        { texts: "Total Stakers", numerics: "$1.2B" },
        { texts: "Total trade-able assets ", numerics: "$50M+" },
    ]

    const Hero = () => (
        <main className="hero">
            <section className="flex flex-col items-center justify-center text-center w-full p-2">
                <motion.h1
                    className="text-5xl md:text-7xl font-bold mb-8 gap-2 text-center items-center"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
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
    )

    const AboutUs = () => (
        <section className="about">
            <p className="text-xl p-1 rounded-md text-nowrap bg-primary text-background font-bold w-[150px] text-center">About Us</p>
            <div >
                <div className='text-white/70 md:leading-snug text-center items-center flex w-full h-full  p-2 text-md sm:text-lg'>
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
    )

    const ProtocolInfo = () => (
        <div className="flex flex-col justify-center w-full text-center pt-12 mb-8 gap-4">
            <section className="statsCard">
                {
                    statsCard.map((card, index) => (
                        <motion.div key={index}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
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
    )

    function FAQs() {
        const faqs = [
            {
                value: "item-1",
                question: "What is Staketh?",
                answer: [
                    "Staketh is a decentralized finance (DeFi) platform designed to simplify staking and yield generation across multiple networks.",
                    "It combines staking, liquidity tools, and automated earning mechanisms in a non-custodial environment."
                ]
            },
            {
                value: "item-2",
                question: "How does staking work on Staketh?",
                answer: [
                    "Users can connect their wallets, choose a supported network, and stake tokens directly through the platform.",
                    "Rewards are distributed automatically based on your staking duration and token type."
                ]
            },
            {
                value: "item-3",
                question: "Can I use Staketh on multiple networks?",
                answer: [
                    "Yes. Staketh supports multiple blockchain networks so you can manage and stake assets across chains from one interface.",
                    "This multi-chain approach allows you to diversify your yield sources without switching between platforms."
                ]
            },
            {
                value: "item-4",
                question: "Does Staketh charge any fees?",
                answer: [
                    "Staketh applies minimal transaction fees to cover network gas and protocol maintenance costs.",
                    "All fees are transparent and displayed before you confirm any action."
                ]
            },
            {
                value: "item-5",
                question: "What makes Staketh different from other DeFi platforms?",
                answer: [
                    "Unlike many DeFi platforms, Staketh integrates cross-chain staking, automated yield optimization, and on-chain transparency in one interface.",
                    "Its smart contracts are open-source and designed to give users complete control over their funds."
                ]
            }
        ]

        return (
            <div className="faq">
                <p className="p-1 rounded-md text-nowrap text-background font-bold w-[250px] text-center text-primary font-bold text-lg sm:text-2xl">Frequently asked questions </p>
                <div>
                    <div className="w-full h-full rounded overflow-hidden border-[1px]">
                        <img src="/faqs.jpeg" alt="about us" loading="lazy" className="w-full h-full object-cover object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <p className='text-lg font-bold pb-2 sm:pt-3 md:py-2'>{" "}</p>
                        <Accordion type="single" collapsible>
                            {faqs.map((faq) => (
                                <AccordionItem key={faq.value} value={faq.value}>
                                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                                    <AccordionContent>
                                        {faq.answer.map((paragraph, index) => (
                                            <p key={index}>{paragraph}</p>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        )
    }

    const Workings = () => {
        const props: WorkingProps[] = [
            { icon: GiShieldEchoes, texts: { header: "Non-custodial security", body: "You are always in control of your assets. \nWe never take custody of your assets." } },
            { icon: GrMoney, texts: { header: "Maximize rewards", body: "Maximize your earning with our optimized earning startegies and more benefits APYs and more." } },
            { icon: FaLink, texts: { header: "Multi-Chain Support", body: "Stake assets across a number of growing blockchain networks." } },
        ]
        return (
            <div className="text-center w-full py-12">
                <h3 className="text-2xl font-bold">Why choose staketh?</h3>
                <ul className='flex flex-col py-4 md:gap-4 gap-2 items-center'>
                    {
                        props.map(({ icon: Icon, texts }, index) => (
                            <Card key={index} className={cn("max-w-[350px] flex flex-row px-2 hover:scale-105 h-[110px] items-center duration-400 trasition-all transform")}>
                                <aside className='w-[60px] h-[60px] p-4 text-background bg-primary font-semibold rounded-[50%] flex items-center justify-center'>
                                    <Icon className="w-[28px] h-[28px]" />
                                </aside>
                                <section className="flex flex-col p-1 text-start">
                                    <h3 className="text-primary text-md font-semibold">{texts.header}</h3>
                                    <h6 className="text-xs text-white/70">{texts.body}</h6>
                                </section>
                            </Card>
                        ))
                    }
                </ul>
            </div>
        )
    }

    const Steps = () => {
        const props: CardProps[] = [
            { header: "Connect your wallet", body: "Connect with preffered non-custodial wallet." },
            { header: "Choose your asset", body: "Select the asset you want to stake from our list of networks." },
              { header: "Stake and Earn", body: "Stake assets, confirm transaction and start earning rewards immediately." }
        ]
        return (
            <div>
                <h3 className="text-2xl font-bold text-center w-full">How it works</h3>
                <ul className='flex flex-col py-4 md:gap-4 gap-2 items-center'>
                    {
                        props.map((texts, index) => (
                            <Card key={index} className={cn("w-full max-w-[350px] flex flex-row px-2 hover:scale-105 h-[110px] items-start duration-400 trasition-all transform gap-3")}>
                                <aside className='w-[20px] h-[20px] p-4 text-background bg-primary font-semibold rounded-[50%] flex items-center justify-center text-center'>
                                    <p className="w-[28px] h-[28px]">{ index+1 }</p>
                                </aside>
                                <section className="flex flex-col text-start">
                                    <h3 className="text-primary text-lg font-semibold">{texts.header}</h3>
                                    <h6 className="text-xs text-white/70">{texts.body}</h6>
                                </section>
                            </Card>
                        ))
                    }
                </ul>
            </div>
        )
    }

    const Info = () => (
        <article className="info">
            <Workings />
            <Steps />
        </article>
    )

    return (
        <div>
            <Navbar />
            <Hero />
            <ProtocolInfo />
            <Info />
            <AboutUs />
            <FAQs />
            <ContactUs />
            <Footer />
        </div>
    )
}