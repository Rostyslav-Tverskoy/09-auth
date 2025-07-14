import { fetchNotes } from "@/lib/api"
import NotesClient from "./Notes.client";
import type {Metadata} from "next";

type Props = {
    params: Promise<{slug: string[]}>
}


export async function generateMetadata({params} : Props): Promise<Metadata> {
  const {slug} = await params;
  

  
  
  return {
    title: slug[0],
    description: `${slug[0]} filtred`,
    openGraph: {
      title: slug[0],
      description: `${slug[0]} filtred`,
      url: "https://07-routing-nextjs-gamma-two.vercel.app/notes/filter/Work",
      images: [
        {url: `https://ac.goit.global/fullstack/react/notehub-og-meta.jpg`,
        width: 1200,
        height: 630,
        alt: `${slug[0]} image`
      }
      ]
    }
  }

}



const Filter = async ( {params} : Props) => {
    const page = 1;
    const search = "";


    const {slug} = await params;
    const queryParams = slug[0] === "all" ? "" : slug[0]
    
    
     const {notes, totalPages} = await fetchNotes({search: queryParams, tag: queryParams})
    
    
    return (<NotesClient
      initialNotes={notes}
      initialPage={page}
      initialSearch={search}
      totalPages={totalPages}
      tag={queryParams}
    />)
}

export default Filter;