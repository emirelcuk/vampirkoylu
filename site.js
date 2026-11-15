// ⬇️ Destek e-posta adresinizi buraya yazın — tüm sayfalarda bu adres gösterilir
const SUPPORT_EMAIL = "emirelcuk7@gmail.com";

(function () {
  const supported = ["tr", "en", "de", "es", "fr"];

  function pickLanguage() {
    const fromUrl = new URLSearchParams(location.search).get("lang");
    if (supported.includes(fromUrl)) return fromUrl;
    try {
      const saved = localStorage.getItem("lang");
      if (supported.includes(saved)) return saved;
    } catch (e) {}
    for (const l of navigator.languages || [navigator.language || "en"]) {
      const code = (l || "").slice(0, 2).toLowerCase();
      if (supported.includes(code)) return code;
    }
    return "en";
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-lang]").forEach(function (el) {
      el.hidden = el.getAttribute("data-lang") !== lang;
    });
    document.querySelectorAll(".langs button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.set === lang ? "true" : "false");
    });
    // Sayfalar arası bağlantılar seçili dili korusun
    document.querySelectorAll("a[data-page]").forEach(function (a) {
      a.href = a.dataset.page + "?lang=" + lang;
    });
    const title = document.querySelector('[data-lang="' + lang + '"] [data-title]');
    if (title) document.title = title.dataset.title;
  }

  document.querySelectorAll(".email").forEach(function (a) {
    a.textContent = SUPPORT_EMAIL;
    a.href = "mailto:" + SUPPORT_EMAIL;
  });

  document.querySelectorAll(".langs button").forEach(function (b) {
    b.addEventListener("click", function () {
      try { localStorage.setItem("lang", b.dataset.set); } catch (e) {}
      apply(b.dataset.set);
    });
  });

  apply(pickLanguage());
})();
