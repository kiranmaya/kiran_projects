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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white p-4">

      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] z-0 pointer-events-none"></div>

      <div className="container mx-auto z-10 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-block px-4 py-2 mb-4 rounded-full border border-gray-700 bg-gray-900/50 backdrop-blur-md">
              <span className="flex items-center gap-2 text-sm text-gray-300">
                <SparklesIcon className="w-4 h-4 text-yellow-400" />
                <span>AI & Next.js Implementation Specialist</span>
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                {data.name}
              </span>
            </h1>

            <div className="text-xl lg:text-3xl text-gray-400 mb-8 h-20">
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
                className="font-mono text-blue-400"
              />
            </div>

            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {data.about}
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2"
              >
                <CommandLineIcon className="w-5 h-5" />
                View Projects
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-transparent border border-gray-600 text-white font-bold rounded-lg hover:border-white hover:bg-white/5 transition-all flex items-center gap-2"
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
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-3xl transform rotate-6 border border-white/10 backdrop-blur-sm"></div>
              <div className="absolute inset-0 bg-gray-900/80 rounded-3xl transform -rotate-3 border border-gray-700 overflow-hidden shadow-2xl">
                <div className="p-6">
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="font-mono text-sm text-gray-400">
                    <p className="mb-2"><span className="text-purple-400">class</span> <span className="text-yellow-400">Developer</span>:</p>
                    <p className="pl-4 mb-2"><span className="text-blue-400">def</span> <span className="text-yellow-400">__init__</span>(self):</p>
                    <p className="pl-8 mb-2">self.stack = [<span className="text-green-400">&apos;Next.js&apos;</span>, <span className="text-green-400">&apos;Python&apos;</span>, <span className="text-green-400">&apos;PyTorch&apos;</span>]</p>
                    <p className="pl-8 mb-2">self.passion = <span className="text-green-400">&apos;AI Agents & Automation&apos;</span></p>
                    <p className="pl-8 mb-2">self.location = <span className="text-green-400">&apos;{data.location}&apos;</span></p>
                    <br />
                    <p className="pl-4 mb-2"><span className="text-blue-400">def</span> <span className="text-yellow-400">build_future</span>(self):</p>
                    <p className="pl-8 mb-2"><span className="text-purple-400">return</span> <span className="text-green-400">&apos;ZeroLoss Systems&apos;</span></p>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
                </div>
              </div>

              {/* Floating Badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 top-20 bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-xl"
              >
                <Image src="/images/nextjs-icon.png" alt="Next.js" width={40} height={40} className="w-10 h-10" />
                {/* Note: Ensure these images exist or handle fallback. Using text for now if image fails */}
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-12 bottom-40 bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-xl"
              >
                <span className="text-2xl">🧠</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}