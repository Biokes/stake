import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";


export default function Footer() {
    return (
        <div className="footer">
            <p className="text-xs font-semibold">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
            <section aria-label="social handles" className="footerIcons">
                <a href="https://github.com/biokes/stake" target="_blank" rel="noopener noreferrer"><FaGithub/></a>
                <a href="https://x.com/staketh" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
                <a href="https://facebook.com/staketh" target="_blank" rel="noopener noreferrer"><FaSquareFacebook/></a>
            </section>
        </div>
    )
}