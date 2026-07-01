import './Footer.css'

function Footer(){

    return (
        <footer className="relative bottom-0 h-56 md:h-60 mt-40">
            <ul className="absolute top-1/2 list-none p-0 flex flex-col lg:flex-row gap-4 w-full">
                <li className="footer-li">Mi correo electrónico: ejemplo@mail.com</li>
                <li className="footer-li">Mi número celular: +5491112223333</li>
            </ul>
        </footer>
    )
}

export default Footer;