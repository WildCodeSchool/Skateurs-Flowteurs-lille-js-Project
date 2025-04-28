import { Link } from "react-router";
import "./HomePage.css";

export const HomePage = () => {
  return (
    <div className="HomePage">
      <section>
        <img
          src="./public/image-removebg-preview.png"
          alt="Logo Antoine Faucon"
          className="logoAntoineRight"
        />
        <p className="BubbleRight">
          Salut, c'est Antoine Faucon. Je suis la pour te guider étape par étape
          à travers INTERPARCK
        </p>
      </section>

      <section id="blue">
        <Link to="/carte" className="skate-buttonRight">
          skateMap
        </Link>
        <p className="BubbleLeft">
          Besoin d'un spot pour skater ? Check la carte ! Je te montre tous les
          skateparks autour de toi, la météo et même l'itinéraire pour t'y
          rendre. Facile, rapide, efficace.
        </p>

        <img
          src="./public/image-removebg-preview.png"
          alt="Logo Antoine Faucon"
          className="logoAntoineLeft"
        />
      </section>

      <section>
        <img
          src="./public/image-removebg-preview.png"
          alt="Logo Antoine Faucon"
          className="logoAntoineRight"
        />
        <p className="BubbleRight">
          Envie d'apprendre des tricks ? Cette page est ton carnet
          d'entraînement. Commence facile, monte en level, et valide chaque
          trick pour gagner de l'XP. Let's go progresser !
        </p>

        <Link to="/tricksdex" className="skate-buttonRight">
          TricksDex
        </Link>
      </section>

      <section id="blue">
        <Link to="/profil" className="skate-buttonRight">
          Profil
        </Link>
        <p className="BubbleLeft">
          Ici, c'est ton coin perso. Choisis ton avatar, change de skin,
          connecte-toi avec Google et surveille ton niveau. C'est toi le boss de
          ton évolution.
        </p>

        <img
          src="./public/image-removebg-preview.png"
          alt="Logo Antoine Faucon"
          className="logoAntoineLeft"
        />
      </section>

      <section>
        <img
          src="./public/image-removebg-preview.png"
          alt="Logo Antoine Faucon"
          className="logoAntoineRight"
        />
        <p className="BubbleRight">
          Si vous souhaitez nous contacter ou aller voir nos autres projets, je
          vous invite à vous rendre sur notre page contact.
        </p>
        <Link to="/contact" className="skate-buttonLeft">
          Contact
        </Link>
      </section>
    </div>
  );
};
