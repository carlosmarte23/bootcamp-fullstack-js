import styles from "./Contact.module.css";

export function Contact() {
  return (
    <main className={styles.contact}>
      <header>
        <h2>Ponte en contacto con nosotros</h2>
        <p>
          ¿Tienes alguna pregunta o comentario? Rellena el siguiente formulario
          y nos pondremos en contacto contigo pronto
        </p>
      </header>

      <div className={styles.contactPageContent}>
        <form action="submit">
          <div className={styles.contactInput}>
            <label htmlFor="name">Nombre</label>
            <input
              required
              name="name"
              type="text"
              placeholder="Tú nombre completo"
            />
          </div>

          <div className={styles.contactInput}>
            <label htmlFor="email">Correo</label>
            <input
              required
              name="email"
              type="email"
              placeholder="tu@email.com"
            />
          </div>

          <div className={`${styles.contactInput} ${styles.subjectInput}`}>
            <label htmlFor="subject">Asunto</label>
            <input
              required
              name="subject"
              type="text"
              placeholder="¿En que podemos ayudarte?"
            />
          </div>

          <div className={`${styles.contactInput} ${styles.messageInput}`}>
            <label htmlFor="message">Mensaje</label>
            <textarea
              required
              name="message"
              placeholder="Escribe tu mensaje aquí..."
            />
          </div>

          <button type="submit" className={`${styles.button} button`}>
            Enviar Mensaje
          </button>
        </form>

        <aside className={styles.sidebar}>
          <h3>Otras formas de contacto</h3>

          <div className={styles.contactInfo}>
            <div className={styles.icon}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                <path d="M3 7l9 6l9 -6" />
              </svg>
            </div>
            <div>
              <h4>Email</h4>
              <p>Para consultas generales.</p>
              <p className={styles.textHighlight}>support@devjobs.com</p>
            </div>
          </div>

          <div className={styles.contactInfo}>
            <div className={styles.icon}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
              </svg>
            </div>

            <div>
              <h4>Telefono</h4>
              <p>Llámanos para ayuda inmediata.</p>
              <p className={styles.textHighlight}>+1 234 567 890</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
