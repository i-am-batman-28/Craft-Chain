import Providers from "@/components/Providers";
import "@/app/globals.css";

export const metadata = {
    title: "Craftsman Marketplace",
    description: "Authentic artisan products with NFT verification",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
