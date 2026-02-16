import { useState } from "react";
import axios from "axios";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";

// Robust email regex for frontend validation
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

    try {
      setIsSubmitting(true);

      const backendBaseUrl = (import.meta.env.VITE_BACKEND_URL || "").trim();
      const baseUrl = backendBaseUrl.replace(/\/$/, "");
      const url = baseUrl ? `${baseUrl}/api/contact` : "/api/contact";

      const { data } = await axios.post(
        url,
        { name, email, message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      if (!data?.success) {
        throw new Error(
          data?.message || "Failed to send the message, please try again."
        );
      }

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with error status
          const errorMessage =
            error.response.data?.message ||
            "Failed to send the message, please try again.";
          toast.error(errorMessage);
        } else if (error.request) {
          // Request made but no response received
          toast.error(
            "Network error. Please check your connection and try again."
          );
        } else {
          // Something else happened
          toast.error("An error occurred. Please try again.");
        }
      } else {
        // Non-axios error
        toast.error(
          error.message || "Failed to send the message, please try again."
        );
      }
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
          <div className="space-y-8 text-center lg:text-left self-center">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-semibold">
                Contact Information
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                You can reach me directly via email/phone, or connect on social.
              </p>
            </div>

            <div className="space-y-5 sm:space-y-6">
              <div className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base leading-tight">
                <div className="p-2.5 sm:p-3 rounded-full bg-primary/10 flex-shrink-0">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="min-w-0 text-left">
                  <a
                    href="mailto:awaistariq10111@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors break-all font-medium"
                  >
                    awaistariq10111@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base leading-tight">
                <div className="p-2.5 sm:p-3 rounded-full bg-primary/10 flex-shrink-0">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="text-left">
                  <a
                    href="tel:+923022228021"
                    className="text-muted-foreground hover:text-primary transition-colors font-medium"
                  >
                    +92 302 222 8021
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base leading-tight">
                <div className="p-2.5 sm:p-3 rounded-full bg-primary/10 flex-shrink-0">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-muted-foreground font-medium">
                    Lahore, Punjab, Pakistan
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="font-medium mb-4 text-base sm:text-lg">
                Connect With Me
              </h4>
              <div className="flex gap-4 justify-center lg:justify-start">
                <a
                  href="https://github.com/Awais748"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2.5 sm:p-3 rounded-md border border-border bg-card/60 hover:bg-card hover:border-primary/50 transition-all duration-300"
                >
                  <Github className="h-5 w-5 sm:h-6 sm:w-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/awais-tariq-9a2a45374"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2.5 sm:p-3 rounded-md border border-border bg-card/60 hover:bg-card hover:border-primary/50 transition-all duration-300"
                >
                  <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-card p-5 sm:p-6 md:p-8 rounded-xl border border-border shadow-md mx-auto w-full">
            <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-left">
              Send a Message
            </h3>

            <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary transition-colors text-sm sm:text-base"
                  placeholder="Your Name"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary transition-colors text-sm sm:text-base"
                  placeholder="jonsnow@gmail.com"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary transition-colors resize-none text-sm sm:text-base"
                  placeholder="Hello, I'd like to talk about..."
                  onChange={handleChange}
                  rows={5}
                />
              </div>
              <button
                type="submit"
                className={cn("cosmic-button w-full")}
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
