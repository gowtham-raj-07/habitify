export default function Loader() {
    return (
        <div className="flex items-center justify-center min-h-[50vh] animate-fadeIn">
            <div className="relative flex justify-center items-center">
                <div className="absolute animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] w-16 h-16 rounded-full bg-cyan-400 opacity-20" />
                <div className="w-16 h-16 rounded-full border-4 border-gray-200 dark:border-gray-800 border-t-cyan-400 animate-spin shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
            </div>
        </div>
    );
}
