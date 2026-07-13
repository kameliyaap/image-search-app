import { useEffect, useState } from 'react';
import { toggleFavorite, isFavorite } from '../favorites/favorites';
import { useLanguage } from '../i18n/LanguageContext';

function ImageModal({ photo, onClose, onFavoriteChange }) {
  const [saved, setSaved] = useState(isFavorite(photo.id));
  const { t, lang } = useLanguage();

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  function handleSave() {
    toggleFavorite(photo);
    setSaved(!saved);
    if (onFavoriteChange) onFavoriteChange();
  }

  const date = new Date(photo.created_at).toLocaleDateString(lang === 'bg' ? 'bg-BG' : 'en-US');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>×</button>

        <div className="modal__image">
          <img src={photo.urls.regular} alt={photo.alt_description} />
        </div>

        <div className="modal__info">
          <div className="modal__author">
            <img src={photo.user.profile_image.medium} alt={photo.user.name} />
            <div>
              <div className="modal__author-name">{photo.user.name}</div>
              <div className="modal__author-username">@{photo.user.username}</div>
            </div>
          </div>

          {photo.description && (
            <p className="modal__description">{photo.description}</p>
          )}

          <div className="modal__meta">
            <div className="modal__meta-item">
              <span className="modal__meta-label">{t.likes}</span>
              <span className="modal__meta-value">{photo.likes}</span>
            </div>
            <div className="modal__meta-item">
              <span className="modal__meta-label">{t.published}</span>
              <span className="modal__meta-value">{date}</span>
            </div>
          </div>

          <div className="modal__actions">
            <button className="modal__save" onClick={handleSave}>
              {saved ? t.savedBtn : t.save}
            </button>
            <a className="modal__download" href={photo.links.download} target="_blank" rel="noreferrer">
              {t.download}
            </a>
            <a className="modal__link" href={photo.links.html} target="_blank" rel="noreferrer">
              {t.viewOnUnsplash}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;