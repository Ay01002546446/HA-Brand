import React from 'react';

const About = () => {
  return (
    <section id="about" className="bg-black py-20 px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 lg:flex-row lg:items-center">
        <div className="space-y-6 lg:max-w-xl">
          <p className="text-xs uppercase tracking-[0.45em] text-gray-500">About</p>
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            A modern atelier for those who demand presence.
          </h2>
          <p className="max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
            HA is built on the belief that true luxury is quiet, confident and unmistakable. We design with restraint, precision and an edge that feels both timeless and forward.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { label: 'Egyptian Design', value: 'Refined identity' },
            { label: 'Limited Edition', value: 'Rare quality' },
          ].map((item) => (
            <div key={item.label} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 transition hover:border-white/20">
              <p className="text-sm uppercase tracking-[0.35em] text-gray-400">{item.label}</p>
              <p className="mt-4 text-2xl font-bold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;