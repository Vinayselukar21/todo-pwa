const todos = [
    { id: 1, title: 'Learn Next.js' },
    { id: 2, title: 'Build a PWA' },
    { id: 3, title: 'Create a Todo app' },
    { id: 4, title: 'Learn Next.js' },
    { id: 5, title: 'Build a PWA' },
    { id: 6, title: 'Create a Todo app' },
    { id: 7, title: 'Learn Next.js' },
    { id: 8, title: 'Build a PWA' },
    { id: 9, title: 'Create a Todo app' },
    { id: 10, title: 'Learn Next.js' },
    { id: 11, title: 'Build a PWA' },
    { id: 12, title: 'Create a Todo app' },
  ];
  
  export default function handler(req, res) {
    if (req.method === 'GET') {
      res.status(200).json(todos);
    } else if (req.method === 'POST') {
      const { title } = req.body; // Remove the JSON.parse() since Next.js automatically parses the request body as JSON
      const newTodo = { id: Date.now(), title };
      todos.push(newTodo);
      res.status(201).json(newTodo);
    } else if (req.method === 'DELETE') {
      const id = parseInt(req.query.id);
      const index = todos.findIndex((todo) => todo.id === id);
      if (index > -1) {
        todos.splice(index, 1);
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Todo not found' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  