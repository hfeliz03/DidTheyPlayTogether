import { useEffect, useState } from 'react';
import type { Player } from '../types';

type PlayerCardProps = {
  player: Player;
};

export function PlayerCard({ player }: PlayerCardProps) {
  const [imageSrc, setImageSrc] = useState(player.imageUrl);

  useEffect(() => {
    setImageSrc(player.imageUrl);
  }, [player.imageUrl]);

  return (
    <article className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-glow backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-accent-400/40">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 via-transparent to-transparent opacity-70 transition duration-300 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col">
        <div className="relative aspect-[4/3.45] overflow-hidden">
          <img
            src={imageSrc}
            alt={player.name}
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
        </div>
        <div className="relative -mt-8 p-4 sm:p-5">
          <p className="text-[10px] uppercase tracking-[0.35em] text-accent-300/80">Featured Player</p>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">{player.name}</h2>
        </div>
      </div>
    </article>
  );
}
