export const typeDefs = `#graphql
type Folder {
    id: String,
    name: String,
    financial: Int,
    createAt: String,
    author: Author,
    notes: [Note]

}
type Author {
    id: String,
    name: String
}
type Query {
    folders: [Folder],
    folder(folderId: String): Folder,
    note(noteId: String): Note
}
type Note {
    id: String,
    content: String,
    detailFinancial: Int
}

`;
