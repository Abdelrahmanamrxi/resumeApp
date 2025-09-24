
import { motion } from "framer-motion";
import logo from '../../../assets/CATALYx.png'


const footerLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#" },
  { name: "Pricing", href: "#" },
];

function Footer() {
  return (
    <footer className="relative  bg-gradient-to-b from-blue-200 via-blue-400 to-blue-500 text-white py-12 mt-20 overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 opacity-40 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center ">

            <img className="invert w-1/3" src={logo}/>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Building modern web experiences with smooth design, clean code,
              and smart animations.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <a
                    href={link.href}
                    className="text-white font-semibold hover:font-bold transition"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Socials */}
         
        </div>

        {/* Divider */}
        <motion.div
          className="my-10 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center text-sm text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p>© {new Date().getFullYear()} catalyX. All rights reserved.</p>
       
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
