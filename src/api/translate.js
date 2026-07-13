export async function translateToEnglish(text) {
  const hasCyrillic = /[а-яА-Я]/.test(text);

  if (!hasCyrillic) {
    return { text, translated: false };
  }

  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=bg|en`
    );

    if (!response.ok) throw new Error('translation failed');

    const data = await response.json();
    const translated = data.responseData.translatedText;

    return { text: translated, translated: true, original: text };
  } catch {
    // Ако преводът се провали — търсим с оригинала
    return { text, translated: false };
  }
}