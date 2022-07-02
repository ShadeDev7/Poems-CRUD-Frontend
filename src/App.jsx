import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Index from "./components/Index";
import PoemDisplay from "./components/PoemDisplay";
import CreatePoem from "./components/CreatePoem";
import EditPoem from "./components/EditPoem";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Index />} />
                    <Route path="poem/:id" element={<PoemDisplay />} />
                    <Route path="create" element={<CreatePoem />} />
                    <Route path="edit/:id" element={<EditPoem />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
