import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Dr. Priya Sharma',
    role: 'HOD, Computer Science',
    college: 'ABC Engineering College',
    content: 'This system helped us identify 15 at-risk students early in the semester. With timely intervention, 12 of them improved significantly.',
    rating: 5,
  },
  {
    name: 'Rahul Kumar',
    role: 'Student, 6th Semester',
    college: 'XYZ Institute of Technology',
    content: 'The personalized rescue plan was exactly what I needed. The daily targets and subject strategies helped me clear my backlogs.',
    rating: 5,
  },
  {
    name: 'Prof. Anil Mehta',
    role: 'Faculty Mentor',
    college: 'DEF Engineering College',
    content: 'The mentor dashboard gives me complete visibility into student progress. It has transformed how we provide academic support.',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What People <span className="text-gradient">Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from educators and students who have benefited from our AI-powered academic rescue system.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="border border-border/50 bg-card hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-muted-foreground leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-xs text-primary">{testimonial.college}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
