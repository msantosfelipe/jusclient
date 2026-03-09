import { MessageCircle } from "lucide-react";

const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/5511999999999"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Contato WhatsApp"
    >
      <MessageCircle size={28} className="text-white" fill="white" />
    </a>
  );
};

export default WhatsAppFloat;
