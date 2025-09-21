'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Typewriter from './Typewriter';

interface AnimationExampleProps {
  className?: string;
}

export default function AnimationExample({ className = '' }: AnimationExampleProps) {
  const [currentExample, setCurrentExample] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const examples = [
    {
      title: 'Basic Typewriter',
      description: 'Simple typewriter effect with default settings',
      component: (
        <Typewriter
          text="Hello, World!"
          className="text-2xl font-bold text-blue-600"
        />
      )
    },
    {
      title: 'Custom Speed & Delay',
      description: 'Slower typing with initial delay',
      component: (
        <Typewriter
          text="Welcome to the animation showcase!"
          className="text-xl font-semibold text-green-600"
          delay={150}
          startDelay={1000}
        />
      )
    },
    {
      title: 'No Cursor',
      description: 'Typewriter effect without blinking cursor',
      component: (
        <Typewriter
          text="Clean and minimal"
          className="text-lg font-medium text-purple-600"
          showCursor={false}
        />
      )
    },
    {
      title: 'Custom Styling',
      description: 'Styled cursor and custom text appearance',
      component: (
        <Typewriter
          text="Styled with custom cursor"
          className="text-xl font-bold text-red-600 bg-gray-100 px-4 py-2 rounded-lg"
          cursorClassName="bg-red-500"
          delay={80}
        />
      )
    },
    {
      title: 'Loop Animation',
      description: 'Continuous looping typewriter effect',
      component: (
        <Typewriter
          text="This will loop forever..."
          className="text-lg font-medium text-indigo-600"
          loop={true}
          delay={120}
        />
      )
    },
    {
      title: 'Completion Callback',
      description: 'Triggers action when typing completes',
      component: (
        <div className="flex flex-col items-center space-y-4">
          <Typewriter
            text="Animation completed!"
            className="text-xl font-bold text-orange-600"
            delay={100}
            onComplete={() => setIsComplete(true)}
          />
          {isComplete && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-green-600 font-semibold"
            >
              ✓ Animation finished!
            </motion.div>
          )}
        </div>
      )
    },
    {
      title: 'Multiple Typewriters',
      description: 'Coordinated multiple typewriter instances',
      component: (
        <div className="space-y-2">
          <Typewriter
            text="First line"
            className="text-base font-medium text-blue-500"
            delay={100}
            startDelay={0}
          />
          <Typewriter
            text="Second line"
            className="text-base font-medium text-green-500"
            delay={100}
            startDelay={1500}
          />
          <Typewriter
            text="Third line"
            className="text-base font-medium text-red-500"
            delay={100}
            startDelay={3000}
          />
        </div>
      )
    }
  ];

  const nextExample = () => {
    setCurrentExample((prev) => (prev + 1) % examples.length);
    setIsComplete(false);
  };

  const prevExample = () => {
    setCurrentExample((prev) => (prev - 1 + examples.length) % examples.length);
    setIsComplete(false);
  };

  return (
    <div className={`max-w-4xl mx-auto p-6 ${className}`}>
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Typewriter Animation Examples
          </h1>
          <p className="text-gray-600">
            Demonstrating various configurations and use cases of the Typewriter component
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {examples[currentExample].title}
            </h2>
            <p className="text-gray-600 text-sm">
              {examples[currentExample].description}
            </p>
          </div>

          <div className="min-h-[100px] flex items-center justify-center bg-white rounded-lg p-6">
            {examples[currentExample].component}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={prevExample}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Previous
          </button>

          <div className="flex space-x-2">
            {examples.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentExample(index);
                  setIsComplete(false);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentExample ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextExample}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Next
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Usage Examples
          </h3>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <div className="mb-4">
              <p className="text-gray-400 mb-2">{"// Basic usage"}</p>
              <p>{'<Typewriter text="Hello World!" />'}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-400 mb-2">{"// With custom styling"}</p>
              <p>{'<Typewriter text="Styled text" className="text-2xl font-bold text-blue-600" delay={150} />'}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-400 mb-2">{"// Looping animation"}</p>
              <p>{'<Typewriter text="Looping..." loop={true} />'}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-2">{"// With completion callback"}</p>
              <p>{'<Typewriter text="Done!" onComplete={() => console.log("Finished!")} />'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}