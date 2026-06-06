import { Star, Quote } from 'lucide-react';

function TestimonialSection({ testimonials }) {
  return (
    <section id="testimonials" className="relative py-24 bg-gray-950">
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb w-[350px] h-[350px] bg-purple-600/8 top-[30%] right-[10%]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Trusted by <span className="gradient-text">Professionals</span> Worldwide
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-400">
            See what our users have to say about VectorShare
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card-hover p-7 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s`, opacity: 0, animationFillMode: 'forwards' }}
            >
              {/* Quote icon */}
              <div className="mb-5">
                <Quote size={24} className="text-purple-500/30" />
              </div>

              {/* Quote text */}
              <blockquote className="mb-6">
                <p className="text-sm text-gray-300 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </blockquote>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={`${i < testimonial.rating ? 'text-amber-400' : 'text-gray-700'} fill-current`}
                  />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-gray-800/50">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-purple-500/20"
                />
                <div>
                  <h4 className="text-sm font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-xs text-gray-500">{testimonial.role}, {testimonial.company}</p>
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
