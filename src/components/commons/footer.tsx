import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";


export default function Footer() {
    return (
        <div className="footer">
            <p className="text-xs font-semibold">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
            <section aria-label="social handles" className="footerIcons">
                <FaGithub />
                <FaXTwitter />
                <FaSquareFacebook />
            </section>
        </div>
    )
}