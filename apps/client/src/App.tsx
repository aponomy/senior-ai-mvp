import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import NewConversation from './pages/NewConversation';
import OrdersAndFunctions from './pages/OrdersAndFunctions';
import PreviousConversations from './pages/PreviousConversations';
import PreviousTopics from './pages/PreviousTopics';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/previous-topics" element={<PreviousTopics />} />
        <Route path="/previous-conversations" element={<PreviousConversations />} />
        <Route path="/functions" element={<OrdersAndFunctions />} />
        <Route path="/new-conversation" element={<NewConversation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
