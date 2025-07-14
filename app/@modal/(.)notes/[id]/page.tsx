
import { fetchNoteById } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";

type Props = {
    params: Promise<{id: string}>;
}

const NotePreview = async ({params}: Props) => {
  const {id} = await params;
  const idk = Number(id)
  const queryClient = new QueryClient()

await queryClient.prefetchQuery({
  queryKey:["note", idk],
  queryFn: () => fetchNoteById(idk),
})


  return (
    <>
    <HydrationBoundary state={dehydrate(queryClient)}>
    <NotePreviewClient id={idk}/>
    </HydrationBoundary>
    </>
  )
}

export default NotePreview;