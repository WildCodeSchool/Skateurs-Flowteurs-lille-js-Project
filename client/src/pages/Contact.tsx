import styles from "./Contact.module.css";

export const Contact = () => {
  return (
    <div className={styles.contact}>
      <p>
        <span>
          {" "}
          Ce projet web a été réalisé dans le cadre d'un travail d'équipe
          composé de quatre développeurs passionnés, dans un délai d'un mois.
        </span>

        <span>
          Notre objectif : créer une application moderne en React et TypeScript,
          avec un back-end, en mettant en œuvre de bonnes pratiques de
          développement et une organisation Agile.{" "}
        </span>

        <span>
          Nous avons travaillé ensemble sur toutes les étapes du projet :
          conception des maquettes sur Figma, modélisation des données,
          développement des composants, intégration d'API, gestion des routes,
          et mise en place d'un design responsive.
        </span>

        <span>
          Ce site est le fruit d'un véritable travail collaboratif, où chacun a
          pu apporter ses compétences et sa créativité.
        </span>
      </p>

      <div className={styles.profil}>
        <a href="https://github.com/Maxe-afk" target="_blank" rel="noreferrer">
          <img
            src="https://avatars.githubusercontent.com/u/100564567?v=4"
            alt="lien vers le profil de Christophe"
          />
        </a>
        <a
          href="https://github.com/ChrisG-WCS"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://avatars.githubusercontent.com/u/201600440?v=4"
            alt="lien vers le profil de Christophe"
          />
        </a>
        <a
          href="https://github.com/Jordan-182"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://avatars.githubusercontent.com/u/152084774?v=4"
            alt="lien vers le profil de Jordan"
          />
        </a>
        <a href="https://github.com/salah-hnt" target="_blank" rel="noreferrer">
          <img
            src="https://avatars.githubusercontent.com/u/181408278?v=4&size=64"
            alt="lien vers le profil de Salah"
          />
        </a>
      </div>
    </div>
  );
};
