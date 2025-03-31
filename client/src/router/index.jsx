import { createBrowserRouter, Outlet } from "react-router-dom";
import Note from "../components/Note";
import SpendingSection from "../components/SpendingSection";
import AuthProvider from "../context/AuthProvider";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/login";
import ProtectedRouter from "./protectedRouter";
import { addNote, noteLoader, notesLoader, updateNote, deleteNote } from "../ultils/noteUtils";
import { foldersLoader } from "../ultils/folderUltils";

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />, 
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <ProtectedRouter />,
        children: [
          {
            element: <Home />,
            path: "/",
            loader: foldersLoader,
            children: [
              {
                element: <SpendingSection />,
                path: `folders/:folderId`,
                loader: notesLoader,
                action: addNote,    
                children: [
                  {
                    element: <Note />,
                    path: `note/:noteId`,
                    action: updateNote,
                    loader: noteLoader,   
                  },
                  {
                    path: "note/:noteId/delete",
                    action: deleteNote,
                  }
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
