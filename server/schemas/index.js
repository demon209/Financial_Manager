export const typeDefs = `#graphql
type Folder {
    id: String!,
    name: String,
    financial: Int,
    createAt: String,
    author: Author,
    notes: [Note]

}
type Author {
    uid: String!,
    name: String
}
type Query {
    folders: [Folder],
    folder(folderId: String!): Folder,
    note(noteId: String): Note
}
type Note {
    id: String!,
    name: String!,
    content: String,
    detailFinancial: Int!
}
type Mutation {
    addFolder(name: String!, financial: Int!) : Folder,
    addNote(name: String!,  content: String!, detailFinancial: Int!, folderId: ID!) : Note,
    updateNote(id: String!, content: String) : Note,
    deleteNote(id : String!): Note,
    register(uid: String!, name: String!): Author
}
`;
