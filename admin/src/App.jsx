import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inbox from "./pages/Inbox";
import MessageDetail from "./pages/MessageDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inbox />} />
        <Route path="/message/:id" element={<MessageDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
