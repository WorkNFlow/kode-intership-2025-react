import { useEffect, useState } from "react";

const SkeletonLoader = () => {
    const [count, setCount] = useState(Math.ceil((window.innerHeight - 250) / 80));

    useEffect(() => {
        const handleResize = () => {
            setCount(Math.ceil((window.innerHeight - 250) / 80));
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className="space-y-4 p-4">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4 animate-pulse">
                    <div className="w-18 h-18 bg-[#F3F3F6] rounded-full"></div>
                    <div className="flex-1 space-y-2">
                        <div className="w-36 h-4 bg-[#F3F3F6] rounded-full"></div>
                        <div className="w-20 h-4 bg-[#F3F3F6] rounded-full"></div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default SkeletonLoader;