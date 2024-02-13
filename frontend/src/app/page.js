'use client';
import { useState } from 'react';
import styles from "./page.module.css";

export default function Home() {

  const [text, setText] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:5000/generate-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text}),
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} name="text"/>
        <input type="submit" />
      </form>
    </div>
  );
}
