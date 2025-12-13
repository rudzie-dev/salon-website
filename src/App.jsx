import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, ArrowUpRight, Phone, Mail, MapPin, Clock, Instagram, Star } from 'lucide-react';

const AtelierNoir = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      id: 1,
      title: "Precision Cut & Style",
      subtitle: "Expert Hair Design",
      description: "Transform your look with our signature cutting technique. Our master stylists create styles that complement your face shape, lifestyle, and personal style.",
      duration: "90 min",
      price: "From R850",
      popular: true
    },
    {
      id: 2,
      title: "Premium Color Services",
      subtitle: "Beautiful, Long-Lasting Color",
      description: "Whether you want subtle highlights, full color transformation, or to cover greys, our color experts use top-quality products to achieve stunning results.",
      duration: "120-180 min",
      price: "From R1,450",
      popular: false
    },
    {
      id: 3,
      title: "Treatment & Care",
      subtitle: "Restore Your Hair's Health",
      description: "Repair damage, add moisture, and bring back shine with our professional treatment services. Perfect for damaged, dry, or chemically treated hair.",
      duration: "60 min",
      price: "From R650",
      popular: false
    },
    {
      id: 4,
      title: "Complete Makeover Package",
      subtitle: "Full Salon Experience",
      description: "Our most popular package! Includes consultation, cut, color, treatment, and professional styling. Perfect for special occasions or complete transformations.",
      duration: "4-6 hours",
      price: "From R3,800",
      popular: true
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      service: "Color & Cut",
      rating: 5,
      text: "Best salon experience I've ever had! The team listened to exactly what I wanted and delivered beyond my expectations."
    },
    {
      name: "Thandi K.",
      service: "Treatment Package",
      rating: 5,
      text: "My hair was so damaged, but after their treatment package it's completely transformed. I'm coming back every month!"
    },
    {
      name: "Michael P.",
      service: "Precision Cut",
      rating: 5,
      text: "Finally found a salon that understands how to cut my hair type. Professional, clean, and the results speak for themselves."
    }
  ];

  const teamMembers = [
    {
      name: "Zara Nkosi",
      title: "Master Stylist & Owner",
      specialty: "Color Specialist",
      experience: "15+ years"
    },
    {
      name: "Liam Chen",
      title: "Senior Stylist",
      specialty: "Precision Cutting",
      experience: "10+ years"
    },
    {
      name: "Amara Dube",
      title: "Color Expert",
      specialty: "Balayage & Highlights",
      experience: "8+ years"
    }
  ];

  const handleBooking = () => {
    alert('Booking system integration would go here. In production, this would connect to services like Boulevard, GlossGenius, Fresha, or a custom booking solution.');
  };

  const handleCall = () => {
    window.location.href = 'tel:0111234567';
  };

  return (
    <div className="bg-zinc-950 text-zinc-100 font-light overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
          <div className="text-2xl tracking-tight font-extralight">
            ATELIER <span className="font-normal">NOIR</span>
          </div>
          
          <div className="hidden md:flex items-center gap-12 text-sm tracking-wide">
            <a href="#services" className="hover:text-zinc-400 transition-colors duration-300">Services</a>
            <a href="#team" className="hover:text-zinc-400 transition-colors duration-300">Our Team</a>
            <a href="#testimonials" className="hover:text-zinc-400 transition-colors duration-300">Reviews</a>
            <a href="#contact" className="hover:text-zinc-400 transition-colors duration-300">Contact</a>
            <button 
              onClick={handleBooking}
              className="bg-zinc-100 text-zinc-950 px-6 py-2 text-xs tracking-widest hover:bg-zinc-200 transition-all duration-300 font-medium"
            >
              BOOK NOW
            </button>
          </div>

          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden hover:text-zinc-400 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-zinc-950 z-30 transition-opacity duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 text-3xl tracking-wide font-light">
          <a href="#services" onClick={() => setMenuOpen(false)} className="hover:text-zinc-400 transition-colors duration-300">Services</a>
          <a href="#team" onClick={() => setMenuOpen(false)} className="hover:text-zinc-400 transition-colors duration-300">Our Team</a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)} className="hover:text-zinc-400 transition-colors duration-300">Reviews</a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="hover:text-zinc-400 transition-colors duration-300">Contact</a>
          <button 
            onClick={() => { setMenuOpen(false); handleBooking(); }}
            className="bg-zinc-100 text-zinc-950 px-8 py-3 text-base mt-4 hover:bg-zinc-200 transition-all duration-300"
          >
            BOOK NOW
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-zinc-950"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        
        <div className="relative z-10 text-center px-6 max-w-5xl mt-20">
          <div className="inline-block bg-zinc-800/30 border border-zinc-700/50 px-4 py-2 text-xs tracking-widest text-zinc-400 mb-8">
            JOHANNESBURG PREMIER HAIR SALON
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tighter font-extralight leading-none mb-4">
            Look amazing,
          </h1>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tighter font-extralight leading-none mb-8">
            feel confident
          </h1>
          
          <p className="text-base md:text-lg lg:text-xl tracking-wide text-zinc-400 max-w-2xl mx-auto mb-12">
            Expert styling, premium products, and personalized care since 2015
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a 
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-zinc-100 px-8 py-4 hover:bg-zinc-100 hover:text-zinc-950 transition-all duration-300 text-sm tracking-widest"
            >
              VIEW SERVICES
              <ChevronRight size={16} />
            </a>
            <button 
              onClick={handleBooking}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-100 text-zinc-950 px-8 py-4 hover:bg-zinc-200 transition-all duration-300 text-sm tracking-widest font-normal"
            >
              BOOK APPOINTMENT
            </button>
          </div>

          <div className="flex flex-col items-center gap-3 text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <Star size={16} className="fill-zinc-400 text-zinc-400" />
              <span>4.9/5 rating from 200+ happy clients</span>
            </div>
          </div>
        </div>

        <div className="hidden md:block absolute bottom-12 left-1/2 -translate-x-1/2 text-xs tracking-widest text-zinc-600">
          SCROLL TO DISCOVER
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="bg-gradient-to-r from-zinc-800 to-zinc-900 py-4 px-6 border-y border-zinc-700">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm md:text-base tracking-wide">
            <span className="font-medium text-zinc-100">New Client Special:</span> Get 15% off your first visit
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-24">
            <p className="text-xs tracking-widest text-zinc-600 mb-3 md:mb-4">01 - SERVICES</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extralight tracking-tight mb-6">
              Our services
            </h2>
            <p className="text-base md:text-lg text-zinc-400 max-w-2xl">
              From precision cuts to complete transformations, we offer comprehensive hair care services using only premium products.
            </p>
          </div>

          <div className="grid gap-1 border-t border-zinc-800">
            {services.map((service, idx) => (
              <div
                key={service.id}
                className="relative border-b border-zinc-800 py-6 md:py-12 hover:bg-zinc-900/30 transition-all duration-500 cursor-pointer group"
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
              >
                {service.popular && (
                  <div className="absolute top-6 right-6 bg-zinc-800 text-zinc-300 px-3 py-1 text-xs tracking-wider">
                    POPULAR
                  </div>
                )}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-6">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 md:gap-6 mb-3 md:mb-4">
                      <span className="text-xs md:text-sm text-zinc-600 font-mono w-6 md:w-8 pt-1">0{idx + 1}</span>
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-tight mb-2 group-hover:text-zinc-300 transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-xs md:text-sm tracking-wide text-zinc-500 mb-3 md:mb-4">{service.subtitle}</p>
                        <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-2xl">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-2 md:min-w-[200px] pl-10 md:pl-0">
                    <div className="flex flex-col md:items-end">
                      <span className="text-xs md:text-sm text-zinc-500">{service.duration}</span>
                      <span className="text-lg md:text-xl font-light">{service.price}</span>
                    </div>
                    <ArrowUpRight 
                      className="text-zinc-600 group-hover:text-zinc-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" 
                      size={18} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 md:mt-16 text-center">
            <button 
              onClick={handleBooking}
              className="inline-block w-full sm:w-auto border border-zinc-700 px-8 md:px-12 py-4 hover:border-zinc-100 hover:bg-zinc-100 hover:text-zinc-950 transition-all duration-300 text-sm tracking-widest"
            >
              BOOK YOUR APPOINTMENT
            </button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 md:py-32 px-6 lg:px-12 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-24">
            <p className="text-xs tracking-widest text-zinc-600 mb-3 md:mb-4">02 - OUR TEAM</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extralight tracking-tight mb-6">
              Meet our experts
            </h2>
            <p className="text-base md:text-lg text-zinc-400 max-w-2xl">
              Our team of experienced stylists are passionate professionals dedicated to bringing your vision to life.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="group">
                <div className="aspect-[3/4] bg-zinc-800/50 border border-zinc-800 relative overflow-hidden mb-6 group-hover:border-zinc-600 transition-colors duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-700/20 to-transparent group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h3 className="text-xl md:text-2xl font-light mb-2">{member.name}</h3>
                <p className="text-sm text-zinc-500 mb-1">{member.title}</p>
                <p className="text-sm text-zinc-600">{member.specialty} - {member.experience}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 md:p-12 border border-zinc-800 bg-zinc-900/50">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl md:text-2xl font-light mb-4">Why choose us</h3>
                <ul className="space-y-3 text-sm md:text-base text-zinc-400">
                  <li className="flex items-start gap-3">
                    <span className="text-zinc-600 mt-1">-</span>
                    <span>Only premium, professional-grade products</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-zinc-600 mt-1">-</span>
                    <span>Personalized consultation for every client</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-zinc-600 mt-1">-</span>
                    <span>Continuous education in latest techniques</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-zinc-600 mt-1">-</span>
                    <span>100% satisfaction guarantee</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-light mb-4">Our story</h3>
                <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                  Since 2015, Atelier Noir has been Johannesburg's trusted destination for premium hair care. Founded by master stylist Zara Nkosi, we've built our reputation on exceptional service, expert technique, and a genuine passion for making every client look and feel their absolute best.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-24">
            <p className="text-xs tracking-widest text-zinc-600 mb-3 md:mb-4">03 - TESTIMONIALS</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extralight tracking-tight mb-6">
              What clients say
            </h2>
            <p className="text-base md:text-lg text-zinc-400 max-w-2xl">
              Don't just take our word for it. Here's what our satisfied clients have to say about their experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="border border-zinc-800 p-8 hover:border-zinc-600 transition-colors duration-500">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-zinc-400 text-zinc-400" />
                  ))}
                </div>
                <p className="text-sm md:text-base text-zinc-300 mb-6 leading-relaxed">
                  {testimonial.text}
                </p>
                <div>
                  <p className="text-sm font-medium">{testimonial.name}</p>
                  <p className="text-xs text-zinc-500">{testimonial.service}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-zinc-500">
              Rated 4.9/5 stars from 200+ reviews across Google and Facebook
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-32 px-6 lg:px-12 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs tracking-widest text-zinc-600 mb-3 md:mb-4">04 - CONTACT</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extralight tracking-tight mb-8 md:mb-12">
              Book your appointment
            </h2>
            
            <p className="text-base md:text-lg lg:text-xl text-zinc-400 mb-10 md:mb-16 max-w-2xl mx-auto">
              Ready for a transformation? Book online or call us to schedule. New clients receive 15% off their first visit.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-16">
              <button 
                onClick={handleBooking}
                className="w-full sm:w-auto bg-zinc-100 text-zinc-950 px-8 md:px-12 py-4 hover:bg-zinc-200 transition-all duration-300 text-sm tracking-widest font-normal"
              >
                BOOK ONLINE NOW
              </button>
              <button 
                onClick={handleCall}
                className="w-full sm:w-auto border border-zinc-700 px-8 md:px-12 py-4 hover:border-zinc-100 hover:bg-zinc-100 hover:text-zinc-950 transition-all duration-300 text-sm tracking-widest inline-flex items-center justify-center gap-2"
              >
                <Phone size={16} />
                CALL US TODAY
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="border border-zinc-800 p-8 hover:border-zinc-600 transition-colors duration-500">
              <MapPin className="text-zinc-500 mb-4" size={24} />
              <p className="text-xs tracking-wide text-zinc-600 mb-3">LOCATION</p>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                Nelson Mandela Square<br />
                Sandton City<br />
                Johannesburg, 2196
              </p>
              <a href="#" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors inline-block mt-3">
                Get Directions →
              </a>
            </div>

            <div className="border border-zinc-800 p-8 hover:border-zinc-600 transition-colors duration-500">
              <Clock className="text-zinc-500 mb-4" size={24} />
              <p className="text-xs tracking-wide text-zinc-600 mb-3">HOURS</p>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                Monday - Saturday<br />
                09:00 - 18:00<br />
                <br />
                Sunday<br />
                10:00 - 16:00
              </p>
            </div>

            <div className="border border-zinc-800 p-8 hover:border-zinc-600 transition-colors duration-500">
              <Mail className="text-zinc-500 mb-4" size={24} />
              <p className="text-xs tracking-wide text-zinc-600 mb-3">CONNECT</p>
              <div className="text-sm md:text-base text-zinc-300 leading-relaxed space-y-2">
                <a href="mailto:info@ateliernoir.co.za" className="block hover:text-zinc-100 transition-colors">
                  info@ateliernoir.co.za
                </a>
                <a href="tel:0111234567" className="block hover:text-zinc-100 transition-colors">
                  011 123 4567
                </a>
                <a href="#" className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors mt-3">
                  <Instagram size={16} />
                  @atelier.noir
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 md:py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-xs text-zinc-600 tracking-wide">
          <p className="text-center md:text-left">© 2024 Atelier Noir. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <a href="#" className="hover:text-zinc-100 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-100 transition-colors duration-300">Terms of Service</a>
            <a href="#" className="hover:text-zinc-100 transition-colors duration-300">Cancellation Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AtelierNoir;
