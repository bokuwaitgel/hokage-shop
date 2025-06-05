"use client";

import { useState } from 'react';
import { PageHero } from '@/components/layout/page-hero';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    
    // Reset form
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <PageHero
        title="Холбоо Барих"
        description="Асуулт, дэмжлэг авахыг хүсвэл манай багтай холбогдоорой"
      />
      
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">Холбоо Барих</h2>
              <p className="text-muted-foreground">
                Захиалга, бүтээгдэхүүний талаар асуух зүйл байна уу, эсвэл зүгээр л мэндчилмээр байна уу? 
                Бид таныг сонсоход баяртай байх болно. Манай баг танд туслахад бэлэн байна!
              </p>
            </div>

            <div className="grid gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Имэйл</h3>
                  <p className="text-muted-foreground mb-1">Ерөнхий асуултууд:</p>
                  <a href="mailto:info@hokageshop.com" className="text-primary hover:underline">
                    info@hokageshop.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Утас</h3>
                  <p className="text-muted-foreground mb-1">Хэрэглэгчийн үйлчилгээ:</p>
                  <a href="tel:+1-800-HOKAGE" className="text-primary hover:underline">
                    1-800-HOKAGE
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Хаяг</h3>
                  <p className="text-muted-foreground">
                    Аниме гудамж 123<br />
                    Отаку дүүрэг<br />
                    Токио, Япон 123-4567
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Ажлын Цаг</h3>
                  <p className="text-muted-foreground">
                    Даваа - Баасан: 09:00 - 18:00<br />
                    Бямба: 10:00 - 16:00<br />
                    Ням: Амарна
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-muted/50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Мессеж Илгээх</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Нэр</Label>
                  <Input id="firstName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Овог</Label>
                  <Input id="lastName" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Имэйл</Label>
                <Input id="email" type="email" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Гарчиг</Label>
                <Input id="subject" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Мессеж</Label>
                <Textarea
                  id="message"
                  required
                  className="min-h-[150px]"
                  placeholder="Бид танд хэрхэн туслах вэ?"
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Илгээж байна..." : "Илгээх"}
              </Button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="mt-16">
          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.7479754683745!2d139.7016359!3d35.6580339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b563b00109f%3A0x337328def1e2ab26!2sShinjuku%20Station!5e0!3m2!1sen!2sus!4v1635959481000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </>
  );
}