import { galleryTiles as fallback } from '../../content/site';
import { usePublished } from './useData';
import Media from './Media';

const ratioClass: Record<string, string> = {
  tall: 'aspect-[3/4]', wide: 'aspect-[4/3]', square: 'aspect-square',
};

export default function Gallery() {
  const tiles = usePublished('gallery', fallback as any);
  return (
    <section id="gallery" className="section-pad" style={{ background: 'var(--color-cloud)' }}>
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 className="font-display d-lg text-navy">Life on campus</h2>
          <p className="mt-3 text-body">A look at the classrooms, the labs and the culture. Photos are managed from Admin, Gallery.</p>
        </div>
        <div className="mt-12 columns-2 md:columns-3 gap-4 [column-fill:_balance]">
          {tiles.map((t: any) => (
            <div key={t.id || t.label} className="mb-4 break-inside-avoid">
              <Media path={t.media} label={t.label} alt={t.label} className={`w-full rounded-2xl ${ratioClass[t.ratio] || 'aspect-square'}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
