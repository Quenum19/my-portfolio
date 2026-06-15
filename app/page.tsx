import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="flex flex-col bg-slate-50 dark:bg-slate-950">
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Testimonials />
      <Contact />
    </div>
  );
}
