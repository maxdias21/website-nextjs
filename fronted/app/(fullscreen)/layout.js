import "./global.css";
import Providers from "../../components/Providers";


export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>
        <div className="container">
            <Providers>
                {children}
            </Providers>
        </div>
        </body>
        </html>
    );
};