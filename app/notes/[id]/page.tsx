import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from "../../../lib/api"
import NoteDetailsClient from './NoteDetails.client';
import {Metadata} from "next";

type Props = {
  params: Promise<{id: string}>;
}


export async function generateMetadata({params} : Props): Promise<Metadata> {
  const res = await params;
   const idk = Number(res.id);


   const note = await fetchNoteById(idk);

   return {
    title: note.title,
    description: note.content,
    openGraph: {
      title: note.title,
      description: note.content,
      url: `https://07-routing-nextjs-gamma-two.vercel.app/notes/${idk}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          width: 1200,
          height: 630,
          alt: note.title,
        }
      ]
    }
   }




}



const NoteDetails = async ({params}: Props) => {
const id = await params;
const idk = Number(id.id)

const queryClient = new QueryClient();


await queryClient.prefetchQuery({
queryKey:["note", idk ],
queryFn: () => fetchNoteById(idk),
})




return (
  <div>
    <HydrationBoundary state={dehydrate(queryClient)}>
    <NoteDetailsClient id={idk} />
    </HydrationBoundary>
  </div>
)

}


export default NoteDetails;
