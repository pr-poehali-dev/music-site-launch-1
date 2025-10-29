import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

interface MusicPlayerProps {
  track: Track | null;
  onClose: () => void;
}

export default function MusicPlayer({ track, onClose }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (track) {
      setIsPlaying(true);
      setProgress(0);
    }
  }, [track]);

  useEffect(() => {
    if (isPlaying && progress < 100) {
      const timer = setInterval(() => {
        setProgress(prev => Math.min(prev + 0.5, 100));
      }, 500);
      return () => clearInterval(timer);
    }
  }, [isPlaying, progress]);

  if (!track) return null;

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <Card className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-white/10 p-4 animate-slide-up z-40">
      <div className="container mx-auto">
        <div className="flex items-center gap-4">
          <img 
            src={track.cover} 
            alt={track.title}
            className="w-16 h-16 rounded-lg object-cover"
          />
          
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm truncate">{track.title}</h4>
            <p className="text-xs text-foreground/60 truncate">{track.artist}</p>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost">
              <Icon name="SkipBack" className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-gradient-purple to-gradient-pink hover:opacity-90"
              onClick={togglePlay}
            >
              <Icon name={isPlaying ? "Pause" : "Play"} className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Icon name="SkipForward" className="h-4 w-4" />
            </Button>
          </div>

          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md">
            <span className="text-xs text-foreground/60">{Math.floor(progress / 100 * 180 / 60)}:{String(Math.floor(progress / 100 * 180 % 60)).padStart(2, '0')}</span>
            <Slider 
              value={[progress]} 
              onValueChange={(value) => setProgress(value[0])}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-xs text-foreground/60">{track.duration}</span>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={toggleMute}>
              <Icon name={isMuted || volume === 0 ? "VolumeX" : volume < 50 ? "Volume1" : "Volume2"} className="h-4 w-4" />
            </Button>
            <Slider 
              value={[isMuted ? 0 : volume]} 
              onValueChange={(value) => {
                setVolume(value[0]);
                setIsMuted(false);
              }}
              max={100}
              step={1}
              className="w-24"
            />
          </div>

          <Button size="sm" variant="ghost" onClick={onClose}>
            <Icon name="X" className="h-4 w-4" />
          </Button>
        </div>

        <div className="md:hidden mt-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground/60">{Math.floor(progress / 100 * 180 / 60)}:{String(Math.floor(progress / 100 * 180 % 60)).padStart(2, '0')}</span>
            <Slider 
              value={[progress]} 
              onValueChange={(value) => setProgress(value[0])}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-xs text-foreground/60">{track.duration}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
