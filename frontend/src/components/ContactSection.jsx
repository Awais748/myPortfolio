import { useState } from "react";
import axios from "axios";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact`,
        { name, email, message },
        { headers: { "Content-Type": "application/json" } }
      );

      if (data.success) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Network error. Please try again.";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 md:py-24 relative bg-secondary/30"
    >
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center tracking-tight">
          Get In <span className="text-primary">Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-base sm:text-lg px-4 sm:px-0">
          Have a project in mind or want to collaborate? Feel free to reach out.
          I'm always open to discussing new opportunities.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-stretch">
          {/* Contact Info */}
          <div className="space-y-8 text-center lg:text-left self-center">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-semibold">
                Contact Information
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                You can reach me directly via email/phone, or connect on social.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <a
                  href="mailto:awaistariq10111@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  awaistariq10111@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <a
                  href="tel:+923022228021"
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  +92 302 222 8021
                </a>
              </div>

              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <p className="text-muted-foreground font-medium">
                  Lahore, Punjab, Pakistan
                </p>
              </div>
            </div>

            {/* Social */}
            <div className="pt-4">
              <h4 className="font-medium mb-4 text-lg">Connect With Me</h4>
              <div className="flex gap-4 justify-center lg:justify-start">
                <a
                  href="https://github.com/Awais748"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-md border border-border bg-card/60 hover:border-primary/50 transition"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/awais-tariq-9a2a45374"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-md border border-border bg-card/60 hover:border-primary/50 transition"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card p-6 md:p-8 rounded-xl border border-border shadow-md w-full">
            <h3 className="text-xl sm:text-2xl font-semibold mb-6">
              Send a Message
            </h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Your Name"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="jonsnow@gmail.com"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  placeholder="Hello, I'd like to talk about..."
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2"
                )}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
