import { Metadata } from "next";
import css from "./page.module.css"



export const metadata:Metadata = {
    title: "Page Not Found",
    description: "There is no page to find",
   openGraph: {
    title: "Not Found",
    description: "Not Found Page",
    url: `https://07-routing-nextjs-gamma-two.vercel.app/`,
    images: [
      {url: `https://ac.goit.global/fullstack/react/notehub-og-meta.jpg`,
        width: 1200,
        height: 630,
        alt: "NoteAppImage"
      }
    ]
  }
}



const NotFound = () => {
    return (<>
    <h1 className={css.title}>404 - Page not found</h1>
<p className={css.description}>Sorry, the page you are looking for does not exist.</p>
</>)
}


export default NotFound;
