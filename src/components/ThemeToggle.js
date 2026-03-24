"use client";

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  localStorage.setItem("wattpulse-theme", theme);
  window.dispatchEvent(
    new CustomEvent("wattpulse-theme-change", { detail: theme }),
  );
}

export default function ThemeToggle() {
  function toggleTheme() {
    const isDark = document.documentElement.classList.contains("dark");
    applyTheme(isDark ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="grid h-10 w-10 place-items-center rounded-full border border-[#e7eaf4] bg-white text-[#25304a] transition hover:bg-[#f5f7fc] dark:border-[#353535] dark:bg-[#242424] dark:text-[#f4f7ff] dark:hover:bg-[#2d2d2d]"
    >
      <span className="hidden dark:block">
        <SunIcon />
      </span>
      <span className="block dark:hidden">
        <MoonIcon />
      </span>
    </button>
  );
}
