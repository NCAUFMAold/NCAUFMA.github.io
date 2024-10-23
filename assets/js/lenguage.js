document.querySelector('.selected-language').addEventListener('click', function() {
  const options = document.querySelector('.language-options');
  options.style.display = options.style.display === 'none' || !options.style.display ? 'block' : 'none';
});

document.querySelectorAll('.language-options li').forEach(function(option) {
  option.addEventListener('click', function() {
    const selectedLang = document.querySelector('.selected-language');
    const img = option.querySelector('img').src;
    const lang = option.querySelector('span').innerText;

    selectedLang.querySelector('img').src = img;
    selectedLang.querySelector('span').innerText = lang;

    document.querySelector('.language-options').style.display = 'none';

    const selectedLangCode = option.getAttribute('data-lang');
    console.log("Idioma selecionado:", selectedLangCode);
  });
});