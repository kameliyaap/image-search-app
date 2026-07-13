import ImageCard from './ImageCard';

function ImageGrid({ photos, onPhotoClick }) {
  return (
    <div className="image-grid">
      {photos.map((photo) => (
        <ImageCard key={photo.id} photo={photo} onClick={() => onPhotoClick(photo)} />
      ))}
    </div>
  );
}

export default ImageGrid;