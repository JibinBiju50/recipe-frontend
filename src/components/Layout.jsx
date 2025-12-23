import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
    return (
        <>
        <Navbar />
        <main className="w-full px-4 pt-24 bg-[var(--color-bg)] text-[var(--color-font)] overflow-x-hidden">
            {children}
        </main>
        <Footer />
        </>
    )
}