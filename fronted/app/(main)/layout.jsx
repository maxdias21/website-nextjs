import Navbar from "@/components/Navbar/Navbar";

import "./global.css";


import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram, faLinkedin, faYoutube} from "@fortawesome/free-brands-svg-icons";

// Prevents Font Awesome icons from rendering oversized after browser back navigation
import {config} from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Providers from "../../components/Providers";

config.autoAddCss = false;


export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>
        <div className="container">
            <Navbar/>
            <Providers>
                {children}
            </Providers>


            <footer className="footer">
                <div className="social-media">
                    <a href=""><FontAwesomeIcon className="facebook" icon={faFacebook}/></a>
                    <a href=""><FontAwesomeIcon className="instagram" icon={faInstagram}/></a>
                    <a href=""><FontAwesomeIcon className="linkedin" icon={faLinkedin}/></a>
                    <a href=""><FontAwesomeIcon className="youtube" icon={faYoutube}/></a>
                </div>
                <div className="text">
                    Criado por Max ❤️
                </div>
            </footer>
        </div>
        </body>
        </html>
    );
};