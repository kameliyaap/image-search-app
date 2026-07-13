import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../auth/auth';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitch from '../components/LanguageSwitch';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { t } = useLanguage();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setError(t.allFieldsRequired);
      return;
    }

    const result = login(email, password);

    if (result.error === 'no_account') {
      setError(t.noSuchAccount);
      return;
    }
    if (result.error === 'wrong_credentials') {
      setError(t.wrongCredentials);
      return;
    }

    navigate('/search');
  }

  return (
    <div className="auth-page">
      <div
        className="auth-page__visual"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200)' }}
      >
        <div className="auth-page__caption">
          <h2>{t.loginVisualTitle}</h2>
          <p>{t.loginVisualText}</p>
        </div>
      </div>
      
      <div className="auth-page__form-side">
        <div className="auth-page__lang">
            <LanguageSwitch />
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form__brand">
            <span className="auth-form__logo">IS</span>
            Image Search
          </div>

          <h1 className="auth-form__title">{t.login}</h1>
          <p className="auth-form__subtitle">{t.welcomeBack}</p>

          <input
            className="auth-form__input"
            type="email"
            placeholder={t.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="auth-form__input"
            type="password"
            placeholder={t.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="auth-form__error">{error}</p>}

          <button className="auth-form__submit" type="submit">{t.login}</button>

          <p className="auth-form__switch">
            {t.noAccount} <Link to="/signup">{t.signup}</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;