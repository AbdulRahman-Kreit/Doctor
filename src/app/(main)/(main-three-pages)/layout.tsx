import Navbar from "@/components/Generals/Navbar";

export default function MainLayout({
    children,
    
}: {
    children: React.ReactNode;
    doctorModal: React.ReactNode;
}) {
    return (
        <main className="relative overflow-hidden bg-white max-w-191.75 w-full mim-h-screen 
        mx-auto font-nunito flex flex-col items-center">
            
            {children}
            
            
            
            <Navbar />
        </main>
    );
}