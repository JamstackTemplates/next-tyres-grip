import { mapEmbedUrl } from '../lib/maps';
import { Icon } from './workshop-art';

/** Pass a formatted address. The embed uses no secret key. */
export function GoogleMap({ address, title, className = '' }: {
  address: string; title: string; className?: string;
}) {
  return <div className={`map ${className}`}>
    <div className="map-placeholder" aria-hidden="true">
      <Icon name="pin" /><p>{address}</p>
    </div>
    <iframe src={mapEmbedUrl(address)} title={title} loading="lazy"
      referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
  </div>;
}
