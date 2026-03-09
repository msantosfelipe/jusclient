import { Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-10 px-4 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[100px] rounded-full opacity-5 blur-[80px] pointer-events-none" style={{ background: "hsl(var(--gold))" }} />
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div>
          <span className="text-xl font-bold font-display gradient-text-gold">JusClient</span>
          <p className="text-xs text-muted-foreground mt-1">
            Transformando a comunicação jurídica.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center border border-border hover:border-primary/40 hover:bg-muted/30 transition-all"
          >
            <MessageCircle size={18} className="text-muted-foreground" />
          </a> */}
          <a
            href="https://instagram.com/jusclient"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center border border-border hover:border-primary/40 hover:bg-muted/30 transition-all"
          >
            <Instagram size={18} className="text-muted-foreground" />
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} JusClient. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
