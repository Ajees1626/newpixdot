import SafeImage from "@/components/ui/SafeImage";

import Reveal from "@/components/layout/Animations/Reveal";

import { cn } from "@/utils/cn";



interface GalleryGridProps {

  images: string[];

  altPrefix: string;

  /** Index of image that stays B&W until hover (default: 2 = third image). */

  bwHoverIndex?: number;

  limit?: number;

}



function GalleryTile({

  src,

  alt,

  isBwHover,

  className,

  imageClassName,

  badge,

}: {

  src: string;

  alt: string;

  isBwHover?: boolean;

  className?: string;

  imageClassName?: string;

  badge?: string;

}) {

  return (

    <div className={cn("group relative overflow-hidden rounded-2xl border border-border bg-surface", className)}>

      <SafeImage

        src={src}

        alt={alt}

        className={cn(

          "h-full w-full object-cover transition-all duration-700 ease-premium",

          isBwHover

            ? "grayscale group-hover:grayscale-0 group-hover:scale-105"

            : "group-hover:scale-105",

          imageClassName

        )}

        fallbackClassName="h-full min-h-[140px] rounded-2xl"

      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />

      {isBwHover && badge && (

        <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white opacity-100 transition-opacity duration-500 group-hover:opacity-0">

          {badge}

        </span>

      )}

    </div>

  );

}



/** Creative bento gallery — third image B&W until hover; fourth spans full width. */

export default function GalleryGrid({

  images,

  altPrefix,

  bwHoverIndex = 2,

  limit = 4,

}: GalleryGridProps) {

  const items = images.filter(Boolean).slice(0, limit);

  if (items.length === 0) return null;



  const [first, second, third, fourth] = items;



  if (items.length === 1) {

    return (

      <Reveal>

        <GalleryTile src={first} alt={`${altPrefix} 1`} className="aspect-[16/10] sm:aspect-[2/1]" />

      </Reveal>

    );

  }



  if (items.length === 2) {

    return (

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">

        {items.map((src, i) => (

          <Reveal key={`${src}-${i}`} delay={i * 0.05}>

            <GalleryTile

              src={src}

              alt={`${altPrefix} ${i + 1}`}

              isBwHover={i === bwHoverIndex}

              className="aspect-square"

              badge={i === bwHoverIndex ? "Hover for color" : undefined}

            />

          </Reveal>

        ))}

      </div>

    );

  }



  const topItems = fourth ? items.slice(0, 3) : items;



  return (

    <div className="space-y-3 sm:space-y-4">

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12 lg:grid-rows-2 lg:gap-4">

        <Reveal delay={0} className="col-span-2 row-span-2 lg:col-span-7 lg:row-span-2">

          <GalleryTile

            src={first}

            alt={`${altPrefix} 1`}

            className="aspect-[4/3] sm:aspect-square lg:aspect-auto lg:min-h-[320px]"

          />

        </Reveal>



        {second && (

          <Reveal delay={0.05} className="col-span-1 lg:col-span-5 lg:row-span-1">

            <GalleryTile src={second} alt={`${altPrefix} 2`} className="aspect-square lg:min-h-[152px]" />

          </Reveal>

        )}



        {third && (

          <Reveal delay={0.1} className="col-span-1 lg:col-span-5 lg:row-span-1">

            <GalleryTile

              src={third}

              alt={`${altPrefix} 3`}

              isBwHover={bwHoverIndex === 2}

              className="aspect-square lg:min-h-[152px]"

              badge={bwHoverIndex === 2 ? "Hover for color" : undefined}

            />

          </Reveal>

        )}



        {!fourth &&

          topItems.slice(3).map((src, i) => (

            <Reveal key={`${src}-${i + 3}`} delay={(i + 3) * 0.05} className="col-span-1 lg:col-span-4">

              <GalleryTile

                src={src}

                alt={`${altPrefix} ${i + 4}`}

                isBwHover={i + 3 === bwHoverIndex}

                className="aspect-square"

                badge={i + 3 === bwHoverIndex ? "Hover for color" : undefined}

              />

            </Reveal>

          ))}

      </div>



      {fourth && (

        <Reveal delay={0.15}>

          <div className="group relative">

            <div

              aria-hidden

              className="pointer-events-none absolute -inset-2 rounded-[1.75rem] border border-dashed border-border/80 transition-colors duration-500 group-hover:border-primary/30 sm:-inset-3 sm:rounded-[2rem]"

            />

            <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-card p-2 shadow-soft sm:rounded-[1.75rem] sm:p-3">

              <div className="relative aspect-[16/9] overflow-hidden rounded-xl sm:aspect-[21/9] sm:rounded-2xl">

                <SafeImage

                  src={fourth}

                  alt={`${altPrefix} 4`}

                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-[1.03]"

                  fallbackClassName="min-h-[180px] rounded-xl sm:min-h-[220px]"

                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/20 opacity-70 transition-opacity duration-500 group-hover:opacity-50" />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3 sm:bottom-6 sm:left-6 sm:right-6">

                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md sm:text-fluid-xs">

                    Featured frame

                  </span>

                  <span className="hidden text-fluid-xs text-white/70 sm:inline">Scroll gallery · image 04</span>

                </div>

              </div>

            </div>

          </div>

        </Reveal>

      )}

    </div>

  );

}


