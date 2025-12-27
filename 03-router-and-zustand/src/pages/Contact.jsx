import { useId, useState } from "react";

import styles from "./Contact.module.css";

export default function Contact() {
  const nameInputId = useId();
  const emailInputId = useId();
  const subjectInputId = useId();
  const messageInputId = useId();

  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  function handleSubmit(event) {
    event.preventDefault();

    const errors = validate(values);

    if (Object.keys(errors).length > 0) {
      console.error("errors: ", errors);
      return;
    }

    // submit form (we'll send it to console with a timeout since its a excercise)
    setStatus("submitting");

    setTimeout(() => {
      console.log("Data sent to server", values);

      event.target.reset();

      setStatus("success");
    }, 1500);
  }

  function validate(values) {
    const newErrors = {};

    // name validation
    if (!values.name) {
      newErrors.name = "Por favor, indícanos tu nombre y apellido.";
    } else if (values.name.length < 3) {
      newErrors.name =
        "El nombre parece demasiado corto, revisa que esté completo.";
    }

    // email validation
    if (!values.email) {
      newErrors.email = "Necesitamos tu correo para poder responderte.";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      newErrors.email =
        "El correo no parece válido. Revisa que tenga el formato usuario@dominio.com.";
    }

    // subject validation
    if (!values.subject) {
      newErrors.subject =
        "Añade un asunto para saber de qué trata tu consulta.";
    } else if (values.subject.length < 3) {
      newErrors.subject =
        "El asunto es muy breve. Describe un poco mejor tu consulta.";
    }

    // message validation
    if (!values.message) {
      newErrors.message = "Escribe tu mensaje para que podamos ayudarte.";
    } else if (values.message.length < 3) {
      newErrors.message =
        "Tu mensaje es muy corto. Danos un poco más de detalles para responderte mejor.";
    }

    setErrors(newErrors);
    return newErrors;
  }

  function handleChange(event) {
    const [name, value] = [event.target.name, event.target.value];

    setValues({
      ...values,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  }

  return (
    <main className={styles.contact}>
      <title>DevJobs - Contacto</title>
      <header>
        <h2>Ponte en contacto con nosotros</h2>
        <p>
          ¿Tienes alguna pregunta o comentario? Rellena el siguiente formulario
          y nos pondremos en contacto contigo pronto
        </p>
      </header>

      <div className={styles.contactPageContent}>
        <form action="submit" onSubmit={handleSubmit} noValidate>
          <div className={styles.contactInput}>
            <label htmlFor={nameInputId}>Nombre</label>
            <input
              name="name"
              id={nameInputId}
              type="text"
              placeholder="Tú nombre completo"
              value={values.name}
              className={errors.name ? styles.inputError : ""}
              onChange={handleChange}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          <div className={styles.contactInput}>
            <label htmlFor={emailInputId}>Correo</label>
            <input
              name="email"
              id={emailInputId}
              type="email"
              placeholder="tu@email.com"
              className={errors.email ? styles.inputError : ""}
              onChange={handleChange}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div className={`${styles.contactInput} ${styles.subjectInput}`}>
            <label htmlFor={subjectInputId}>Asunto</label>
            <input
              name="subject"
              id={subjectInputId}
              type="text"
              placeholder="¿En que podemos ayudarte?"
              className={errors.subject ? styles.inputError : ""}
              onChange={handleChange}
            />
            {errors.subject && <p className={styles.error}>{errors.subject}</p>}
          </div>

          <div className={`${styles.contactInput} ${styles.messageInput}`}>
            <label htmlFor={messageInputId}>Mensaje</label>
            <textarea
              name="message"
              id={messageInputId}
              placeholder="Escribe tu mensaje aquí..."
              className={errors.message ? styles.inputError : ""}
              onChange={handleChange}
            />
            {errors.message && <p className={styles.error}>{errors.message}</p>}
          </div>

          <button
            type="submit"
            className={`${styles.contactFormButton} button
            ${status === "submitting" ? styles.submitting : ""}
            ${status === "success" ? styles.success : ""}`}
          >
            {status === "submitting"
              ? "Enviando..."
              : status === "success"
              ? "¡Enviado correctamente!"
              : "Enviar Mensaje"}
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
