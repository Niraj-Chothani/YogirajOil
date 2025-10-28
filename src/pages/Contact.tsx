import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8081/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Thank you! We'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(data.error || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-1">
      {/* Header */}
      <section className="py-10 px-4 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-gradient-gold animate-fade-in">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-slide-up">
            We'd Love to Hear From You
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card p-8 md:p-10 rounded-2xl shadow-elegant animate-fade-in">
              <h2 className="text-3xl font-display font-semibold mb-6 text-foreground">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  name="name"
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full"
                />
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full"
                />
                <Textarea
                  name="message"
                  required
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full min-h-[150px]"
                />
                <Button
                  type="submit"
                  variant="luxury"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-8 animate-slide-up">
              <div className="bg-card p-8 rounded-2xl shadow-soft">
                <h2 className="text-3xl font-display font-semibold mb-6 text-foreground">
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold mb-1 text-foreground">
                        Address
                      </h3>
                      <p className="text-muted-foreground">
                        Yogiraj Oil Mill
                        <br />
                        Gujarat, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold mb-1 text-foreground">
                        Phone
                      </h3>
                      <p className="text-muted-foreground">+91 8780621820</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold mb-1 text-foreground">
                        Email
                      </h3>
                      <p className="text-muted-foreground">
                        info@yogirajoil.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-card p-8 rounded-2xl shadow-soft">
                <h3 className="text-2xl font-display font-semibold mb-4 text-foreground">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.instagram.com/yogirajoilmill"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.facebook.com/share/17CgT55N9W/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                </div>
              </div>

              {/* ✅ Embedded Google Map */}
              <div className="bg-card p-4 rounded-2xl shadow-soft">
                {/* <iframe
                  title="Yogiraj Oil Mill Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.679823569744!2d72.57136227504085!3d22.996266879197497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84930dc6e5a5%3A0xe32f44df0e347f9a!2sGujarat%2C%20India!5e0!3m2!1sen!2sin!4v1697039489735!5m2!1sen!2sin"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="rounded-xl"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe> */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3700.1828963914822!2d71.08998820000001!3d21.965942500000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39585d7bcd8fbc8b%3A0x7435515a528956d6!2sYogiraj%20mini%20(ghana)%20oil%20mil!5e0!3m2!1sen!2sin!4v1760542610645!5m2!1sen!2sin"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="rounded-xl"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
