import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../auth/auth';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitch from '../components/LanguageSwitch';

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { t } = useLanguage();

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError(t.allFieldsRequired);
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError(t.invalidEmail);
      return;
    }
    if (password !== confirmPassword) {
      setError(t.passwordsDontMatch);
      return;
    }

    const result = register(name, email, password);

    if (result.error === 'account_exists') {
      setError(t.accountExists);
      return;
    }

    navigate('/search');
  }

  return (
    <div className="auth-page">
      <div
        className="auth-page__visual"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200)' }}
      >
        <div className="auth-page__caption">
          <h2>{t.signupVisualTitle}</h2>
          <p>{t.signupVisualText}</p>
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

          <h1 className="auth-form__title">{t.createAccount}</h1>
          <p className="auth-form__subtitle">{t.signupSubtitle}</p>

          <input
            className="auth-form__input"
            type="text"
            placeholder={t.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <input
            className="auth-form__input"
            type="password"
            placeholder={t.confirmPassword}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="auth-form__error">{error}</p>}

          <button className="auth-form__submit" type="submit">{t.signup}</button>

          <p className="auth-form__switch">
            {t.hasAccount} <Link to="/login">{t.login}</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;