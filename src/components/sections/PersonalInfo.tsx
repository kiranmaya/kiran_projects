'use client';

import { PersonalInfo as PersonalInfoType } from '@/types';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import {
  CodeBracketIcon,
  CommandLineIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

interface PersonalInfoProps {
  data: PersonalInfoType;
}

export default function PersonalInfo({ data }: PersonalInfoProps) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground p-4">

      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--foreground),0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--foreground),0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] z-0 pointer-events-none opacity-20"></div>

      <div className="container mx-auto z-10 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-block px-4 py-2 mb-4 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-md">
              <span className="flex items-center gap-2 text-sm text-foreground/80">
                <SparklesIcon className="w-4 h-4 text-primary" />
                <span>AI & Next.js Implementation Specialist</span>
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                {data.name}
              </span>
            </h1>

            <div className="text-xl lg:text-3xl text-foreground/60 mb-8 h-20">
              <TypeAnimation
                sequence={[
                  'Building AI Agents.',
                  1000,
                  'Crafting Next.js Apps.',
                  1000,
                  'Training Neural Networks.',
                  1000,
                  'Solving Complex Problems.',
                  1000
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="font-mono text-primary"
              />
            </div>

            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {data.about}
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-primary text-background font-bold rounded-lg hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
              >
                <CommandLineIcon className="w-5 h-5" />
                View Projects
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-transparent border border-foreground/20 text-foreground font-bold rounded-lg hover:bg-foreground/5 transition-all flex items-center gap-2"
              >
                <CodeBracketIcon className="w-5 h-5" />
                Contact Me
              </button>
            </div>
          </motion.div>

          {/* Visual/Hero Image */}
          <motion.div
            style={{ y: y1 }}
            className="flex-1 relative hidden lg:block"
          >
            <div className="relative w-[500px] h-[600px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl transform rotate-6 border border-foreground/10 backdrop-blur-sm"></div>
              <div className="absolute inset-0 bg-background/80 rounded-3xl transform -rotate-3 border border-foreground/10 overflow-hidden shadow-2xl backdrop-blur-md">
                <div className="p-6">
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="font-mono text-sm text-foreground/60">
                    <p className="mb-2"><span className="text-secondary">class</span> <span className="text-primary">Developer</span>:</p>
                    <p className="pl-4 mb-2"><span className="text-accent">def</span> <span className="text-primary">__init__</span>(self):</p>
                    <p className="pl-8 mb-2">self.stack = [<span className="text-primary/80">&apos;Next.js&apos;</span>, <span className="text-primary/80">&apos;Python&apos;</span>, <span className="text-primary/80">&apos;PyTorch&apos;</span>]</p>
                    <p className="pl-8 mb-2">self.passion = <span className="text-primary/80">&apos;AI Agents & Automation&apos;</span></p>
                    <p className="pl-8 mb-2">self.location = <span className="text-primary/80">&apos;{data.location}&apos;</span></p>
                    <br />
                    <p className="pl-4 mb-2"><span className="text-accent">def</span> <span className="text-primary">build_future</span>(self):</p>
                    <p className="pl-8 mb-2"><span className="text-secondary">return</span> <span className="text-primary/80">&apos;ZeroLoss Systems&apos;</span></p>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
                </div>
              </div>

              {/* Floating Badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 top-20 bg-background/80 backdrop-blur-md p-4 rounded-xl border border-foreground/10 shadow-xl"
              >
                <Image src="/images/nextjs-icon.png" alt="Next.js" width={40} height={40} className="w-10 h-10 grayscale opacity-50" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-12 bottom-40 bg-background/80 backdrop-blur-md p-4 rounded-xl border border-foreground/10 shadow-xl"
              >
                <span className="text-2xl opacity-50">🧠</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}