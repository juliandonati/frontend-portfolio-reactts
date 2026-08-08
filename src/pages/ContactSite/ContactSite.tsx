export function ContactSite() {
    return (
        <div className="overflow-hidden">
            <div className="text-left flex flex-col gap-16 p-16 items-center relative">
                <div className="w-5/6 h-5/6 bottom-5 bg-yellow-300 -z-1 absolute rotate-12"></div>
                <div className="w-1/2 h-1/2 top-10 md:w-2/3 md:h-2/3 bg-green-400 -z-1 absolute left-1/3 bottom-1/3 -rotate-6"></div>
                <div className="w-full h-full bg-white z-0 absolute opacity-75 rounded-4xl"></div>
                <h2 className="text-8xl text-shadow-lg text-shadow-blue-500 text-center z-1">¿Querés contactarme?</h2>
                <div className="gap-8 flex flex-col p-16 z-1">
                    <h3 className="text-6xl underline">Mis medios de contacto:</h3>
                    <ul className="text-4xl list-disc flex flex-col gap-8">
                        <li><span className="underline decoration-dashed">Número celular:</span><br/> +54 9 223 690 0433</li>
                        <li><span className="underline decoration-dashed">Correo electrónico:</span><br/> juliandonati5@gmail.com</li>
                        <li><a href="https://www.linkedin.com/in/juliandonati/" target="_blank"  className="text-blue-900 underline">Mi Linkedin</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}