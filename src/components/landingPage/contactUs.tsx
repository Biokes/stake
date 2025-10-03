import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function ContactUs() {
    return (
        <div style={{ fontFamily: "Knewave, cursive" }}>
            <motion.div className="text-center py-12 px-3 flex flex-col items-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            >
                <h2 className="text-4xl font-bold mb-8 text-primary">Contact Us</h2>
                <p className="text-muted-foreground">
                    Got some question for us ? Get in touch with our team.
                </p>
                <section className='flex md:flex-row flex-col  justify-center gap-10 md:gap-15 pt-5'>
                    <aside className="flex flex-col h-[400px] w-auto max-w-[350px] border-[1px] rounded-lg shadow-md overflow-hidden my-8">
                        <img src="/contactUs.jpeg" alt="" className="object-center object-contain" />
                    </aside>
                    <div className="flex flex-col gap-2 contactPad">
                        <article>
                            <Label htmlFor="message">Email</Label>
                            <Input className="w-full md:w-[70vw] max-w-[350px]" placeholder="Your email.Email.com" type="email" />
                        </article>
                        <article>
                            <Label htmlFor="message">Your name</Label>
                            <Input className="w-full md:w-[70vw] max-w-[350px]" placeholder="Your Full Name" />
                        </article>
                        <article>
                            <Label htmlFor="message">Message</Label>
                            <Textarea placeholder="Your message description" cols={20} className="resize-none max-w-[350px] h-[90px]" />
                        </article>
                        <Button className="mt-5">
                            Send Message
                        </Button>
                    </div>
                </section>
            </motion.div>

        </div>
    )
}