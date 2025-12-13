import Link from 'next/link';
import { Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full py-6 mt-auto border-t border-slate-200 bg-white">
            <div className="container mx-auto flex flex-col items-center justify-center gap-4 text-center md:flex-row md:justify-between px-4">

                {/* Left Side: Built By Text */}
                <p className="text-sm text-slate-500">
                    Built by{' '}
                    <Link
                        href="https://dornmarv.github.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-slate-900 hover:underline underline-offset-4 transition-colors"
                    >
                        Don Marv
                    </Link>
                </p>

                {/* Right Side: Social Icons */}
                <div className="flex items-center gap-4">
                    <Link
                        href="https://x.com/0xDonMarv"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-[#1DA1F2] transition-colors"
                        aria-label="Twitter Profile"
                    >
                        <Twitter size={20} />
                    </Link>

                    <Link
                        href="https://linkedin.com/in/marvellous-posu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-[#0A66C2] transition-colors"
                        aria-label="LinkedIn Profile"
                    >
                        <Linkedin size={20} />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;