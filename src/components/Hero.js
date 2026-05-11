import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-24 lg:px-8">
        <div className="max-w-3xl space-y-8">
          <span className="text-xs uppercase tracking-[0.45em] text-gray-500">HA — Quiet power.</span>
          <h1 className="text-5xl font-black leading-tight tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
            The silence you feel is the statement you make.
          </h1>
          <p className="text-lg leading-8 text-slate-300 sm:text-xl">
            A premium men's edit in black, white and steel tones. Clean tailoring, strong silhouettes and a ruthless focus on luxury detail.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a href="#collection" className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-gray-100">
              Discover the drop
            </a>
            <a href="#about" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
              House story
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;