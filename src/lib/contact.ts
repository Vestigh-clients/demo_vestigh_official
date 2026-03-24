export const buildWhatsAppContactLink = (storeName: string, whatsappNumber: string) => {
  const phone = whatsappNumber.replace(/[^\d]/g, "");
  const message = `Hello, I have a general enquiry about ${storeName}.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
