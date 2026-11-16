import { Star } from 'lucide-react';

function TestimonialSection({ testimonials }) {
  return (
    <section id="testimonials" className="relative py-28 bg-[#111827] text-[#F5F3EB] border-b border-[#E5E3DA]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#151F2E] border border-[#E5E3DA]/15 text-xs font-mono text-[#D7FF64] mb-4">
            <span>[03 // FIELD ATTESTATIONS]</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-[#FFFFFF]">
            PROVEN BY DESIGN LEADERS.
          </h2>
          <p className="mt-3 text-base text-[#737373] font-sans">
            Independent teams and high-throughput studios rely on VectorShare for frictionless client asset delivery.
          </p>
        </div>

        {/* Editorial Pull-Quote Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 bg-[#0E1522] border border-[#E5E3DA]/10 rounded-lg hover:border-[#D7FF64]/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Pull-quote mark & rating */}
                <div className="flex items-center justify-between mb-6">
                  <div className="font-display font-black text-3xl text-[#D7FF64]/50 leading-none">
                    “
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={`${i < testimonial.rating ? 'text-[#D7FF64]' : 'text-[#737373]/30'} fill-current`}
                      />
                    ))}
                  </div>
                </div>

                {/* Quote copy */}
                <blockquote className="text-sm font-sans text-[#F5F3EB]/90 leading-relaxed italic mb-8">
                  {testimonial.quote}
                </blockquote>
              </div>

              {/* Attribution */}
              <div className="pt-5 border-t border-[#E5E3DA]/10 flex items-center gap-3.5">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-9 h-9 rounded-full object-cover border border-[#E5E3DA]/20"
                />
                <div>
                  <h4 className="font-display font-bold text-xs text-[#FFFFFF]">
                    {testimonial.name}
                  </h4>
                  <p className="text-[11px] font-mono text-[#737373]">
                    {testimonial.role} // {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default TestimonialSection;
