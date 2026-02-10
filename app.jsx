
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const nextUser = () => {
    setIndex((prev) => (prev + 1) % users.length);
  };

  const prevUser = () => {
    setIndex((prev) => (prev === 0 ? users.length - 1 : prev - 1));
  };

  if (loading) return <h2 className="status">Loading...</h2>;
  if (error) return <h2 className="status">Error: {error}</h2>;

  const user = users[index];

  return (
    <div className="app-container">
      <div className="user-card">
        <h2>{user.name}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Company:</strong> {user.company.name}</p>
        <p><strong>City:</strong> {user.address.city}</p>
      </div>

      <div className="buttons">
        <button onClick={prevUser}>Previous</button>
        <button onClick={nextUser}>Next</button>
      </div>
    </div>
  );
}

export default App;
