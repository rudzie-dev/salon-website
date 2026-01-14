import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Tv, 
  Wifi, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  ChevronRight,
  Instagram,
  Facebook,
  Wrench,
  Zap,
  Users,
  Star,
  Menu,
  X,
  ArrowRight,
  Play,
  Hammer,
  Clock,
  Award
} from 'lucide-react';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', service: 'CCTV Installation', message: '' });
  
  // Replace this with your actual WhatsApp number (e.g., 27123456789)
  const WHATSAPP_NUMBER = "YOUR_PHONE_NUMBER"; 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsApp = (e) => {
    if (e) e.preventDefault();
    const namePart = formData.name ? `My name is ${formData.name}.` : "I'm interested in your services.";
    const message = encodeURIComponent(`Hi MG Installations! ${namePart} I'm looking for ${formData.service}. ${formData.message}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-white font-sans selection:bg-blue-500 selection:text-white scroll-smooth">
      {/* Navigation */}
      <nav className={`fixed w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black group-hover:rotate-12 transition-transform shadow-lg shadow-blue-600/20">MG</div>
            <span className="text-xl font-black tracking-tighter uppercase">Installations</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Our Services</button>
            <button onClick={() => scrollToSection('work')} className="hover:text-white transition-colors">Recent Work</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">Why Us</button>
            <button onClick={() => scrollToSection('contact')} className="text-blue-500 hover:text-blue-400 transition-colors">Contact</button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => scrollToSection('contact')}
              className="hidden sm:block bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-lg shadow-white/5"
            >
              Get Free Quote
            </button>
            <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-black border-b border-white/10 p-6 flex flex-col gap-6 text-center animate-in slide-in-from-top-4 duration-300">
            <button onClick={() => scrollToSection('services')} className="text-sm font-bold uppercase tracking-widest">Our Services</button>
            <button onClick={() => scrollToSection('work')} className="text-sm font-bold uppercase tracking-widest">Recent Work</button>
            <button onClick={() => scrollToSection('about')} className="text-sm font-bold uppercase tracking-widest">Why Us</button>
            <button onClick={() => scrollToSection('contact')} className="bg-blue-600 p-4 rounded-xl font-bold">Contact Now</button>
          </div>
        )}
      </nav>

      {/* Conversion-Focused Hero */}
      <section className="relative min-h-[90vh] flex items-center pt-32 lg:pt-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none opacity-50" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full mb-8">
              <Star size={14} className="text-blue-500 fill-blue-500" />
              <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em]">Top Rated Installation Experts</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] mb-8 tracking-tighter">
              WE INSTALL. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">YOU ENJOY.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl leading-relaxed">
              Professional CCTV, TV Mounting, and Mesh Wi-Fi. We eliminate visible cables and technical headaches so you can focus on what matters.
            </p>

            {/* Quick-Action Conversion Bar */}
            <div className="w-full max-w-2xl bg-white/5 border border-white/10 p-2 rounded-[2rem] backdrop-blur-md flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center px-6 py-4 md:py-0">
                <ShieldCheck className="text-blue-500 mr-3 shrink-0" size={20} />
                <select 
                  className="bg-transparent w-full outline-none font-bold text-sm cursor-pointer"
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                >
                  <option className="bg-slate-900" value="CCTV Installation">CCTV Installation</option>
                  <option className="bg-slate-900" value="TV Mounting">TV Mounting</option>
                  <option className="bg-slate-900" value="Wi-Fi & Networking">Wi-Fi & Networking</option>
                  <option className="bg-slate-900" value="DSTV/Satellite Repair">DSTV/Satellite Repair</option>
                </select>
              </div>
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-full font-black text-sm transition-all flex items-center justify-center gap-2 group"
              >
                Instant Quote <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
              </button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest">No Hidden Costs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Same Day Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Fully Insured</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services: Problem vs Solution */}
      <section id="services" className="py-32 container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4">What We Do Best</h2>
          <p className="text-slate-500">Technical precision for every corner of your property.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group bg-gradient-to-b from-[#111] to-black border border-white/5 p-10 rounded-[3rem] hover:border-blue-500/50 transition-all duration-500">
            <div className="w-16 h-16 bg-blue-600/10 text-blue-500 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Camera size={32} />
            </div>
            <h3 className="text-2xl font-black mb-4 italic">CCTV & Security</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Keep an eye on your home from anywhere. We install 4K smart cameras with human detection and phone alerts.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <CheckCircle2 size={14} className="text-blue-600" /> Remote Phone Access
              </li>
              <li className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <CheckCircle2 size={14} className="text-blue-600" /> AI Motion Alerts
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="group bg-gradient-to-b from-[#111] to-black border border-white/5 p-10 rounded-[3rem] hover:border-purple-500/50 transition-all duration-500">
            <div className="w-16 h-16 bg-purple-600/10 text-purple-500 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Tv size={32} />
            </div>
            <h3 className="text-2xl font-black mb-4 italic">TV & Audio</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              The "Invisible" setup. We mount any size TV with internal cable routing. No plastic trunking, just a clean wall.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <CheckCircle2 size={14} className="text-purple-600" /> Hidden Wires
              </li>
              <li className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <CheckCircle2 size={14} className="text-purple-600" /> Precision Leveling
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="group bg-gradient-to-b from-[#111] to-black border border-white/5 p-10 rounded-[3rem] hover:border-green-500/50 transition-all duration-500">
            <div className="w-16 h-16 bg-green-600/10 text-green-500 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:bg-green-600 group-hover:text-white transition-colors">
              <Wifi size={32} />
            </div>
            <h3 className="text-2xl font-black mb-4 italic">Wi-Fi & Signal</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Eliminate dead zones. We install Starlink, Mesh systems, and repair DSTV signal issues instantly.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <CheckCircle2 size={14} className="text-green-600" /> Mesh Networking
              </li>
              <li className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <CheckCircle2 size={14} className="text-green-600" /> Starlink Mounting
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Proof Section: Recent Work */}
      <section id="work" className="py-32 bg-[#080a0f]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-4">
            <h2 className="text-4xl font-black italic">RECENT INSTALLS</h2>
            <div className="h-[1px] flex-1 bg-white/10 hidden md:block mx-10" />
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Updated Weekly</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-video bg-slate-900 rounded-[2rem] overflow-hidden border border-white/10 mb-6 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] text-slate-700 font-bold uppercase tracking-widest group-hover:text-blue-500 transition-colors">
                    Client Property Photo 0{i}
                  </div>
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors" />
                </div>
                <h4 className="font-bold text-lg px-2">Secure Residential Complex</h4>
                <p className="text-slate-500 text-sm px-2 italic">8-Camera IP System & Networking</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Process Section */}
      <section id="about" className="py-32">
        <div className="container mx-auto px-6">
          <div className="bg-blue-600 rounded-[4rem] p-12 lg:p-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <Hammer size={300} strokeWidth={1} />
            </div>
            <div className="max-w-3xl relative z-10">
              <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-[0.9]">NO MESS. <br/>JUST RESULTS.</h2>
              <div className="grid sm:grid-cols-2 gap-12 mt-12">
                <div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                    <Clock className="text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Punctuality Matters</h4>
                  <p className="text-blue-100 text-sm">We arrive on time, every time. No waiting around for technicians who never show up.</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                    <Award className="text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Lifetime Support</h4>
                  <p className="text-blue-100 text-sm">Our job doesn't end when we leave. We provide ongoing support for all our installs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simplified Contact Conversion */}
      <section id="contact" className="py-32 container mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-[4rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
          <div className="flex-1 p-12 lg:p-20 bg-gradient-to-br from-blue-600 to-blue-800">
            <h2 className="text-5xl font-black mb-6 leading-none">LET'S GET <br/>STARTED.</h2>
            <p className="text-blue-100 mb-12">Fill out the quick form or jump on WhatsApp for an immediate response.</p>
            
            <div className="space-y-6">
              <button onClick={handleWhatsApp} className="w-full flex items-center gap-4 bg-black/20 hover:bg-black/40 p-6 rounded-3xl transition-all group">
                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white">
                  <MessageSquare size={24} fill="currentColor" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-black uppercase tracking-widest opacity-60">Instant Chat</div>
                  <div className="font-bold">WhatsApp Us Now</div>
                </div>
                <ChevronRight className="ml-auto group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="flex-[1.2] p-12 lg:p-20 bg-slate-950">
            <form onSubmit={handleWhatsApp} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-blue-500 outline-none transition-all text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Service</label>
                  <select 
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-blue-500 outline-none transition-all appearance-none text-white"
                  >
                    <option className="bg-slate-900" value="CCTV Installation">CCTV Installation</option>
                    <option className="bg-slate-900" value="TV Mounting">TV Mounting</option>
                    <option className="bg-slate-900" value="Wi-Fi & Networking">Wi-Fi & Networking</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Message (Optional)</label>
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us what you need..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 h-32 focus:border-blue-500 outline-none transition-all resize-none text-white"
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-white text-black hover:bg-blue-600 hover:text-white py-6 rounded-2xl font-black text-lg transition-all shadow-xl active:scale-95">
                Send Request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div>
            <div className="text-xl font-black italic mb-2 tracking-tighter">MG INSTALLATIONS</div>
            <p className="text-slate-500 text-xs">The Gold Standard in Home Infrastructure.</p>
          </div>
          <div className="flex gap-4">
             <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors border border-white/10">
                <Instagram size={18}/>
             </a>
             <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors border border-white/10">
                <Facebook size={18}/>
             </a>
          </div>
          <div className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">
            © {new Date().getFullYear()} MG Installations
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
