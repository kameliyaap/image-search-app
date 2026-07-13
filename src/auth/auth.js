const USER_KEY = 'registeredUser';
const SESSION_KEY = 'session';

export function register(name, email, password) {
  const stored = localStorage.getItem(USER_KEY);

  if (stored && JSON.parse(stored).email === email) {
    return { error: 'account_exists' };
  }

  const user = {
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(SESSION_KEY, JSON.stringify({ name, email }));

  return { name, email };
}

export function login(email, password) {
  const stored = localStorage.getItem(USER_KEY);

  if (!stored) {
    return { error: 'no_account' };
  }

  const user = JSON.parse(stored);

  if (user.email !== email || user.password !== password) {
    return { error: 'wrong_credentials' };
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify({ name: user.name, email: user.email }));
  return { name: user.name, email: user.email };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession() {
  const stored = localStorage.getItem(SESSION_KEY);
  return stored ? JSON.parse(stored) : null;
}