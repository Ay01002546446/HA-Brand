import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="bg-[#080808] py-20 px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/5 px-8 py-12 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Stay connected</p>
        <h3 className="mt-4 text-3xl font-black text-white sm:text-4xl">Be first for every drop.</h3>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300">
          Join a select list and receive updates on new collections, restocks and exclusive releases.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-full border border-white/10 bg-black/80 px-5 py-4 text-white outline-none placeholder:text-gray-500 focus:border-white/30"
          />
          <button className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-gray-100">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;