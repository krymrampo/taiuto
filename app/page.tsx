"use client"

import { useEffect } from "react"
import {
  Sparkles,
  ShieldCheck,
  Clock,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Zap,
  Users,
  TrendingUp,
  Home,
  Calendar,
  BarChart2,
  HeartHandshake,
  ClipboardCheck,
  CalendarCheck,
  Heart,
  TimerOff,
  Smartphone,
  Moon,
  Check,
  Mail,
  Globe,
  Instagram,
  Linkedin,
  Facebook,
  CheckCircle,
  ArrowUp,
  Mic,
} from "lucide-react"

export default function TAIutoPage() {
  useEffect(() => {
    // Initialize navigation scroll effect
    const nav = document.querySelector("nav")
    const menuBtn = document.getElementById("mobile-menu-btn")
    let lastScroll = 0

    const handleScroll = () => {
      if (!nav) return
      const currentScroll = window.pageYOffset
      const menuOpen = menuBtn && menuBtn.getAttribute("aria-expanded") === "true"

      if (currentScroll > 50) {
        nav.classList.add("scrolled")
      } else {
        nav.classList.remove("scrolled")
      }

      if (window.innerWidth < 768) {
        if (menuOpen) {
          nav.style.transform = "translateY(0)"
        } else if (currentScroll > lastScroll && currentScroll > 100) {
          nav.style.transform = "translateY(-100%)"
        } else {
          nav.style.transform = "translateY(0)"
        }
      }

      lastScroll = currentScroll
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", () => {
      if (nav && window.innerWidth >= 768) {
        nav.style.transform = "translateY(0)"
      }
    })

    // Initialize scroll progress bar
    const progressBar = document.createElement("div")
    progressBar.className = "scroll-progress"
    document.body.appendChild(progressBar)

    const updateProgress = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      progressBar.style.width = progress + "%"
    }

    window.addEventListener("scroll", updateProgress)

    // Initialize reveal animations
    const revealElements = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children"
    )

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
            revealObserver.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    )

    revealElements.forEach((el) => revealObserver.observe(el))

    // Initialize back to top button
    const backToTop = document.createElement("button")
    backToTop.className = "back-to-top"
    backToTop.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>`
    backToTop.setAttribute("aria-label", "Torna su")
    document.body.appendChild(backToTop)

    const updateBackToTop = () => {
      if (window.pageYOffset > 500) {
        backToTop.style.opacity = "1"
        backToTop.style.visibility = "visible"
        backToTop.style.transform = "translateY(0)"
      } else {
        backToTop.style.opacity = "0"
        backToTop.style.visibility = "hidden"
        backToTop.style.transform = "translateY(20px)"
      }
    }

    window.addEventListener("scroll", updateBackToTop)

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    })

    // Initialize phone showcase
    const initShowcase = () => {
      const screens = document.querySelectorAll(".screen-state")
      const dots = document.querySelectorAll(".progress-dot")
      const labels = document.querySelectorAll(".showcase-label")
      const floatElements = document.querySelectorAll(".float-element")

      let currentScreen = 0

      const switchScreen = (index: number) => {
        screens.forEach((s, i) => s.classList.toggle("active", i === index))
        labels.forEach((l, i) => l.classList.toggle("active", i === index))
        dots.forEach((d, i) => d.classList.toggle("active", i === index))
        currentScreen = index
      }

      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => switchScreen(index))
      })

      // Show float elements
      floatElements.forEach((el) => el.classList.add("visible"))

      // Auto-cycle screens
      setInterval(() => {
        const nextScreen = (currentScreen + 1) % screens.length
        switchScreen(nextScreen)
      }, 4000)
    }

    initShowcase()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("scroll", updateBackToTop)
      progressBar.remove()
      backToTop.remove()
    }
  }, [])

  const toggleMobileMenu = () => {
    const mobileMenu = document.getElementById("mobile-menu")
    const menuBtn = document.getElementById("mobile-menu-btn")
    if (mobileMenu && menuBtn) {
      const isHidden = mobileMenu.classList.contains("hidden")
      mobileMenu.classList.toggle("hidden")
      menuBtn.setAttribute("aria-expanded", String(isHidden))
    }
  }

  return (
    <div className="font-sans text-gray-800 bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-whatsapp via-whatsapp/80 to-white transition-transform duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <a href="#top" className="flex items-center space-x-2 flex-shrink-0">
              <div className="w-10 h-10 bg-whatsapp rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-gray-900">tAIuto</span>
            </a>

            <div className="hidden md:flex items-center justify-center flex-1 space-x-12">
              <a
                href="#funzionalita"
                className="nav-link text-base font-medium text-gray-700 hover:text-whatsapp transition-colors tracking-wide"
              >
                Funzionalità
              </a>
              <a
                href="#benefici"
                className="nav-link text-base font-medium text-gray-700 hover:text-whatsapp transition-colors tracking-wide"
              >
                Benefici
              </a>
              <a
                href="#prezzi"
                className="nav-link text-base font-medium text-gray-700 hover:text-whatsapp transition-colors tracking-wide"
              >
                Prezzi
              </a>
            </div>

            <div className="flex items-center">
              <a
                href="#demo"
                className="hidden md:inline-flex btn-shine bg-whatsapp hover:bg-whatsapp-dark text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md"
              >
                Richiedi Demo
              </a>
              <button
                id="mobile-menu-btn"
                className="md:hidden p-2 text-gray-700"
                aria-label="Apri menu"
                aria-expanded="false"
                onClick={toggleMobileMenu}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div id="mobile-menu" className="mobile-menu hidden md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <a href="#funzionalita" className="block text-gray-700 font-medium py-2">
              Funzionalità
            </a>
            <a href="#benefici" className="block text-gray-700 font-medium py-2">
              Benefici
            </a>
            <a href="#prezzi" className="block text-gray-700 font-medium py-2">
              Prezzi
            </a>
            <a
              href="#demo"
              className="block text-center bg-whatsapp text-white py-3 rounded-full font-semibold shadow-md hover:bg-whatsapp-dark transition-colors"
            >
              Richiedi Demo
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="top"
        className="hero-section relative pt-32 md:pt-36 pb-12 min-h-[60vh] overflow-hidden flex flex-col items-center justify-center"
      >
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-gray-50 via-white to-gray-50"></div>

        <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <h1 className="hero-watermark font-black tracking-tighter leading-none">tAIuto</h1>
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-6 md:mt-10">
          <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            tAIuto risponde ai messaggi, prenota appuntamenti e libera{" "}
            <strong className="text-gray-900">30+ ore al mese</strong>. Zero telefonate. Zero stress. Più clienti
            soddisfatti.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <div className="hero-badge flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-whatsapp" />
              <span>GDPR Compliant</span>
            </div>
            <div className="hero-badge flex items-center space-x-2">
              <Clock className="w-4 h-4 text-whatsapp" />
              <span>Setup in 48h</span>
            </div>
            <div className="hero-badge flex items-center space-x-2">
              <MessageCircle className="w-4 h-4 text-whatsapp" />
              <span>Su WhatsApp</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400">
          <span className="text-xs uppercase tracking-widest">Scorri</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* Phone Showcase Section */}
      <section id="funzionalita" className="phone-showcase-section showcase-static">
        <div className="phone-showcase-container">
          <div className="phone-showcase-bg">
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="dot-pattern"></div>
            <div className="glass-grid"></div>
          </div>

          <div className="showcase-progress">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                type="button"
                className={`progress-dot ${i === 0 ? "active" : ""}`}
                data-screen={i}
                aria-label={`Vai alla schermata ${i + 1}`}
              />
            ))}
          </div>

          <div className="showcase-labels">
            <div className="showcase-label active" data-label="0">
              <h3>WhatsApp AI</h3>
              <p>
                I tuoi clienti scrivono, l&apos;AI risponde
                <br />
                in modo naturale e umano
              </p>
            </div>
            <div className="showcase-label" data-label="1">
              <h3>Dashboard Intuitiva</h3>
              <p>
                Tutto sotto controllo in un&apos;unica
                <br />
                interfaccia pulita e moderna
              </p>
            </div>
            <div className="showcase-label" data-label="2">
              <h3>Agenda Smart</h3>
              <p>
                Gestione appuntamenti drag & drop
                <br />
                con notifiche automatiche
              </p>
            </div>
            <div className="showcase-label" data-label="3">
              <h3>Analytics Potenti</h3>
              <p>
                Dati e insight per far crescere
                <br />
                il tuo business
              </p>
            </div>
          </div>

          <div className="float-element" style={{ top: "20%", left: "10%" }}>
            <div className="float-element-icon bg-whatsapp/10 text-whatsapp">
              <Zap className="w-5 h-5" />
            </div>
            <span>Risposta in 2 secondi</span>
          </div>
          <div className="float-element" style={{ top: "30%", right: "10%" }}>
            <div className="float-element-icon bg-blue-100 text-blue-600">
              <Users className="w-5 h-5" />
            </div>
            <span>+150 clienti/giorno</span>
          </div>
          <div className="float-element" style={{ bottom: "25%", left: "8%" }}>
            <div className="float-element-icon bg-brand-yellow/50 text-brand-amber">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span>+47% prenotazioni</span>
          </div>
          <div className="float-element" style={{ bottom: "35%", right: "8%" }}>
            <div className="float-element-icon bg-purple-100 text-purple-600">
              <Clock className="w-5 h-5" />
            </div>
            <span>24/7 disponibile</span>
          </div>

          <div className="phone-showcase-wrapper">
            <div className="iphone-showcase" id="showcase-phone">
              <div className="iphone-showcase-screen">
                <div className="iphone-showcase-notch"></div>

                {/* Screen 1: WhatsApp Chat */}
                <div className="screen-state screen-chat active" data-screen="0">
                  <div className="bg-whatsapp-darker pt-10 pb-3 px-4 flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold text-sm">tAIuto</div>
                      <div className="text-green-300 text-xs">online</div>
                    </div>
                  </div>
                  <div className="whatsapp-bg h-[calc(100%-120px)] p-3 flex flex-col space-y-2 overflow-hidden">
                    <div className="text-center text-[10px] text-gray-500 my-1">
                      <span className="bg-[#E5DDD5] px-2 py-0.5 rounded-full">Oggi</span>
                    </div>
                    <div className="bg-white self-start px-3 py-2 rounded-lg rounded-bl-none text-xs max-w-[85%] shadow-sm">
                      Buongiorno! Vorrei prenotare un taglio
                    </div>
                    <div className="bg-[#dcf8c6] self-end px-3 py-2 rounded-lg rounded-br-none text-xs max-w-[85%]">
                      Ciao! Certo, sono tAIuto
                      <div className="text-[8px] text-gray-500 text-right mt-1">{"09:15 ✓✓"}</div>
                    </div>
                    <div className="bg-[#dcf8c6] self-end px-3 py-2 rounded-lg rounded-br-none text-xs max-w-[85%]">
                      Ho disponibilità:
                      <br />• 14:30 con Marco
                      <br />• 16:00 con Sofia
                      <div className="text-[8px] text-gray-500 text-right mt-1">{"09:15 ✓✓"}</div>
                    </div>
                    <div className="bg-white self-start px-3 py-2 rounded-lg rounded-bl-none text-xs max-w-[85%] shadow-sm">
                      Perfetto, prendo le 16:00!
                    </div>
                    <div className="bg-[#dcf8c6] self-end px-3 py-2 rounded-lg rounded-br-none text-xs max-w-[85%]">
                      <strong>Prenotazione confermata!</strong>
                      <br />
                      Martedì 16:00 con Sofia
                      <div className="text-[8px] text-gray-500 text-right mt-1">{"09:16 ✓✓"}</div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-[#F0F2F5] p-2 flex items-center space-x-2">
                    <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-xs text-gray-400">Scrivi...</div>
                    <div className="w-8 h-8 bg-whatsapp rounded-full flex items-center justify-center">
                      <Mic className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Screen 2: Dashboard */}
                <div className="screen-state screen-dashboard" data-screen="1">
                  <div className="bg-white pt-8 pb-2 px-4 border-b">
                    <div className="text-lg font-bold">Dashboard</div>
                    <div className="text-xs text-gray-500">Buongiorno, Sofia!</div>
                  </div>
                  <div className="p-3 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-whatsapp/10 rounded-xl p-3">
                        <div className="text-2xl font-bold text-whatsapp">24</div>
                        <div className="text-[10px] text-gray-600">Appuntamenti oggi</div>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-3">
                        <div className="text-2xl font-bold text-blue-600">€1.2k</div>
                        <div className="text-[10px] text-gray-600">Fatturato</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <div className="text-xs font-semibold mb-2">Prossimi Appuntamenti</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between bg-white rounded-lg p-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-purple-600">MR</span>
                            </div>
                            <div>
                              <div className="text-xs font-medium">Maria Rossi</div>
                              <div className="text-[10px] text-gray-500">Taglio + Colore</div>
                            </div>
                          </div>
                          <div className="text-xs font-semibold text-whatsapp">09:00</div>
                        </div>
                        <div className="flex items-center justify-between bg-white rounded-lg p-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-pink-600">AB</span>
                            </div>
                            <div>
                              <div className="text-xs font-medium">Anna Bianchi</div>
                              <div className="text-[10px] text-gray-500">Manicure</div>
                            </div>
                          </div>
                          <div className="text-xs font-semibold">11:30</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
                    <div className="flex flex-col items-center text-whatsapp">
                      <Home className="w-5 h-5" />
                      <span className="text-[10px]">Home</span>
                    </div>
                    <div className="flex flex-col items-center text-gray-400">
                      <Calendar className="w-5 h-5" />
                      <span className="text-[10px]">Agenda</span>
                    </div>
                    <div className="flex flex-col items-center text-gray-400">
                      <Users className="w-5 h-5" />
                      <span className="text-[10px]">Clienti</span>
                    </div>
                    <div className="flex flex-col items-center text-gray-400">
                      <BarChart2 className="w-5 h-5" />
                      <span className="text-[10px]">Stats</span>
                    </div>
                  </div>
                </div>

                {/* Screen 3: Calendar */}
                <div className="screen-state screen-calendar" data-screen="2">
                  <div className="bg-whatsapp pt-8 pb-3 px-4">
                    <div className="flex justify-between items-center">
                      <div className="text-white">
                        <div className="text-xs opacity-80">Febbraio 2026</div>
                        <div className="text-xl font-bold">Martedì 3</div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <ChevronLeft className="w-4 h-4 text-white" />
                        </div>
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <ChevronRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-t-3xl -mt-2 pt-4 px-3">
                    <div className="flex justify-between mb-4">
                      {[
                        { day: "Lun", num: "2" },
                        { day: "Mar", num: "3", active: true },
                        { day: "Mer", num: "4" },
                        { day: "Gio", num: "5" },
                        { day: "Ven", num: "6" },
                      ].map((d, i) => (
                        <div
                          key={i}
                          className={`flex flex-col items-center p-2 rounded-xl ${d.active ? "bg-whatsapp/10 text-whatsapp" : ""}`}
                        >
                          <span className={`text-[10px] ${d.active ? "" : "text-gray-500"}`}>{d.day}</span>
                          <span className={`text-sm ${d.active ? "font-bold" : "font-semibold"}`}>{d.num}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {[
                        { time: "09:00", name: "Maria Rossi", service: "Taglio + Colore", color: "purple" },
                        { time: "11:30", name: "Anna Bianchi", service: "Manicure", color: "pink" },
                        { time: "14:30", name: "Luca Verdi", service: "Taglio Uomo (AI)", color: "whatsapp" },
                        { time: "16:00", name: "Giulia Neri", service: "Piega", color: "blue" },
                      ].map((appt, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="text-xs text-gray-500 w-10">{appt.time}</div>
                          <div
                            className={`flex-1 bg-${appt.color}-100 rounded-lg p-2 border-l-4 border-${appt.color}-500 ${appt.color === "whatsapp" ? "bg-whatsapp/20 border-whatsapp" : ""}`}
                          >
                            <div className="text-xs font-semibold">{appt.name}</div>
                            <div className="text-[10px] text-gray-600">{appt.service}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Screen 4: Analytics */}
                <div className="screen-state screen-analytics" data-screen="3">
                  <div className="pt-8 px-4">
                    <div className="text-white text-xl font-bold mb-1">Analytics</div>
                    <div className="text-xs text-gray-400">Ultimi 30 giorni</div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/10 backdrop-blur rounded-xl p-3">
                        <div className="text-xs text-gray-400 mb-1">Fatturato</div>
                        <div className="text-xl font-bold text-white">€12.4k</div>
                        <div className="text-[10px] text-green-400 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          +23%
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur rounded-xl p-3">
                        <div className="text-xs text-gray-400 mb-1">Clienti</div>
                        <div className="text-xl font-bold text-white">186</div>
                        <div className="text-[10px] text-green-400 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          +15%
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3">
                      <div className="text-xs text-gray-300 mb-3">Andamento Settimanale</div>
                      <div className="flex items-end justify-between h-24 gap-1">
                        {[60, 80, 45, 100, 70, 55, 85].map((h, i) => (
                          <div
                            key={i}
                            className={`flex-1 ${h === 100 ? "bg-whatsapp" : "bg-whatsapp/60"} rounded-t`}
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between mt-2 text-[10px] text-gray-500">
                        {["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"].map((d) => (
                          <span key={d}>{d}</span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3">
                      <div className="text-xs text-gray-300 mb-2">Servizi Top</div>
                      <div className="space-y-2">
                        {[
                          { name: "Taglio Donna", pct: 85 },
                          { name: "Colore", pct: 62 },
                          { name: "Manicure", pct: 48 },
                        ].map((s) => (
                          <div key={s.name} className="flex items-center justify-between">
                            <span className="text-xs text-white">{s.name}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-whatsapp rounded-full" style={{ width: `${s.pct}%` }} />
                              </div>
                              <span className="text-[10px] text-gray-400">{s.pct}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="come-funziona" className="steps-section py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <span className="text-whatsapp font-semibold text-sm uppercase tracking-wider">Processo Semplice</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl mt-3 mb-4">Come funziona in 5 passi</h2>
            <p className="text-gray-600 text-lg">
              Nessun app da scaricare. I tuoi clienti usano solo WhatsApp, tu gestisci tutto da una dashboard intuitiva.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-whatsapp via-brand-yellow to-whatsapp-dark -translate-y-1/2 rounded-full"></div>

            <div className="grid lg:grid-cols-5 gap-6 stagger-children">
              {[
                {
                  icon: MessageCircle,
                  step: "PASSO 1",
                  title: "Cliente scrive",
                  desc: "Il cliente invia un messaggio su WhatsApp come fa sempre",
                },
                {
                  icon: Zap,
                  step: "PASSO 2",
                  title: "Risposta immediata",
                  desc: "L'AI risponde in meno di 3 secondi, 24 ore su 24",
                },
                {
                  icon: HeartHandshake,
                  step: "PASSO 3",
                  title: "Conversazione naturale",
                  desc: "Dialogo umano: capisce esigenze, suggerisce, risponde",
                },
                {
                  icon: ClipboardCheck,
                  step: "PASSO 4",
                  title: "Conferma dettagli",
                  desc: "Verifica servizio, data, operatore preferito",
                },
                {
                  icon: CalendarCheck,
                  step: "PASSO 5",
                  title: "Prenotazione creata",
                  desc: "Appuntamento salvato, notifiche inviate, agenda aggiornata",
                  amber: true,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="step-card bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all z-10"
                >
                  <div
                    className={`w-14 h-14 ${item.amber ? "bg-brand-amber" : "bg-whatsapp"} rounded-2xl flex items-center justify-center mb-4 shadow-lg ${item.amber ? "shadow-brand-amber/30" : "shadow-whatsapp/30"}`}
                  >
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className={`text-sm font-bold ${item.amber ? "text-brand-amber" : "text-whatsapp"} mb-2`}>
                    {item.step}
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefici" className="benefits-section py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <span className="text-whatsapp font-semibold text-sm uppercase tracking-wider">
                Perché scegliere tAIuto
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl mt-3 mb-6">
                Benefici concreti per il tuo salone
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Non è solo tecnologia. È tempo ritrovato, clienti più felici e un team che può concentrarsi su ciò che
                fa davvero la differenza.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: Clock,
                    color: "whatsapp",
                    bg: "whatsapp/10",
                    title: "30-40 ore liberate al mese",
                    desc: "Tempo da reinvestire in servizi premium, formazione o semplicemente vita privata",
                  },
                  {
                    icon: TrendingUp,
                    color: "blue-600",
                    bg: "blue-100",
                    title: "Più prenotazioni, zero perdite",
                    desc: 'Rispondi a tutti, istantaneamente. Nessun cliente perso perché "nessuno rispondeva"',
                  },
                  {
                    icon: Users,
                    color: "purple-600",
                    bg: "purple-100",
                    title: "Staff più efficiente e felice",
                    desc: "I tuoi collaboratori fanno ciò per cui sono stati assunti: acconciare, non rispondere al telefono",
                  },
                  {
                    icon: Moon,
                    color: "brand-amber",
                    bg: "brand-yellow/50",
                    title: "Disponibilità 24/7/365",
                    desc: "Prenotazioni mentre dormi, durante i weekend, nei giorni di chiusura",
                  },
                ].map((item, i) => (
                  <div key={i} className="benefit-item flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-${item.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <item.icon className={`w-6 h-6 text-${item.color}`} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="benefits-images relative">
              <div className="absolute inset-0 bg-gradient-to-br from-whatsapp/30 to-brand-yellow/30 rounded-3xl blur-3xl"></div>
              <div className="relative grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-8">
                  <div className="benefit-img reveal-scale bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover-lift">
                    <Sparkles className="w-8 h-8 text-whatsapp mb-3" />
                    <div className="text-2xl font-bold">+47%</div>
                    <div className="text-sm text-gray-600">Prenotazioni online</div>
                  </div>
                  <div className="benefit-img reveal-scale bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover-lift">
                    <Heart className="w-8 h-8 text-pink-500 mb-3" />
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-sm text-gray-600">Clienti soddisfatti</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="benefit-img reveal-scale bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover-lift">
                    <TimerOff className="w-8 h-8 text-brand-amber mb-3" />
                    <div className="text-2xl font-bold">-85%</div>
                    <div className="text-sm text-gray-600">Tempo admin</div>
                  </div>
                  <div className="benefit-img reveal-scale bg-whatsapp rounded-2xl p-6 shadow-lg shadow-whatsapp/30 hover-lift">
                    <Smartphone className="w-8 h-8 text-white mb-3" />
                    <div className="text-2xl font-bold text-white">100%</div>
                    <div className="text-sm text-whatsapp-light">Su WhatsApp</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="roi-section py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="text-brand-yellow font-semibold text-sm uppercase tracking-wider">Calcolo ROI</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl mt-3 mb-4">
              L&apos;investimento che si ripaga da solo
            </h2>
            <p className="text-gray-400 text-lg">Esempio reale: salone con 3 dipendenti</p>
          </div>

          <div className="roi-card bg-white/5 backdrop-blur rounded-3xl p-8 md:p-12 border border-white/10">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center md:text-left reveal">
                <div className="text-sm text-gray-400 mb-2">Tempo liberato</div>
                <div className="text-5xl font-display font-bold text-whatsapp mb-2">30h</div>
                <div className="text-gray-400">al mese in media</div>
              </div>

              <div className="flex items-center justify-center reveal">
                <div className="text-6xl text-brand-yellow">×</div>
              </div>

              <div className="text-center md:text-left reveal">
                <div className="text-sm text-gray-400 mb-2">Valore orario servizi</div>
                <div className="text-5xl font-display font-bold text-brand-yellow mb-2">€50</div>
                <div className="text-gray-400">fatturabile medio</div>
              </div>
            </div>

            <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            <div className="text-center reveal">
              <div className="text-sm text-gray-400 mb-3">Valore generato mensilmente</div>
              <div className="text-6xl md:text-7xl font-display font-bold gradient-text mb-2">€1.500</div>
              <div className="text-gray-400">
                = <span className="text-white font-semibold">€18.000</span> all&apos;anno di potenziale extra
              </div>
            </div>

            <div className="mt-10 p-6 bg-whatsapp/10 rounded-2xl border border-whatsapp/20 reveal">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="text-sm text-whatsapp-light mb-1">Costo tAIuto</div>
                  <div className="text-2xl font-bold">€39,90/mese</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-whatsapp-light mb-1">Return on Investment</div>
                  <div className="text-3xl font-bold text-whatsapp">3.660%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="prezzi" className="pricing-section py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-whatsapp font-semibold text-sm uppercase tracking-wider">Pricing Semplice</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl mt-3 mb-4">Un piano, tutto incluso</h2>
            <p className="text-gray-600 text-lg">Nessun contratto, nessuna sorpresa. Cancelli quando vuoi.</p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="pricing-card pricing-popular bg-white rounded-3xl shadow-xl border-2 border-whatsapp overflow-hidden">
              <div className="bg-whatsapp text-white text-center py-3">
                <span className="text-sm font-semibold">PIÙ SCELTO</span>
              </div>
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="font-display font-bold text-2xl mb-2">tAIuto Complete</h3>
                  <p className="text-gray-600 text-sm">Tutto ciò che serve per il tuo salone</p>
                </div>

                <div className="text-center mb-8">
                  <div className="flex items-end justify-center space-x-1">
                    <span className="text-5xl font-display font-bold text-gray-900">€39,90</span>
                    <span className="text-gray-500 mb-2">/mese</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">+ €49,90 setup una tantum</div>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    "AI WhatsApp illimitata",
                    "Dashboard completa",
                    "Gestione personale",
                    "Magazzino & Analytics",
                    "Supporto dedicato",
                    "Aggiornamenti inclusi",
                  ].map((item) => (
                    <li key={item} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-whatsapp flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#demo"
                  className="btn-shine block w-full bg-whatsapp hover:bg-whatsapp-dark text-white text-center py-4 rounded-xl font-semibold transition-all shadow-lg shadow-whatsapp/25"
                >
                  Inizia Prova Gratuita
                </a>

                <p className="text-center text-xs text-gray-500 mt-4">
                  14 giorni free • Carta non richiesta • Cancellazione immediata
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation */}
      <section className="implementation-section py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-whatsapp font-semibold text-sm uppercase tracking-wider">Setup Istantaneo</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl mt-3 mb-4">Attivo in 48 ore</h2>
            <p className="text-gray-600 text-lg">Zero training. Zero stress. Zero interruzione delle tue attività.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                day: "Giorno 1",
                title: "Configurazione",
                color: "whatsapp",
                items: ["Call di onboarding (30 min)", "Import servizi e prezzi", "Configurazione orari e staff"],
              },
              {
                day: "Giorno 2",
                title: "Go Live",
                color: "brand-amber",
                items: ["AI attiva e testata", "Accesso dashboard", "Prima prenotazione AI!"],
              },
            ].map((step, i) => (
              <div key={i} className="impl-step relative">
                <div
                  className={`absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-${step.color} to-${step.color === "whatsapp" ? "whatsapp-dark" : "brand-yellow"} rounded-full`}
                ></div>
                <div className="pl-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 bg-${step.color} rounded-xl flex items-center justify-center`}>
                      <span className="text-white font-bold">{i + 1}</span>
                    </div>
                    <div>
                      <div className={`text-sm text-${step.color} font-semibold`}>{step.day}</div>
                      <h3 className="font-display font-bold text-xl">{step.title}</h3>
                    </div>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    {step.items.map((item) => (
                      <li key={item} className="flex items-center space-x-2">
                        <Check className={`w-4 h-4 text-${step.color}`} />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* vs Competitors */}
      <section className="comparison-section py-24 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="text-brand-yellow font-semibold text-sm uppercase tracking-wider">Perché Noi</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl mt-3 mb-4">tAIuto vs Competitors</h2>
          </div>

          <div className="overflow-x-auto reveal">
            <table className="comparison-table w-full">
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 font-semibold">Caratteristica</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-400">Altri Software</th>
                  <th className="text-center py-4 px-4 font-semibold text-whatsapp">tAIuto</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { feature: "Risposta AI su WhatsApp", other: "no", us: "yes" },
                  { feature: "Prenotazioni automatiche", other: "Manuali", us: "Automatiche" },
                  { feature: "Conversazione umana", other: "no", us: "yes" },
                  { feature: "Memo/auguri compleanno", other: "yes-gray", us: "yes" },
                  { feature: "Disponibilità 24/7", other: "no", us: "yes" },
                  { feature: "Tempo di setup", other: "Settimane", us: "48 ore" },
                  { feature: "Training richiesto", other: "Sì, estensivo", us: "Zero" },
                  { feature: "Prezzo mensile", other: "€80-200+", us: "€39,90" },
                ].map((row) => (
                  <tr key={row.feature}>
                    <td className="py-4 px-4">{row.feature}</td>
                    <td className="text-center py-4 px-4">
                      {row.other === "no" ? (
                        <X className="w-5 h-5 text-red-400 mx-auto" />
                      ) : row.other === "yes-gray" ? (
                        <Check className="w-5 h-5 text-gray-400 mx-auto" />
                      ) : (
                        <span className="text-gray-500">{row.other}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {row.us === "yes" ? (
                        <Check className="w-5 h-5 text-whatsapp mx-auto" />
                      ) : (
                        <span className="text-whatsapp font-semibold">{row.us}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="target-section py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="text-whatsapp font-semibold text-sm uppercase tracking-wider">Target</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl mt-3 mb-4">Per chi è tAIuto?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 stagger-children">
            {[
              {
                icon: Clock,
                title: "Chi vuole risparmiare tempo",
                desc: "Stai ancora rispondendo personalmente a ogni messaggio? tAIuto ti restituisce la tua giornata.",
              },
              {
                icon: TrendingUp,
                title: "Chi vuole crescere",
                desc: "Vuoi più clienti senza assumere? L'AI scala con te, senza costi aggiuntivi.",
              },
              {
                icon: Smartphone,
                title: "Chi vuole modernizzarsi",
                desc: "I tuoi clienti preferiscono WhatsApp alle telefonate? Portali dove vogliono loro.",
              },
            ].map((item, i) => (
              <div key={i} className="target-card reveal p-8 rounded-3xl bg-gray-50">
                <div className="target-icon w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 transition-colors">
                  <item.icon className="w-8 h-8 text-whatsapp transition-colors" />
                </div>
                <h3 className="font-display font-bold text-xl mb-3">{item.title}</h3>
                <p className="target-text text-gray-600 transition-colors">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="demo"
        className="cta-section py-24 bg-gradient-to-br from-whatsapp via-whatsapp-dark to-brand-darker relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="cta-content max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-6">
            Pronta a liberare il tuo tempo?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Prenota una demo gratuita di 30 minuti. Ti mostriamo tAIuto in azione sul tuo salone, senza impegno.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="mailto:info@taiuto.it?subject=Richiesta Demo tAIuto"
              className="btn-shine inline-flex items-center justify-center space-x-2 bg-white text-whatsapp-dark hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-xl hover-lift"
            >
              <Calendar className="w-5 h-5" />
              <span>Prenota Demo Gratis</span>
            </a>
            <a
              href="mailto:info@taiuto.it"
              className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-full font-semibold text-lg transition-all hover-lift"
            >
              <Mail className="w-5 h-5" />
              <span>Scrivici</span>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-white/60 text-sm">
            {["Setup in 48h", "14 giorni prova", "Cancella quando vuoi"].map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <a href="#top" className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-whatsapp to-whatsapp-dark rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-display font-bold text-xl">tAIuto</span>
              </a>
              <p className="text-gray-400 text-sm">L&apos;AI che gestisce il tuo salone mentre tu fai ciò che ami.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Prodotto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#funzionalita" className="footer-link hover:text-white transition-colors">
                    Funzionalità
                  </a>
                </li>
                <li>
                  <a href="#prezzi" className="footer-link hover:text-white transition-colors">
                    Prezzi
                  </a>
                </li>
                <li>
                  <a href="#come-funziona" className="footer-link hover:text-white transition-colors">
                    Come funziona
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Azienda</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <span className="opacity-50 cursor-default" title="In arrivo">
                    Chi siamo
                  </span>
                </li>
                <li>
                  <span className="opacity-50 cursor-default" title="In arrivo">
                    Blog
                  </span>
                </li>
                <li>
                  <span className="opacity-50 cursor-default" title="In arrivo">
                    Lavora con noi
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contatti</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:info@taiuto.it" className="footer-link hover:text-white transition-colors">
                    info@taiuto.it
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <a href="https://www.taiuto.it" className="footer-link hover:text-white transition-colors">
                    www.taiuto.it
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">© 2026 tAIuto. Tutti i diritti riservati.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {[Instagram, Linkedin, Facebook].map((Icon, i) => (
                <span key={i} className="text-gray-400 opacity-50 cursor-default" title="In arrivo">
                  <Icon className="w-5 h-5" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
