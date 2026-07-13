function ImageCard({ photo, onClick }) {
  return (
    <div className="image-card" onClick={onClick}>
      <img src={photo.urls.small} alt={photo.alt_description} />
      <div className="image-card__overlay">
        <span className="image-card__author">
          <img src={photo.user.profile_image.small} alt={photo.user.name} />
          {photo.user.name}
        </span>
        <span className="image-card__likes">♥ {photo.likes}</span>
      </div>
    </div>
  );
}

export default ImageCard;