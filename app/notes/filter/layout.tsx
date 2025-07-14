type Props = {
    children: React.ReactNode
    sidebar: React.ReactNode
}


const NotesListLayout = ({children, sidebar}: Props) => {
    return (
        <section>
            <aside>{sidebar}</aside>
            <div>{children}</div>
        </section>
    )
    
}

export default NotesListLayout;