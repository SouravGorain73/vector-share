import { Star } from 'lucide-react';

function TestimonialSection({ testimonials }) {
  return (
    <section id="testimonials" className="relative py-28 bg-app text-primary border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-border text-xs font-semibold text-accent mb-4">
            <span>User Reviews</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-primary">
            Trusted by professionals and teams.
          </h2>
          <p className="mt-3 text-base text-secondary font-sans">
            See how creators, freelancers, and growing teams share their important work with VectorShare every day.
          </p>
        </div>

        {/* Pull-Quote Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 bg-card border border-border rounded-xl hover:border-accent/40 transition-all duration-200 flex flex-col justify-between shadow-sm"
            >
              <div>
                {/* Pull-quote mark & rating */}
                <div className="flex items-center justify-between mb-6">
                  <div className="font-display font-black text-3xl text-accent/40 leading-none">
                    “
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={`${i < testimonial.rating ? 'text-accent' : 'text-muted/30'} fill-current`}
                      />
                    ))}
                  </div>
                </div>

                {/* Quote copy */}
                <blockquote className="text-sm font-sans text-secondary leading-relaxed italic mb-8">
                  {testimonial.quote}
                </blockquote>
              </div>

              {/* Attribution */}
              <div className="pt-5 border-t border-border flex items-center gap-3.5">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover border border-border"
                />
                <div>
                  <h4 className="font-display font-bold text-sm text-primary">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-muted font-sans">
                    {testimonial.role} at {testimonial.company}
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
