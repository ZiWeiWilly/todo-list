import { createRoot } from 'react-dom/client';
import { TodoList } from './TodoList';

const rootNode = document.getElementById('root')
if (rootNode) {
    const root = createRoot(rootNode);
    root.render(<TodoList />);
}