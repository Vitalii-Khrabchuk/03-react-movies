import styles from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";
import { type FormEvent } from "react";

interface SearchBarProps {
  onSubmit: (word: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  // Правильний обробник форми
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // блокуємо стандартну поведінку

    const formData = new FormData(event.currentTarget);
    const query = (formData.get("query") as string)?.trim();

    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }

    onSubmit(query); // викликаємо проп з пошуком
  }

  return (
    <header className={styles.header}>
      <Toaster />
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        {/* Використовуємо onSubmit замість action */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
