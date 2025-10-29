import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Album {
  id: number;
  title: string;
  artist: string;
  year: number;
  genre: string;
  cover: string;
  description: string;
}

const albums: Album[] = [
  {
    id: 1,
    title: 'Космическая одиссея',
    artist: 'Nebula Sound',
    year: 2024,
    genre: 'Electronic',
    cover: 'https://cdn.poehali.dev/projects/8a87377e-a6b9-4d69-8118-2d633e6b7c58/files/9074bf05-c15d-4bd5-8efa-9deff058aa85.jpg',
    description: 'Путешествие через звёзды и галактики в ритме электронной музыки'
  },
  {
    id: 2,
    title: 'Летние вибрации',
    artist: 'Sunset Dreams',
    year: 2024,
    genre: 'Chill',
    cover: 'https://cdn.poehali.dev/projects/8a87377e-a6b9-4d69-8118-2d633e6b7c58/files/fbe61ce2-b21f-4bc8-bbdb-7a3712b95731.jpg',
    description: 'Расслабляющие треки для летних закатов и теплых вечеров'
  },
  {
    id: 3,
    title: 'Ночной город',
    artist: 'Urban Beats',
    year: 2023,
    genre: 'Hip-Hop',
    cover: 'https://cdn.poehali.dev/projects/8a87377e-a6b9-4d69-8118-2d633e6b7c58/files/9074bf05-c15d-4bd5-8efa-9deff058aa85.jpg',
    description: 'Энергия мегаполиса в каждой ноте, биты улиц большого города'
  },
  {
    id: 4,
    title: 'Электрический рай',
    artist: 'Synth Wave',
    year: 2024,
    genre: 'Synthwave',
    cover: 'https://cdn.poehali.dev/projects/8a87377e-a6b9-4d69-8118-2d633e6b7c58/files/fbe61ce2-b21f-4bc8-bbdb-7a3712b95731.jpg',
    description: 'Ретро-футуристические звуки 80-х в современной обработке'
  }
];

export default function Index() {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: 'Inter, sans-serif' }}>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg animate-gradient-shift opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Музыка Будущего
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8">
              Исследуй новые звуковые горизонты
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="bg-gradient-to-r from-gradient-purple to-gradient-pink hover:opacity-90 transition-all hover:scale-105">
                <Icon name="Play" className="mr-2 h-5 w-5" />
                Слушать сейчас
              </Button>
              <Button size="lg" variant="outline" className="border-2 hover:bg-white/10">
                <Icon name="Library" className="mr-2 h-5 w-5" />
                Моя библиотека
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h2 
            className="text-4xl font-bold mb-4 gradient-text"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Новые альбомы
          </h2>
          <p className="text-foreground/70 text-lg">
            Свежие релизы от лучших артистов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {albums.map((album, index) => (
            <Card 
              key={album.id}
              className="group overflow-hidden bg-card/50 backdrop-blur border-white/10 hover:border-gradient-purple/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gradient-purple/20 cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedAlbum(album)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={album.cover} 
                  alt={album.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <Button size="sm" className="bg-white text-black hover:bg-white/90">
                    <Icon name="Play" className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <Badge className="mb-2 bg-gradient-to-r from-gradient-purple to-gradient-pink">
                  {album.genre}
                </Badge>
                <h3 className="font-bold text-lg mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {album.title}
                </h3>
                <p className="text-sm text-foreground/60 mb-2">{album.artist}</p>
                <p className="text-xs text-foreground/50">{album.year}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {selectedAlbum && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedAlbum(null)}
        >
          <Card 
            className="max-w-2xl w-full bg-card border-white/20 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-6">
                <img 
                  src={selectedAlbum.cover} 
                  alt={selectedAlbum.title}
                  className="w-full aspect-square object-cover rounded-l-lg"
                />
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <Badge className="mb-4 bg-gradient-to-r from-gradient-purple to-gradient-pink">
                      {selectedAlbum.genre}
                    </Badge>
                    <h2 
                      className="text-3xl font-bold mb-2 gradient-text"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {selectedAlbum.title}
                    </h2>
                    <p className="text-xl text-foreground/80 mb-4">{selectedAlbum.artist}</p>
                    <p className="text-foreground/60 mb-4">{selectedAlbum.description}</p>
                    <p className="text-sm text-foreground/50">Год выпуска: {selectedAlbum.year}</p>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <Button className="flex-1 bg-gradient-to-r from-gradient-purple to-gradient-pink hover:opacity-90">
                      <Icon name="Play" className="mr-2 h-4 w-4" />
                      Слушать
                    </Button>
                    <Button variant="outline" className="border-white/20">
                      <Icon name="Heart" className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedAlbum(null)} className="border-white/20">
                      <Icon name="X" className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <section className="py-16 bg-gradient-to-r from-gradient-purple/20 via-gradient-pink/20 to-gradient-orange/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Icon name="Music" className="h-16 w-16 mx-auto mb-6 text-gradient-pink" />
            <h2 
              className="text-3xl font-bold mb-4 gradient-text"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Присоединяйся к музыкальной революции
            </h2>
            <p className="text-foreground/70 mb-8">
              Открой для себя безграничный мир звуков и эмоций
            </p>
            <Button size="lg" className="bg-gradient-to-r from-gradient-purple via-gradient-pink to-gradient-orange hover:opacity-90">
              Начать слушать бесплатно
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
