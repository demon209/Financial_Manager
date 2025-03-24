export default {
  authors: [
    {
      id: 123,
      name: "QuanVu,",
    },
    {
      id: 1,
      name: "QuanVu2",
    },
    {
      id: 3,
      name: "QuanVu3",
    },
  ],
  folders: [
    {
      id: '1',
      name: "Home",
      createAt: "2022-11-2323",
      authorId: 123,
    },
    {
      id: '2',
      name: "Home2",
      createAt: "2022-12-2323",
      authorId: 1,
    },
    {
      id: '3',
      name: "Home3",
      createAt: "2022-13-2323",
      authorId: 3,
    },
  ],
  notes: [
    {
      id: '123',
      content:'<p> Go to play </p>',
      folderId: "1"
    },
    {
      id: '1',
      content:'<p> Go to check </p>',
      folderId: "1"
    },
    {
      id: '3',
      content:'<p> Go to fudud </p>',
      folderId: "2"
    }
  ]
};
