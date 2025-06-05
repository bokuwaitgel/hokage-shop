import Image from 'next/image';
import { PageHero } from '@/components/layout/page-hero';
import { Button } from '@/components/ui/button';
import { Heart, Package, Shield, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Хокаге Дэлгүүрийн Тухай"
        description="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        backgroundImage="https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      
      <div className="container py-16">
        {/* Our Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Манай дэлгүүр"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Манай Түүх</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit perferendis voluptatum libero vel culpa? Nemo aliquam rerum fugiat nihil vero maxime fuga aliquid autem excepturi dignissimos, impedit eligendi. Dolorum, ipsum!
              </p>
              <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni atque laudantium impedit distinctio? Possimus voluptatum vitae, aperiam labore, impedit exercitationem, maxime eos consequuntur numquam iste omnis cumque culpa repudiandae quam!
              </p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae velit dolorem harum reprehenderit ipsa, illum sint rerum a consectetur quisquam voluptates nostrum officiis quidem laboriosam aliquam illo. Voluptatum, possimus velit?
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Манай Үнэт Зүйлс</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-muted/50">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Хайр Сэтгэл</h3>
              <p className="text-muted-foreground">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem, exercitationem sapiente. Delectus veniam sapiente magni corrupti, voluptas sint esse totam, quam aperiam assumenda perspiciatis incidunt ipsa pariatur, beatae dignissimos veritatis.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-muted/50">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Чанар</h3>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, quasi. Reprehenderit ducimus quam nemo debitis atque saepe illum optio, tempora sit? Fuga aperiam iure distinctio illum aliquid sunt itaque obcaecati.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-muted/50">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Нийгэмлэг</h3>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate reprehenderit possimus quos inventore maxime vero corporis ad autem officia porro. Odit exercitationem maxime maiores sapiente, magnam quisquam ad ea. Temporibus!
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-muted/50">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Үйлчилгээ</h3>
              <p className="text-muted-foreground">
               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem sunt consequuntur, eum distinctio earum eveniet inventore laboriosam. Voluptatum hic ducimus consequuntur quisquam, explicabo minus soluta, laudantium maiores id dolore est?
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold tracking-tight mb-12">Манай Багийн Гишүүд</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Юки Танака",
                role: "Үүсгэн байгуулагч & Гүйцэтгэх захирал",
                image: "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                name: "Алекс Чен",
                role: "Бүтээгдэхүүний Менежер",
                image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                name: "Мариа Родригез",
                role: "Хэрэглэгчийн Үйлчилгээний Ахлах",
                image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
            ].map((member) => (
              <div key={member.name} className="flex flex-col items-center">
                <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Join Us */}
        <div className="text-center bg-muted/50 rounded-lg p-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Бидэнтэй Нэгдээрэй</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus harum explicabo nam itaque iste qui consequatur quis assumenda ipsa ex totam vel ipsum, nemo corporis fuga omnis. Laboriosam, ea temporibus!
          </p>
          {/* <Button size="lg" asChild>
            <a href="mailto:careers@hokageshop.com">Нээлттэй Ажлын Байрууд</a>
          </Button> */}
        </div>
      </div>
    </>
  );
}